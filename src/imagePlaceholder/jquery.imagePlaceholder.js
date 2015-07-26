/*
 * https://github.com/yuanqing/yq-js/tree/master/src/imagePlaceholder
 */

;(function($) {

  'use strict';

  $.fn.imagePlaceholder = function() {

    return this.each(function() {

      var $elem = $(this),
        $img = $elem.find('img').eq(0),
        width,
        height;

      if (!$img) {
        return true; // break from each
      }

      width = parseInt($img.attr('width'), 10);
      height = parseInt($img.attr('height'), 10);

      // Only add the placeholder if both width/height attr are valid
      if (width && height) {
        $elem.addClass('imagePlaceholder-active');
        $(document.createElement('span')).css({'padding-top': (height / width * 100) + '%'}).prependTo($elem);
      }

    }); // end .each

  }; // end $.fn.imagePlaceholder

  $.fn.fadeImage = function(opt) {

    var $window = $(window);

    return this.each(function() {

      var $elem = $(this),
        $img = $elem.find('img').eq(0);

      if (!$img) {
        return true; // continue
      }
      $elem.addClass('fadeImage-active');
      if ($img.prop('complete') === false) {
        $elem.addClass('fadeImage-loading');
        $img.one('load.fadeViewport', function() {
          $elem.removeClass('fadeImage-loading');
        });
      }

    }); // end .each

  }; // end $.fn.fadeImage

  $.fn.fadeViewport = function(opt) {

    var $window = $(window);

    opt = opt || {};

    return this.each(function() {

      var $elem = $(this);

      function init() {
        // only fade in $elem if it is in the viewport when page is loaded
        if (opt.initial && !inViewport()) {
          return true; // continue from .each
        }
        console.log('x');
        $elem.addClass('fadeViewport-active');
        $window.on('scroll.fadeViewport', check);
        check();
      }

      // Fade in if $elem is in viewport; fired on window scroll
      function check() {
        if (inViewport()) {
          $window.off('scroll.fadeViewport', check);
          $elem.addClass('fadeViewport-visible');
          if (typeof opt.callback === 'function') {
            opt.callback.call($elem);
          }
        }
      }

      // Check if $elem is in viewport
      function inViewport() {
        var wh = $window.height(),
          wt = $window.scrollTop(),
          eh = $elem.height(),
          et = $elem.offset().top;
        return ( wh + wt ) > et && wt < ( et + eh );
      }

      init();

    }); // end .each

  }; // end $.fn.fadeViewport

}(jQuery));
