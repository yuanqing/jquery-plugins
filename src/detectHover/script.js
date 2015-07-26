;(function( $ ) {
  $(function() {
    $( '.nav' ).detectHover();
    $( '.debug-init' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.nav' ).detectHover();
    });
    $( '.debug-destroy' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.nav' ).detectHover( 'destroy' );
    });
  });
}( jQuery ));
