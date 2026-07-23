<?php
/**
 * Ohm Core Engineering theme bootstrap.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Check if the Vite dev server is running.
 */
function ohm_is_vite_dev() {
	static $is_dev = null;
	if ( null !== $is_dev ) {
		return $is_dev;
	}

	if ( defined( 'OHM_VITE_DEV' ) ) {
		$is_dev = OHM_VITE_DEV;
		return $is_dev;
	}

	// Inside DDEV/Docker, the host is host.docker.internal. On local machine, it's 127.0.0.1.
	$host = 'host.docker.internal';
	if ( ! gethostbyname( $host ) || gethostbyname( $host ) === $host ) {
		$host = '127.0.0.1';
	}

	$connection = @fsockopen( $host, 5173, $errno, $errstr, 0.05 );
	if ( $connection ) {
		fclose( $connection );
		$is_dev = true;
	} else {
		$is_dev = false;
	}

	return $is_dev;
}

/**
 * Enqueue scripts and styles.
 */
add_action(
	'wp_enqueue_scripts',
	function () {
		if ( ohm_is_vite_dev() ) {
			// Enqueue Vite client.
			wp_enqueue_script( 'ohm-vite-client', 'http://localhost:5173/@vite/client', array(), null, false );

			// Enqueue the entry react application.
			wp_enqueue_script( 'ohm-theme', 'http://localhost:5173/wp-content/themes/ohm/src/main.jsx', array( 'ohm-vite-client' ), null, true );
		} else {
			// Production mode.
			$css_path = get_stylesheet_directory() . '/dist/ohm.css';
			$js_path  = get_stylesheet_directory() . '/dist/ohm-theme.es.js';

			if ( file_exists( $css_path ) ) {
				wp_enqueue_style( 'ohm-theme', get_stylesheet_directory_uri() . '/dist/ohm.css', array(), filemtime( $css_path ) );
			}

			if ( file_exists( $js_path ) ) {
				wp_enqueue_script( 'ohm-theme', get_stylesheet_directory_uri() . '/dist/ohm-theme.es.js', array(), filemtime( $js_path ), true );
			}
		}
	}
);

/**
 * Add type="module" to script loader tags for Vite compatibility.
 */
add_filter(
	'script_loader_tag',
	function ( $tag, $handle, $src ) {
		if ( in_array( $handle, array( 'ohm-theme', 'ohm-vite-client' ), true ) ) {
			return '<script type="module" src="' . esc_url( $src ) . '" id="' . esc_attr( $handle ) . '-js"></script>';
		}
		return $tag;
	},
	10,
	3
);

/**
 * Register Navigation Menu Location.
 */
add_action(
	'after_setup_theme',
	function () {
		register_nav_menus(
			array(
				'main-menu' => __( 'Main Menu', 'ohm' ),
			)
		);
	}
);

/**
 * Get formatted menu items by theme location.
 */
function ohm_get_menu_items_by_location( $location ) {
	$locations = get_nav_menu_locations();
	$menu_id   = isset( $locations[ $location ] ) ? $locations[ $location ] : 0;

	// Fallback to "main_menu" slug if location is not assigned.
	if ( ! $menu_id ) {
		$menus = wp_get_nav_menus();
		if ( ! empty( $menus ) ) {
			foreach ( $menus as $m ) {
				if ( 'main_menu' === $m->slug ) {
					$menu_id = $m->term_id;
					break;
				}
			}
			if ( ! $menu_id ) {
				$menu_id = $menus[0]->term_id;
			}
		}
	}

	if ( ! $menu_id ) {
		return array();
	}

	$menu_items = wp_get_nav_menu_items( $menu_id );
	if ( ! $menu_items ) {
		return array();
	}

	$formatted = array();
	foreach ( $menu_items as $item ) {
		if ( 0 === (int) $item->menu_item_parent ) {
			$formatted[ $item->ID ] = array(
				'id'       => (int) $item->ID,
				'title'    => $item->title,
				'url'      => $item->url,
				'children' => array(),
			);
		}
	}

	foreach ( $menu_items as $item ) {
		if ( 0 !== (int) $item->menu_item_parent && isset( $formatted[ $item->menu_item_parent ] ) ) {
			$formatted[ $item->menu_item_parent ]['children'][] = array(
				'id'    => (int) $item->ID,
				'title' => $item->title,
				'url'   => $item->url,
			);
		}
	}

	return array_values( $formatted );
}

