/*
 * https://github.com/yuanqing/yq-js/tree/master/src/modal
 */

;(function( $ ) {

  // Name
  var pluginName = 'modal';

  // Defaults
  var defaults = {
    onInit: function(){},
    onDestroy: function(){},
    onShow: function(){},
    onHide: function(){}
  };

  // Classes
  var activeClass = pluginName + '-active',
    showClass = pluginName + '-show',
    transitionClass = pluginName + '-transition',
    lockClass = pluginName + '-lock';

  // Plugin constructor, methods
  var Plugin = function( element, options ) {

    // Set element, options
    var $el = $( element ),
      $opt = $.extend( {}, defaults, options );

    // Initialise instance
    function init() {
      $el.addClass( activeClass );
      bind();
      $el.on( 'destroy.' + pluginName, destroy );
      callback( 'onInit' );
    }

    // Destroy instance
    function destroy() {
      $.removeData( $el[0], pluginName );
      $( document.body ).removeClass( lockClass );
      $el.removeClass( activeClass )
         .removeClass( showClass )
         .removeClass( transitionClass );
      unbind();
      $el.off( 'destroy.' + pluginName, destroy );
      $el = null;
      callback( 'onDestroy' );
    }

    // Show modal
    function show( e ) {
      e.preventDefault();
      e.stopPropagation();
      if ( !$el.hasClass( showClass ) ) {
        $el.one( 'transitionend TransitionEnd webkitTransitionEnd oTransitionEnd', showTransitionEnd )
           .addClass( transitionClass )
           .addClass( showClass )
           .trigger( 'showStart.' + pluginName );
      }
    }
    function showTransitionEnd() {
      $( document.body ).addClass( lockClass );
      $el.removeClass( transitionClass )
         .attr( 'aria-hidden', false )
         .trigger( 'showEnd.' + pluginName );
      callback( 'onShow' );
    }

    // Hide modal
    function hide( e ) {
      e.preventDefault();
      e.stopPropagation();
      if ( $el.hasClass( showClass ) && ( e.target === e.currentTarget || ( e.target.dataset[pluginName] === '#' + $el.attr( 'id' ) && e.target.dataset[pluginName + 'Hide'] !== undefined ) )
      ) {
        $el.one( 'transitionend TransitionEnd webkitTransitionEnd oTransitionEnd', hideTransitionEnd )
           .addClass( transitionClass )
           .removeClass( showClass )
           .trigger( 'hideStart.' + pluginName );
      }
    }
    function hideTransitionEnd( e ) {
      $( document.body ).removeClass( lockClass );
      $el.removeClass( transitionClass )
         .attr( 'aria-hidden', true )
         .trigger( 'hideEnd.' + pluginName );
      callback( 'onHide' );
    }

    // Bind events to instance
    function bind() {
      var attr = '[data-' + pluginName + '="#' + $el.attr( 'id' ) + '"]',
        showAttr = attr + '[data-' + pluginName + '-show]',
        hideAttr = attr + '[data-' + pluginName + '-hide]';
      $( document ).on( 'click.' + pluginName, 'a' + showAttr + ', button' + showAttr, show )
                   .on( 'click.' + pluginName, 'a' + hideAttr + ', button' + hideAttr, hide );
      $el.on( 'show.' + pluginName, show )
         .on( 'hide.' + pluginName, hide )
         .on( 'click.' + pluginName, hide );
    }

    // Unbind events from instance
    function unbind() {
      $( document ).off( 'click.' + pluginName );
      $el.off( 'show.' + pluginName )
         .off( 'hide.' + pluginName )
         .off( 'click.' + pluginName );
    }

    // Execute a callback
    function callback( callbackName ) {
      if ( typeof $opt[callbackName] == 'function' ) {
        $opt[callbackName].call( $el );
      }
    }

    init();

    // Expose public methods
    return {
      show: show,
      hide: hide,
      destroy: destroy
    };

  };

  // Plugin definition
  $.fn[pluginName] = function( options ) {

    if ( typeof options != 'object' && typeof options != 'string' ) {
      options = {};
    }
    return this.each(function() {
      var instance = $.data( this, pluginName );
      if ( !instance ) {
        $.data( this, pluginName, ( instance = new Plugin( this, options ) ) );
      }
      if ( typeof options == 'string' && typeof instance[options] == 'function' ) {
        instance[options].apply( this );
      }
    });

  };

})( jQuery );
