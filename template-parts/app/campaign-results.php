
<?php
/**
 * Campaign Results template part
 *
 * @package BacklinkBoost
 */

// Check if user has connected Google accounts
$user_id = get_current_user_id();
$google_gsc_connected = get_user_meta($user_id, 'google_gsc_connected', true);
$google_ga_connected = get_user_meta($user_id, 'google_ga_connected', true);
$is_connected = !empty($google_gsc_connected) && !empty($google_ga_connected);

// Get campaigns for the current user
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

// Mock data for keywords and pages
$keywords = array(
    array('name' => 'SEO Avançado', 'clicks' => 342, 'impressions' => 5640, 'ctr' => 6.1, 'position' => 3.2),
    array('name' => 'Link Building', 'clicks' => 287, 'impressions' => 4230, 'ctr' => 6.8, 'position' => 4.1),
    array('name' => 'Backlinks de Qualidade', 'clicks' => 195, 'impressions' => 3280, 'ctr' => 5.9, 'position' => 5.7),
    array('name' => 'Marketing Digital', 'clicks' => 178, 'impressions' => 3950, 'ctr' => 4.5, 'position' => 7.3),
    array('name' => 'Análise de SEO', 'clicks' => 156, 'impressions' => 2780, 'ctr' => 5.6, 'position' => 6.2)
);

$pages = array(
    array('url' => '/blog/seo-avancado', 'clicks' => 432, 'impressions' => 7650, 'ctr' => 5.6, 'position' => 2.9),
    array('url' => '/servicos/link-building', 'clicks' => 367, 'impressions' => 5840, 'ctr' => 6.3, 'position' => 3.7),
    array('url' => '/blog/backlinks-2023', 'clicks' => 289, 'impressions' => 4930, 'ctr' => 5.9, 'position' => 4.2),
    array('url' => '/casos-de-sucesso', 'clicks' => 245, 'impressions' => 4120, 'ctr' => 5.9, 'position' => 5.1),
    array('url' => '/ferramentas-seo', 'clicks' => 198, 'impressions' => 3560, 'ctr' => 5.6, 'position' => 5.8)
);
?>

