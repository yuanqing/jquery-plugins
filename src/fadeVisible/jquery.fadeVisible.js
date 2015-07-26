;(function($, window) {

  'use strict';

  $.fn.fadeVisible = function(opt) {

    var $window = $(window);

    return this.each(function() {

      var $elem = $(this),
        opt = opt || {},
        $img;

      function init() {
        $elem.addClass('fadeVisible-active');
        $img = $elem.find('img').eq(0);
        if ($img) {
          prepImage();
        }
        bind();
        check();
      }

      function bind() {
        $window.on('scroll.fadeVisible', check);
      }

      function unbind() {
        $window.off('scroll.fadeVisible', check);
      }

      // Fade in if $elem is in viewport; fired on window scroll
      function check() {
        if (inViewport()) {
          unbind();
          $elem.addClass('fadeVisible-visible');
          if (typeof opt.callback === 'function') {
            opt.callback.call($elem);
          }
        }
      }

      // Check if $elem is in viewport
      function inViewport() {
        return $elem.offset().top + $elem.outerHeight() >= $window.scrollTop() && $elem.offset().top <= $window.scrollTop() + $window.height();
      }

      // Handle case where $elem contains an image
      function prepImage() {
        if ($img) {
          if ($img.prop('complete') === false) {
            $elem.addClass('fadeVisible-loading');
          }
          $img.one('load.fadeVisible', function() {
            $elem.removeClass('fadeVisible-loading');
          });
        }
      }

      init();

    }); // end each

  } // end $.fn

})(jQuery, window);
