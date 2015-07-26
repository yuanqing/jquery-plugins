/*
 * https://github.com/yuanqing/yq-js/tree/master/src/fadeVisible
 */

;(function( $ ) {

  // Name
  var pluginName = 'fadeVisible';

  // Defaults
  var defaults = {
    fadeOnLoad: true,
    onInit: function(){},
    onDestroy: function(){},
    onVisible: function(){},
    onImageLoaded: function(){}
  };

  // Classes
  var activeClass = pluginName + '-active',
    visibleClass = pluginName + '-visible',
    loadingClass = pluginName + '-loading';

  // Cache elements
  var $window = $( window );

  // Plugin methods, constructor
  var Plugin = function( element, options ) {

    // Set element, options, etc
    var $el = $( element ),
      $opt = $.extend( {}, defaults, options );

    // Keep a reference to these elements
    var img;

    // Initialise instance
    function init() {
      if ( visible() && !$opt.fadeOnLoad ) {
        return;
      }
      $el.addClass( activeClass );
      img = $el.find( 'img' ).eq( 0 );
      if ( img ) {
        initImage();
      }
      bind();
      checkVisible();
      $el.on( 'destroy.' + pluginName, destroy );
      callback( 'onInit' );
    }

    // Destroy instance
    function destroy() {
      $.removeData( $el[0], pluginName );
      $el.removeClass( activeClass )
         .removeClass( visibleClass )
         .removeClass( loadingClass );
      unbind();
      $el.off( 'destroy.' + pluginName, destroy );
      $el = null;
      callback( 'onDestroy' );
    }

    // Bind events to instance
    function bind() {
      $window.on( 'scroll.' + pluginName, checkVisible );
    }

    // Unbind events from instance
    function unbind() {
      $window.off( 'scroll.' + pluginName, checkVisible );
    }

    // Execute a callback
    function callback( callbackName ) {
      if ( typeof $opt[callbackName] === 'function' ) {
        $opt[callbackName].call( $el );
      }
    }

    // Fade element in if it is visible; fired on window scroll
    function checkVisible() {
      if ( visible() ) {
        unbind();
        $el.addClass( visibleClass )
           .trigger( 'visible.' + pluginName );
        callback( 'onVisible' );
      }
    }

    // Check if element is in viewport
    function visible() {
      var wh = $( window ).height(),
        wt = $( window ).scrollTop(),
        eh = $el.height(),
        et = $el.offset().top;
      return ( wh + wt ) > et && wt < ( et + eh );
    }

    // Handle case where element contains an image
    function initImage() {
      if ( img ) {
        if ( img.prop( 'complete' ) === false ) {
          $el.addClass( loadingClass );
        }
        img.one( 'load.' + pluginName, function() {
          $el.removeClass( loadingClass );
          callback( 'onImageLoaded' );
        });
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
