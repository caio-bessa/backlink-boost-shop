
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
        
        // Add localized script for AJAX and REST API
        wp_localize_script('backlinkboost-dashboard-js', 'backlinkboostSettings', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'apiUrl' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
            'isLoggedIn' => is_user_logged_in(),
            'userId' => get_current_user_id()
        ));
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
 * Custom login page redirection
 */
function backlinkboost_login_redirect($redirect_to, $request, $user) {
    if (isset($user->roles) && is_array($user->roles)) {
        if (in_array('administrator', $user->roles)) {
            return admin_url();
        } else {
            return home_url('/app/');
        }
    }
    return $redirect_to;
}
add_filter('login_redirect', 'backlinkboost_login_redirect', 10, 3);

/**
 * Custom login page URL
 */
function backlinkboost_login_url() {
    return home_url('/login/');
}
add_filter('login_url', 'backlinkboost_login_url');

/**
 * Custom lost password URL
 */
function backlinkboost_lostpassword_url() {
    return home_url('/recuperar-senha/');
}
add_filter('lostpassword_url', 'backlinkboost_lostpassword_url');

/**
 * Custom registration URL
 */
function backlinkboost_register_url() {
    return home_url('/registrar/');
}
add_filter('register_url', 'backlinkboost_register_url');

/**
 * Create REST API endpoint to check Google authentication status
 */
function backlinkboost_register_rest_routes() {
    register_rest_route('backlinkboost/v1', '/google-auth-status', array(
        'methods' => 'GET',
        'callback' => 'backlinkboost_get_google_auth_status',
        'permission_callback' => function () {
            return is_user_logged_in();
        }
    ));
    
    register_rest_route('backlinkboost/v1', '/campaign-data', array(
        'methods' => 'GET',
        'callback' => 'backlinkboost_get_campaign_data',
        'permission_callback' => function () {
            return is_user_logged_in();
        }
    ));
}
add_action('rest_api_init', 'backlinkboost_register_rest_routes');

/**
 * Get Google authentication status
 */
function backlinkboost_get_google_auth_status($request) {
    $user_id = get_current_user_id();
    $google_gsc_connected = get_user_meta($user_id, 'google_gsc_connected', true);
    $google_ga_connected = get_user_meta($user_id, 'google_ga_connected', true);
    
    return new WP_REST_Response(array(
        'gsc_connected' => !empty($google_gsc_connected),
        'ga_connected' => !empty($google_ga_connected)
    ), 200);
}

/**
 * Get campaign data for the current user
 */
function backlinkboost_get_campaign_data($request) {
    $user_id = get_current_user_id();
    
    // In a real implementation, this would fetch data from a custom table or post type
    // For now, we'll return mock data
    $campaigns = array(
        array(
            'id' => 1,
            'name' => 'Campanha e-commerce Q2 2023',
            'status' => 'active',
            'progress' => 75,
            'budget' => 1500,
            'spent' => 1125,
            'start_date' => '2023-04-01',
            'end_date' => '2023-06-30'
        ),
        array(
            'id' => 2,
            'name' => 'Blog SEO Junho 2023',
            'status' => 'active',
            'progress' => 90,
            'budget' => 800,
            'spent' => 720,
            'start_date' => '2023-06-01',
            'end_date' => '2023-06-30'
        ),
        array(
            'id' => 3,
            'name' => 'Link Building Corporativo',
            'status' => 'active',
            'progress' => 30,
            'budget' => 2000,
            'spent' => 600,
            'start_date' => '2023-07-01',
            'end_date' => '2023-09-30'
        )
    );
    
    return new WP_REST_Response($campaigns, 200);
}

/**
 * Disable admin bar for non-admin users
 */
function backlinkboost_disable_admin_bar() {
    if (!current_user_can('administrator')) {
        show_admin_bar(false);
    }
}
add_action('after_setup_theme', 'backlinkboost_disable_admin_bar');

/**
 * Redirect non-admin users away from admin area
 */
