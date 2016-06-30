<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

ini_set('display_errors', 0);
error_reporting(E_ALL | E_STRICT);

$config = file_get_contents(__DIR__ . '/../config.json');
$config = json_decode($config);

switch ($config->env) {
    case 'staging':
        define('DB_NAME', $config->mysql->staging->database);
        define('DB_USER', $config->mysql->staging->username);
        define('DB_PASSWORD', $config->mysql->staging->password);
        define('DB_HOST', $config->mysql->staging->host);
        break;
    case 'local':
        define('DB_NAME', $config->mysql->local->database);
        define('DB_USER', $config->mysql->local->username);
        define('DB_PASSWORD', $config->mysql->local->password);
        define('DB_HOST', $config->mysql->local->host);
        break;
    case 'live':
        define('DB_NAME', $config->mysql->live->database);
        define('DB_USER', $config->mysql->live->username);
        define('DB_PASSWORD', $config->mysql->live->password);
        define('DB_HOST', $config->mysql->live->host);
        break;
    default:
        echo 'Error: Invalid env set in config.json';
        exit;
}

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         $config->unique->auth->key);
define('SECURE_AUTH_KEY',  $config->unique->secureAuth->key);
define('LOGGED_IN_KEY',    $config->unique->loggedIn->key);
define('NONCE_KEY',        $config->unique->nonce->key);
define('AUTH_SALT',        $config->unique->auth->salt);
define('SECURE_AUTH_SALT', $config->unique->secureAuth->salt);
define('LOGGED_IN_SALT',   $config->unique->loggedIn->salt);
define('NONCE_SALT',       $config->unique->nonce->salt);

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
if ($config->dev) {
    define('WP_DEBUG', true);
} else {
    define('WP_DEBUG', false);
}

if (defined('WP_INSTALLING') && WP_INSTALLING) {
    function wp_install_defaults($user_id) {
        global $wpdb, $wp_rewrite, $current_site, $table_prefix, $config;
        
        update_option('current_theme', $config->activeTheme);
        update_option('template', $config->activeTheme);
        update_option('stylesheet', $config->activeTheme);
        activate_plugin('WP-API/plugin.php');
        // activate_plugin('OAuth1/oauth-server.php');
    }
}

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
