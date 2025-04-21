
<?php
/**
 * Dashboard main template part
 *
 * @package BacklinkBoost
 */

// Get campaign data for the current user
$response = wp_remote_get(
    rest_url('backlinkboost/v1/campaign-data'),
    array(
        'headers' => array(
            'X-WP-Nonce' => wp_create_nonce('wp_rest')
        )
    )
);

if (is_wp_error($response)) {
    $campaigns = array();
} else {
    $campaigns = json_decode(wp_remote_retrieve_body($response), true);
}

// Mock data for dashboard stats
$stats = array(
    array(
        'title' => 'Campanhas Ativas',
        'value' => '3',
        'change' => '+1 este mês',
        'positive' => true,
        'link' => home_url('/app/campaign-results'),
        'icon' => 'fa-chart-line'
    ),
    array(
        'title' => 'Backlinks Criados',
        'value' => '27',
        'change' => '+8 este mês',
        'positive' => true,
        'link' => home_url('/app/campaign-results'),
        'icon' => 'fa-link'
    ),
    array(
        'title' => 'Cliques Orgânicos',
        'value' => '1,248',
        'change' => '+14.5% vs. mês anterior',
        'positive' => true,
        'link' => home_url('/app/campaign-results'),
        'icon' => 'fa-mouse-pointer'
    ),
    array(
        'title' => 'ROI Médio',
        'value' => '2.4x',
        'change' => '+0.3x vs. mês anterior',
        'positive' => true,
        'link' => home_url('/app/financial-reports'),
        'icon' => 'fa-dollar-sign'
    )
);

// Mock data for recent activity
$recent_activity = array(
    array(
        'type' => 'Campanha criada',
        'name' => 'Link Building Corporativo',
        'date' => 'Hoje, 10:23'
    ),
    array(
        'type' => 'Relatório atualizado',
        'name' => 'Relatório SEO - Junho 2023',
        'date' => 'Ontem, 15:45'
    ),
    array(
        'type' => 'Backlink publicado',
        'name' => 'technews.com.br',
        'date' => '3 dias atrás'
    ),
    array(
        'type' => 'Pagamento processado',
        'name' => 'Fatura #12345',
        'date' => '1 semana atrás'
    )
);
?>

<div class="dashboard">
    <h1 class="page-title">Dashboard</h1>
    
    <div class="stats-grid">
        <?php foreach ($stats as $stat) : ?>
            <a href="<?php echo esc_url($stat['link']); ?>" class="stat-card">
                <div class="stat-icon">
                    <i class="fa <?php echo esc_attr($stat['icon']); ?>"></i>
                </div>
                <div class="stat-info">
                    <p class="stat-title"><?php echo esc_html($stat['title']); ?></p>
                    <h3 class="stat-value"><?php echo esc_html($stat['value']); ?></h3>
                    <p class="stat-change <?php echo $stat['positive'] ? 'positive' : 'negative'; ?>">
                        <?php echo esc_html($stat['change']); ?>
                    </p>
                </div>
            </a>
        <?php endforeach; ?>
    </div>
    
    <div class="dashboard-grid">
        <div class="dashboard-main">
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Ações Rápidas</h2>
                </div>
                <div class="card-body">
                    <div class="quick-actions">
                        <a href="<?php echo esc_url(home_url('/app/new-campaign')); ?>" class="quick-action-card">
                            <div class="quick-action-content">
                                <h3 class="quick-action-title">Nova campanha de Link Building</h3>
                                <p class="quick-action-desc">Crie uma nova campanha com parceiros selecionados</p>
                            </div>
                            <div class="quick-action-icon">
                                <i class="fa fa-arrow-right"></i>
                            </div>
                        </a>
                        
                        <a href="<?php echo esc_url(home_url('/app/campaign-results')); ?>" class="quick-action-card">
                            <div class="quick-action-content">
                                <h3 class="quick-action-title">Ver resultados de campanhas</h3>
                                <p class="quick-action-desc">Acompanhe o desempenho dos seus backlinks</p>
                            </div>
                            <div class="quick-action-icon">
                                <i class="fa fa-arrow-right"></i>
                            </div>
                        </a>
                        
                        <a href="<?php echo esc_url(home_url('/app/financial-reports')); ?>" class="quick-action-card">
                            <div class="quick-action-content">
                                <h3 class="quick-action-title">Relatório financeiro</h3>
                                <p class="quick-action-desc">Analise o retorno sobre investimento das suas campanhas</p>
                            </div>
                            <div class="quick-action-icon">
                                <i class="fa fa-arrow-right"></i>
                            </div>
                        </a>
                        
                        <a href="<?php echo esc_url(home_url('/app/content-strategy')); ?>" class="quick-action-card">
                            <div class="quick-action-content">
                                <h3 class="quick-action-title">Estratégia de conteúdo</h3>
                                <p class="quick-action-desc">Desenvolva conteúdo otimizado para seus backlinks</p>
                            </div>
                            <div class="quick-action-icon">
                                <i class="fa fa-arrow-right"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Progresso das Campanhas</h2>
                </div>
                <div class="card-body">
                    <?php foreach ($campaigns as $campaign) : ?>
                        <div class="campaign-progress">
                            <div class="campaign-progress-header">
                                <span class="campaign-name"><?php echo esc_html($campaign['name']); ?></span>
                                <span class="campaign-percentage"><?php echo esc_html($campaign['progress']); ?>%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-bar-fill" style="width: <?php echo esc_attr($campaign['progress']); ?>%"></div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        
        <div class="dashboard-sidebar">
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Atividade Recente</h2>
                </div>
                <div class="card-body">
                    <div class="activity-list">
                        <?php foreach ($recent_activity as $activity) : ?>
                            <div class="activity-item">
                                <div class="activity-indicator"></div>
                                <div class="activity-details">
                                    <span class="activity-type"><?php echo esc_html($activity['type']); ?></span>
                                    <span class="activity-name"><?php echo esc_html($activity['name']); ?></span>
                                    <span class="activity-date"><?php echo esc_html($activity['date']); ?></span>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    
                    <div class="view-all-link">
                        <a href="#">Ver todo histórico</a>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Dicas de SEO</h2>
                </div>
                <div class="card-body">
                    <div class="seo-tips">
                        <div class="seo-tip">
                            <h3 class="seo-tip-title">Atualize seu conteúdo regularmente</h3>
                            <p class="seo-tip-desc">Manter seu conteúdo atualizado pode melhorar significativamente seus rankings.</p>
                        </div>
                        
                        <div class="seo-tip">
                            <h3 class="seo-tip-title">Diversifique seus backlinks</h3>
                            <p class="seo-tip-desc">Um perfil de backlinks diversificado é mais natural aos olhos do Google.</p>
                        </div>
                        
                        <div class="seo-tip">
                            <h3 class="seo-tip-title">Foque em backlinks de qualidade</h3>
                            <p class="seo-tip-desc">Poucos backlinks de alta qualidade são mais valiosos que muitos de baixa qualidade.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
