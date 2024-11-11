<?php
    /*
    Plugin Name: BKNinja Composer
    Plugin URI: http://bk-ninja.com
    Description: Powerful Drag and Drop Pagebuilder for WordPress Themes -- By BKNinja
    Author: BKNinja
    Version: 3.2
    Author URI: http://bk-ninja.com
    */
?>
<?php
if (!defined('BKNINJA_COMPOSER_VERSION')) {
    define('BKNINJA_COMPOSER_VERSION', '2.1');
}

if (!defined('BKNINJA_COMPOSER_URL')) {
    define('BKNINJA_COMPOSER_URL', plugin_dir_url( __FILE__ ) );
}
if (!defined('BKNINJA_COMPOSER_DIR')) {
    define('BKNINJA_COMPOSER_DIR', plugin_dir_path( __FILE__ ) );
}
if (!defined('BKNINJA_COMPOSER_CONTROLLER')) {
    define('BKNINJA_COMPOSER_CONTROLLER', BKNINJA_COMPOSER_DIR.'controller/');
}

if (!defined('BKNINJA_COMPOSER_CSS_DIR')) {
    define('BKNINJA_COMPOSER_CSS_DIR', plugin_dir_url(__FILE__) . 'css');
}

require_once (BKNINJA_COMPOSER_CONTROLLER.'bk_pd_template.php');
require_once (BKNINJA_COMPOSER_CONTROLLER.'bk_pd_save.php');
require_once (BKNINJA_COMPOSER_CONTROLLER.'bk_pd_del.php');

if( is_admin() && is_multisite() )
{
    add_action(
        'plugins_loaded',
        'bkcomposer_init'
    );
}else {
    bkcomposer_init();
}

