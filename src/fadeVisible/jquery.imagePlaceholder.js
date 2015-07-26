;(function($) {

  'use strict';

  $.fn.imagePlaceholder = function() {

    return this.each(function() {

      var $elem = $(this),
        $img = $elem.find('img').eq(0),
        width = parseInt($img.attr('width'), 10),
        height = parseInt($img.attr('height'), 10);

      // If both height/width attr were not set, try css width/height
      if (!width && !height) {
        width = parseInt($img.css('width'), 10);
        height = parseInt($img.css('height'), 10);
      }

      // Only add the placeholder if both width/height are valid
      if (width && height) {
        $elem.addClass('imagePlaceholder-active');
        $(document.createElement('span')).css({ 'padding-top': (height / width * 100) + '%' }).prependTo($elem);
      }

    }); // end each

  }; // end $.fn

}(jQuery));
