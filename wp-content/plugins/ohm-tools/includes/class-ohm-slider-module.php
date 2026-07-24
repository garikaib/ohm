<?php
/**
 * REST API Endpoint & storage handler for Ohm Home Slider Config Tool.
 * Supports agnostic dynamic list of slide items with media selector integration.
 *
 * @package Ohm_Tools
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Ohm_Slider_Module' ) ) {

	class Ohm_Slider_Module {

		const OPTION_KEY = 'ohm_slider_settings';

		public static function init() {
			add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
			add_filter( 'wp_localize_script', array( __CLASS__, 'inject_frontend_slides' ), 10, 3 );
		}

		public static function get_default_slides() {
			return array(
				array(
					'id'      => 's1',
					'image'   => ohm_get_attachment_url_by_slug( 'hero-build' ),
					'eyebrow' => 'INTEGRATED ENGINEERING SERVICES',
					'title'   => 'ENGINEERING BETTER TOMORROWS',
					'body'    => 'Multidisciplinary engineering solutions designed for safe, efficient, and dependable project delivery.',
				),
				array(
					'id'      => 's2',
					'image'   => ohm_get_attachment_url_by_slug( 'hero-schedule' ),
					'eyebrow' => 'FROM CONCEPT TO HANDOVER',
					'title'   => 'BUILT FOR PERFORMANCE',
					'body'    => 'We bring mechanical, electrical, civil, structural, BIM, and project-management expertise together under one team.',
				),
				array(
					'id'      => 's3',
					'image'   => ohm_get_attachment_url_by_slug( 'hero-foundations' ),
					'eyebrow' => 'SAFE. EFFICIENT. COMPLIANT.',
					'title'   => 'DESIGNING DREAMS',
					'body'    => 'Energy-efficient, code-compliant designs that keep projects on schedule and within budget.',
				),
			);
		}

		public static function get_slides() {
			$saved = get_option( self::OPTION_KEY, null );
			if ( empty( $saved ) || ! is_array( $saved ) ) {
				return self::get_default_slides();
			}
			return $saved;
		}

		public static function register_rest_routes() {
			register_rest_route(
				'ohm/v1',
				'/slides',
				array(
					array(
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => array( __CLASS__, 'get_slides_api' ),
						'permission_callback' => '__return_true',
					),
					array(
						'methods'             => WP_REST_Server::EDITABLE,
						'callback'            => array( __CLASS__, 'update_slides_api' ),
						'permission_callback' => function () {
							return current_user_can( 'manage_options' );
						},
					),
				)
			);
		}

		public static function get_slides_api() {
			return rest_ensure_response( self::get_slides() );
		}

		public static function update_slides_api( WP_REST_Request $request ) {
			$params = $request->get_json_params();
			if ( ! is_array( $params ) ) {
				return new WP_Error( 'invalid_data', 'Invalid payload.', array( 'status' => 400 ) );
			}

			$clean_slides = array();
			foreach ( $params as $index => $item ) {
				if ( is_array( $item ) ) {
					$clean_slides[] = array(
						'id'      => ! empty( $item['id'] ) ? sanitize_key( $item['id'] ) : 'slide_' . $index . '_' . time(),
						'image'   => ! empty( $item['image'] ) ? esc_url_raw( $item['image'] ) : '',
						'eyebrow' => isset( $item['eyebrow'] ) ? sanitize_text_field( $item['eyebrow'] ) : '',
						'title'   => isset( $item['title'] ) ? sanitize_text_field( $item['title'] ) : '',
						'body'    => isset( $item['body'] ) ? sanitize_textarea_field( $item['body'] ) : '',
					);
				}
			}

			update_option( self::OPTION_KEY, $clean_slides );

			return rest_ensure_response(
				array(
					'success' => true,
					'message' => 'Home slider items saved successfully.',
					'data'    => $clean_slides,
				)
			);
		}

		public static function inject_frontend_slides( $data, $handle, $object_name ) {
			if ( 'ohmThemeData' === $object_name ) {
				$data['slides'] = self::get_slides();
			}
			return $data;
		}
	}
}

Ohm_Slider_Module::init();
