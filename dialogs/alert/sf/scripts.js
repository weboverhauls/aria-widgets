// clicks on the "Display Dialog" button
$('#alert-trigger').on('click', function (e) {
  // Stopping Propagation so the click listener attached to the document (see below)
  // does not consume this click.  Without `e.stopPropagation()`, this event would fire
  // right before the click would bubble up to the document, also firing the event that
  // closes the alert dialog (any mouse clicks anywhere outside of the alert dialog will
  // close the dialog and return focus to the initial trigger)
  e.stopPropagation();
  $('#main-content').attr('aria-hidden', 'true');
  $('#continue-dialog').show(); // display the alert dialog
  $('#close-char-modal').focus(); // place initial focus on an active element inside dialog
});

// clicks on the "Close" button (within dialog)
$('#close-char-modal').on('click', function () {
  $('#main-content').removeAttr('aria-hidden');
  $('#continue-dialog').hide();
  $('#alert-trigger').focus(); // when dialog is dismissed, focus must be put back on the element used to trigger it
});

// the alert dialog's keyboard events
$('#continue-dialog').on('keydown', function (e) {
  if (e.which === 27) { // ESCAPE KEY
    // Dismiss the dialog with escape key
    $('#close-char-modal').click();
  } else if (e.which === 9) { // TAB or SHIFT + TAB
    e.preventDefault(); // To trap focus within the dialog
  }
});

// clicking anywhere outside of the dialog while the dialog is
// open will close the dialog and return focus to the trigger
$(document).on('click', function (e) {
    if (!$(e.target).closest('#continue-dialog')[0] && $('#continue-dialog').is(':visible')) {
      $('#main-content').removeAttr('aria-hidden');
      $('#continue-dialog').hide();
      $('#alert-trigger').focus();
    }
});
