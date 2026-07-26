<?php
/**
 * #ddev-generated: Automatically generated WordPress settings file.
 * ddev manages this file and may delete or overwrite the file unless this comment is removed.
 * It is recommended that you leave this file alone.
 *
 * @package ddevapp
 */

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', getenv( 'DB_CHARSET' ) ?: 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', getenv( 'DB_COLLATE' ) ?: '' );

/** Authentication Unique Keys and Salts. */
define( 'AUTH_KEY', 'gYvkWUgsLjwTKbuFmpEsSglIaqnBhnrTnvPLcJRfnlASmUytryqqoRqgTYdOBNDK' );
define( 'SECURE_AUTH_KEY', 'bjQHvamgohQIzmWTlLMpxYRgumXrSJaOWnTyMMVmcwkNWZRKNEGyvsfubXagcZQQ' );
define( 'LOGGED_IN_KEY', 'TseUsQqXrLtlDRMdzYxKLtLJFPijqMIctLdzKfRHWDCpCPwqEGTFzHpzTpbVkHbr' );
define( 'NONCE_KEY', 'ZblVvyItRcvFlbLrcvAsWKanCXQXdrOKVWNwxJhdXhEeQgMOYhENoULlUgIVwZNt' );
define( 'AUTH_SALT', 'IBponmbsXPPmGjestVTOJwffAYacMTpxXFTBLWcMLdwCUWBFZgIbDIHVwpWtUbvU' );
define( 'SECURE_AUTH_SALT', 'yvWpRAHTAlhyqBJSPWBvZjrKWbaUjHJWmcTfZUcSegyVSbZmkFVZgsrVXgzXnovS' );
define( 'LOGGED_IN_SALT', 'zMmpGXjDlVVGkDpwpaxjFiJKvMOtQMRvUTOHCaZVjUmMhFLzOmHpGuuzBYJuWJre' );
define( 'NONCE_SALT', 'SOTfRqdpAIgaXUSfKrhBEHMeXtLjuZQsZffFytdEPFQEPtWSuCpMHHhKdKdIUstO' );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
defined( 'ABSPATH' ) || define( 'ABSPATH', __DIR__ . '/' );

// Include for settings managed by ddev.
$ddev_settings = __DIR__ . '/wp-config-ddev.php';
if ( ! defined( 'DB_USER' ) && getenv( 'IS_DDEV_PROJECT' ) === 'true' && is_readable( $ddev_settings ) ) {
	require_once( $ddev_settings );
}

/** Include wp-settings.php */
if ( file_exists( ABSPATH . '/wp-settings.php' ) ) {
	require_once ABSPATH . '/wp-settings.php';
}
