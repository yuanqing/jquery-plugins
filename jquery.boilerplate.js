/*
 * https://github.com/yuanqing/yq-js/tree/master/src/boilerplate
 */

;(function( $ ) {

  // Name
  var pluginName = 'boilerplate';

  // Defaults
  var defaults = {
    onInit: function(){},
    onDestroy: function(){}
  };

  // Classes
  var activeClass = pluginName + '-active';

  // Plugin constructor, methods
  var Plugin = function( element, options ) {

    // Set element, options
    var $el = $( element ),
      $opt = $.extend( {}, defaults, options );

    // Keep a reference to these elements
    var foo;

    // Initialise instance
    function init() {
      // Shout out
      console.log( 'Huzzah!' );
      // Add active class
      $el.addClass( activeClass );
      // Bind events
      bind();
      // Bind the destroy event
      $el.on( 'destroy.' + pluginName, destroy );
      // Execute the init callback
      callback( 'onInit' );
    }

    // Destroy instance
    function destroy() {
      // Remove from jQuery data
      $.removeData( $el[0], pluginName );
      // Remove active class
      $el.removeClass( activeClass );
      // Unbind events
      unbind();
      // Unbind the destroy event
      $el.unbind( 'destroy.' + pluginName, destroy );
      // Remove reference to element
      $el = null;
      // Execute the destroy callback
      callback( 'onDestroy' );
    }

    // Bind events to instance
    function bind() {
    }

    // Unbind events from instance
    function unbind() {
    }

    // Execute a callback
    function callback( callbackName ) {
      // Check if function exists
      if ( typeof $opt[callbackName] == 'function' ) {
        // Execute functions, set $el as context
        $opt[callbackName].call( $el );
      }
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

    // Check options
    if ( typeof options != 'object' && typeof options != 'string' ) {
      options = {};
    }
    // Prepare arguments for calling the plugin method
    var args = $.makeArray( arguments ).slice( 1 );
    // To store values returned from the plugin method
    var vals = [];
    // Iterate over the matched elements
    this.each( function() {
      var instance = $.data( this, pluginName );
      if ( !instance ) {
        // Initialise instance, store in jQuery data
        $.data( this, pluginName, ( instance = new Plugin( this, options ) ) );
      }
      if ( typeof options == 'string' && typeof instance[options] == 'function' ) {
        // Call method on the instance, passing in args
        var val = instance[options].apply( this, args );
        if ( val !== undefined ) {
          vals.push( val );
        }
      }
    });
    if ( vals.length == 1 ) {
      // Return the single value returned from the method
      return vals[0];
    } else if ( vals.length > 1 ) {
      // Return values returned from method as array
      return vals;
    }
    // Preserve chainability
    return this;

  };

})( jQuery );
