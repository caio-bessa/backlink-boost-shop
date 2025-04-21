
<?php
/**
 * BacklinkBoost Theme Customizer
 *
 * @package BacklinkBoost
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function backlinkboost_customize_register($wp_customize) {
    // Add theme color section
    $wp_customize->add_section('backlinkboost_theme_colors', array(
        'title'    => __('Theme Colors', 'backlinkboost'),
        'priority' => 30,
    ));
    
    // Light Green Color
    $wp_customize->add_setting('theme_light_green', array(
        'default'           => '#D9F4C7',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'theme_light_green', array(
        'label'    => __('Light Green', 'backlinkboost'),
        'section'  => 'backlinkboost_theme_colors',
        'settings' => 'theme_light_green',
    )));
    
    // Yellow Color
    $wp_customize->add_setting('theme_yellow', array(
        'default'           => '#F8FA90',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'theme_yellow', array(
        'label'    => __('Yellow', 'backlinkboost'),
        'section'  => 'backlinkboost_theme_colors',
        'settings' => 'theme_yellow',
    )));
    
    // Beige Color
    $wp_customize->add_setting('theme_beige', array(
        'default'           => '#F4EF88',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'theme_beige', array(
        'label'    => __('Beige', 'backlinkboost'),
        'section'  => 'backlinkboost_theme_colors',
        'settings' => 'theme_beige',
    )));
    
    // Brown Color
    $wp_customize->add_setting('theme_brown', array(
        'default'           => '#AC9969',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'theme_brown', array(
        'label'    => __('Brown', 'backlinkboost'),
        'section'  => 'backlinkboost_theme_colors',
        'settings' => 'theme_brown',
    )));
    
    // Teal Color
    $wp_customize->add_setting('theme_teal', array(
        'default'           => '#9DCDC0',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'theme_teal', array(
        'label'    => __('Teal', 'backlinkboost'),
        'section'  => 'backlinkboost_theme_colors',
        'settings' => 'theme_teal',
    )));
    
    // Text Color
    $wp_customize->add_setting('theme_text', array(
        'default'           => '#111111',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'theme_text', array(
        'label'    => __('Text Color', 'backlinkboost'),
        'section'  => 'backlinkboost_theme_colors',
        'settings' => 'theme_text',
    )));
}
add_action('customize_register', 'backlinkboost_customize_register');

/**
 * Output custom CSS for the theme colors
 */
function backlinkboost_customizer_css() {
    ?>
    <style type="text/css">
        :root {
            --theme-light-green: <?php echo get_theme_mod('theme_light_green', '#D9F4C7'); ?>;
            --theme-yellow: <?php echo get_theme_mod('theme_yellow', '#F8FA90'); ?>;
            --theme-beige: <?php echo get_theme_mod('theme_beige', '#F4EF88'); ?>;
            --theme-brown: <?php echo get_theme_mod('theme_brown', '#AC9969'); ?>;
            --theme-teal: <?php echo get_theme_mod('theme_teal', '#9DCDC0'); ?>;
            --theme-text: <?php echo get_theme_mod('theme_text', '#111111'); ?>;
        }
    </style>
    <?php
}
add_action('wp_head', 'backlinkboost_customizer_css');

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function backlinkboost_customize_preview_js() {
    wp_enqueue_script('backlinkboost-customizer', get_stylesheet_directory_uri() . '/assets/js/customizer.js', array('customize-preview'), '1.0.0', true);
}
add_action('customize_preview_init', 'backlinkboost_customize_preview_js');
