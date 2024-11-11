/* -----------------------------------------------------------------------------
 * Page Template Meta-box
 * -------------------------------------------------------------------------- */
;(function( $, window, document, undefined ){
	"use strict";
	
	$( document ).ready( function () {
        var container = $('#bk-container');
        var template = $( '#page_template' ).val();

        if(container.length) {  
            if ( 'page_builder.php' == template ) {
                container.show();
            }
        }
        var rangeSliders = $(".atbs-range-slider");
        
        rangeSliders.each(function(){
            //console.log(this.value);
            var output = $(this).siblings();
            output.html(this.value+'px'); // Display the default slider value
            
            // Update the current slider value (each time you drag the slider handle)
            this.oninput = function() {
                output = $(this).siblings();
                output.html(this.value+'px');
            } 
        });
        
        var template = $( '#page_template' ).val();
        //console.log(template);
		// Page Composer Template
        if (typeof template === "undefined") {
            return;
        }
		if ( 'page_builder.php' == template ) {
			$.page_builder( 'show' );
			$( '#bk_page_options' ).hide();
            $( '#pagenav_pagebuilder').show();
            
            $('.bk-module-options').find('.all-option-tab').hide();
            $('.bk-module-options').find('.all-option-tab-1').show();

		} else {
			$.page_builder( 'hide' );
			$( '#bk_page_options' ).show();
            $('#pagenav_pagebuilder').hide();
		}
        
        $( '#page_template' ).change( function() {
            var template = $( '#page_template' ).val();
            //console.log(template);
			// Page Composer Template
			if ( 'page_builder.php' == template ) {
				$.page_builder( 'show' );
				$( '#bk_page_options' ).hide();
                $( '#pagenav_pagebuilder').show();
                
                $('.bk-module-options').find('.all-option-tab').hide();
                $('.bk-module-options').find('.all-option-tab-1').show();

			} else {
				$.page_builder( 'hide' );
				$( '#bk_page_options' ).show();
                $('#pagenav_pagebuilder').hide();
			}
            
		} );
                        
	} );
})( jQuery, window , document );
