<?php
/**
 * Dynamic Agnostic Clean REST API & Storage for Ohm Contacts Management.
 * Storage is plain string arrays for phones and emails without labels.
 *
 * @package Ohm_Tools
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Ohm_Contacts_Module' ) ) {

	class Ohm_Contacts_Module {

		const OPTION_KEY = 'ohm_contact_settings_v3';

		/**
		 * Default dynamic contact lists (plain arrays of strings).
		 */
		private static $default_contacts = array(
			'phones' => array(
				'+263 78 301 7009',
				'+263 71 569 6201',
			),
			'emails' => array(
				'sales@ohmcore.co.zw',
				'engineering@ohmcore.co.zw',
			),
			'office_address'  => '8 Favershame Road, Malbereign, Harare, Zimbabwe',
			'short_address'   => '8 Favershame Rd, Malbereign, Harare',
			'operating_hours' => 'Mon - Fri: 8:00 - 17:00',
		);

		public static function init() {
			add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
			add_filter( 'wp_localize_script', array( __CLASS__, 'inject_frontend_contacts' ), 10, 3 );
		}

		public static function get_contacts() {
			$saved = get_option( self::OPTION_KEY, null );
			if ( null === $saved ) {
				// Try legacy v2 option
				$v2 = get_option( 'ohm_contact_settings_v2', null );
				if ( is_array( $v2 ) ) {
					$phones = array();
					if ( ! empty( $v2['phones'] ) && is_array( $v2['phones'] ) ) {
						foreach ( $v2['phones'] as $p ) {
							$val = is_array( $p ) ? ( isset( $p['value'] ) ? $p['value'] : '' ) : $p;
							if ( ! empty( $val ) ) {
								$phones[] = $val;
							}
						}
					}
					$emails = array();
					if ( ! empty( $v2['emails'] ) && is_array( $v2['emails'] ) ) {
						foreach ( $v2['emails'] as $e ) {
							$val = is_array( $e ) ? ( isset( $e['value'] ) ? $e['value'] : '' ) : $e;
							if ( ! empty( $val ) ) {
								$emails[] = $val;
							}
						}
					}
					$saved = array(
						'phones'          => ! empty( $phones ) ? $phones : self::$default_contacts['phones'],
						'emails'          => ! empty( $emails ) ? $emails : self::$default_contacts['emails'],
						'office_address'  => isset( $v2['office_address'] ) ? $v2['office_address'] : self::$default_contacts['office_address'],
						'short_address'   => isset( $v2['short_address'] ) ? $v2['short_address'] : self::$default_contacts['short_address'],
						'operating_hours' => isset( $v2['operating_hours'] ) ? $v2['operating_hours'] : self::$default_contacts['operating_hours'],
					);
				} else {
					$saved = self::$default_contacts;
				}
			}
			return wp_parse_args( (array) $saved, self::$default_contacts );
		}

		public static function register_rest_routes() {
			register_rest_route(
				'ohm/v1',
				'/contacts',
				array(
					array(
						'methods'             => WP_REST_Server::READABLE,
						'callback'            => array( __CLASS__, 'get_contacts_api' ),
						'permission_callback' => '__return_true',
					),
					array(
						'methods'             => WP_REST_Server::EDITABLE,
						'callback'            => array( __CLASS__, 'update_contacts_api' ),
						'permission_callback' => function () {
							return current_user_can( 'manage_options' );
						},
					),
				)
			);
		}

		public static function get_contacts_api() {
			return rest_ensure_response( self::get_contacts() );
		}

		public static function update_contacts_api( WP_REST_Request $request ) {
			$params = $request->get_json_params();
			if ( ! is_array( $params ) ) {
				return new WP_Error( 'invalid_data', 'Invalid payload.', array( 'status' => 400 ) );
			}

			$clean_phones = array();
			if ( isset( $params['phones'] ) && is_array( $params['phones'] ) ) {
				foreach ( $params['phones'] as $item ) {
					$val = is_array( $item ) ? ( isset( $item['value'] ) ? $item['value'] : '' ) : $item;
					$val = sanitize_text_field( trim( $val ) );
					if ( ! empty( $val ) ) {
						$clean_phones[] = $val;
					}
				}
			}

			$clean_emails = array();
			if ( isset( $params['emails'] ) && is_array( $params['emails'] ) ) {
				foreach ( $params['emails'] as $item ) {
					$val = is_array( $item ) ? ( isset( $item['value'] ) ? $item['value'] : '' ) : $item;
					$val = sanitize_email( trim( $val ) );
					if ( ! empty( $val ) ) {
						$clean_emails[] = $val;
					}
				}
			}

			$updated = array(
				'phones'          => $clean_phones,
				'emails'          => $clean_emails,
				'office_address'  => isset( $params['office_address'] ) ? sanitize_textarea_field( $params['office_address'] ) : '',
				'short_address'   => isset( $params['short_address'] ) ? sanitize_text_field( $params['short_address'] ) : '',
				'operating_hours' => isset( $params['operating_hours'] ) ? sanitize_text_field( $params['operating_hours'] ) : '',
			);

			update_option( self::OPTION_KEY, $updated );

			return rest_ensure_response(
				array(
					'success' => true,
					'message' => 'Contact arrays saved successfully.',
					'data'    => $updated,
				)
			);
		}

		public static function inject_frontend_contacts( $data, $handle, $object_name ) {
			if ( 'ohmThemeData' === $object_name ) {
				$data['contacts'] = self::get_contacts();
			}
			return $data;
		}
	}
}

Ohm_Contacts_Module::init();
