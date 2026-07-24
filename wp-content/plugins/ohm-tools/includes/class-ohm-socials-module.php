<?php
/**
 * REST API Endpoint & storage handler for Ohm Social Media Links Management.
 * Agnostic dynamic array of social platform links seeded with '#'.
 *
 * @package Ohm_Tools
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Ohm_Socials_Module' ) ) {

	class Ohm_Socials_Module {

		const OPTION_KEY = 'ohm_social_links';

		/**
		 * Default social links (agnostic dynamic list, seeded with '#').
		 */
		public static function get_default_socials() {
			return array(
				array(
					'id'       => 'soc_1',
					'platform' => 'Facebook',
					'url'      => '#',
					'icon'     => 'Facebook',
				),
				array(
					'id'       => 'soc_2',
					'platform' => 'LinkedIn',
					'url'      => '#',
					'icon'     => 'Linkedin',
				),
				array(
					'id'       => 'soc_3',
					'platform' => 'WhatsApp',
					'url'      => '#',
					'icon'     => 'MessageCircle',
				),
				array(
					'id'       => 'soc_4',
					'platform' => 'X / Twitter',
					'url'      => '#',
					'icon'     => 'Twitter',
				),
			);
		}

		public static function init() {
			add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
			add_filter( 'wp_localize_script', array( __CLASS__, 'inject_frontend_socials' ), 10, 3 );
		}

		public static function get_socials() {
			$saved = get_option( self::OPTION_KEY, null );
			if ( empty( $saved ) || ! is_array( $saved ) ) {
				return self::get_default_socials();
			}
			return $saved;
		}

		public static function register_rest_routes() {
			register_rest_route(
				'ohm/v1',
				'/socials',
				array(
					array(
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => array( __CLASS__, 'get_socials_api' ),
						'permission_callback' => '__return_true',
					),
					array(
						'methods'             => WP_REST_Server::EDITABLE,
						'callback'            => array( __CLASS__, 'update_socials_api' ),
						'permission_callback' => function () {
							return current_user_can( 'manage_options' );
						},
					),
				)
			);
		}

		public static function get_socials_api() {
			return rest_ensure_response( self::get_socials() );
		}

		public static function update_socials_api( WP_REST_Request $request ) {
			$params = $request->get_json_params();
			if ( ! is_array( $params ) ) {
				return new WP_Error( 'invalid_data', 'Invalid payload.', array( 'status' => 400 ) );
			}

			$clean = array();
			foreach ( $params as $index => $item ) {
				if ( is_array( $item ) ) {
					$url_val = ! empty( $item['url'] ) ? trim( $item['url'] ) : '#';
					$clean[] = array(
						'id'       => ! empty( $item['id'] ) ? sanitize_key( $item['id'] ) : 'soc_' . $index . '_' . time(),
						'platform' => ! empty( $item['platform'] ) ? sanitize_text_field( $item['platform'] ) : 'Social Platform',
						'url'      => '#' === $url_val ? '#' : esc_url_raw( $url_val ),
						'icon'     => ! empty( $item['icon'] ) ? sanitize_text_field( $item['icon'] ) : 'Share2',
					);
				}
			}

			update_option( self::OPTION_KEY, $clean );

			return rest_ensure_response(
				array(
					'success' => true,
					'message' => 'Social media links saved successfully.',
					'data'    => $clean,
				)
			);
		}

		public static function inject_frontend_socials( $data, $handle, $object_name ) {
			if ( 'ohmThemeData' === $object_name ) {
				$data['socials'] = self::get_socials();
			}
			return $data;
		}
	}
}

Ohm_Socials_Module::init();
