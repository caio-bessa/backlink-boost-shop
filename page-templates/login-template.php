
<?php
/**
 * Template Name: Login Page
 *
 * @package BacklinkBoost
 */

get_header();
?>

<div class="login-page">
    <div class="container">
        <div class="login-form-container">
            <h1><?php esc_html_e('Entre na sua conta', 'backlinkboost'); ?></h1>
            
            <?php
            $login_errors = isset($_GET['login']) ? $_GET['login'] : '';
            if ($login_errors === 'failed') {
                echo '<div class="login-error">Erro: Nome de usuário ou senha incorretos.</div>';
            } elseif ($login_errors === 'empty') {
                echo '<div class="login-error">Erro: Nome de usuário e senha são obrigatórios.</div>';
            }
            ?>
            
            <form name="loginform" id="loginform" action="<?php echo esc_url(site_url('wp-login.php', 'login_post')); ?>" method="post">
                <div class="form-group">
                    <label for="user_login"><?php esc_html_e('Email ou Nome de Usuário', 'backlinkboost'); ?></label>
                    <input type="text" name="log" id="user_login" class="input" value="" size="20" autocapitalize="off" autocomplete="username" required>
                </div>
                
                <div class="form-group">
                    <label for="user_pass"><?php esc_html_e('Senha', 'backlinkboost'); ?></label>
                    <input type="password" name="pwd" id="user_pass" class="input" value="" size="20" autocomplete="current-password" required>
                </div>
                
                <div class="form-group remember-me">
                    <input name="rememberme" type="checkbox" id="rememberme" value="forever">
                    <label for="rememberme"><?php esc_html_e('Lembrar-me', 'backlinkboost'); ?></label>
                </div>
                
                <div class="form-group">
                    <input type="submit" name="wp-submit" id="wp-submit" class="btn-primary" value="<?php esc_attr_e('Entrar', 'backlinkboost'); ?>">
                    <input type="hidden" name="redirect_to" value="<?php echo esc_url(home_url('/app/')); ?>">
                </div>
            </form>
            
            <div class="login-links">
                <p>
                    <a href="<?php echo esc_url(home_url('/recuperar-senha/')); ?>">
                        <?php esc_html_e('Esqueceu sua senha?', 'backlinkboost'); ?>
                    </a>
                </p>
                <p>
                    <?php esc_html_e('Não tem uma conta?', 'backlinkboost'); ?>
                    <a href="<?php echo esc_url(home_url('/registrar/')); ?>">
                        <?php esc_html_e('Registre-se', 'backlinkboost'); ?>
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>

<?php
get_footer();
