
<?php
/**
 * Template Name: Password Recovery
 *
 * @package BacklinkBoost
 */

get_header();
?>

<div class="password-recovery-page">
    <div class="container">
        <div class="password-recovery-container">
            <h1><?php esc_html_e('Recuperar Senha', 'backlinkboost'); ?></h1>
            
            <?php
            $action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
            
            if ($action === 'rp' || $action === 'resetpass') {
                // Password reset form
                ?>
                <p><?php esc_html_e('Digite sua nova senha abaixo.', 'backlinkboost'); ?></p>
                
                <form name="resetpassform" id="resetpassform" action="<?php echo esc_url(site_url('wp-login.php?action=resetpass', 'login_post')); ?>" method="post" autocomplete="off">
                    <input type="hidden" name="rp_key" value="<?php echo esc_attr($_REQUEST['key']); ?>">
                    <input type="hidden" name="rp_login" value="<?php echo esc_attr($_REQUEST['login']); ?>">
                    
                    <div class="form-group">
                        <label for="pass1"><?php esc_html_e('Nova senha', 'backlinkboost'); ?></label>
                        <input type="password" name="pass1" id="pass1" class="input" size="20" value="" autocomplete="new-password" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="pass2"><?php esc_html_e('Confirme a nova senha', 'backlinkboost'); ?></label>
                        <input type="password" name="pass2" id="pass2" class="input" size="20" value="" autocomplete="new-password" required>
                    </div>
                    
                    <div class="form-group">
                        <input type="submit" name="wp-submit" id="wp-submit" class="btn-primary" value="<?php esc_attr_e('Redefinir Senha', 'backlinkboost'); ?>">
                    </div>
                </form>
                <?php
            } else {
                // Password recovery request form
                ?>
                <p><?php esc_html_e('Por favor, digite seu email ou nome de usuário. Você receberá um link para criar uma nova senha via email.', 'backlinkboost'); ?></p>
                
                <?php if (isset($_GET['success']) && $_GET['success'] === '1') : ?>
                    <div class="success-message">
                        <?php esc_html_e('O link para redefinição de senha foi enviado para o seu email.', 'backlinkboost'); ?>
                    </div>
                <?php endif; ?>
                
                <form name="lostpasswordform" id="lostpasswordform" action="<?php echo esc_url(wp_lostpassword_url()); ?>" method="post">
                    <div class="form-group">
                        <label for="user_login"><?php esc_html_e('Email ou Nome de Usuário', 'backlinkboost'); ?></label>
                        <input type="text" name="user_login" id="user_login" class="input" value="" size="20" autocapitalize="off" autocomplete="username" required>
                    </div>
                    
                    <div class="form-group">
                        <input type="submit" name="wp-submit" id="wp-submit" class="btn-primary" value="<?php esc_attr_e('Obter Nova Senha', 'backlinkboost'); ?>">
                        <input type="hidden" name="redirect_to" value="<?php echo esc_url(home_url('/recuperar-senha/?success=1')); ?>">
                    </div>
                </form>
                <?php
            }
            ?>
            
            <div class="recovery-links">
                <p>
                    <a href="<?php echo esc_url(home_url('/login/')); ?>">
                        <?php esc_html_e('Voltar para login', 'backlinkboost'); ?>
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>

<?php
get_footer();
