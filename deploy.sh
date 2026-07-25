#!/usr/bin/env bash
# ==============================================================================
# OHM CORE ENGINEERING - STAGING TO PRODUCTION DEPLOYMENT SCRIPT
# Deploy local DDEV site to Production: https://ohmcore.co.zw
# ==============================================================================

set -eo pipefail

REMOTE_USER="ubuntu"
REMOTE_HOST="51.77.222.232"
REMOTE_PATH="/var/www/sites/ohmcore.co.zw/htdocs"
DB_NAME="ohmcore_co_zw"
LOCAL_URL="https://ohm.ddev.site"
PROD_URL="https://ohmcore.co.zw"

COLOR_GREEN="\033[0;32m"
COLOR_ORANGE="\033[0;33m"
COLOR_BLUE="\033[0;34m"
COLOR_RESET="\033[0m"

echo -e "${COLOR_BLUE}====================================================${COLOR_RESET}"
echo -e "${COLOR_BLUE}   OHM CORE ENGINEERING - PRODUCTION DEPLOYMENT     ${COLOR_RESET}"
echo -e "${COLOR_BLUE}====================================================${COLOR_RESET}"

# 1. Compile production frontend bundles
echo -e "\n${COLOR_ORANGE}[1/5] Compiling theme and admin SPA bundles...${COLOR_RESET}"
npm run build
(cd wp-content/plugins/ohm-tools && npm run build)
echo -e "${COLOR_GREEN}✓ Bundles built successfully.${COLOR_RESET}"

# 2. Sync codebase via streamed compressed tar archive
echo -e "\n${COLOR_ORANGE}[2/5] Transferring codebase to production server...${COLOR_RESET}"
TMP_TAR=$(mktemp /tmp/ohm_deploy_XXXXXX.tar.gz)
tar --exclude='.git' \
    --exclude='node_modules' \
    --exclude='wp-config.php' \
    --exclude='wp-config-ddev.php' \
    -czf "${TMP_TAR}" ./

ssh "${REMOTE_USER}@${REMOTE_HOST}" "sudo tar -xzf - -C ${REMOTE_PATH}" < "${TMP_TAR}"
rm -f "${TMP_TAR}"
echo -e "${COLOR_GREEN}✓ Codebase transferred and extracted.${COLOR_RESET}"

# 3. Sync uploads using checksum-based rsync (avoids duplicate media transfers)
echo -e "\n${COLOR_ORANGE}[3/5] Syncing uploads directory via rsync (checksum)...${COLOR_RESET}"
if [ -d "wp-content/uploads" ]; then
    rsync -avz --checksum --rsync-path="sudo rsync" wp-content/uploads/ "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/wp-content/uploads/"
    echo -e "${COLOR_GREEN}✓ Uploads directory synced.${COLOR_RESET}"
else
    echo -e "${COLOR_BLUE}No local uploads directory found to sync.${COLOR_RESET}"
fi

# 4. Migrate MySQL database
echo -e "\n${COLOR_ORANGE}[4/5] Exporting local database and importing to production...${COLOR_RESET}"
ddev wp db export - | ssh "${REMOTE_USER}@${REMOTE_HOST}" "sudo mysql ${DB_NAME}"
echo -e "${COLOR_GREEN}✓ Database imported successfully.${COLOR_RESET}"

# 5. Run WP-CLI URL search-replace, update admin password, and fix file permissions
echo -e "\n${COLOR_ORANGE}[5/5] Running WP-CLI URL search-replace, securing admin password, and fixing permissions...${COLOR_RESET}"

PROD_SECRET_FILE="/home/garikaib/Documents/zimprices_email/secrets/ohmcore_prod.json"
PROD_ADMIN_PASS=""
PROD_ADMIN_USER="garikaib"

if [ -f "${PROD_SECRET_FILE}" ]; then
    PROD_ADMIN_PASS=$(jq -r '.admin_password // empty' "${PROD_SECRET_FILE}" 2>/dev/null || true)
    PROD_ADMIN_USER=$(jq -r '.admin_username // "garikaib"' "${PROD_SECRET_FILE}" 2>/dev/null || echo "garikaib")
fi

if [ -z "${PROD_ADMIN_PASS}" ]; then
    PROD_ADMIN_PASS=$(openssl rand -base64 24)
    echo -e "${COLOR_ORANGE}Note: Generated random secure password for production admin '${PROD_ADMIN_USER}'${COLOR_RESET}"
fi

ssh "${REMOTE_USER}@${REMOTE_HOST}" "
    sudo wp --allow-root --path=${REMOTE_PATH} search-replace '${LOCAL_URL}' '${PROD_URL}' --all-tables && \
    sudo wp --allow-root --path=${REMOTE_PATH} search-replace 'http://ohm.ddev.site' '${PROD_URL}' --all-tables && \
    sudo wp --allow-root --path=${REMOTE_PATH} search-replace '//ohm.ddev.site' '//ohmcore.co.zw' --all-tables && \
    sudo wp --allow-root --path=${REMOTE_PATH} option update siteurl '${PROD_URL}' && \
    sudo wp --allow-root --path=${REMOTE_PATH} option update home '${PROD_URL}' && \
    sudo wp --allow-root --path=${REMOTE_PATH} user update '${PROD_ADMIN_USER}' --user_pass='${PROD_ADMIN_PASS}' && \
    sudo chown -R www-data:www-data ${REMOTE_PATH} && \
    sudo find ${REMOTE_PATH} -type d -exec chmod 755 {} \; && \
    sudo find ${REMOTE_PATH} -type f -exec chmod 644 {} \;
"
echo -e "${COLOR_GREEN}✓ URLs updated, production admin password secured, and permissions restored.${COLOR_RESET}"

echo -e "\n${COLOR_GREEN}====================================================${COLOR_RESET}"
echo -e "${COLOR_GREEN}   DEPLOYMENT COMPLETED SUCCESSFULLY TO ${PROD_URL}   ${COLOR_RESET}"
echo -e "${COLOR_GREEN}====================================================${COLOR_RESET}\n"