/**
 * Helper to retrieve attachment URL by slug.
 */
function ohm_get_attachment_url_by_slug( $slug, $extension = 'jpg' ) {
	$args = array(
		'post_type'      => 'attachment',
		'name'           => sanitize_title( $slug ),
		'posts_per_page' => 1,
		'post_status'    => 'inherit',
	);
	$attachments = get_posts( $args );
	if ( $attachments ) {
		return wp_get_attachment_url( $attachments[0]->ID );
	}
	$upload_dir = wp_upload_dir();
	return $upload_dir['baseurl'] . '/2026/07/' . $slug . '.' . $extension;
}

/**
 * Pass menu data and assets to the React app.
 */
add_action(
	'wp_enqueue_scripts',
	function () {
		wp_localize_script(
			'ohm-theme',
			'ohmThemeData',
			array(
				'menuItems'  => ohm_get_menu_items_by_location( 'main-menu' ),
				'currentUrl' => home_url( $_SERVER['REQUEST_URI'] ),
				'logoUrl'    => ohm_get_attachment_url_by_slug( 'ohm-core-engineering', 'webp' ),
				'slides'     => array(
					array(
						'image'   => ohm_get_attachment_url_by_slug( 'hero-build' ),
						'eyebrow' => 'DOLOR AMET SOCINIUS',
						'title'   => 'BUILD A BETTER TOMORROW',
					),
					array(
						'image'   => ohm_get_attachment_url_by_slug( 'hero-schedule' ),
						'eyebrow' => 'DOLOR AMET SOCINIUS',
						'title'   => 'STAYING AHEAD OF SCHEDULE',
					),
					array(
						'image'   => ohm_get_attachment_url_by_slug( 'hero-foundations' ),
						'eyebrow' => 'DOLOR AMET SOCINIUS',
						'title'   => 'ALWAYS STRONG FOUNDATIONS',
					),
				),
			)
		);
	},
	20
);

/**
 * Output dynamic favicon and theme setup script.
 */
add_action(
	'wp_head',
	function () {
		?>
		<script>
			(function() {
				const saved = localStorage.getItem('theme');
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				if (saved === 'dark' || (!saved && prefersDark)) {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
			})();
		</script>
		<?php
	}
);

/**
 * Global loader overlay injected at body open.
 */
add_action(
	'wp_body_open',
	function () {
		?>
		<div id="ohm-global-loader" style="position: fixed; inset: 0; background-color: #0F172A; z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: opacity 0.4s ease, visibility 0.4s ease; opacity: 1; visibility: visible;">
			<!-- Electric Pulse / Ohm Loading Animation -->
			<div style="position: relative; width: 80px; height: 40px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
				<div class="ohm-pulse-line"></div>
				<style>
					.ohm-pulse-line {
						width: 60px;
						height: 4px;
						background-color: #F97316;
						position: relative;
						animation: ohm-glow 1.5s infinite ease-in-out;
					}
					@keyframes ohm-glow {
						0%, 100% { box-shadow: 0 0 5px #F97316, 0 0 10px #F97316; opacity: 0.6; }
						50% { box-shadow: 0 0 15px #F97316, 0 0 25px #F97316; opacity: 1; }
					}
				</style>
			</div>
			<!-- Brand Label -->
			<div style="color: #ffffff; font-family: sans-serif; font-size: 11px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase;">
				Ohm Core Engineering
			</div>
		</div>
		<script>
			// Hide the loader once DOM content is fully loaded
			window.addEventListener('DOMContentLoaded', function() {
				const loader = document.getElementById('ohm-global-loader');
				if (loader) {
					setTimeout(function() {
						loader.style.opacity = '0';
						loader.style.visibility = 'hidden';
					}, 200);
				}
			});
		</script>
		<?php
	}
);

/**
 * Hardening: Hide specific login failure hints.
 */
add_filter(
	'login_errors',
	function () {
		return 'Invalid login credentials.';
	}
);
