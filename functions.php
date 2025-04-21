
<?php
/**
 * BacklinkBoost Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package BacklinkBoost
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Define Constants
 */
define('BACKLINKBOOST_THEME_VERSION', '1.0.0');
define('BACKLINKBOOST_THEME_DIR', trailingslashit(get_stylesheet_directory()));
define('BACKLINKBOOST_THEME_URI', trailingslashit(get_stylesheet_directory_uri()));

/**
 * Enqueue styles and scripts
 */
function backlinkboost_enqueue_styles() {
    // Enqueue parent theme style
    wp_enqueue_style('astra-theme-css', get_template_directory_uri() . '/style.css', array(), BACKLINKBOOST_THEME_VERSION);
    
    // Enqueue child theme style
    wp_enqueue_style('backlinkboost-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), BACKLINKBOOST_THEME_VERSION);
    
    // Enqueue Inter font from Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null);
    
    // Enqueue custom dashboard scripts (only on app pages)
    if (is_page('app') || is_page_template('page-templates/app-template.php') || strpos($_SERVER['REQUEST_URI'], '/app/') !== false) {
        wp_enqueue_style('backlinkboost-dashboard-css', get_stylesheet_directory_uri() . '/assets/css/dashboard.css', array(), BACKLINKBOOST_THEME_VERSION);
        wp_enqueue_script('backlinkboost-dashboard-js', get_stylesheet_directory_uri() . '/assets/js/dashboard.js', array('jquery'), BACKLINKBOOST_THEME_VERSION, true);
    }
}
add_action('wp_enqueue_scripts', 'backlinkboost_enqueue_styles');

/**
 * Register custom page templates
 */
function backlinkboost_add_page_templates($templates) {
    $templates[BACKLINKBOOST_THEME_DIR . 'page-templates/app-template.php'] = 'App Dashboard';
    $templates[BACKLINKBOOST_THEME_DIR . 'page-templates/login-template.php'] = 'Login Page';
    $templates[BACKLINKBOOST_THEME_DIR . 'page-templates/my-account-template.php'] = 'My Account';
    return $templates;
}
add_filter('theme_page_templates', 'backlinkboost_add_page_templates');

/**
 * Add custom classes to the body tag
 */
function backlinkboost_body_classes($classes) {
    // Add a class for the app pages
    if (is_page('app') || is_page_template('page-templates/app-template.php') || strpos($_SERVER['REQUEST_URI'], '/app/') !== false) {
        $classes[] = 'app-page';
    }
    
    // Add a class for the checkout page
    if (is_page('checkout') || is_checkout()) {
        $classes[] = 'checkout-page';
    }
    
    // Add a class for the login page
    if (is_page_template('page-templates/login-template.php')) {
        $classes[] = 'login-page';
    }
    
    return $classes;
}
add_filter('body_class', 'backlinkboost_body_classes');

// Disable these problematic functions temporarily until we fix the issues
// add_action('wp_enqueue_scripts', 'backlinkboost_font_awesome');
// add_action('after_setup_theme', 'backlinkboost_disable_admin_bar');
// add_action('admin_init', 'backlinkboost_redirect_non_admin_users');
// add_filter('login_redirect', 'backlinkboost_login_redirect', 10, 3);
// add_filter('login_url', 'backlinkboost_login_url');
// add_filter('lostpassword_url', 'backlinkboost_lostpassword_url');
// add_filter('register_url', 'backlinkboost_register_url');

/**
 * Include additional theme files if they exist
 */
$template_functions = BACKLINKBOOST_THEME_DIR . 'inc/template-functions.php';
if (file_exists($template_functions)) {
    require_once $template_functions;
}

$customizer = BACKLINKBOOST_THEME_DIR . 'inc/customizer.php';
if (file_exists($customizer)) {
    require_once $customizer;
}

$walker = BACKLINKBOOST_THEME_DIR . 'inc/class-backlinkboost-walker-nav-menu.php';
if (file_exists($walker)) {
    require_once $walker;
}

// If WooCommerce is active, include WooCommerce customizations
if (class_exists('WooCommerce')) {
    $woocommerce_file = BACKLINKBOOST_THEME_DIR . 'inc/woocommerce.php';
    if (file_exists($woocommerce_file)) {
        require_once $woocommerce_file;
    }
}
