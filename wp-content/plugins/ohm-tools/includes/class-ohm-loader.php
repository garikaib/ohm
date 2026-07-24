<?php
/**
 * Main Loader class for Ohm Tools.
 *
 * @package Ohm_Tools
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Ohm_Loader' ) ) {
	/**
	 * Class Ohm_Loader
	 */
	class Ohm_Loader {

		/**
		 * Loader instance.
		 *
		 * @var Ohm_Loader
		 */
		private static $instance = null;

		/**
		 * Retrieve singleton instance.
		 *
		 * @return Ohm_Loader
		 */
		public static function get_instance() {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor.
		 */
		private function __construct() {
			$this->load_dependencies();
			$this->init_modules();
		}

		/**
		 * Load core utilities.
		 */
		private function load_dependencies() {
			require_once plugin_dir_path( __FILE__ ) . 'class-ohm-contacts-module.php';
			require_once plugin_dir_path( __FILE__ ) . 'class-ohm-slider-module.php';
			require_once plugin_dir_path( __FILE__ ) . 'class-ohm-page-headers-module.php';
			require_once plugin_dir_path( __FILE__ ) . 'class-ohm-socials-module.php';
		}

		/**
		 * Load and initialize modules.
		 */
		private function init_modules() {
			// Placeholders for modular features.
		}
	}
}