<div class="campaign-results">
    <h1 class="page-title">Resultados por Campanha</h1>
    
    <?php if (!$is_connected) : ?>
        <div class="card connect-google-card">
            <div class="connect-google-content">
                <div class="connect-google-icon">
                    <i class="fa fa-search"></i>
                </div>
                <h2 class="connect-google-title">Conecte suas contas Google</h2>
                <p class="connect-google-desc">Para visualizar os resultados completos, conecte sua conta do Google Search Console e Google Analytics.</p>
                <button id="connect-google-button" class="btn-primary">Conectar contas Google</button>
            </div>
        </div>
        
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('connect-google-button').addEventListener('click', function() {
                // In a real implementation, this would trigger the OAuth flow
                // For demonstration, we'll simulate a successful connection
                window.location.href = '<?php echo esc_url(add_query_arg(array('connect' => 'success'), $_SERVER['REQUEST_URI'])); ?>';
            });
        });
        </script>
        
        <?php if (isset($_GET['connect']) && $_GET['connect'] === 'success') : ?>
            <script>
            document.addEventListener('DOMContentLoaded', function() {
                // Simulate updating the user meta
                fetch('<?php echo esc_url(rest_url('wp/v2/users/me')); ?>', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': '<?php echo wp_create_nonce('wp_rest'); ?>'
                    },
                    body: JSON.stringify({
                        meta: {
                            google_gsc_connected: true,
                            google_ga_connected: true
                        }
                    })
                }).then(function(response) {
                    if (response.ok) {
                        window.location.reload();
                    }
                });
            });
            </script>
        <?php endif; ?>
        
    <?php else : ?>
        <div class="filters-section">
            <div class="filter-row">
                <div class="filter-group">
                    <label for="campaign-filter">Campanha</label>
                    <select id="campaign-filter" class="filter-select">
                        <option value="">Todas as campanhas</option>
                        <?php foreach ($campaigns as $campaign) : ?>
                            <option value="<?php echo esc_attr($campaign['id']); ?>"><?php echo esc_html($campaign['name']); ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="date-filter">Período</label>
                    <select id="date-filter" class="filter-select">
                        <option value="7d">Últimos 7 dias</option>
                        <option value="30d" selected>Últimos 30 dias</option>
                        <option value="90d">Últimos 90 dias</option>
                        <option value="6m">Últimos 6 meses</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-info">
                    <p class="stat-title">Cliques Totais</p>
                    <h3 class="stat-value">1,248</h3>
                    <p class="stat-change positive">↑ 14.5% em comparação ao período anterior</p>
                </div>
                <div class="stat-icon">
                    <i class="fa fa-chart-bar"></i>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-info">
                    <p class="stat-title">Impressões</p>
                    <h3 class="stat-value">24,380</h3>
                    <p class="stat-change positive">↑ 8.2% em comparação ao período anterior</p>
                </div>
                <div class="stat-icon">
                    <i class="fa fa-eye"></i>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-info">
                    <p class="stat-title">CTR Médio</p>
                    <h3 class="stat-value">5.1%</h3>
                    <p class="stat-change positive">↑ 0.8% em comparação ao período anterior</p>
                </div>
                <div class="stat-icon">
                    <i class="fa fa-percentage"></i>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-info">
                    <p class="stat-title">Posição Média</p>
                    <h3 class="stat-value">4.2</h3>
                    <p class="stat-change positive">↑ 1.3 posições em comparação ao período anterior</p>
                </div>
                <div class="stat-icon">
                    <i class="fa fa-globe"></i>
                </div>
            </div>
        </div>
        
        <div class="tabs-container">
            <div class="tabs-header">
                <button class="tab-button active" data-tab="keywords">Palavras-chave (Âncoras)</button>
                <button class="tab-button" data-tab="pages">Páginas</button>
            </div>
            
            <div class="tab-content" id="keywords-tab">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Desempenho por Palavras-chave</h2>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Palavra-chave</th>
                                        <th class="text-right">Cliques</th>
                                        <th class="text-right">Impressões</th>
                                        <th class="text-right">CTR</th>
                                        <th class="text-right">Posição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($keywords as $keyword) : ?>
                                        <tr>
                                            <td><?php echo esc_html($keyword['name']); ?></td>
                                            <td class="text-right"><?php echo number_format($keyword['clicks']); ?></td>
                                            <td class="text-right"><?php echo number_format($keyword['impressions']); ?></td>
                                            <td class="text-right"><?php echo number_format($keyword['ctr'], 1); ?>%</td>
                                            <td class="text-right"><?php echo number_format($keyword['position'], 1); ?></td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="pages-tab" style="display: none;">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Desempenho por Páginas</h2>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>URL</th>
                                        <th class="text-right">Cliques</th>
                                        <th class="text-right">Impressões</th>
                                        <th class="text-right">CTR</th>
                                        <th class="text-right">Posição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($pages as $page) : ?>
                                        <tr>
                                            <td class="url-cell"><?php echo esc_html($page['url']); ?></td>
                                            <td class="text-right"><?php echo number_format($page['clicks']); ?></td>
                                            <td class="text-right"><?php echo number_format($page['impressions']); ?></td>
                                            <td class="text-right"><?php echo number_format($page['ctr'], 1); ?>%</td>
                                            <td class="text-right"><?php echo number_format($page['position'], 1); ?></td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Tab functionality
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons and hide all contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.style.display = 'none');
                    
                    // Add active class to clicked button and show corresponding content
                    button.classList.add('active');
                    const tabId = button.getAttribute('data-tab');
                    document.getElementById(`${tabId}-tab`).style.display = 'block';
                });
            });
        });
        </script>
    <?php endif; ?>
</div>
