;(function( $ ) {
  $(function() {
    $( '.filter' ).filter();
    $( '.debug-init' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.filter' ).filter();
    });
    $( '.debug-destroy' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.filter' ).filter( 'destroy' );
    });
  });
}( jQuery ));
