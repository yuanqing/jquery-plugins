/*
 * https://github.com/yuanqing/yq-js/tree/master/src/filter
 */

;(function( $ ) {

  // Name
  var pluginName = 'filter';

  // Defaults
  var defaults = {
    menuSelector: '.' + pluginName + '-menu',
    delimiter: ',',
    filterAllText: 'all',
    preventDefault: false,
    onInit: function(){},
    onDestroy: function(){},
    onChange: function(){}
  };

  // Classes
  var activeClass = pluginName + '-active',
    initClass = pluginName + '-init',
    currentClass = pluginName + '-current';

  // Plugin constructor, methods
  var Plugin = function( element, options ) {

    // Set element, options
    var $el = $( element ),
      $opt = $.extend( {}, defaults, options );

    // Elements to cache
    var menu;

    // Initialise instance
    function init() {
      $el.addClass( activeClass );
      menu = $( $opt.menuSelector );
      addInitClass();
      bind();
      var initial = ( window.location.hash !== '' && window.location.hash.substring( 1 ) ) || menu.data( pluginName + 'initial' ) || $opt.filterAllText;
      if ( initial ) {
        menu.find( '*[data-' + pluginName + '="' + initial + '"]' ).trigger( 'click.' + pluginName );
      } else {
        menu.find( '*[data-' + pluginName + ']' ).eq( 0 ).trigger( 'click.' + pluginName );
      }
      $el.on( 'destroy.' + pluginName, destroy );
      callback( 'onInit' );
    }

    // Destroy instance
    function destroy() {
      $.removeData( $el[0], pluginName );
      menu.find( '.' + currentClass ).removeClass( currentClass );
      $el.removeClass( activeClass );
      $el.find( '.' + currentClass ).removeClass( currentClass );
      unbind();
      $el.off( 'destroy.' + pluginName, destroy );
      $el = null;
      menu = null;
      callback( 'onDestroy' );
    }

    // Bind events to instance
    function bind() {
      menu.on( 'click.' + pluginName, '*[data-' + pluginName + ']', change );
    }

    // Unbind events from instance
    function unbind() {
      menu.off( 'click.' + pluginName, change );
    }

    // Execute a callback
    function callback( callbackName ) {
      if ( typeof $opt[callbackName] === 'function' ) {
        $opt[callbackName].call( $el );
      }
    }

    // Change the current filter; executed on clicking a menu item
    function change( e ) {
      if ( $opt.preventDefault ) {
        e.preventDefault();
      }
      if ( !$( this ).hasClass( currentClass ) ) {
        var changeTo = $( this ).data( pluginName );
        menu.find( '*[data-' + pluginName + ']' ).each(function() {
          var $this = $( this );
          if ( $this.data( pluginName ) == changeTo ) {
            $this.addClass( currentClass );
          } else {
            $this.removeClass( currentClass );
          }
        });
        $el.find( '*[data-' + pluginName + ']' ).each(function() {
          var $this = $( this );
          if ( $opt.filterAllText === changeTo || $this.data( pluginName ).split( $opt.delimiter ).indexOf( changeTo ) != -1 ) {
            $this.addClass( currentClass );
          } else {
            $this.removeClass( currentClass );
          }
        });
        $el.trigger( 'change.' + pluginName );
        callback( 'onChange' );
      }
    }

    // Add init class, remove on load
    function addInitClass() {
      if ( !window.loaded ) {
         $el.addClass( initClass );
         menu.addClass( initClass );
      }
      $( window ).on( 'load.' + pluginName, function() {
        $el.removeClass( initClass );
        menu.removeClass( initClass );
        window.loaded = true;
      });
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
