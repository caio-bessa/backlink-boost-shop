
<?php
/**
 * Template Name: App Dashboard
 *
 * @package BacklinkBoost
 */

// Redirect non-logged in users to login page
if (!is_user_logged_in()) {
    wp_redirect(home_url('/login/'));
    exit;
}

get_header();
?>

<div class="sidebar">
    <div class="sidebar-header">
        <div class="sidebar-logo">
            <a href="<?php echo esc_url(home_url('/app/')); ?>">
                <h2>BacklinkBoost</h2>
            </a>
        </div>
    </div>
    
    <nav class="sidebar-nav">
        <ul class="sidebar-menu">
            <li class="sidebar-menu-item <?php echo strpos($_SERVER['REQUEST_URI'], '/app/campaign-results') !== false ? 'active' : ''; ?>">
                <a href="<?php echo esc_url(home_url('/app/campaign-results')); ?>">
                    <i class="fa fa-chart-bar"></i>
                    <span>Resultados por campanha</span>
                </a>
            </li>
            
            <li class="sidebar-menu-item <?php echo strpos($_SERVER['REQUEST_URI'], '/app/financial-reports') !== false ? 'active' : ''; ?>">
                <a href="<?php echo esc_url(home_url('/app/financial-reports')); ?>" class="sidebar-menu-link has-dropdown">
                    <i class="fa fa-dollar-sign"></i>
                    <span>Relatório financeiro</span>
                    <i class="fa fa-chevron-down dropdown-icon"></i>
                </a>
                <ul class="sidebar-submenu">
                    <li class="sidebar-submenu-item">
                        <a href="<?php echo esc_url(home_url('/app/financial-reports/by-campaign')); ?>">
                            <span>Relatório por Campanha</span>
                        </a>
                    </li>
                    <li class="sidebar-submenu-item">
                        <a href="<?php echo esc_url(home_url('/app/financial-reports/payment-info')); ?>">
                            <span>Informações Cadastradas</span>
                        </a>
                    </li>
                    <li class="sidebar-submenu-item">
                        <a href="<?php echo esc_url(home_url('/app/financial-reports/seo-report')); ?>">
                            <span>Report Financeiro de SEO</span>
                        </a>
                    </li>
                </ul>
            </li>
            
            <li class="sidebar-menu-item <?php echo strpos($_SERVER['REQUEST_URI'], '/app/new-campaign') !== false ? 'active' : ''; ?>">
                <a href="<?php echo esc_url(home_url('/app/new-campaign')); ?>">
                    <i class="fa fa-link"></i>
                    <span>Nova campanha de Link Building</span>
                </a>
            </li>
            
            <li class="sidebar-menu-item <?php echo strpos($_SERVER['REQUEST_URI'], '/app/content-strategy') !== false ? 'active' : ''; ?>">
                <a href="<?php echo esc_url(home_url('/app/content-strategy')); ?>">
                    <i class="fa fa-file-text"></i>
                    <span>Estratégia de conteúdo</span>
                </a>
            </li>
        </ul>
    </nav>
    
    <div class="sidebar-footer">
        <div class="user-info">
            <?php $current_user = wp_get_current_user(); ?>
            <div class="user-avatar">
                <?php echo get_avatar($current_user->ID, 40); ?>
            </div>
            <div class="user-details">
                <p class="user-name"><?php echo esc_html($current_user->display_name); ?></p>
                <p class="user-email"><?php echo esc_html($current_user->user_email); ?></p>
            </div>
        </div>
        <div class="sidebar-footer-actions">
            <a href="<?php echo esc_url(home_url('/app/settings')); ?>" class="sidebar-footer-link">
                <i class="fa fa-cog"></i>
                <span>Configurações</span>
            </a>
            <a href="<?php echo esc_url(wp_logout_url(home_url('/'))); ?>" class="sidebar-footer-link">
                <i class="fa fa-sign-out-alt"></i>
                <span>Sair</span>
            </a>
        </div>
    </div>
</div>

<div class="main-content">
    <header class="app-header">
        <button class="sidebar-toggle">
            <i class="fa fa-bars"></i>
        </button>
        
        <div class="app-header-actions">
            <div class="header-search">
                <input type="text" placeholder="Pesquisar...">
                <button class="search-button">
                    <i class="fa fa-search"></i>
                </button>
            </div>
            
            <div class="notifications-dropdown">
                <button class="notifications-toggle">
                    <i class="fa fa-bell"></i>
                    <span class="notifications-count">3</span>
                </button>
            </div>
        </div>
    </header>
    
    <div class="app-content">
        <?php
        // Get the current page slug
        $slug = basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
        
        // Include the appropriate content template based on the slug
        switch ($slug) {
            case 'campaign-results':
                include(get_stylesheet_directory() . '/template-parts/app/campaign-results.php');
                break;
            case 'financial-reports':
                include(get_stylesheet_directory() . '/template-parts/app/financial-reports.php');
                break;
            case 'new-campaign':
                include(get_stylesheet_directory() . '/template-parts/app/new-campaign.php');
                break;
            case 'content-strategy':
                include(get_stylesheet_directory() . '/template-parts/app/content-strategy.php');
                break;
            default:
                include(get_stylesheet_directory() . '/template-parts/app/dashboard.php');
                break;
        }
        ?>
    </div>
</div>

<?php
get_footer();
