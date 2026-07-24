<?php
/**
 * Plugin Name: Ohm Core Tools
 * Description: Utility plugin scaffold for Ohm Core Engineering.
 * Version: 0.1.0
 * Author: Garikai Dzoma
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Bootstrap loader.
require_once plugin_dir_path( __FILE__ ) . 'includes/class-ohm-loader.php';
Ohm_Loader::get_instance();

/**
 * Check if the Vite dev server for the plugin is running on port 5174.
 */
function ohm_tools_is_vite_dev() {
	static $is_dev = null;
	if ( null !== $is_dev ) {
		return $is_dev;
	}

	if ( defined( 'OHM_TOOLS_VITE_DEV' ) ) {
		$is_dev = OHM_TOOLS_VITE_DEV;
		return $is_dev;
	}

	// Inside DDEV/Docker, the host is host.docker.internal. On local machine, it's 127.0.0.1.
	$host = 'host.docker.internal';
	if ( ! gethostbyname( $host ) || gethostbyname( $host ) === $host ) {
		$host = '127.0.0.1';
	}

	$connection = @fsockopen( $host, 5174, $errno, $errstr, 0.05 );
	if ( $connection ) {
		fclose( $connection );
		$is_dev = true;
	} else {
		$is_dev = false;
	}

	return $is_dev;
}

/**
 * Register the admin menu page for Ohm Tools.
 */
add_action(
	'admin_menu',
	function () {
		add_menu_page(
			'Ohm Tools',             // Page title
			'Ohm Tools',             // Menu title
			'manage_options',        // Capability
			'ohm-tools',             // Menu slug
			'ohm_tools_render_admin_page', // Callback function
			'dashicons-admin-generic', // Icon
			80                       // Position
		);
	}
);

/**
 * Render the admin page container.
 */
function ohm_tools_render_admin_page() {
	?>
	<div class="wrap">
		<div id="ohm-tools-root"></div>
	</div>
	<?php
}

/**
 * Enqueue scripts and styles in the admin area.
 */
add_action(
	'admin_enqueue_scripts',
	function ( $hook ) {
		if ( 'toplevel_page_ohm-tools' !== $hook ) {
			return;
		}
		// Enqueue WP Media scripts for image selection modal.
		wp_enqueue_media();

		$plugin_url = plugin_dir_url( __FILE__ );
		$plugin_dir = plugin_dir_path( __FILE__ );

		if ( ohm_tools_is_vite_dev() ) {
			// Enqueue Vite client.
			wp_enqueue_script( 'ohm-tools-vite-client', 'http://localhost:5174/@vite/client', array(), null, false );

			// Enqueue the entry react application.
			wp_enqueue_script( 'ohm-tools', 'http://localhost:5174/wp-content/plugins/ohm-tools/src/admin/main.jsx', array( 'ohm-tools-vite-client' ), null, true );
		} else {
			// Production mode.
			$css_path = $plugin_dir . 'dist/ohm-tools.css';
			$js_path  = $plugin_dir . 'dist/ohm-tools.js';

			if ( file_exists( $css_path ) ) {
				wp_enqueue_style( 'ohm-tools', $plugin_url . 'dist/ohm-tools.css', array(), filemtime( $css_path ) );
			}

			if ( file_exists( $js_path ) ) {
				wp_enqueue_script( 'ohm-tools', $plugin_url . 'dist/ohm-tools.js', array(), filemtime( $js_path ), true );
			}
		}

		wp_localize_script(
			'ohm-tools',
			'ohmToolsData',
			array(
				'nonce'      => wp_create_nonce( 'wp_rest' ),
				'restUrl'    => esc_url_raw( rest_url( 'ohm/v1/' ) ),
				'adminEmail' => get_option( 'admin_email' ),
			)
		);
	}
);

/**
 * Add type="module" to script loader tags for Vite compatibility in the admin area.
 */
add_filter(
	'script_loader_tag',
	function ( $tag, $handle, $src ) {
		if ( in_array( $handle, array( 'ohm-tools', 'ohm-tools-vite-client' ), true ) ) {
			return '<script type="module" src="' . esc_url( $src ) . '" id="' . esc_attr( $handle ) . '-js"></script>';
		}
		return $tag;
	},
	10,
	3
);