function backlinkboost_redirect_non_admin_users() {
    if (is_admin() && !current_user_can('administrator') && !wp_doing_ajax()) {
        wp_redirect(home_url('/app/'));
        exit;
    }
}
add_action('admin_init', 'backlinkboost_redirect_non_admin_users');

/**
 * Add custom robots.txt rules
 */
function backlinkboost_robots_txt($output, $public) {
    $site_url = parse_url(site_url(), PHP_URL_HOST);
    $app_subdomain = 'app.' . $site_url;
    
    $output = "User-agent: *\n";
    $output .= "Allow: /\n";
    $output .= "Allow: /blog/\n";
    $output .= "Allow: /features/\n";
    $output .= "Allow: /pricing/\n";
    $output .= "Allow: /product/\n\n";
    
    $output .= "# Block app subdomain\n";
    $output .= "User-agent: *\n";
    $output .= "Disallow: /app/\n";
    $output .= "Disallow: /checkout/\n";
    $output .= "Disallow: /account/\n";
    $output .= "Disallow: /login/\n";
    $output .= "Disallow: /register/\n\n";
    
    $output .= "# Block for specific bots\n";
    $output .= "User-agent: Googlebot\n";
    $output .= "Disallow: /app/\n";
    $output .= "Disallow: /checkout/\n";
    $output .= "Disallow: /account/\n\n";
    
    $output .= "User-agent: Bingbot\n";
    $output .= "Disallow: /app/\n";
    $output .= "Disallow: /checkout/\n";
    $output .= "Disallow: /account/\n";
    
    return $output;
}
add_filter('robots_txt', 'backlinkboost_robots_txt', 10, 2);

/**
 * WooCommerce support and customizations
 */
if (class_exists('WooCommerce')) {
    // Remove unused WooCommerce features
    function backlinkboost_remove_woocommerce_features() {
        remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20);
        remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10);
        remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40);
    }
    add_action('init', 'backlinkboost_remove_woocommerce_features');
    
    // Simplified checkout fields
    function backlinkboost_simplify_checkout_fields($fields) {
        // Remove unnecessary fields
        unset($fields['billing']['billing_company']);
        unset($fields['billing']['billing_address_2']);
        unset($fields['billing']['billing_postcode']);
        unset($fields['billing']['billing_state']);
        unset($fields['billing']['billing_phone']);
        unset($fields['shipping']['shipping_company']);
        unset($fields['shipping']['shipping_address_2']);
        unset($fields['shipping']['shipping_postcode']);
        unset($fields['shipping']['shipping_state']);
        unset($fields['shipping']['shipping_phone']);
        
        return $fields;
    }
    add_filter('woocommerce_checkout_fields', 'backlinkboost_simplify_checkout_fields');
    
    // Add one-click checkout button
    function backlinkboost_one_click_checkout_button() {
        if (is_product()) {
            global $product;
            echo '<a href="' . esc_url(wc_get_checkout_url() . '?add-to-cart=' . $product->get_id()) . '" class="btn-primary one-click-checkout">Comprar com 1-clique</a>';
        }
    }
    add_action('woocommerce_after_add_to_cart_button', 'backlinkboost_one_click_checkout_button', 20);
}

/**
 * Include additional theme files
 */
require_once BACKLINKBOOST_THEME_DIR . 'inc/template-functions.php';
require_once BACKLINKBOOST_THEME_DIR . 'inc/customizer.php';
require_once BACKLINKBOOST_THEME_DIR . 'inc/class-backlinkboost-walker-nav-menu.php';

// If WooCommerce is active, include WooCommerce customizations
if (class_exists('WooCommerce')) {
    require_once BACKLINKBOOST_THEME_DIR . 'inc/woocommerce.php';
}

/**
 * Register widget areas
 */
function backlinkboost_widgets_init() {
    register_sidebar(array(
        'name'          => __('App Sidebar', 'backlinkboost'),
        'id'            => 'sidebar-app',
        'description'   => __('Add widgets here to appear in your app sidebar.', 'backlinkboost'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'backlinkboost_widgets_init');
