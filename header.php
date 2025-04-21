
<?php
/**
 * The header for BacklinkBoost theme
 *
 * @package BacklinkBoost
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <?php if (is_front_page() || is_product()) : ?>
        <meta name="description" content="<?php bloginfo('description'); ?>">
        <link rel="canonical" href="<?php echo esc_url(home_url(add_query_arg(array(), $wp->request))); ?>">
        
        <!-- Open Graph tags -->
        <meta property="og:type" content="<?php echo is_front_page() ? 'website' : 'product'; ?>">
        <meta property="og:title" content="<?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?>">
        <meta property="og:description" content="<?php bloginfo('description'); ?>">
        <meta property="og:url" content="<?php echo esc_url(home_url(add_query_arg(array(), $wp->request))); ?>">
        <meta property="og:site_name" content="<?php bloginfo('name'); ?>">
        <?php if (has_post_thumbnail()) : ?>
            <meta property="og:image" content="<?php the_post_thumbnail_url('large'); ?>">
        <?php endif; ?>
        
        <!-- Twitter Card tags -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="<?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?>">
        <meta name="twitter:description" content="<?php bloginfo('description'); ?>">
        <?php if (has_post_thumbnail()) : ?>
            <meta name="twitter:image" content="<?php the_post_thumbnail_url('large'); ?>">
        <?php endif; ?>
        
        <?php if (is_product()) : ?>
            <!-- JSON-LD for products -->
            <script type="application/ld+json">
            {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "<?php the_title(); ?>",
                "description": "<?php echo get_the_excerpt(); ?>",
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "BRL",
                    "price": "<?php echo get_post_meta(get_the_ID(), '_regular_price', true); ?>",
                    "availability": "https://schema.org/InStock"
                }
            }
            </script>
        <?php endif; ?>
    <?php endif; ?>
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<?php
// Check if we're on an app page
$is_app_page = is_page('app') || is_page_template('page-templates/app-template.php') || strpos($_SERVER['REQUEST_URI'], '/app/') !== false;
?>

<div id="page" class="site">
    <?php if (!$is_app_page) : ?>
    <header id="masthead" class="site-header">
        <div class="container">
            <div class="site-branding">
                <?php if (has_custom_logo()) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></h1>
                <?php endif; ?>
            </div><!-- .site-branding -->

            <nav id="site-navigation" class="main-navigation">
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                    <span class="menu-toggle-icon"></span>
                    <span class="screen-reader-text"><?php esc_html_e('Menu', 'backlinkboost'); ?></span>
                </button>
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                ));
                ?>
                
                <div class="header-buttons">
                    <?php if (is_user_logged_in()) : ?>
                        <a href="<?php echo esc_url(home_url('/app/')); ?>" class="btn-primary"><?php esc_html_e('Meu Painel', 'backlinkboost'); ?></a>
                    <?php else : ?>
                        <a href="<?php echo esc_url(home_url('/login/')); ?>" class="btn-secondary"><?php esc_html_e('Entrar', 'backlinkboost'); ?></a>
                        <a href="<?php echo esc_url(home_url('/registrar/')); ?>" class="btn-primary"><?php esc_html_e('Criar Conta', 'backlinkboost'); ?></a>
                    <?php endif; ?>
                </div>
            </nav><!-- #site-navigation -->
        </div>
    </header><!-- #masthead -->
    <?php endif; ?>

    <div id="content" class="site-content">
        <?php if ($is_app_page) : ?>
            <div class="dashboard-container">
        <?php endif; ?>
