;(function( $ ) {
  $(function() {
    $( '.sticky' ).sticky();
    $( '.debug-init' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.sticky' ).sticky();
    });
    $( '.debug-destroy' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.sticky' ).sticky( 'destroy' );
    });
  });
}( jQuery ));
