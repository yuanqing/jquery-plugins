;(function( $ ) {
  $(function() {
    $( '.modal' ).modal();
    $( '.debug-init' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.modal' ).modal();
    });
    $( '.debug-destroy' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.modal' ).modal( 'destroy' );
    });
  });
}( jQuery ));
