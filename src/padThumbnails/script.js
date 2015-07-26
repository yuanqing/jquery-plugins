;(function( $ ) {
  $(function() {
    var options = {
      itemContainerSelector: '.thumbnails',
      itemSelector: '.thumbnail',
      fillerSelector: '.filler',
      breakpoints: {
        480: 2,
        768: 3,
        1024: 4,
        1280: 6
      }
    };
    $( '.thumbnails-wrapper' ).padThumbnails( options );
    $( '#add' ).on( 'click', function( e ) {
      var t = $( '.thumbnails' );
      t.children( '.thumbnail' ).eq( 0 ).clone().appendTo( t );
      t.trigger( 'change' );
    });
    $( '#remove' ).on( 'click', function( e ) {
      var t = $( '.thumbnails' );
      t.children( '.thumbnail' ).last().remove();
      t.trigger( 'change' );
    });
    $( '.debug-init' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.thumbnails-wrapper' ).padThumbnails( options );
    });
    $( '.debug-destroy' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.thumbnails-wrapper' ).padThumbnails( 'destroy' );
    });
  });
}( jQuery ));
