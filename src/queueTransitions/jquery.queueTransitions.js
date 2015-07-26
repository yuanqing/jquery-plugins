;(function($, undefined) {

  'use strict';

  var transitionEnd = (function() {
    var t,
      transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend'
      };
    for (t in transitions) {
      if (document.documentElement.style[t] !== undefined) {
        return transitions[t] + '.queueTransitions';
      }
    }
    return false;
  })();

  $.fn.queueTransitions = function(opt) {

    return this.each(function() {

      var elem = $(this),
        transitioningClass = opt.transitioningClass || 'transitioning';

      function init() {
        if (!transitionEnd) {
          elem.addClass(opt.sequence[opt.sequence.length-1]);
          return false;
        }
        changeState(0);
      }

      function callback(currentClass, callbackName) {
        if (opt.states[currentClass] && typeof opt.states[currentClass][callbackName] == 'function') {
          opt.states[currentClass][callbackName].call(elem);
        }
      }

      function changeState(i) {
        var currentClass = opt.sequence[i];
        elem.addClass(currentClass);
        elem.addClass(transitioningClass);
        callback(currentClass, 'startCallback');
        elem.one(transitionEnd, function() {
          elem.removeClass(transitioningClass);
          callback(currentClass, 'endCallback');
          // Go to the next state
          i++;
          if (i === opt.sequence.length && opt.loop) {
            // Reached end of sequence; next state is beginning of sequence
            i = 0;
          }
          if (i < opt.sequence.length) {
            // Go to the next state in sequence after a delay
            var delay = opt.states[currentClass].delay || 0;
            setTimeout(function() {
               if (opt.states[currentClass].permanent !== true) {
                elem.removeClass(currentClass);
               }
              changeState(i);
            }, delay);
          } else {
            // Reached the end of the sequence
            if (opt.states[currentClass].permanent !== true) {
              elem.removeClass(currentClass);
            }
          }
        });
      }

      init();

    }); // end each

  }; // end $.fn.queueTransitions

})(jQuery);