function bkcomposer_init(){
global $pagenow;

if ( $pagenow == 'widgets.php' ) {
    return '';
}

if (( $pagenow != 'post-new.php' ) && ( $pagenow != 'post.php' )) {
    return '';
}

if( $pagenow == 'post-new.php' ) {
    $postType = isset($_GET['post_type']) ? $_GET['post_type'] : '';
    if(isset($postType) && ($postType != 'page')) {
        return '';
    }
}

if( $pagenow == 'post.php' ) {
    $postAction = isset($_GET['action']) ? $_GET['action'] : '';
    if($postAction == 'edit') {
        $postID = isset($_GET['post']) ? $_GET['post'] : '';
        if($postID == '') {
            return '';
        }else {
            $adminEditPostType = get_post_type($postID);
            if($adminEditPostType != 'page'){
                return '';
            }
        }
    }
}

function bk_scripts_method() {
    wp_enqueue_style('composer_style', BKNINJA_COMPOSER_CSS_DIR.'/composer_style.css',false,BKNINJA_COMPOSER_VERSION);
}
add_action('admin_enqueue_scripts', 'bk_scripts_method');

/**-------------------------------------------------------------------------------------------------------------------------
 * Enqueue Pagebuilder Scripts
 */
if ( ! function_exists( 'bk_composer_script' ) ) {
function bk_composer_script($hook) {
    if( $hook == 'post.php' || $hook == 'post-new.php' ) {
        wp_enqueue_script( 'bk-composer-script', BKNINJA_COMPOSER_URL.'controller/js/page-builder.js', array( 'jquery' ), null, true );
        wp_localize_script( 'bk-composer-script', 'bkpb_ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
	}
}
}
add_action('admin_enqueue_scripts', 'bk_composer_script', 9);

//pagebuilder_classic_editor
function pagebuilder_classic_editor() {
    //wp_enqueue_script( 'throttle-debounce', BKNINJA_COMPOSER_URL.'controller/js/throttle-debounce.min.js', array('jquery-ui-sortable'), '', true );
    wp_enqueue_script( 'ceris-pagebuilder-classic-init', BKNINJA_COMPOSER_URL.'controller/js/pagebuilder-classic-init.js', array('jquery-ui-sortable'), '', true );
}

//pagebuilder_gutenberg_editor
function pagebuilder_gutenberg_editor() {
    //wp_enqueue_script( 'throttle-debounce', BKNINJA_COMPOSER_URL.'controller/js/throttle-debounce.min.js', array('jquery-ui-sortable'), '', true );
	wp_enqueue_script( 'ceris-pagebuilder-gutenberg-init', BKNINJA_COMPOSER_URL.'controller/js/pagebuilder-gutenberg-init.js', array('jquery-ui-sortable'), '', true );
}
//pagebuilder_gutenberg_editor
function pagebuilder_gutenberg_editor_5_4() {
    //wp_enqueue_script( 'throttle-debounce', BKNINJA_COMPOSER_URL.'controller/js/throttle-debounce.min.js', array('jquery-ui-sortable'), '', true );
	wp_enqueue_script( 'ceris-pagebuilder-gutenberg-init-5-4', BKNINJA_COMPOSER_URL.'controller/js/pagebuilder-gutenberg-init-5-4.js', array('jquery-ui-sortable'), '', true );
}

//pagebuilder_gutenberg_editor
function pagebuilder_gutenberg_editor_5_8() {
    //wp_enqueue_script( 'throttle-debounce', BKNINJA_COMPOSER_URL.'controller/js/throttle-debounce.min.js', array('jquery-ui-sortable'), '', true );
	wp_enqueue_script( 'ceris-pagebuilder-gutenberg-init-5-8', BKNINJA_COMPOSER_URL.'controller/js/pagebuilder-gutenberg-init-5-8.js', array('jquery-ui-sortable'), '', true );
}
//pagebuilder_gutenberg_editor
function pagebuilder_gutenberg_editor_6_1_1() {
    wp_enqueue_script( 'ceris-pagebuilder-gutenberg-init-6-1-1', BKNINJA_COMPOSER_URL.'controller/js/pagebuilder-gutenberg-init-6-1-1.js', array('jquery-ui-sortable'), '', true );
}

//pagebuilder_gutenberg_editor
function pagebuilder_gutenberg_editor_6_6() {
    wp_enqueue_script( 'atbs-pagebuilder-gutenberg-init-6-6', BKNINJA_COMPOSER_URL.'controller/js/pagebuilder-gutenberg-init-6-6.js', array('jquery-ui-sortable'), '', true );
}
add_action( 'after_setup_theme', 'bk_setup_page_builder' );
function bk_setup_page_builder() {
    global $wp_version;
    
    if ( function_exists( 'BK_Init_Sections' ) ) {
	   add_action( 'admin_enqueue_scripts', 'BK_Init_Sections' );
    }
    
    if(is_admin()) {
        if ( version_compare( $wp_version, '5.0', '>=' ) ) {
            if ( function_exists( 'use_block_editor_for_post_type' ) && use_block_editor_for_post_type( 'page' ) ) {
                add_action( 'admin_enqueue_scripts', 'bk_page_builder_temp' );
                if ( version_compare( $wp_version, '5.4', '>=' ) ) {
                    if ( version_compare( $wp_version, '6.6', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_6_6');
                    }else if ( version_compare( $wp_version, '6.1.1', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_6_1_1');
                    }else if ( version_compare( $wp_version, '5.8', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_5_8');
                    }else {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_5_4');
                    }
                }else { 
                    add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor');
                } 
            }else {
                add_action( 'edit_form_after_title', 'bk_page_builder_temp' );    
                add_action('admin_enqueue_scripts', 'pagebuilder_classic_editor');
                add_action( 'save_post', 'bk_classic_save_page' );
            }
        }else {
            if(!function_exists('gutenberg_pre_init')) {
                add_action( 'edit_form_after_title', 'bk_page_builder_temp' );    
                add_action('admin_enqueue_scripts', 'pagebuilder_classic_editor');
                add_action( 'save_post', 'bk_classic_save_page' );
            }else {
                add_action( 'enqueue_block_assets', 'bk_page_builder_temp' );
                if ( version_compare( $wp_version, '5.4', '>=' ) ) {
                    if ( version_compare( $wp_version, '6.6', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_6_6');
                    }elseif ( version_compare( $wp_version, '6.1.1', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_6_1_1');
                    }elseif ( version_compare( $wp_version, '5.8', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_5_8');
                    }else {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_5_4');
                    }
                }else { 
                    add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor');
                } 
            }
        }
    }
    }   
}
