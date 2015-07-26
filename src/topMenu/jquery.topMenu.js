/*
 * https://github.com/yuanqing/yq-js/tree/master/src/topMenu
 */

;(function( $ ) {

  // Name
  var pluginName = 'topMenu';

  // Defaults
  var defaults = {
    onInit: function(){},
    onDestroy: function(){},
    onShow: function(){},
    onHide: function(){}
  };

  // Classes
  var activeClass = pluginName + '-active',
    initClass = pluginName + '-init',
    cloneClass = pluginName + '-clone',
    showClass = pluginName + '-show';

  // Plugin constructor, methods
  var Plugin = function( element, options ) {

    // Set element, options
    var $el = $( element ),
      $opt = $.extend( {}, defaults, options );

    // Keep a reference to these elements
    var prevScroll;

    // Initialise instance
    function init() {
      // Exit if touch device
      if ( 'ontouchstart' in document.documentElement ) {
        return;
      }
      $el.addClass( activeClass );
      addInitClass();
      bind();
      show();
      $el.on( 'destroy.' + pluginName, destroy );
      callback( 'onInit' );
    }

    // Destroy instance
    function destroy() {
      $.removeData( $el[0], pluginName );
      $el.removeClass( activeClass );
      unbind();
      $el.unbind( 'destroy.' + pluginName, destroy );
      $el = null;
      callback( 'onDestroy' );
    }

    // Bind events to instance
    function bind() {
      $( window ).on( 'scroll.' + pluginName, stick );
    }

    // Unbind events from instance
    function unbind() {
      $( window ).off( 'scroll.' + pluginName, stick );
    }

    // Execute a callback
    function callback( callbackName ) {
      if ( typeof $opt[callbackName] == 'function' ) {
        $opt[callbackName].call( $el );
      }
    }

    // Show/hide on scroll up/down respectively
    function stick() {
      var currScroll = $( window ).scrollTop();
      if ( currScroll <= prevScroll ) {
        show();
      } else {
        hide();
      }
      prevScroll = currScroll;
    }

    // Show the menu
    function show() {
      if ( !$el.hasClass( showClass ) ) {
        $el.addClass( showClass );
        $el.trigger( 'show.' + pluginName );
        callback( 'onShow' );
      }
    }

    // Hide the menu
    function hide() {
      if ( $el.hasClass( showClass ) ) {
        $el.removeClass( showClass );
        $el.trigger( 'hide.' + pluginName );
        callback( 'onHide' );
      }
    }

    // Add initClass, remove initClass on load
    function addInitClass() {
      if ( !window.loaded ) {
         $el.addClass( initClass );
      }
      $( window ).on( 'load.' + pluginName, function() {
        $el.removeClass( initClass );
        window.loaded = true;
      });
    }

    // Initialise
    init();

    // Expose public methods
    return {
      destroy: destroy
    };

  };

  // Plugin definition
  $.fn[pluginName] = function( options ) {

    if ( typeof options !== 'object' && typeof options !== 'string' ) {
      options = {};
    }
    return this.each(function() {
      var instance = $.data( this, pluginName );
      if ( !instance ) {
        $.data( this, pluginName, ( instance = new Plugin( this, options ) ) );
      }
      if ( typeof options === 'string' && typeof instance[options] === 'function' ) {
        instance[options].apply( this );
      }
    });

  };

})( jQuery );
