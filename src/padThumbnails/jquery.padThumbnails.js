/*
 * https://github.com/yuanqing/yq-js/tree/master/src/padThumbnails
 */

;(function( $ ) {

  // Name
  var pluginName = 'padThumbnails';

  // Defaults
  var defaults = {
    itemContainerSelector: '.thumbnails',
    itemSelector: '.thumbnail',
    fillerSelector: '.filler',
    breakpoints: false,
    onInit: function(){},
    onDestroy: function(){}
  };

  // Classes
  var activeClass = pluginName + '-active',
    showClass = pluginName + '-show';

  // Plugin constructor, methods
  var Plugin = function( element, options ) {

    // Set element, options
    var $el = $( element ),
      $opt = $.extend( {}, defaults, options );

    // Keep a reference to these elements
    var itemContainer,
      fillers;

    // Initialise instance
    function init() {
      itemContainer = $el.find( $opt.itemContainerSelector );
      fillers = $el.find( $opt.fillerSelector );
      if ( typeof $opt.breakpoints !== 'object' || $opt.breakpoints.length === 0 || fillers.length === 0 ) {
        return;
      }
      $el.addClass( activeClass );
			cloneFillers();
      bind();
      showFillers();
      $el.on( 'destroy.' + pluginName, destroy );
      callback( 'onInit' );
    }

    // Destroy instance
    function destroy() {
      $.removeData( $el[0], pluginName );
      $el.removeClass( activeClass );
      $.each(fillers, function( i ) {
        $( this ).removeClass( showClass );
      });
      unbind();
      $el.unbind( 'destroy.' + pluginName, destroy );
      $el = null;
      callback( 'onDestroy' );
    }

    // Bind events to instance
    function bind() {
      $( window ).on( 'resize.' + pluginName, showFillers );
      $el.on( 'change.' + pluginName, showFillers );
      itemContainer.on( 'change.' + pluginName, showFillers );
    }

    // Unbind events from instance
    function unbind() {
      $( window ).off( 'resize.' + pluginName, showFillers );
      $el.off( 'change.' + pluginName, showFillers );
      itemContainer.off( 'change.' + pluginName, showFillers );
    }

    // Execute a callback
    function callback( callbackName ) {
      if ( typeof $opt[callbackName] == 'function' ) {
        $opt[callbackName].call( $el );
      }
    }

    // Clone fillers
    function cloneFillers() {
      var count = getLargestValue( $opt.breakpoints ) - 1 - fillers.length;
      for ( var i=0; i<count; i++ ) {
        fillers = fillers.add( fillers.eq( i ).clone().appendTo( $el ) );
      }
    }

    // Show/hide fillers; fired on window resize
    function showFillers() {
      var count = countFillers();
      $.each( fillers, function( i ) {
        if ( i < count ) {
          $( this ).addClass( showClass );
        } else {
          $( this ).removeClass( showClass );
        }
      });
    }

    // Returns the number of fillers to show based on window size
    function countFillers() {
      var count,
        width = $( window ).width();
      $.each( $opt.breakpoints, function( k, v ) {
        if ( k <= width ) {
          count = v;
        }
      });
      var lastRow = itemContainer.find( $opt.itemSelector ).length % count;
      return ( count - lastRow ) % count;
    }

    // Returns the largest val from an object literal of key/val pairs
    function getLargestValue( obj ) {
      var arr = Object.keys( obj ).map(
        function( key ) {
          return obj[key];
        }
      );
      return Math.max.apply( null, arr );
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
