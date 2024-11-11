<?php 
if ( ! function_exists( 'bk_page_builder_temp' ) ) {
	function bk_page_builder_temp() {
		global $post;

		$custom = get_post_custom($post->ID);
        $strArr = '';
        $tempString = '';
        
        $strArr = '<div class="composer-customfieldspage" style="display: none;"><p>';
        foreach ($custom as $key => $value){
            $strArr .= $key.'%%KEY_VAL%%'.htmlentities($value[0]).'%%separate%%';
        }
        $strArr .= '</p></div>';
        
        $tempString .=$strArr;
		if ( isset( $post->ID ) && ('page_builder.php' == get_post_meta( $post->ID,'_wp_page_template',TRUE ) ) ) : 
			$tempString .= '<style>#postdivrich{ display:none; }</style>';
		else :
			$tempString .= '<style>#bk-container{ display:none; }</style>';
		endif;

		$tempString .= '<div id="bk-container" style="display: none;">';
        $tempString .= '<div class="bk-toolbox">';
        $tempString .= '<ul class="menu clearfix" aria-labelledby="add-section-button"></ul>';
        $tempString .= '</div>';
        
        $tempString .= '<div class="bk-sections">';
        $tempString .= '<div class="bk-section-empty">'.esc_html__( 'Choose Layout section to add new section.', 'ceris').'</div>';
        $tempString .= '<div class="bk-section-loading">'.esc_html__( 'Loading ...', 'ceris' ).'</div>';
        $tempString .= '</div>';
        
        $tempString .= '<!-- Module -->';
        $tempString .= '<script id="bk-template-module" type="text/template">';
        $tempString .= '<div class="bk-module-item">';
        $tempString .= '<input type="hidden" class="bk_module_order">';
        $tempString .= '<input type="hidden" class="bk-module-type">';
        $tempString .= '<div class="bk-module-bar">';
        $tempString .= '<div class="bk-module-toolbox">';
        $tempString .= '<a class="bk-module-open-option" href="#"></a>';
        $tempString .= '<a class="bk-module-delete" href="#"><i class="mdicon mdicon-close"></i></a>';
        $tempString .= '</div>';
        $tempString .= '<i class="bk-module-handle mdicon mdicon-more_horiz"></i>';
        $tempString .= '<div class="bk-module-label"></div>';
        $tempString .= '</div>';
        $tempString .= '<div class="bk-module-options clearfix hidden">';
        $tempString .= '<div class="bk-module-tabs">';
        $tempString .= '<a class="bk-tab-1 active" href="#">General</a>';
        $tempString .= '<a class="bk-tab-2" href="#">Query Option</a>';
        $tempString .= '<a class="bk-tab-3" href="#">Color</a>';
        $tempString .= '<a class="bk-tab-4" href="#">Typography</a>';
        $tempString .= '<a class="bk-tab-5" href="#">Tabs</a>';
        $tempString .= '<a class="bk-tab-6" href="#">Tabs</a>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        $tempString .= '</script>';
        
        $tempString .= '<script id="bk-template-module-option" type="text/template">';
        $tempString .= '<div class="bk-module-option-wrap">';
        $tempString .= '<div class="bk-module-option-label-wrapper">';
        $tempString .= '<label class="bk-module-option-label"></label>';
        $tempString .= '<div class="bk-module-option-description"></div>';
        $tempString .= '</div>';
        $tempString .= '<div class="bk-module-option-field-wrapper"></div>';
        $tempString .= '</div>';
        $tempString .= '</script>';
        
        $tempString .= '<!-- Fields Template -->';
        
        $tempString .= '<!-- Text -->';
        $tempString .= '<script id="bk-template-field-text" type="text/template">';
        $tempString .= '<input class="bk-field" type="text">';
        $tempString .= '</script>';
        
        $tempString .= '<!-- Range Slider -->';
        $tempString .= '<script id="atbs-range-slider" type="text/template">';
        $tempString .= '<input type="range" step="5" min="-100" max="0" value="" class="bk-field atbs-range-slider">';
        $tempString .= '<p class="atbs-range-val"></p>';
        $tempString .= '</script>';
        
        $tempString .= '<!-- Range Slider Positive-->';
        $tempString .= '<script id="atbs-range-slider-pos" type="text/template">';
        $tempString .= '<input type="range" step="5" min="20" max="100" value="" class="bk-field atbs-range-slider">';
        $tempString .= '<p class="atbs-range-val"></p>';
        $tempString .= '</script>';
        
        $tempString .= '<!-- Textarea -->';              
        $tempString .= '<script id="bk-template-field-textarea" type="text/template">';
        $tempString .= '<textarea rows="4" cols="50" class="bk-field textarea-animated" type="text">';
        $tempString .= '</textarea rows="10" cols="50">';
        $tempString .= '</script>';
        
       
        $tempString .= '<!-- Color -->';
        $tempString .= '<script id="bk-template-field-colorpicker" type="text/template">';
        $tempString .= '<input class="bk-field colorpicker" type="text">';
        $tempString .= '</script>';

        $tempString .= '<!-- Number -->';
        $tempString .= '<script id="bk-template-field-number" type="text/template">';
        $tempString .= '<input class="bk-field" type="number" name="quantity" min="0">';
        $tempString .= '</script>';

         
        $tempString .= '<!-- Checkbox -->';
        $tempString .= '<script id="bk-template-field-checkbox" type="text/template">';
        $tempString .= '<input class="bk-field" type="hidden">';
        $tempString .= '<label>';
        $tempString .= '<input class="bk-field" type="checkbox">';
        $tempString .= '<span></span>';
        $tempString .= '</label>';
        $tempString .= '</script>';
        
        
        $tempString .= '<!-- Date Picker -->';           
        $tempString .= '<script id="bk-template-field-datepicker" type="text/template">';
        $tempString .= '<input class="bk-field datepicker" type="text" name="datepicker"/>';
        $tempString .= '</script>';
        
        
        $tempString .= '<!-- Time Picker -->';
        $tempString .= '<script id="bk-template-field-timepicker" type="text/template">';
        $tempString .= '<input class="bk-field timepicker input-small" type="text" name="timepicker"/>';
        $tempString .= '</script>';
                
        $tempString .= '<!-- Select -->';
        $tempString .= '<script id="bk-template-field-select" type="text/template">';
        $tempString .= '<select class="bk-field"></select>';
        $tempString .= '</script>';
                
        $tempString .= '<!-- Category Single-->';
        $tempString .= '<script id="bk-template-field-onecategory" type="text/template">';
        $tempString .= wp_dropdown_categories( 
        	array(
        		'show_option_all'    => 'All Categories',
        		'hide_empty' => 1,
        		'class' => 'bk-field',
                'selected' => 0,
        		'show_count'    => true,
        		'hierarchical' => true,
                'echo' => false
        	)
        ); 
        $tempString .= '</script>';
        $tempString .= '<!-- Category Multiple Select -->';
        $tempString .= '<script id="bk-template-field-category" type="text/template">';
        	$select_cats = wp_dropdown_categories( array(
        		'show_option_all'    => 'All Categories',
        		'hide_empty' => 1,
        		'class' => 'bk-field',
        		'hierarchical' => true,
        		'show_count'    => true,
        		'echo' => false )
           );
        $tempString .= str_replace( "class='bk-field'", "class='bk-field bk-category-field' multiple='multiple' size='6'", $select_cats );
           
        $tempString .= '</script>';
        
        $tempString .= '<!-- Category Tabs -->';    
        $tempString .= '<script id="bk-template-field-categorytabs" type="text/template">';
        	$select_cats = wp_dropdown_categories( array(
        		'show_option_all'   => 'Disable Tabs',
        		'hide_empty' => 1,
        		'class' => 'bk-field',
        		'hierarchical' => true,
        		'echo' => false )
        	);
        $tempString .= str_replace( "class='bk-field'", "class='bk-field bk-category-field' multiple='multiple' size='6'", $select_cats );
        $tempString .= '</script>';
        $tempString .= '<!-- Image -->';
        $tempString .= '<script id="bk-template-field-image" type="text/template">';
        
        $tempString .= '<input class="bk-field taxonomy_image" type="text" name="taxonomy_image" value="" />
                            <div class="upload-buttons">
                            <br/>
                    		<button class="ceris_upload_image_button button">' . esc_html__('Upload/Add image', 'ceris') . '</button>
                    		<button class="ceris_remove_image_button button">' . esc_html__('Remove image', 'ceris') . '</button>
                            </div>
                            ';
        $tempString .= '</script>';
        
        $tempString .= '<!-- Sidebar in module -->';
        $tempString .= '<script id="bk-sidebar-module-template" type="text/template">';
        $tempString .= '<select class="bk-field bk-sidebar-order-field">';
        foreach ( $GLOBALS['wp_registered_sidebars'] as $m_sidebar ) :
        	$tempString .= '<option value="'.esc_attr( $m_sidebar['id'] ).'">';
        	$tempString .= ucwords( $m_sidebar['name'] );
        	$tempString .= '</option>';	
        endforeach;
        $tempString .= '</select>';
        $tempString .= '</script>';
        
        $tempString .= '<!-- Sidebar -->';
        $tempString .= '<script id="bk-sidebar-template" type="text/template">';
        $tempString .= '<div class="sidebar"><label>'.esc_html__('Choose a sidebar', 'ceris').'</label>';
        $tempString .= '<select class = "bk-sidebar-order">';
        $tempString .= '<option value="0">'.esc_html__( 'None', 'ceris' ).'</option>';
        foreach ( $GLOBALS['wp_registered_sidebars'] as $sidebar ) :
        	$tempString .= '<option value="'.esc_attr( $sidebar['id'] ).'">';
        	$tempString .= ucwords( $sidebar['name'] );
        	$tempString .= '</option>';	
        endforeach;
        $tempString .= '</select>';
        $tempString .= '</div>';
        $tempString .= '</script>';
        
        $tempString .= '<!-- Sidebar Position -->';
        $tempString .= '<script id="bk-sidebarpos-template" type="text/template">';
        $tempString .= '<div class="sidebarpos">';
        $tempString .= '<select class = "bk-sidebarpos-order">';
        $tempString .= '<option value="right">'.esc_html__( 'Right Sidebar', 'ceris' ).'</option>';
        $tempString .= '<option value="left">'.esc_html__( 'Left Sidebar', 'ceris' ).'</option>';
        $tempString .= '</select>';
        $tempString .= '</div>';
        $tempString .= '</script>';
        
        $tempString .= '<script id="bk-template-field-html" type="text/template">';
        $tempString .= '<textarea class="bk-field"></textarea>';
        $tempString .= '</script>';
        
        $tempString .= '<script id="bk-template-fullwidth-html" type="text/template">';
        $tempString .= '<div class="bk-section fullwidth">';
        
        $tempString .= '<div class="bk-section-bar">';
        $tempString .= '<div class="bk-section-toolbox">';
        $tempString .= '<a class="bk-section-open-option" href="#"></a>';
        $tempString .= '<a class="bk-section-delete" href="#"><i class="mdicon mdicon-close"></i></a>';
        $tempString .= '</div>';
        $tempString .= '<i class="bk-sec-sort-ctrl mdicon mdicon-apps"></i>';
        $tempString .= '<div class="bk-sec-label"></div>';
        $tempString .= '</div>';
        $tempString .= '<div class="bk-modules-wrap">';
        $tempString .= '<input type="hidden" class="bk-section-nth">';
        $tempString .= '<div class="bk-fullwidth-module-menu">';
        $tempString .= '<div class="dropdown">';
        $tempString .= '<button class="button button-primary button-large dropdown-toggle" type="button" id="add-module-button" data-toggle="dropdown">';
        $tempString .= esc_html__( 'Add Module', 'ceris' );
        $tempString .= '<span class="caret"></span>';
        $tempString .= '</button>';
        $tempString .= '<ul class="dropdown-menu" role="menu" aria-labelledby="add-section-button"></ul>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        
        $tempString .= '<div class="bk-modules">';
        $tempString .= '<input type="hidden" class="bk-section-order" name="bk_section_order[]">';
        $tempString .= '<input type="hidden" class="bk-section-type">';
        $tempString .= '<div class="bk-section-empty">'.esc_html__( 'Click Add Module button to add new module.', 'ceris' ).'</div>';
        $tempString .= '<div class="bk-section-loading">'.esc_html__( 'Loading ...', 'ceris' ).'</div>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        $tempString .= '</script>';
        
        $tempString .= '<script id="bk-template-rsb-html" type="text/template">';
        $tempString .= '<div class="bk-section has-rsb">';
        
        $tempString .= '<div class="bk-section-bar">';
        $tempString .= '<div class="bk-section-toolbox">';
        $tempString .= '<a class="bk-section-open-option" href="#"></a>';
        $tempString .= '<a class="bk-section-delete" href="#"><i class="mdicon mdicon-close"></i></a>';
        $tempString .= '</div>';
        $tempString .= '<i class="bk-sec-sort-ctrl mdicon mdicon-apps"></i>';
        $tempString .= '<div class="bk-sec-label"></div>';
        $tempString .= '</div>';
        
        $tempString .= '<div class="bk-modules-wrap">';
        $tempString .= '<input type="hidden" class="bk-section-nth">';
        $tempString .= '<div class="bk-has-rsb-module-menu">';
        $tempString .= '<div class="dropdown">';
        $tempString .= '<button class="button button-primary button-large dropdown-toggle" type="button" id="add-module-button" data-toggle="dropdown">';
        $tempString .= esc_html__( 'Add Module', 'ceris' );
        $tempString .= '<span class="caret"></span>';
        $tempString .= '</button>';
        $tempString .= '<ul class="dropdown-menu" role="menu" aria-labelledby="add-section-button"></ul>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        
        $tempString .= '<div class="bk-modules">';
        $tempString .= '<input type="hidden" class="bk-section-order" name="bk_section_order[]">';
        $tempString .= '<input type="hidden" class="bk-section-type">';
        $tempString .= '<div class="bk-section-empty">'.esc_html__( 'Click Add Module button to add new module.', 'ceris' ).'</div>';
        $tempString .= '<div class="bk-section-loading">'.esc_html__( 'Loading ...', 'ceris' ).'</div>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        $tempString .= '</script>';
        
        $tempString .= '<script id="bk-template-has-innersb-html" type="text/template">';
        $tempString .= '<div class="bk-section has-innersb clearfix">';
        $tempString .= '<div class="bk-section-bar">';
        $tempString .= '<div class="bk-section-toolbox">';
        $tempString .= '<a class="bk-section-open-option" href="#"></a>';
        $tempString .= '<a class="bk-section-delete" href="#"><i class="mdicon mdicon-close"></i></a>';
        $tempString .= '</div>';
        $tempString .= '<i class="bk-sec-sort-ctrl mdicon mdicon-apps"></i>';
        $tempString .= '<div class="bk-sec-label"></div>';
        $tempString .= '</div>';
        
        $tempString .= '<div class="bk-modules-wrap">';
        $tempString .= '<input type="hidden" class="bk-section-nth">';
        $tempString .= '<input type="hidden" class="bk-section-order" name="bk_section_order[]">';
        $tempString .= '<div class="leftsec">';
        $tempString .= '<div class="bk-has-innersb-module-menu">';
        $tempString .= '<div class="dropdown">';
        $tempString .= '<button class="button button-primary button-large dropdown-toggle" type="button" id="add-module-button" data-toggle="dropdown">';
        $tempString .= esc_html__( 'Add Module', 'ceris' );
        $tempString .= '<span class="caret"></span>';
        $tempString .= '</button>';
        $tempString .= '<ul class="dropdown-menu" role="menu" aria-labelledby="add-section-button"></ul>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        $tempString .= '<div class="bk-modules leftsec_placeholder">';
        $tempString .= '<input type="hidden" class="bk-section-type">';
        $tempString .= '<div class="bk-section-empty">'.esc_html__( 'Click Add Module button to add new section.', 'ceris' ).'</div>';
        $tempString .= '<div class="bk-section-loading">'.esc_html__( 'Loading ...', 'ceris' ).'</div>';
        $tempString .= '</div>';
        
        $tempString .= '</div>';
        $tempString .= '<div class="rightsec">';
        $tempString .= '<div class="bk-has-innersb-module-menu">';
        $tempString .= '<div class="dropdown">';
        $tempString .= '<button class="button button-primary button-large dropdown-toggle" type="button" id="add-module-button" data-toggle="dropdown">';
        $tempString .= esc_html__( 'Add Module', 'ceris' );
        $tempString .= '<span class="caret"></span>';
        $tempString .= '</button>';
        $tempString .= '<ul class="dropdown-menu" role="menu" aria-labelledby="add-section-button"></ul>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        $tempString .= '<div class="bk-modules rightsec_placeholder">';
        $tempString .= '<input type="hidden" class="bk-section-type">';
        $tempString .= '<div class="bk-section-empty">'.esc_html__( 'Click Add Module button to add new module.', 'ceris' ).'</div>';
        $tempString .= '<div class="bk-section-loading"><i class="icon-entypo-arrows-ccw"></i> '.esc_html__( 'Loading ...', 'ceris' ).'</div>';
        $tempString .= '</div>';
        
        $tempString .= '</div>';
        $tempString .= '</div>';
        $tempString .= '</div>';
        $tempString .= '</script>';
        
        $tempString .= '</div>';
        
        echo ( $tempString );                    
	}
}