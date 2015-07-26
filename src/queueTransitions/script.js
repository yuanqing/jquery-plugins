;(function($) {
  $(function() {
    var options = {
      states: {
        'r': {
          delay: 500,
          startCallback: function(){},
          endCallback: function(){}
        },
        'g': {
          delay: 500,
          startCallback: function(){},
          endCallback: function(){}
        },
        'b': {
          delay: 500,
          startCallback: function(){},
          endCallback: function(){}
        }
      },
      sequence: ['r', 'g', 'b'],
      loop: true
    };
    $('#demo').queueTransitions(options);
  });
}(jQuery));
