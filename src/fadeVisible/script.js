;(function( $ ) {
  $(function() {
    $( '.image' ).imagePlaceholder().fadeVisible();
    $( '.debug-init' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.image' ).fadeVisible();
    });
    $( '.debug-destroy' ).on( 'click', function( e ) {
      e.preventDefault();
      $( '.image' ).fadeVisible( 'destroy' );
    });
  });
}( jQuery ));
