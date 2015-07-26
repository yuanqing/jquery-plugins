/*
 * https://github.com/yuanqing/yq-js/tree/master/src/detectHover
 */

;(function( $ ) {

  // Name
  var pluginName = 'detectHover';

  // Defaults
  var defaults = {
    hoverSelector: 'a',
    onInit: function(){},
    onDestroy: function(){},
    onHoverOn: function(){},
    onHoverOff: function(){}
  };

  // Classes
  var activeClass = pluginName + '-active',
    hoverOnClass = pluginName + '-on',
    hoverOffClass = pluginName + '-off';

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
      $el.removeClass( activeClass )
         .removeClass( hoverOnClass )
         .removeClass( hoverOffClass );
      unbind();
      $el.unbind( 'destroy.' + pluginName, destroy );
      $el = null;
      callback( 'onDestroy' );
    }

    // Fired on hover on
    function hoverOn() {
      $el.removeClass( hoverOffClass )
         .addClass( hoverOnClass );
      callback( 'onHoverOn' );
    }

    // Fired on hover off
    function hoverOff() {
      $el.removeClass( hoverOnClass )
         .addClass( hoverOffClass );
      callback( 'onHoverOff' );
    }

    // Bind events to instance
    function bind() {
      $el.on( 'mouseenter.' + pluginName, $opt.hoverSelector, hoverOn )
         .on( 'mouseleave.' + pluginName, $opt.hoverSelector, hoverOff );
    }

    // Unbind events from instance
    function unbind() {
      $el.off( 'mouseenter.' + pluginName, $opt.hoverSelector, hoverOn )
         .off( 'mouseleave.' + pluginName, $opt.hoverSelector, hoverOff );
    }

    // Execute a callback
    function callback( callbackName ) {
      if ( typeof $opt[callbackName] === 'function' ) {
        $opt[callbackName].call( $el );
      }
    }

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
    var instance = $.data( this, pluginName );
    if ( !instance ) {
      $.data( this, pluginName, ( instance = new Plugin( this, options ) ) );
    }
    if ( typeof options === 'string' && typeof instance[options] === 'function' ) {
      instance[options].apply( this );
    }

  };

})( jQuery );
