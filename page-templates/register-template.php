
<?php
/**
 * Template Name: Register
 *
 * @package BacklinkBoost
 */

get_header();
?>

<div class="register-page">
    <div class="container">
        <div class="register-form-container">
            <h1><?php esc_html_e('Criar Nova Conta', 'backlinkboost'); ?></h1>
            
            <?php if (isset($_GET['success']) && $_GET['success'] === '1') : ?>
                <div class="success-message">
                    <?php esc_html_e('Registro concluído com sucesso! Um email de ativação foi enviado para o seu endereço de email.', 'backlinkboost'); ?>
                </div>
            <?php else : ?>
                
                <?php if (isset($_GET['error'])) : ?>
                    <div class="register-error">
                        <?php
                        $error = $_GET['error'];
                        switch ($error) {
                            case 'empty_fields':
                                esc_html_e('Erro: Por favor, preencha todos os campos.', 'backlinkboost');
                                break;
                            case 'invalid_email':
                                esc_html_e('Erro: Email inválido.', 'backlinkboost');
                                break;
                            case 'username_exists':
                                esc_html_e('Erro: Este nome de usuário já está registrado.', 'backlinkboost');
                                break;
                            case 'email_exists':
                                esc_html_e('Erro: Este email já está registrado.', 'backlinkboost');
                                break;
                            case 'password_mismatch':
                                esc_html_e('Erro: As senhas não coincidem.', 'backlinkboost');
                                break;
                            default:
                                esc_html_e('Erro: Ocorreu um erro durante o registro. Por favor, tente novamente.', 'backlinkboost');
                        }
                        ?>
                    </div>
                <?php endif; ?>
                
                <form name="registerform" id="registerform" action="<?php echo esc_url(site_url('wp-login.php?action=register', 'login_post')); ?>" method="post" novalidate="novalidate">
                    <div class="form-group">
                        <label for="user_login"><?php esc_html_e('Nome de Usuário', 'backlinkboost'); ?></label>
                        <input type="text" name="user_login" id="user_login" class="input" value="<?php echo isset($_GET['user_login']) ? esc_attr($_GET['user_login']) : ''; ?>" size="20" autocapitalize="off" autocomplete="username" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="user_email"><?php esc_html_e('Email', 'backlinkboost'); ?></label>
                        <input type="email" name="user_email" id="user_email" class="input" value="<?php echo isset($_GET['user_email']) ? esc_attr($_GET['user_email']) : ''; ?>" size="25" autocomplete="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="user_pass"><?php esc_html_e('Senha', 'backlinkboost'); ?></label>
                        <input type="password" name="user_pass" id="user_pass" class="input" value="" size="20" autocomplete="new-password" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="user_pass_confirm"><?php esc_html_e('Confirme a Senha', 'backlinkboost'); ?></label>
                        <input type="password" name="user_pass_confirm" id="user_pass_confirm" class="input" value="" size="20" autocomplete="new-password" required>
                    </div>
                    
                    <div class="form-group">
                        <input type="submit" name="wp-submit" id="wp-submit" class="btn-primary" value="<?php esc_attr_e('Registrar', 'backlinkboost'); ?>">
                        <input type="hidden" name="redirect_to" value="<?php echo esc_url(home_url('/registrar/?success=1')); ?>">
                    </div>
                </form>
            <?php endif; ?>
            
            <div class="register-links">
                <p>
                    <?php esc_html_e('Já tem uma conta?', 'backlinkboost'); ?>
                    <a href="<?php echo esc_url(home_url('/login/')); ?>">
                        <?php esc_html_e('Entrar', 'backlinkboost'); ?>
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>

<?php
get_footer();
