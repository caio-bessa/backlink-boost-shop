
<?php
/**
 * The template for displaying the footer
 *
 * @package BacklinkBoost
 */

// Check if we're on an app page
$is_app_page = is_page('app') || is_page_template('page-templates/app-template.php') || strpos($_SERVER['REQUEST_URI'], '/app/') !== false;
?>

        <?php if ($is_app_page) : ?>
            </div><!-- .dashboard-container -->
        <?php endif; ?>
    </div><!-- #content -->

    <?php if (!$is_app_page) : ?>
    <footer id="colophon" class="site-footer">
        <div class="container">
            <div class="footer-widgets">
                <div class="footer-widget">
                    <h3 class="widget-title"><?php esc_html_e('Sobre', 'backlinkboost'); ?></h3>
                    <p><?php bloginfo('description'); ?></p>
                </div>
                
                <div class="footer-widget">
                    <h3 class="widget-title"><?php esc_html_e('Links Rápidos', 'backlinkboost'); ?></h3>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_id'        => 'footer-menu',
                        'depth'          => 1,
                    ));
                    ?>
                </div>
                
                <div class="footer-widget">
                    <h3 class="widget-title"><?php esc_html_e('Contato', 'backlinkboost'); ?></h3>
                    <ul class="contact-info">
                        <li><i class="fa fa-envelope"></i> <a href="mailto:<?php echo antispambot('contato@backlinkboost.com'); ?>"><?php echo antispambot('contato@backlinkboost.com'); ?></a></li>
                        <li><i class="fa fa-phone"></i> (11) 1234-5678</li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="copyright">
                    &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php esc_html_e('Todos os direitos reservados.', 'backlinkboost'); ?>
                </div>
                
                <div class="footer-social">
                    <a href="#" class="social-icon"><i class="fa fa-facebook"></i></a>
                    <a href="#" class="social-icon"><i class="fa fa-twitter"></i></a>
                    <a href="#" class="social-icon"><i class="fa fa-instagram"></i></a>
                    <a href="#" class="social-icon"><i class="fa fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </footer><!-- #colophon -->
    <?php endif; ?>
</div><!-- #page -->

<?php if (class_exists('WooCommerce') && !is_cart() && !is_checkout()) : ?>
    <div id="cart-slidein" class="cart-slidein">
        <div class="cart-slidein-header">
            <h3><?php esc_html_e('Seu Carrinho', 'backlinkboost'); ?></h3>
            <button class="close-cart">&times;</button>
        </div>
        <div class="cart-slidein-content">
            <?php woocommerce_mini_cart(); ?>
        </div>
    </div>
    <div class="cart-slidein-overlay"></div>
<?php endif; ?>

<?php wp_footer(); ?>

</body>
</html>
