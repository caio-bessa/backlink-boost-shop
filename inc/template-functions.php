
<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package BacklinkBoost
 */

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

/**
 * Add custom login URL to menu items
 */
function backlinkboost_menu_items($items, $args) {
    if (is_user_logged_in()) {
        // Add dashboard link for logged in users
        $items .= '<li class="menu-item"><a href="' . esc_url(home_url('/app/')) . '">Dashboard</a></li>';
    } else {
        // Add login link for guests
        $items .= '<li class="menu-item"><a href="' . esc_url(home_url('/login/')) . '">Entrar</a></li>';
    }
    
    return $items;
}
add_filter('wp_nav_menu_items', 'backlinkboost_menu_items', 10, 2);

/**
 * Create rewrite rules for app pages
 */
function backlinkboost_rewrite_rules() {
    add_rewrite_rule('^app/?$', 'index.php?pagename=app', 'top');
    add_rewrite_rule('^app/([^/]+)/?$', 'index.php?pagename=app&app_page=$matches[1]', 'top');
    add_rewrite_rule('^app/([^/]+)/([^/]+)/?$', 'index.php?pagename=app&app_page=$matches[1]&app_subpage=$matches[2]', 'top');
}
add_action('init', 'backlinkboost_rewrite_rules');

/**
 * Add query vars for app pages
 */
function backlinkboost_query_vars($vars) {
    $vars[] = 'app_page';
    $vars[] = 'app_subpage';
    return $vars;
}
add_filter('query_vars', 'backlinkboost_query_vars');

/**
 * Modify the title for app pages
 */
function backlinkboost_title($title) {
    if (is_page('app')) {
        global $wp_query;
        $app_page = get_query_var('app_page');
        
        if (!empty($app_page)) {
            $page_title = ucwords(str_replace('-', ' ', $app_page));
            return $page_title . ' | ' . get_bloginfo('name');
        } else {
            return 'Dashboard | ' . get_bloginfo('name');
        }
    }
    
    return $title;
}
add_filter('the_title', 'backlinkboost_title');

/**
 * Add Font Awesome support
 */
function backlinkboost_font_awesome() {
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css', array(), '6.0.0');
}
add_action('wp_enqueue_scripts', 'backlinkboost_font_awesome');

/**
 * Create app pages on theme activation
 */
function backlinkboost_create_pages() {
    $pages = array(
        'app' => array(
            'title' => 'App Dashboard',
            'template' => 'page-templates/app-template.php'
        ),
        'login' => array(
            'title' => 'Login',
            'template' => 'page-templates/login-template.php'
        ),
        'registrar' => array(
            'title' => 'Registrar',
            'template' => 'page-templates/register-template.php'
        ),
        'recuperar-senha' => array(
            'title' => 'Recuperar Senha',
            'template' => 'page-templates/password-recovery-template.php'
        )
    );
    
    foreach ($pages as $slug => $page) {
        $page_exists = get_page_by_path($slug);
        
        if (!$page_exists) {
            $page_id = wp_insert_post(array(
                'post_title' => $page['title'],
                'post_name' => $slug,
                'post_status' => 'publish',
                'post_type' => 'page',
                'post_content' => '',
                'comment_status' => 'closed'
            ));
            
            if ($page_id && !is_wp_error($page_id)) {
                update_post_meta($page_id, '_wp_page_template', $page['template']);
            }
        }
    }
    
    // Create app subpages
    $app_subpages = array(
        'campaign-results' => 'Resultados por Campanha',
        'financial-reports' => 'Relatório Financeiro',
        'new-campaign' => 'Nova Campanha',
        'content-strategy' => 'Estratégia de Conteúdo'
    );
    
    foreach ($app_subpages as $slug => $title) {
        $page_exists = get_page_by_path('app/' . $slug);
        
        if (!$page_exists) {
            $page_id = wp_insert_post(array(
                'post_title' => $title,
                'post_name' => $slug,
                'post_status' => 'publish',
                'post_type' => 'page',
                'post_content' => '',
                'post_parent' => get_page_by_path('app')->ID,
                'comment_status' => 'closed'
            ));
            
            if ($page_id && !is_wp_error($page_id)) {
                update_post_meta($page_id, '_wp_page_template', 'page-templates/app-template.php');
            }
        }
    }
}
add_action('after_switch_theme', 'backlinkboost_create_pages');
