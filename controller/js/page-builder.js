(function($) {
    "use strict";
    $=jQuery;
    var $optionRequirement = [];
    /*
        function isWysiwygareaAvailable() {
          // If in development mode, then the wysiwygarea must be available.
          // Split REV into two strings so builder does not replace it :D.
          if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
              return true;
          }
  
          return !!CKEDITOR.plugins.get( 'wysiwygarea' );
      }
      */
      function isInArray(value, array) {
          return array.indexOf(value) > -1;
      }
      function pagebuilderOptionRequirement($new_module, $optionRequirement){
          Object.keys($optionRequirement).map(function(objectKey, index) {
              var objectVal = $optionRequirement[objectKey];
              var optionVal;
              var element = new Array();
              
              var rangeSliders = $(".atbs-range-slider");
              rangeSliders.each(function(){
                  var output = $(this).siblings();
                  output.html(this.value+'px'); // Display the default slider value
                  
                  // Update the current slider value (each time you drag the slider handle)
                  this.oninput = function() {
                      output = $(this).siblings();
                      output.html(this.value+'px');
                  } 
              });
              
              var rangeSliders = $(".atbs-range-slider-pos");
              rangeSliders.each(function(){
                  var output = $(this).siblings();
                  output.html(this.value+'px'); // Display the default slider value
                  
                  // Update the current slider value (each time you drag the slider handle)
                  this.oninput = function() {
                      output = $(this).siblings();
                      output.html(this.value+'px');
                  } 
              });
              
              if($(objectVal).length > 0) {
                  $.each( objectVal, function( key, val ) {
                      if(isInArray(key, element) != 1) {
                          element.push(key);
                      }
                      optionVal = $new_module.find('.'+key).find('select').find('option:selected').val();
                      if(optionVal === val) {
                          $new_module.find('.'+objectKey).slideDown();
                      }else {
                          $new_module.find('.'+objectKey).slideUp();
                      }
                  });
              }
              if(element.length > 0){
                  $.each( element, function( key, val ) {
                      var el = $new_module.find('.'+val).find('select');    
                      el.change(function() {
                          $.each( objectVal, function( key, val ) {
                              if(isInArray(key, element) != 1) {
                                  element.push(key);
                              }
                              optionVal = $new_module.find('.'+key).find('select').find('option:selected').val();
                              if(optionVal === val) {
                                  $new_module.find('.'+objectKey).slideDown();
                              }else {
                                  $new_module.find('.'+objectKey).slideUp();
                              }
                          });
                      });
                  });
              }
          });
      }
      function pagebuilderViewAllLinkControl(AjaxOption) {
          var el = AjaxOption.find('select');
          var HeadingOption = AjaxOption.siblings('.ceris-heading-style').find('select').find('option:selected').val();
          if(el.find('option:selected').val() == 'viewall') {
              AjaxOption.siblings('.ceris-view-all').slideDown('slow');
          }else {
              AjaxOption.siblings('.ceris-view-all').slideUp('slow');
          }
          el.change(function() {
              if(this[this.selectedIndex].value == 'viewall') {
                  HeadingOption = AjaxOption.siblings('.ceris-heading-style').find('select').find('option:selected').val();
                  AjaxOption.siblings('.ceris-view-all').slideDown('slow');
              }else {
                  AjaxOption.siblings('.ceris-view-all').slideUp('slow');
              }
          });
      }
      function pagebuilderViewAllLinkControl_byHeading(HeadingOption) {
          var el = HeadingOption.find('select');
          var ajaxButtonOption = HeadingOption.siblings('.ceris-ajax-load-more').find('select').find('option:selected').val();
          if((el.find('option:selected').val() == 'center') || (el.find('option:selected').val() == 'large-center') || (el.find('option:selected').val() == 'line-around') || (el.find('option:selected').val() == 'large-line-around')) {
              HeadingOption.siblings('.ceris-view-all').slideUp('slow');
              HeadingOption.siblings('.ceris-ajax-load-more').slideUp('slow');
          }else {
              HeadingOption.siblings('.ceris-ajax-load-more').slideDown('slow');
              if(ajaxButtonOption == 'viewall') {
                  HeadingOption.siblings('.ceris-view-all').slideDown('slow');
              }
          }
          el.change(function() {
              if((this[this.selectedIndex].value == 'center') || (this[this.selectedIndex].value == 'large-center') || (this[this.selectedIndex].value == 'line-around') || (this[this.selectedIndex].value == 'large-line-around')) {
                  HeadingOption.siblings('.ceris-view-all').slideUp('slow');
                  HeadingOption.siblings('.ceris-ajax-load-more').slideUp('slow');
              }else {
                  ajaxButtonOption = HeadingOption.siblings('.ceris-ajax-load-more').find('select').find('option:selected').val();
                  HeadingOption.siblings('.ceris-ajax-load-more').slideDown('slow');
                  if(ajaxButtonOption == 'viewall') {
                      HeadingOption.siblings('.ceris-view-all').slideDown('slow');
                  }
              }
          });
      }    
      function pagebuilderViewMoreLinkControl(VMOption) {
          var el = VMOption.find('select');
          //console.log(el.find('option:selected').val());
          if(el.find('option:selected').val() == 'yes') {
              VMOption.siblings('.ceris-view-more').slideDown('slow');
          }else {
              VMOption.siblings('.ceris-view-more').slideUp('slow');
          }
          el.change(function() {
              //console.log(el.find('option:selected').val());
              if(this[this.selectedIndex].value == 'yes') {
                  VMOption.siblings('.ceris-view-more').slideDown('slow');
              }else {
                  VMOption.siblings('.ceris-view-more').slideUp('slow');
              }
          });
      }
      $( document ).ready( function() {
          var $this;
          var MAX_CHILD = 100;
          var composerData = new Array;
          $.extend( {
              page_builder: function( action ) {
                  if ( 'show' == action ) {
                      BK_PAGE_BUILDER.show();
                  } else if ( 'hide' == action ) {
                      BK_PAGE_BUILDER.hide();
                  }
              },
          } );
          var BK_PAGE_BUILDER = {
              bk_wrapper: {
                  wrapper: '#bk-container',
              },
              
              decodeEntities(encodedString) {
                var textArea = document.createElement('textarea');
                textArea.innerHTML = encodedString;
                return textArea.value;
              },
  
              run_cfg: function( options ) {
                  $this = this;
                  
                  var custom_fields = $this.decodeEntities($( '.composer-customfieldspage p' ).text());
                  
                  custom_fields = custom_fields.split("%%separate%%");
                  console.log(custom_fields);
                  $.each(custom_fields, function( index, value ) {
                      value = value.split("%%KEY_VAL%%");
                      if((value[1] == 'https') || (value[1] == 'http')) {
                          composerData[value[0]] = value[1]+value[2];
                      }else{
                          composerData[value[0]] = value[1];
                      }
                  });
                  
                  $this.section_nth = 1;
                  
                  $this.options = $.extend( {}, $this.bk_wrapper, options );
      
                  $this.$bkcontainer = $( $this.options.wrapper );
      
                  $this.sec_menu_cfg();
          
                  $this.bk_sec_cfg();
              },
      
              bk_sec_cfg: function() {
                  $this.$bk_sections = $this.$bkcontainer.find( '.bk-sections' );
                  for ( var i = 1; i <= MAX_CHILD; i++ ) {
                      var blk_order = 'bk_section_'+i;
                      var bk_sec_format = $this.bk_get_blk_val( blk_order );
                      //console.log(bk_sec_format);
                                  
                      if ( ! bk_sec_format ) continue;
      
                      var $section = $this.add_section( bk_sec_format, blk_order );
                      //console.log(bk_sec_format);
                      if (bk_sec_format =='has-rsb') {
                          $this.$bk_modules = $section.find(".bk-modules-wrap");
                          var $sidebar = $( $( '#bk-sidebar-template' ).html() ); //get template module
                          $sidebar.find( '.bk-sidebar-order').attr( 'name', 'bk_sidebar_order_'+($this.section_nth - 1) ).val($this.bk_get_blk_val( 'bk_sidebar_'+i )); 
                          var $sidebarPos = $( $( '#bk-sidebarpos-template' ).html() ); //get template module
                          $sidebarPos.find( '.bk-sidebarpos-order').attr( 'name', 'bk_sidebarpos_order_'+($this.section_nth - 1) ).val($this.bk_get_blk_val( 'bk_sidebarpos_'+i )); 
                          $this.$bk_modules.append ($sidebar);
                          $this.$bk_modules.append ($sidebarPos);
                          $this.$bk_modules = $section.find(".bk-modules");
                      }else if(bk_sec_format =='has-innersb') {
                          //console.log($section.find(".bk-modules-wrap"));
                          $this.$bk_modules = $section.find(".bk-modules-wrap");
                          var $sidebar = $( $( '#bk-sidebar-template' ).html() ); //get template module
                          $sidebar.find( '.bk-sidebar-order').attr( 'name', 'bk_sidebar_order_'+($this.section_nth - 1) ).val($this.bk_get_blk_val( 'bk_sidebar_'+i )); 
                          $this.$bk_modules.append ($sidebar);
                          $this.$bk_modules = $section.find(".bk-modules");
                      }
                      
                      for ( var j = 1; j <= MAX_CHILD; j++ ) {
                          var blk_order = 'bk_fullwidth_module_'+i+'_'+j;
                          var bk_sec_format = $this.bk_get_blk_val( blk_order );
                          if ( ! bk_sec_format ) continue;
          
                          $this.module_append( bk_sec_format, blk_order, 'fullwidth' );
                      }
                      for ( var j = 1; j <= MAX_CHILD; j++ ) {
                          var blk_order = 'bk_has_rsb_module_'+i+'_'+j;
                          var bk_sec_format = $this.bk_get_blk_val( blk_order );         
                          if ( ! bk_sec_format ) continue;
          
                          $this.module_append( bk_sec_format, blk_order, 'has-rsb' );
                      }
                      for ( var j = 1; j <= MAX_CHILD; j++ ) {
                          var blk_order = 'bk_leftsec_module_'+i+'_'+j;
                          var bk_sec_format = $this.bk_get_blk_val( blk_order );           
                          if ( ! bk_sec_format ) continue;
          
                          $this.module_append( bk_sec_format, blk_order, 'has-innersb' );
                      }
                      for ( var j = 1; j <= MAX_CHILD; j++ ) {
                          var blk_order = 'bk_rsec_module_'+i+'_'+j;
                          var bk_sec_format = $this.bk_get_blk_val( blk_order );         
                          if ( ! bk_sec_format ) continue;
          
                          $this.module_append( bk_sec_format, blk_order, 'has-innersb' );
                      }
                  }
      
                  $this.$bk_sections.sortable( { handle: ".bk-sec-sort-ctrl, .bk-sec-label", placeholder: 'bk-sec-placeholder', forcePlaceholderSize: true, 
                      update: function(e, ui) {
                          var new_sectionid, new_moduleid;
                          var module_el;
                          var i, module_elorder = Array ;
                          ui.item.parent().find(".bk-section-nth").each(function(item, element){
                              new_sectionid = item+1;
                              element.setAttribute("id",new_sectionid); 
                          });
                          
                          ui.item.parent().find(".bk-section").each(function(item, element){
                              new_moduleid = item+1;
                              module_el = element.getElementsByClassName("bk-module-item");
                              //Arrange Modules
                              for(i=0; i < (module_el.length); i++){
                                  module_elorder = module_el.item(i).getElementsByClassName("bk_module_order")[0];
                                  //console.log(module_elorder.name);
                                  if(module_elorder.name.substring(0,25) == 'bk_fullwidth_module_order'){
                                      module_elorder.name = "bk_fullwidth_module_order_"+new_moduleid+"[]";
                                  }else if(module_elorder.name.substring(0,23) == 'bk_leftsec_module_order'){
                                      module_elorder.name = "bk_leftsec_module_order_"+new_moduleid+"[]";                             
                                  }else if(module_elorder.name.substring(0,20) == 'bk_rsec_module_order'){
                                      module_elorder.name = "bk_rsec_module_order_"+new_moduleid+"[]";                             
                                  }else if(module_elorder.name.substring(0,23) == 'bk_has_rsb_module_order'){
                                      module_elorder.name = "bk_has_rsb_module_order_"+new_moduleid+"[]";                            
                                  }                               
                              }
                              // Arrange sidebar
                              var sectionName = element.className.split(' ')[1];
                              if((sectionName == 'has-rsb') || (sectionName == 'has-innersb')) {
                                  element.getElementsByClassName('bk-sidebar-order')[0].name = 'bk_sidebar_order_'+new_moduleid ;
                                  element.getElementsByClassName('bk-sidebarpos-order')[0].name = 'bk_sidebarpos_order_'+new_moduleid ;
                              }   
                          });
                       },
                  } );
                  $this.$bk_sections.find( '.bk-section-loading' ).remove();
              },
      
              sec_menu_cfg: function() {
                  $this.$append_sec_btn = $this.$bkcontainer.find( '#add-section-button' ).dropdown();
                  var $menu_list = $this.$bkcontainer.find( '.bk-toolbox .menu' );
                  
                  $.each( bk_sections, function( bk_sec_format, section_settings ) {
                      var $menu_item = $( '<li role="presentation"><a role="menuitem" tabindex="-1" href="#"></a></li>' );  //get menu list
                      $menu_item.find( 'a' )
                          .data( 'bk-section-type', bk_sec_format );
      //                    console.log(bk_sec_format); 
                      $menu_item.addClass (bk_sec_format);
                      $menu_list.append( $menu_item );
                  } );
                  $menu_list.find( 'a' ).click( $this.add_sec_event );
              },
      
              init_section: function( $new_section ) {
                  $new_section.find( '.bk-section-bar, .bk-section-open-option' ).click( $this.on_click_open_section );
                  $new_section.find( '.bk-section-delete' ).click( $this.on_click_delete_section );
              },
      
              add_section: function( bk_sec_format, blk_order ) {
                  if ( 'undefined' === typeof bk_sections[bk_sec_format] ) return;
                  
                  var uuid = $.uuid();
                  var id = 'bk_sections['+uuid+']';
                  //console.log(bk_sec_format);
                  //alert (bk_sec_format);
                  if(bk_sec_format =='fullwidth'){
                      var $new_section = $( $( '#bk-template-fullwidth-html' ).html() ); //get template section
                      $new_section.find( '.bk-sec-label' ).html( bk_sections[bk_sec_format] );  
                  }else if(bk_sec_format =='has-innersb'){
                      var $new_section = $( $( '#bk-template-has-innersb-html' ).html() ); //get template section
                      $new_section.find( '.bk-sec-label' ).html( bk_sections[bk_sec_format] );  
                  }else if(bk_sec_format =='has-rsb'){
                      var $new_section = $( $( '#bk-template-rsb-html' ).html() ); //get template section
                      $new_section.find( '.bk-sec-label' ).html( bk_sections[bk_sec_format] );  
                  }
                  //var $new_option = $this.render_section_options( bk_sec_format, id, blk_order );
                  
                  //$new_section.find( '.bk-section-options' ).append( $new_option );
                  $new_section.find( '.bk-section-nth').attr( 'id', $this.section_nth );            
                  $new_section.find( '.bk-section-type' ).attr( 'name', id+'[_type]' ).val( bk_sec_format );
                  $new_section.find( '.bk-section-order' ).val( uuid );
      
                  $this.$bk_sections.append( $new_section );       //append to placeholder
      
                  $this.module_menu_cfg($new_section);
                  
                  $this.init_modules();
                  
                  $this.init_section( $new_section );           //init to slidetoggle, delete
                  
                  $this.section_nth ++;
                  
                  return $new_section;
              },
      
              bk_get_blk_val: function( blk_order ) {
  
                  if ( ! blk_order ) return false;                
                  
                  if (!$.inArray( blk_order, composerData)) {
                      return false;
                  }
                  
                  return composerData[blk_order];
              },        
      
              add_sec_event: function( e ) {
      //		  console.log($this);
                  var bk_sec_format = $( e.target ).data( 'bk-section-type' );
                  var $new_section = $this.add_section( bk_sec_format, false );
                  if (bk_sec_format =='has-rsb'){
                      $this.$bk_modules = $new_section.find(".bk-modules-wrap");
                      //console.log($this.$bk_modules);
                      var $sidebar = $( $( '#bk-sidebar-template' ).html() ); //get template module
                      $sidebar.find( '.bk-sidebar-order').attr( 'name', 'bk_sidebar_order_'+($this.section_nth - 1) );
                      var $sidebarpos = $( $( '#bk-sidebarpos-template' ).html() ); //get template module
                      $sidebarpos.find( '.bk-sidebarpos-order').attr( 'name', 'bk_sidebarpos_order_'+($this.section_nth - 1) );
                      //console.log($sidebar.find( '.bk-sidebar-order'));    
                      $this.$bk_modules.append ($sidebar);
                      $this.$bk_modules.append ($sidebarpos);
                      $this.$bk_modules = $new_section.find(".bk-modules");
                  }else if(bk_sec_format =='has-innersb') {
                      $this.$bk_modules = $new_section.find(".bk-modules-wrap");
                      //console.log($this.$bk_modules);
                      var $sidebar = $( $( '#bk-sidebar-template' ).html() ); //get template module
                      $sidebar.find( '.bk-sidebar-order').attr( 'name', 'bk_sidebar_order_'+($this.section_nth - 1) );
                      //console.log($sidebar.find( '.bk-sidebar-order'));    
                      $this.$bk_modules.append ($sidebar);
                      $this.$bk_modules = $new_section.find(".bk-modules");
                  }
                  $new_section.find( '.bk-section-open-option' ).trigger( 'click' );
                  $this.$append_sec_btn.dropdown( 'toggle' );
                  return false;
              },
              
              hasClass: function(element, cls) {
                  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
              },        
              on_click_delete_section: function( e ) {
                  var nth = 1, i;
                  var section_container;
                  var module_element;
                  var module_elorder;
                  var new_moduleid = 0;
                  $( e.target ).parents( '.bk-section' ).addClass("beremoved");
                  section_container = $(e.target).parents('.bk-sections');
                  section_container.find(".bk-section").each(function(sectionitem, sectionelement){
                      new_moduleid = new_moduleid + 1;
                      if($this.hasClass(sectionelement, 'beremoved')){
                          sectionelement.remove();
                          new_moduleid = new_moduleid - 1;
                          $this.section_nth--;                    
                      }else{
                          sectionelement.getElementsByClassName("bk-section-nth")[0].id=nth;
                          module_element = sectionelement.getElementsByClassName("bk-module-item");
                          //Arrange modules
                          for(i=0; i < (module_element.length); i++){
                              module_elorder = module_element.item(i).getElementsByClassName("bk_module_order")[0];
                              if(module_elorder.name.substring(0,25) == 'bk_fullwidth_module_order'){
                                  module_elorder.name = "bk_fullwidth_module_order_"+new_moduleid+"[]";
                              }else if(module_elorder.name.substring(0,23) == 'bk_leftsec_module_order'){
                                  module_elorder.name = "bk_leftsec_module_order_"+new_moduleid+"[]";                             
                              }else if(module_elorder.name.substring(0,20) == 'bk_rsec_module_order'){
                                  module_elorder.name = "bk_rsec_module_order_"+new_moduleid+"[]";                             
                              }else if(module_elorder.name.substring(0,23) == 'bk_has_rsb_module_order'){
                                  module_elorder.name = "bk_has_rsb_module_order_"+new_moduleid+"[]";                           
                              }       
                          }
                          // Arrange sidebar
                          var sectionName = sectionelement.className.split(' ')[1];
                          if((sectionName == 'has-rsb') || (sectionName == 'has-innersb')) {
                              sectionelement.getElementsByClassName('bk-sidebar-order')[0].name = 'bk_sidebar_order_'+new_moduleid ;
                              sectionelement.getElementsByClassName('bk-sidebarpos-order')[0].name = 'bk_sidebarpos_order_'+new_moduleid ;
                          }
                          nth++;
                      }    
                  });
                  //console.log(section_container.find(".fullwidth"));
                  return false;
              },
      
              on_click_open_section: function( e ) {
                  var $section_options = $( e.target ).parents( '.bk-section' ).find( '.bk-modules-wrap' );
                  $section_options.slideToggle();
                  return false;
              },
              
              show: function() {
                  $( '#postdivrich' ).hide();
                  $this.$bkcontainer.show();
              },
      
              hide: function() {
                  $( '#postdivrich' ).show();
                  $this.$bkcontainer.hide();
              },
      
              render_field: {
      
                  select: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-select' ).html() );
                      $.each( option.options, function( value, label ) {
                          $field.append( $( '<option>' ).attr( 'value', value ).html( label ) );
                      } );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
      
                  number: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-number' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
      
                  text: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-text' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  
                  textarea: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-textarea' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  
                  range_slider: function( option, id, value ) {
                      var $field = $( $( '#atbs-range-slider' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  
                  range_slider_positive: function( option, id, value ) {
                      var $field = $( $( '#atbs-range-slider-pos' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  
                  sidebar_select: function( option, id, value ) {
                      var $field = $( $( '#bk-sidebar-module-template' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  
                  colorpicker: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-colorpicker' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  html: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-html' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  onecategory: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-onecategory' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  category: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-category' ).html() );
                      if ( ! value ) value = '';
                      $.each( $field.find( 'option'), function( i, cat_option) {
                          $(cat_option).removeAttr("selected"); 
                          $(cat_option).removeAttr("class");                    
                      });
                      var $cat_array;
                      $cat_array = value.split(",");                
                      $.each( $cat_array, function( i, cat_id ) { 
                          $field.find( "option[value='"+cat_id+"']" ).attr('selected','selected');
                          if(cat_id == 0) {
                              return false;
                          }
                      });
                      
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  categorytabs: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-categorytabs' ).html() );
                      if ( ! value ) value = '';
                      $.each( $field.find( 'option'), function( i, cat_option) {
                          $(cat_option).removeAttr("selected"); 
                          $(cat_option).removeAttr("class");                    
                      });
                      var $cat_array;
                      $cat_array = value.split(",");                
                      $.each( $cat_array, function( i, cat_id ) { 
                          $field.find( "option[value='"+cat_id+"']" ).attr('selected','selected');
                          if(cat_id == 0) {
                              return false;
                          }
                      });
                      
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  sidebar: function( option, id, value ) {
                      var $field = $( $( '#bk-sidebar-template' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  sidebarpos: function( option, id, value ) {
                      var $field = $( $( '#bk-sidebarpos-template' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  image: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-image' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  datepicker: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-datepicker' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
                  timepicker: function( option, id, value ) {
                      var $field = $( $( '#bk-template-field-timepicker' ).html() );
                      $field.attr( 'name', id ).val( value || option.default );
                      return $field;
                  },
              },
      /*============ Module ===============*/        
              init_modules: function() {
                  $this.$bk_modules.find( '.bk-section-loading' ).remove();
                  $this.$bk_modules.sortable( { handle: ".bk-module-handle, .bk-module-label", placeholder: 'bk-module-placeholder', forcePlaceholderSize: true } );
              },
                      
              module_menu_cfg: function($new_section) {
                  $this.$add_module_button = $new_section.find( '#add-module-button' ).dropdown();
                  $this.$bk_modules = $new_section.find( '.bk-modules' );
                  $this.$leftsec = $new_section.find( '.leftsec_placeholder' );
                  $this.$rightsec = $new_section.find( '.rightsec_placeholder' );
                  var $fullwidth_menu_list = $new_section.find( '.bk-fullwidth-module-menu .dropdown-menu' );
                  var $has_rsb_menu_list = $new_section.find( '.bk-has-rsb-module-menu .dropdown-menu' );
                  var $has_innersb_left_menu_list = $new_section.find( '.leftsec .bk-has-innersb-module-menu .dropdown-menu' );
                  var $has_innersb_right_menu_list = $new_section.find( '.rightsec .bk-has-innersb-module-menu .dropdown-menu' );
                  
                  //Fullwidth
                  $.each( bk_fullwidth_modules, function( module_type, module_settings ) {
                      var $menu_item = $( '<li role="presentation"><a role="menuitem" tabindex="-1" href="#"></a><p></p></li>' );  //get menu list
                      if(module_settings.img != null) {
                          $menu_item.attr("style", "background-image: url('"+module_settings.img+"')");
                      }
                      $menu_item.find( 'a' )
                          .data( 'bk-module-type', module_type )
                          .html( module_settings.title );
                      $menu_item.find( 'p' )
                          .html( module_settings.title );
      //                    console.log(module_settings.title);                                                                                                    
                      $fullwidth_menu_list.append( $menu_item );
                  } );
                  $fullwidth_menu_list.find( 'a' ).click( $this.add_module_event );
                  $.each( bk_has_rsb_modules, function( module_type, module_settings ) {
                      var $menu_item = $( '<li role="presentation"><a role="menuitem" tabindex="-1" href="#"></a><p></p></li>' );  //get menu list
                      if(module_settings.img != null) {
                          $menu_item.attr("style", "background-image: url('"+module_settings.img+"')");
                      }
                      $menu_item.find( 'a' )
                          .data( 'bk-module-type', module_type )
                          .html( module_settings.title );
                      $menu_item.find( 'p' )
                          .html( module_settings.title );
      //                    console.log(module_settings.title);                                                                                                    
                      $has_rsb_menu_list.append( $menu_item );
                  } );
                  $has_rsb_menu_list.find( 'a' ).click( $this.add_module_event );
                  $.each( bk_has_innersb_left_modules, function( module_type, module_settings ) {
                      var $menu_item = $( '<li role="presentation"><a role="menuitem" tabindex="-1" href="#"></a></li>' );  //get menu list
                      if(module_settings.img != null) {
                          $menu_item.attr("style", "background-image: url('"+module_settings.img+"')");
                      }
                      $menu_item.find( 'a' )
                          .data( 'bk-module-type', module_type )
                          .html( module_settings.title );
      //                    console.log(module_settings.title);                                                                                                    
                      $has_innersb_left_menu_list.append( $menu_item );
                  } );
                  $has_innersb_left_menu_list.find( 'a' ).click( $this.add_module_event );
                  $.each( bk_has_innersb_right_modules, function( module_type, module_settings ) {
                      var $menu_item = $( '<li role="presentation"><a role="menuitem" tabindex="-1" href="#"></a></li>' );  //get menu list
                      if(module_settings.img != null) {
                          $menu_item.attr("style", "background-image: url('"+module_settings.img+"')");
                      }
                      $menu_item.find( 'a' )
                          .data( 'bk-module-type', module_type )
                          .html( module_settings.title );
      //                    console.log(module_settings.title);                                                                                                    
                      $has_innersb_right_menu_list.append( $menu_item );
                  } );
                  $has_innersb_right_menu_list.find( 'a' ).click( $this.add_module_event );
              },       
              module_append: function( module_type, blk_order, insection ) {
                  var section_nth = $this.section_nth - 1;
                  var uuid = $.uuid();
                  var id;
                  var $new_module = $( $( '#bk-template-module' ).html() ); //get template module
                  var tabNames;
                  if (insection == 'fullwidth'){
                      id = 'bk_fullwidth_modules['+uuid+']';
                      if (typeof bk_fullwidth_modules[module_type] === "undefined") return;                                        
                      $new_module.addClass(bk_fullwidth_modules[module_type].tabdisable); 
                      tabNames = bk_fullwidth_modules[module_type].tabnames;
                      $.each(tabNames, function(index, item) {
                          $new_module.find('.bk-'+index).html(item);
                      });
                      
                      $new_module.find( '.bk-module-type' ).attr( 'name', id+'[_type]' ).val( module_type ); //append module_type to .bk-module-type
                      $new_module.find( '.bk_module_order' ).val( uuid );                                     //
                      $new_module.find( '.bk_module_order' ).attr( 'name', 'bk_fullwidth_module_order_' + section_nth+'[]' );
                      $new_module.find( '.bk-module-label' ).html( bk_fullwidth_modules[module_type].title );       //
                  }else if (insection == 'has-rsb'){
                      id = 'bk_has_rsb_modules['+uuid+']';
                      if (typeof bk_has_rsb_modules[module_type] === "undefined") return;                    
                      $new_module.addClass(bk_has_rsb_modules[module_type].tabdisable);
                      tabNames = bk_has_rsb_modules[module_type].tabnames;
                      $.each(tabNames, function(index, item) {
                          $new_module.find('.bk-'+index).html(item);
                      });
                      
                      $new_module.find( '.bk-module-type' ).attr( 'name', id+'[_type]' ).val( module_type ); //append module_type to .bk-module-type
                      $new_module.find( '.bk_module_order' ).val( uuid );                                     //
                      $new_module.find( '.bk_module_order' ).attr( 'name', 'bk_has_rsb_module_order_' + section_nth+'[]' );
                      $new_module.find( '.bk-module-label' ).html( bk_has_rsb_modules[module_type].title );       //
                  }else if(insection == 'has-innersb'){
                      if (blk_order != false){                                
                          if (blk_order.substring(3,10) == 'leftsec'){  
                              id = 'bk_has_innersb_left_modules['+uuid+']';
                              $new_module.find( '.bk-module-type' ).attr( 'name', id+'[_type]' ).val( module_type ); //append module_type to .bk-module-type
                              $new_module.find( '.bk_module_order' ).val( uuid );
      
                              $new_module.find( '.bk_module_order' ).attr( 'name', 'bk_leftsec_module_order_' + section_nth+'[]' );
                              $new_module.find( '.bk-module-label' ).html( bk_has_innersb_left_modules[module_type].title );  
                          }else if(blk_order.substring(3,7) == 'rsec'){
                              id = 'bk_has_innersb_right_modules['+uuid+']';
                              $new_module.find( '.bk-module-type' ).attr( 'name', id+'[_type]' ).val( module_type ); //append module_type to .bk-module-type
                              $new_module.find( '.bk_module_order' ).val( uuid );
                              
                              $new_module.find( '.bk_module_order' ).attr( 'name', 'bk_rsec_module_order_' + section_nth+'[]' );
                              $new_module.find( '.bk-module-label' ).html( bk_has_innersb_right_modules[module_type].title );
                          }
                      }else {
                          if ($this.$bk_modules.parent().attr('class') == 'leftsec'){                                     //
                              id = 'bk_has_innersb_left_modules['+uuid+']';
                              $new_module.find( '.bk-module-type' ).attr( 'name', id+'[_type]' ).val( module_type ); //append module_type to .bk-module-type
                              $new_module.find( '.bk_module_order' ).val( uuid );
                              
                              $new_module.find( '.bk_module_order' ).attr( 'name', 'bk_leftsec_module_order_' + section_nth+'[]' );
                              $new_module.find( '.bk-module-label' ).html( bk_has_innersb_left_modules[module_type].title );  
                          }else if($this.$bk_modules.parent().attr('class') == 'rightsec'){
                              id = 'bk_has_innersb_right_modules['+uuid+']';
                              $new_module.find( '.bk-module-type' ).attr( 'name', id+'[_type]' ).val( module_type ); //append module_type to .bk-module-type
                              $new_module.find( '.bk_module_order' ).val( uuid );
                              
                              $new_module.find( '.bk_module_order' ).attr( 'name', 'bk_rsec_module_order_' + section_nth+'[]' );
                              $new_module.find( '.bk-module-label' ).html( bk_has_innersb_right_modules[module_type].title );
                          }
                      }
                  }
                  var $new_option = $this.render_module_options( module_type, id, blk_order, insection );
                  
                  $new_module.find( '.bk-module-options' ).append( $new_option );
                  
                  $new_module = $this.wrap_module_tab($new_module);
                  
                  if (blk_order != false){
                      if(blk_order.substring(3,10) == 'leftsec'){
                          $this.$leftsec.append( $new_module );
                      }else if(blk_order.substring(3,7) == 'rsec'){
                          $this.$rightsec.append( $new_module );       //append to placeholder
                      }else{
                          $this.$bk_modules.append( $new_module );       //append to placeholder
                      }
                      
                  }else{
                      $this.$bk_modules.append( $new_module );       //append to placeholder
                  }
  
                  var objLength = Object.keys($optionRequirement).length;
  
                  if(objLength > 0){
                      pagebuilderOptionRequirement($new_module, $optionRequirement);
                  }
                  
                  if($new_module.find('.ceris-ajax-load-more').length !== 0){
                      pagebuilderViewAllLinkControl($new_module.find('.ceris-ajax-load-more'));
                  }
                  if($new_module.find('.ceris-heading-style').length !== 0){
                      //pagebuilderViewAllLinkControl_byHeading($new_module.find('.ceris-heading-style'));
                  }
                  if($new_module.find('.ceris-view-more-button').length !== 0){
                      pagebuilderViewMoreLinkControl($new_module.find('.ceris-view-more-button'));
                  }
                                                                  
                  if ($new_module.find( '.colorpicker' ).length !== 0){
                      $new_module.find('.colorpicker').colorpicker();
                  }
                  
                  if ($new_module.find( '.datepicker' ).length !== 0){
                      $new_module.find('.datepicker').datepicker({
                          format: 'yyyy-mm-dd'
                      });
                  }
                  if($new_module.find('.taxonomy_image').length !== 0){
                      $new_module.find('.ceris_upload_image_button').on('click', function(event) {
                          event.preventDefault();
                          $this.bk_upload_button($(this));
                      });
                      $new_module.find('.ceris_remove_image_button').click(function(event) {
                          event.preventDefault();
                          $this.bk_remove_image_button($(this));
                      });   
                  }
                  if (($new_module.find( '.bk-module-type' ).val() == 'shortcode') || ($new_module.find( '.bk-module-type' ).val() == 'adsense')) {
                      $('.textarea-animated').autosize();
                  }
                  /*
                  if ($new_module.find( '.bk-module-type' ).val() == 'custom_html') {
                      var uuid = $.uuid();
                      var wysiwygareaAvailable = isWysiwygareaAvailable();
                      $new_module.find('.textarea-animated').attr("id",uuid);
                      
                      if ( wysiwygareaAvailable ) {
                          CKEDITOR.replace( uuid );
                      } else {
                          editorElement.setAttribute( 'contenteditable', 'true' );
                          CKEDITOR.inline( uuid );
              
                          // TODO we can consider displaying some info box that
                          // without wysiwygarea the classic editor may not work.
                      }
                  }
                  */
                  $this.init_module( $new_module );           //init to slidetoggle, delete
      
                  return $new_module;
              },
              wrap_module_tab:function($new_module) {
                  $new_module.find('.option-tab-1').wrapAll('<div class="all-option-tab all-option-tab-1" style="display: block;"></div>');
                  $new_module.find('.option-tab-2').wrapAll('<div class="all-option-tab all-option-tab-2" style="display: none;"></div>');
                  $new_module.find('.option-tab-3').wrapAll('<div class="all-option-tab all-option-tab-3" style="display: none;"></div>');
                  $new_module.find('.option-tab-4').wrapAll('<div class="all-option-tab all-option-tab-4" style="display: none;"></div>');
                  $new_module.find('.option-tab-5').wrapAll('<div class="all-option-tab all-option-tab-5" style="display: none;"></div>');
                  $new_module.find('.option-tab-6').wrapAll('<div class="all-option-tab all-option-tab-6" style="display: none;"></div>');
                  return $new_module;
              },
              init_module: function( $new_module ) {
                  $new_module.find( '.bk-module-bar, .bk-module-open-option' ).click( $this.on_click_open_option_module );
                  $new_module.find( '.bk-module-delete' ).click( $this.on_click_delete_module );
              },
      
              add_module_event: function( e ) {
                  var module_type = $( e.target ).data( 'bk-module-type' );
                  $this.section_nth = $(e.target).parents(".bk-modules-wrap").children(".bk-section-nth").attr('id');
                  $this.section_nth ++;
                  if($(e.target).parents(".bk-section").hasClass('fullwidth')){
                      $this.$add_module_button = $(e.target).parents(".bk-fullwidth-module-menu").find( '#add-module-button' ).dropdown();
                      $this.$bk_modules = $(e.target).parents(".bk-fullwidth-module-menu").siblings(".bk-modules");
                      var $new_module = $this.module_append( module_type, false, 'fullwidth' );
                  }else if($(e.target).parents(".bk-section").hasClass('has-rsb')){
                      $this.$add_module_button = $(e.target).parents(".bk-has-rsb-module-menu").find( '#add-module-button' ).dropdown();
                      $this.$bk_modules = $(e.target).parents(".bk-has-rsb-module-menu").siblings(".bk-modules");
                      var $new_module = $this.module_append( module_type, false, 'has-rsb' );
                  }else if($(e.target).parents(".bk-section").hasClass('has-innersb')){
                      $this.$add_module_button = $(e.target).parents(".bk-has-innersb-module-menu").find( '#add-module-button' ).dropdown();
                      $this.$bk_modules = $(e.target).parents(".bk-has-innersb-module-menu").siblings(".bk-modules");
                      var $new_module = $this.module_append( module_type, false, 'has-innersb' );
                  }
                  //$new_module.find( '.bk-section-open-option' ).trigger( 'click' );
                  $this.$add_module_button.dropdown( 'toggle' );
                  return false;			
              },
              
              on_click_open_option_module: function( e ) {
                  var $module_options = $( e.target ).parents( '.bk-module-item' ).find( '.bk-module-options' );
                  $module_options.slideToggle();
                  return false;
              },
      
              on_click_delete_module: function( e ) {
                  $( e.target ).parents( '.bk-module-item' ).remove();
                  return false;
              },
      
              render_module_options: function( module_type, id, blk_order, insection ) {
                  var module_setting;
                  if (insection == 'fullwidth') {
                      module_setting = bk_fullwidth_modules[ module_type ];
                  }else if (insection == 'has-rsb') {
                      module_setting = bk_has_rsb_modules[ module_type ];
                  }
                  else if (insection == 'has-innersb'){
                      if (blk_order != false){                                
                          if (blk_order.substring(3,10) == 'leftsec'){                                     //
                              module_setting = bk_has_innersb_left_modules[ module_type ];
                          }else if(blk_order.substring(3,7) == 'rsec'){
                              module_setting = bk_has_innersb_right_modules[ module_type ];
                          }
                      }else {
                          if ($this.$bk_modules.parent().attr('class') == 'leftsec'){                                     //
                              module_setting = bk_has_innersb_left_modules[ module_type ]; 
                          }else if($this.$bk_modules.parent().attr('class') == 'rightsec'){
                              module_setting = bk_has_innersb_right_modules[ module_type ];
                          }                                    
                      }
                  }
                  var options = [];
                  $.each( module_setting.options, function( name, option ) {
                      var $new_option = $( $( '#bk-template-module-option' ).html() );
                      $new_option.addClass(name);
                      
                      var optionclass = 'optionclass';
                      if(option.hasOwnProperty(optionclass)){
                          $new_option.addClass(option.optionclass);
                      }
                      
                      var optionRequired = 'required';
                      if(option.hasOwnProperty(optionRequired)){
                          $optionRequirement[name] = option.required;
                      }
                      
                      $new_option.find( '.bk-module-option-label' ).html( option.title );              // append title 
                      $new_option.find( '.bk-module-option-description' ).html( option.description );  // append description 
                      if ((name == 'category') || (name == 'category_1') || (name == 'category_2') || (name == 'category_3') || (name == 'category_4')) {
                          $new_option.find( '.bk-module-option-field-wrapper' ).append(                    //append field
                              $this.render_field[ option.field ].call( $this, option, id+'['+name+']'+'[]', $this.bk_get_blk_val( blk_order+'_'+name ) )
                          );	
                      }else if (name == 'categorytabs') {
                          $new_option.find( '.bk-module-option-field-wrapper' ).append(                    //append field
                              $this.render_field[ option.field ].call( $this, option, id+'['+name+']'+'[]', $this.bk_get_blk_val( blk_order+'_'+name ) )
                          );	
                      }else {
                          $new_option.find( '.bk-module-option-field-wrapper' ).append(                    //append field
                             $this.render_field[ option.field ].call( $this, option, id+'['+name+']', $this.bk_get_blk_val( blk_order+'_'+name ) )
                          );
                      }
                      /*
                      $new_option.hide();
                      
                      if($new_option.hasClass('option-tab-1')) {
                          $new_option.show();
                      }
                      */
                      //console.log($new_option);
                      options.push( $new_option );
                  } );
      
                  return options;
              },
              bk_upload_button: function(upload_button){
                  var frame;
                  if (frame) {
                      frame.open();
                      return;
                  }
                  frame = wp.media();
                  frame.on( "select", function() {
                      // Grab the selected attachment.
                      var attachment = frame.state().get("selection").first();
                      frame.close();
                      if (upload_button.parent().prev().children().hasClass("tax_list")) {
                          upload_button.parent().prev().children().val(attachment.attributes.url);
                          upload_button.parent().prev().prev().children().attr("src", attachment.attributes.url);
                      }
                      else {
                          //console.log(upload_button);
                          upload_button.parents('.upload-buttons').siblings(".taxonomy_image").val(attachment.attributes.url);
                      }
                  });
                  frame.open();
              },   
              bk_remove_image_button: function(remove_button) {
                  remove_button.parents('.upload-buttons').siblings('.taxonomy-image').attr('src', '');
                  remove_button.parents('.upload-buttons').siblings('.taxonomy_image').val('');
                  return false;
              },     
          }
      
          BK_PAGE_BUILDER.run_cfg();
      } );
      
      /* -----------------------------------------------------------------------------
       * Page template selection
       * -------------------------------------------------------------------------- */
      $( document ).ready( function () {
        function ComposerInitializeTabHandling() {
            // Function to handle click events
            function handleTabClick(e) {
                e.preventDefault();
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                
                // Hide/show based on the clicked tab
                const tabIndex = $(this).attr('class').match(/bk-tab-(\d+)/);
                if (tabIndex && tabIndex[1]) {
                    $(this).parent().siblings('.all-option-tab').hide();
                    $(this).parent().siblings(`.all-option-tab-${tabIndex[1]}`).show();
                }
            }
        
            // Function to handle mutations
            function handleMutations(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' || mutation.type === 'subtree') {
                        $('.bk-module-tabs a').off('click', handleTabClick);
                        $('.bk-module-tabs a').on('click', handleTabClick);
                    }
                });
            }
        
            // Create a MutationObserver
            var observer = new MutationObserver(handleMutations);
        
            // Check if the #bk-container exists before observing it
            const targetNode = document.getElementById('bk-container');
            if (targetNode) {
                // Start observing the target node for configured mutations
                observer.observe(targetNode, { 
                    childList: true, 
                    subtree: true 
                });
            } else {
                console.error('Element #bk-container not found');
            }
        
            // Initial binding of click events
            $('.bk-module-tabs a').on('click', handleTabClick);
        }        
          
          // Call the function to initialize tab handling
          ComposerInitializeTabHandling();
          
          
          function selectAndScrollToOption(select) {
              var $select;
              var $selectedOptions
              $select = $(select);
              $select.each(function(index,el){
                  // Store the currently selected options
                  $selectedOptions = $(el).find("option[selected]");
                         
                  // Re-select the original options
                  $selectedOptions.prop("selected", true);
              });
          }
          var select = $('.bk-category-field');
          var selecttabs = $('.bk-categorytabs-field');
          selectAndScrollToOption(selecttabs);
          selectAndScrollToOption(select);
      } );
  })(jQuery);
  