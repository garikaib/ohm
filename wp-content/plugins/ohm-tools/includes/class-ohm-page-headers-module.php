<?php
/**
 * REST API Endpoint, Meta Box & storage handler for Page Header Background Images.
 *
 * @package Ohm_Tools
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Ohm_Page_Headers_Module' ) ) {

	class Ohm_Page_Headers_Module {

		const OPTION_KEY = 'ohm_page_header_images';
		const META_KEY   = '_ohm_header_image';

		/**
		 * Default mapping of page slugs to default header images.
		 */
		public static function get_default_page_headers() {
			return array(
				'about'                  => ohm_get_attachment_url_by_slug( 'ohm-about' ),
				'team'                   => ohm_get_attachment_url_by_slug( 'ohm-team' ),
				'contact'                => ohm_get_attachment_url_by_slug( 'ohm-contact' ),
				'services'               => ohm_get_attachment_url_by_slug( 'ohm-services-cover' ),
				'mechanical-engineering' => ohm_get_attachment_url_by_slug( 'ohm-service-header-mechanical' ),
				'electrical-engineering' => ohm_get_attachment_url_by_slug( 'ohm-service-header-electrical' ),
				'civil-engineering'      => ohm_get_attachment_url_by_slug( 'ohm-service-header-civil' ),
				'structural-engineering' => ohm_get_attachment_url_by_slug( 'ohm-service-header-structural' ),
				'project-management'     => ohm_get_attachment_url_by_slug( 'ohm-service-header-project-management' ),
				'bim-technology'         => ohm_get_attachment_url_by_slug( 'ohm-service-header-bim-technology' ),
				'blog'                   => ohm_get_attachment_url_by_slug( 'hero-build' ),
			);
		}

		public static function init() {
			add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
			add_action( 'add_meta_boxes', array( __CLASS__, 'register_page_header_meta_box' ) );
			add_action( 'save_post', array( __CLASS__, 'save_page_header_meta_box' ) );
			add_filter( 'wp_localize_script', array( __CLASS__, 'inject_page_headers' ), 10, 3 );
		}

		/**
		 * Register per-page Metabox in WordPress Page Editor backend.
		 */
		public static function register_page_header_meta_box() {
			$post_types = array( 'page', 'post' );
			foreach ( $post_types as $post_type ) {
				add_meta_box(
					'ohm_page_header_image_box',
					__( 'Ohm Page Header Background Image', 'ohm' ),
					array( __CLASS__, 'render_page_header_meta_box' ),
					$post_type,
					'side',
					'high'
				);
			}
		}

		/**
		 * Render metabox HTML for choosing custom header image in WP Page Admin.
		 */
		public static function render_page_header_meta_box( $post ) {
			wp_nonce_field( 'ohm_save_header_image_meta', 'ohm_header_image_nonce' );
			$image_url = get_post_meta( $post->ID, self::META_KEY, true );
			?>
			<div class="ohm-header-meta-container" style="text-align: center;">
				<div id="ohm-header-image-preview" style="margin-bottom: 10px; background: #f1f5f9; border: 1px border-dashed #cbd5e1; border-radius: 8px; overflow: hidden; min-height: 90px; display: flex; align-items: center; justify-content: center;">
					<?php if ( $image_url ) : ?>
						<img src="<?php echo esc_url( $image_url ); ?>" style="width: 100%; height: auto; display: block;" />
					<?php else : ?>
						<span style="color: #64748b; font-size: 12px; padding: 15px;">No custom image selected (Using global plugin default).</span>
					<?php endif; ?>
				</div>
				<input type="hidden" name="ohm_header_image" id="ohm_header_image_input" value="<?php echo esc_attr( $image_url ); ?>" />
				<button type="button" class="button button-primary" id="ohm_select_header_image_btn" style="width: 100%; margin-bottom: 6px;">
					<?php echo $image_url ? 'Change Header Image' : 'Select Header Image'; ?>
				</button>
				<?php if ( $image_url ) : ?>
					<button type="button" class="button button-link-delete" id="ohm_remove_header_image_btn" style="color: #b91c1c; font-size: 12px;">Remove Header Image</button>
				<?php endif; ?>
			</div>
			<script>
				jQuery(document).ready(function($) {
					$('#ohm_select_header_image_btn').on('click', function(e) {
						e.preventDefault();
						var frame = wp.media({
							title: 'Select Page Header Background Image',
							button: { text: 'Use As Header Image' },
							multiple: false
						});
						frame.on('select', function() {
							var attachment = frame.state().get('selection').first().toJSON();
							$('#ohm_header_image_input').val(attachment.url);
							$('#ohm-header-image-preview').html('<img src="' + attachment.url + '" style="width: 100%; height: auto; display: block;" />');
						});
						frame.open();
					});
					$('#ohm_remove_header_image_btn').on('click', function(e) {
						e.preventDefault();
						$('#ohm_header_image_input').val('');
						$('#ohm-header-image-preview').html('<span style="color: #64748b; font-size: 12px; padding: 15px;">No custom image selected.</span>');
					});
				});
			</script>
			<?php
		}

		/**
		 * Save per-page metabox data.
		 */
		public static function save_page_header_meta_box( $post_id ) {
			if ( ! isset( $_POST['ohm_header_image_nonce'] ) || ! wp_verify_nonce( $_POST['ohm_header_image_nonce'], 'ohm_save_header_image_meta' ) ) {
				return;
			}
			if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
				return;
			}
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return;
			}

			if ( isset( $_POST['ohm_header_image'] ) ) {
				$val = esc_url_raw( trim( $_POST['ohm_header_image'] ) );
				if ( ! empty( $val ) ) {
					update_post_meta( $post_id, self::META_KEY, $val );
				} else {
					delete_post_meta( $post_id, self::META_KEY );
				}
			}
		}

		/**
		 * Get global plugin options merged with defaults.
		 */
		public static function get_global_headers() {
			$saved = get_option( self::OPTION_KEY, null );
			if ( empty( $saved ) || ! is_array( $saved ) ) {
				return self::get_default_page_headers();
			}
			return wp_parse_args( $saved, self::get_default_page_headers() );
		}

		public static function register_rest_routes() {
			register_rest_route(
				'ohm/v1',
				'/page-headers',
				array(
					array(
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => array( __CLASS__, 'get_page_headers_api' ),
						'permission_callback' => '__return_true',
					),
					array(
						'methods'             => WP_REST_Server::EDITABLE,
						'callback'            => array( __CLASS__, 'update_page_headers_api' ),
						'permission_callback' => function () {
							return current_user_can( 'manage_options' );
						},
					),
				)
			);
		}

		public static function get_page_headers_api() {
			return rest_ensure_response( self::get_global_headers() );
		}

		public static function update_page_headers_api( WP_REST_Request $request ) {
			$params = $request->get_json_params();
			if ( ! is_array( $params ) ) {
				return new WP_Error( 'invalid_data', 'Invalid payload.', array( 'status' => 400 ) );
			}

			$clean = array();
			foreach ( $params as $slug => $url ) {
				$clean[ sanitize_key( $slug ) ] = esc_url_raw( $url );
			}

			update_option( self::OPTION_KEY, $clean );

			return rest_ensure_response(
				array(
					'success' => true,
					'message' => 'Page header images updated successfully.',
					'data'    => self::get_global_headers(),
				)
			);
		}

		/**
		 * Inject dynamic header images into theme script payload.
		 * Checks per-page post meta first, falling back to global options.
		 */
		public static function inject_page_headers( $data, $handle, $object_name ) {
			if ( 'ohmThemeData' === $object_name ) {
				$headers = self::get_global_headers();

				// If singular page/post, check for per-page meta override
				if ( is_singular() ) {
					$post_id  = get_queried_object_id();
					$meta_img = get_post_meta( $post_id, self::META_KEY, true );
					if ( ! empty( $meta_img ) ) {
						$slug             = get_post_field( 'post_name', $post_id );
						$headers[ $slug ] = $meta_img;
						$data['currentHeaderImage'] = $meta_img;
					}
				}

				$data['pageHeaderImages'] = $headers;
			}
			return $data;
		}
	}
}

Ohm_Page_Headers_Module::init();
