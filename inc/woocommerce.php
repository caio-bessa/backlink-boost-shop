
<?php
/**
 * WooCommerce specific functionality for BacklinkBoost theme
 *
 * @package BacklinkBoost
 */

/**
 * Declare WooCommerce support
 */
function backlinkboost_woocommerce_support() {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}
add_action('after_setup_theme', 'backlinkboost_woocommerce_support');

/**
 * Remove WooCommerce styles and use theme styles instead
 */
function backlinkboost_dequeue_woocommerce_styles() {
    // Remove WooCommerce's default styles to use our own
    wp_dequeue_style('woocommerce-general');
    wp_dequeue_style('woocommerce-layout');
    wp_dequeue_style('woocommerce-smallscreen');
}
add_action('wp_enqueue_scripts', 'backlinkboost_dequeue_woocommerce_styles', 99);

/**
 * Add custom WooCommerce styles
 */
function backlinkboost_woocommerce_scripts() {
    wp_enqueue_style('backlinkboost-woocommerce', get_stylesheet_directory_uri() . '/assets/css/woocommerce.css', array(), BACKLINKBOOST_THEME_VERSION);
}
add_action('wp_enqueue_scripts', 'backlinkboost_woocommerce_scripts');

/**
 * Update cart count via AJAX
 */
function backlinkboost_cart_count_fragments($fragments) {
    $fragments['span.cart-count'] = '<span class="cart-count">' . WC()->cart->get_cart_contents_count() . '</span>';
    return $fragments;
}
add_filter('woocommerce_add_to_cart_fragments', 'backlinkboost_cart_count_fragments');

/**
 * Add cart slide-in toggle button
 */
function backlinkboost_cart_toggle() {
    if (WC()->cart->get_cart_contents_count() > 0) {
        ?>
        <a href="#" class="cart-toggle">
            <i class="fa fa-shopping-cart"></i>
            <span class="cart-count"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
        </a>
        <?php
    }
}
add_action('wp_footer', 'backlinkboost_cart_toggle');

/**
 * Simplified checkout for campaign purchases
 */
function backlinkboost_checkout_campaign() {
    // Check if this is a campaign checkout
    if (isset($_GET['campaign_id'])) {
        $campaign_id = intval($_GET['campaign_id']);
        
        // In a real implementation, you would get the campaign details and create a product
        // For demonstration, we'll use a mock campaign
        $campaign = array(
            'id' => $campaign_id,
            'name' => 'Campanha de Link Building #' . $campaign_id,
            'price' => 1500,
            'description' => 'Pacote de links em sites de alta autoridade'
        );
        
        // Add the campaign to cart
        WC()->cart->empty_cart();
        
        // Find or create a product for the campaign
        $product_id = wc_get_product_id_by_sku('campaign-' . $campaign_id);
        
        if (!$product_id) {
            // In a real implementation, you would create a product for the campaign
            // For demonstration, we'll use a mock product ID
            $product_id = 1;
        }
        
        WC()->cart->add_to_cart($product_id, 1, 0, array(), array(
            'campaign_id' => $campaign_id,
            'campaign_name' => $campaign['name'],
            'campaign_price' => $campaign['price']
        ));
        
        // Redirect to checkout
        wp_redirect(wc_get_checkout_url());
        exit;
    }
}
add_action('template_redirect', 'backlinkboost_checkout_campaign');

/**
 * Customize checkout fields
 */
function backlinkboost_checkout_fields($fields) {
    // Simplify and reorganize checkout fields
    
    // Make email first
    $fields['billing']['billing_email']['priority'] = 1;
    
    // Make company optional
    $fields['billing']['billing_company']['required'] = false;
    
    // Add custom fields for campaign specific data
    if (isset($_GET['campaign_id']) || WC()->session->get('campaign_id')) {
        $fields['billing']['campaign_target_urls'] = array(
            'label' => __('URLs Alvo', 'backlinkboost'),
            'placeholder' => __('Insira as URLs separadas por vírgula', 'backlinkboost'),
            'required' => true,
            'class' => array('form-row-wide'),
            'priority' => 50
        );
        
        $fields['billing']['campaign_anchor_text'] = array(
            'label' => __('Textos Âncora', 'backlinkboost'),
            'placeholder' => __('Insira os textos âncora separados por vírgula', 'backlinkboost'),
            'required' => true,
            'class' => array('form-row-wide'),
            'priority' => 51
        );
    }
    
    return $fields;
}
add_filter('woocommerce_checkout_fields', 'backlinkboost_checkout_fields');

/**
 * Save campaign data to order meta
 */
function backlinkboost_checkout_update_order_meta($order_id) {
    if (!empty($_POST['campaign_target_urls'])) {
        update_post_meta($order_id, '_campaign_target_urls', sanitize_textarea_field($_POST['campaign_target_urls']));
    }
    
    if (!empty($_POST['campaign_anchor_text'])) {
        update_post_meta($order_id, '_campaign_anchor_text', sanitize_textarea_field($_POST['campaign_anchor_text']));
    }
    
    // Save campaign ID to order meta
    $campaign_id = WC()->session->get('campaign_id');
    if ($campaign_id) {
        update_post_meta($order_id, '_campaign_id', $campaign_id);
    }
}
add_action('woocommerce_checkout_update_order_meta', 'backlinkboost_checkout_update_order_meta');

/**
 * Display campaign fields in admin order view
 */
function backlinkboost_display_campaign_fields_in_order($order) {
    $order_id = $order->get_id();
    $campaign_id = get_post_meta($order_id, '_campaign_id', true);
    
    if ($campaign_id) {
        echo '<h3>' . __('Detalhes da Campanha', 'backlinkboost') . '</h3>';
        echo '<p><strong>' . __('ID da Campanha:', 'backlinkboost') . '</strong> ' . esc_html($campaign_id) . '</p>';
        
        $target_urls = get_post_meta($order_id, '_campaign_target_urls', true);
        if ($target_urls) {
            echo '<p><strong>' . __('URLs Alvo:', 'backlinkboost') . '</strong> ' . esc_html($target_urls) . '</p>';
        }
        
        $anchor_text = get_post_meta($order_id, '_campaign_anchor_text', true);
        if ($anchor_text) {
            echo '<p><strong>' . __('Textos Âncora:', 'backlinkboost') . '</strong> ' . esc_html($anchor_text) . '</p>';
        }
    }
}
add_action('woocommerce_admin_order_data_after_billing_address', 'backlinkboost_display_campaign_fields_in_order');
