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
	return false;
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
 * Helper to retrieve attachment URL by slug with transient caching.
 */
function ohm_get_attachment_url_by_slug( $slug, $extension = 'jpg' ) {
	$cache_key   = 'ohm_attachment_url_' . sanitize_key( $slug );
	$cached_url  = get_transient( $cache_key );
	if ( false !== $cached_url ) {
		return $cached_url;
	}

	$args = array(
		'post_type'      => 'attachment',
		'name'           => sanitize_title( $slug ),
		'posts_per_page' => 1,
		'post_status'    => 'inherit',
	);
	$attachments = get_posts( $args );
	if ( $attachments ) {
		$url = wp_get_attachment_url( $attachments[0]->ID );
		set_transient( $cache_key, $url, DAY_IN_SECONDS );
		return $url;
	}
	$upload_dir = wp_upload_dir();
	return $upload_dir['url'] . '/' . $slug . '.' . $extension;
}

// Clear attachment cache when attachments are saved/deleted
add_action( 'save_post_attachment', 'ohm_clear_attachment_transients' );
add_action( 'delete_post', 'ohm_clear_attachment_transients' );
function ohm_clear_attachment_transients( $post_id ) {
	$post = get_post( $post_id );
	if ( $post && 'attachment' === $post->post_type ) {
		delete_transient( 'ohm_attachment_url_' . sanitize_key( $post->post_name ) );
	}
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
				'pageSlug'     => is_singular() ? get_post_field( 'post_name', get_queried_object_id() ) : ( is_home() ? 'blog' : '' ),
				'isSinglePost' => is_single() && 'post' === get_post_type(),
                'detailImages' => array(
                    'mechanical-engineering' => ohm_get_attachment_url_by_slug( 'ohm-service-header-mechanical' ),
                    'electrical-engineering' => ohm_get_attachment_url_by_slug( 'ohm-service-header-electrical' ),
                    'civil-engineering' => ohm_get_attachment_url_by_slug( 'ohm-service-header-civil' ),
                    'structural-engineering' => ohm_get_attachment_url_by_slug( 'ohm-service-header-structural' ),
                    'project-management' => ohm_get_attachment_url_by_slug( 'ohm-service-header-project-management' ),
                    'bim-technology' => ohm_get_attachment_url_by_slug( 'ohm-service-header-bim-technology' ),
                ),
                'serviceImages' => array(
                    'cover' => ohm_get_attachment_url_by_slug( 'ohm-services-cover' ),
                    'mechanical-engineering' => ohm_get_attachment_url_by_slug( 'ohm-mechanical-engineering', 'png' ),
                    'electrical-engineering' => ohm_get_attachment_url_by_slug( 'ohm-electrical-engineering', 'png' ),
                    'civil-engineering' => ohm_get_attachment_url_by_slug( 'ohm-civil-engineering', 'png' ),
                    'structural-engineering' => ohm_get_attachment_url_by_slug( 'ohm-structural-engineering', 'png' ),
                    'project-management' => ohm_get_attachment_url_by_slug( 'ohm-project-management', 'png' ),
                ),
                'companyImages' => array(
                    'about' => ohm_get_attachment_url_by_slug( 'ohm-about' ),
                    'contact' => ohm_get_attachment_url_by_slug( 'ohm-contact' ),
                    'team' => ohm_get_attachment_url_by_slug( 'ohm-team' ),
                ),
				'currentHeaderImage' => is_singular() ? get_post_meta( get_queried_object_id(), '_ohm_header_image', true ) : '',
				'pageHeaderImages'   => class_exists( 'Ohm_Page_Headers_Module' ) ? Ohm_Page_Headers_Module::get_global_headers() : array(),
				'socials'            => class_exists( 'Ohm_Socials_Module' ) ? Ohm_Socials_Module::get_socials() : array(),
				'contacts'           => class_exists( 'Ohm_Contacts_Module' ) ? Ohm_Contacts_Module::get_contacts() : array(),
				'logoUrl'            => ohm_get_attachment_url_by_slug( 'ohm-core-engineering', 'webp' ),
				'slides'     => class_exists( 'Ohm_Slider_Module' ) ? Ohm_Slider_Module::get_slides() : array(
					array(
						'image'   => ohm_get_attachment_url_by_slug( 'hero-build' ),
						'overlay' => ohm_get_attachment_url_by_slug( 'hero-outline-build', 'png' ),
						'eyebrow' => 'INTEGRATED ENGINEERING SERVICES',
						'title'   => 'ENGINEERING BETTER TOMORROWS',
						'body'    => 'Integrated mechanical, electrical, civil, structural, BIM, and project-management expertise for safe, efficient delivery.',
					),
					array(
						'image'   => ohm_get_attachment_url_by_slug( 'hero-schedule' ),
						'overlay' => ohm_get_attachment_url_by_slug( 'hero-outline-schedule', 'png' ),
						'eyebrow' => 'FROM CONCEPT TO HANDOVER',
						'title'   => 'BUILT FOR PERFORMANCE',
						'body'    => 'One coordinated team connects building systems, infrastructure, and project controls from inception through final handover.',
					),
					array(
						'image'   => ohm_get_attachment_url_by_slug( 'hero-foundations' ),
						'overlay' => ohm_get_attachment_url_by_slug( 'hero-outline-foundations', 'png' ),
						'eyebrow' => 'SAFE. EFFICIENT. COMPLIANT.',
						'title'   => 'DESIGNING DREAMS',
						'body'    => 'Safe, energy-efficient, code-compliant engineering that keeps projects aligned with quality, time, cost, and safety goals.',
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
		<?php $ohm_favicon_light = wp_get_attachment_url( 37 ); $ohm_favicon_dark = wp_get_attachment_url( 37 ); $ohm_apple_light = wp_get_attachment_url( 38 ); $ohm_apple_dark = wp_get_attachment_url( 38 ); ?>
		<link rel="icon" type="image/png" sizes="32x32" href="<?php echo esc_url( $ohm_favicon_light ); ?>" data-ohm-favicon-light>
		<link rel="icon" type="image/png" sizes="32x32" href="<?php echo esc_url( $ohm_favicon_dark ); ?>" data-ohm-favicon-dark disabled>
		<link rel="apple-touch-icon" href="<?php echo esc_url( $ohm_apple_light ); ?>" data-ohm-apple-light>
		<link rel="apple-touch-icon" href="<?php echo esc_url( $ohm_apple_dark ); ?>" data-ohm-apple-dark disabled>
		<script>
			(function() {
				const saved = localStorage.getItem('theme');
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				const isDark = saved === 'dark' || (!saved && prefersDark);
				if (isDark) document.documentElement.classList.add('dark');
				else document.documentElement.classList.remove('dark');
				document.querySelector('[data-ohm-favicon-light]').disabled = isDark;
				document.querySelector('[data-ohm-favicon-dark]').disabled = !isDark;
				document.querySelector('[data-ohm-apple-light]').disabled = isDark;
				document.querySelector('[data-ohm-apple-dark]').disabled = !isDark;
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


