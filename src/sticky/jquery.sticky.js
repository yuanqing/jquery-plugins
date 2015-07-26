/*
 * https://github.com/yuanqing/yq-js/tree/master/src/stick
 */

;(function( $ ) {

  // Name
  var pluginName = 'sticky';

  // Defaults
  var defaults = {
    stickySelector: '.' + pluginName + '-item',
    onInit: function(){},
    onDestroy: function(){}
  };

  // Classes
  var activeClass = pluginName + '-active',
    stuckClass = pluginName + '-stuck',
    showClass = pluginName + '-show';

  // Plugin constructor, methods
  var Plugin = function( element, options ) {

    // Set element, options
    var $el = $( element ),
      $opt = $.extend( {}, defaults, options );

    // Keep a reference to these elements
    var $sticky,
      $items;

    // Initialise instance
    function init() {
      $el.addClass( activeClass );
      $items = $el.find( $opt.stickySelector );
      $sticky = $( document.createElement( 'div' ) ).addClass( stuckClass ).prependTo( $el );
      $.each($items, function() {
        $( this ).clone().appendTo( $sticky );
      });
      bind();
      updateSticky();
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
      $( window ).on( 'scroll.' + pluginName, updateSticky );
    }

    // Unbind events from instance
    function unbind() {
      $( window ).off( 'scroll.' + pluginName, updateSticky );
    }

    // Execute a callback
    function callback( callbackName ) {
      if ( typeof $opt[callbackName] == 'function' ) {
        $opt[callbackName].call( $el );
      }
    }

    // Update the contents/position of $sticky
    function updateSticky() {

      var windowScrollTop = $( window ).scrollTop(),
        scrollTop = Math.round( windowScrollTop - $el.offset().top ),
        active = $sticky.children().filter( '.' + showClass ),
        index = -1,
        offset = 0;

      // The item in $sticky to show has the negative offset closest to 0
      $.each($items, function( i ) {
        var $this = $( this ),
          height = $this.outerHeight();
        offset = Math.round( $this.offset().top - windowScrollTop );
        if ( offset <= 0 ) {
          index = i;
        } else {
          return false;
        }
      });

      if ( index != -1 ) {
        var activeHeight = active.outerHeight();
        if ( index != active.index() ) {
          // Update the active item in $sticky
          active.removeClass( showClass );
          $sticky.children().eq( index ).addClass( showClass );
        } else if ( offset > 0 && offset < activeHeight ) {
          // Move $sticky up
          scrollTop -= activeHeight - offset;
        } else {
          // Set $sticky's position to the bottom of $el
          var h = $el.height() - activeHeight;
          if ( scrollTop >= h ) {
            scrollTop = h;
          }
        }
      } else {
        // Hide the active item in $sticky
        active.removeClass( showClass );
      }

      // Update the top position of $sticky
      $sticky.css({ 'top': scrollTop });

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
