;(function( $ ) {
  $(function() {
    $( '.topMenu' ).topMenu();
    $( '.debug-init' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.topMenu' ).topMenu();
    });
    $( '.debug-destroy' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.topMenu' ).topMenu( 'destroy' );
    });
  });
}( jQuery ));
