var successMarkup = '<div id="success-bin" aria-label="Success" role="alert" tabindex="-1">' +
                      '<div id="success-message">' +
                        'Thank you for providing your contact information!!' +
                      '</div>' +
                    '</div>';
var $trigger = $('#alert-trigger');
var $modal = $('#continue-dialog');
var $cancel = $('#cancel');
var $submit = $('#submit');
var $close = $('#continue-close');
var $first = $('#first-name');
var $last = $('#last-name');
var $email = $('#email-address');
var $container = $('#fullContainer');

// when the trigger is clicked, show the modal and focus it
$trigger.on('click', function (e) {
  e.stopPropagation();
  $('#success-cage').html('');
  $container.attr('aria-hidden', 'true');
  $('body').prepend('<div id="temporaryOverlay"></div>');
  $modal.show();
  setTimeout(function () {
    // $modal[0].focus();
    $('#admessagebody1')[0].focus();
  }, 0);
});

// when cancel is clicked, hide the modal and focus it's trigger
$cancel.on('click', function () {
  $('#conf-error').hide();
  $('#success-bin').hide();
  $container.removeAttr('aria-hidden');
  $('#temporaryOverlay').remove();
  $modal.hide();
  $trigger.focus();
});

$close.on('click', function () {
  $cancel.click();
});

// keyboard events on the modal itself
$modal.on('keydown', function (e) {
  var which = e.which;
  var target = e.target;

  if (which === 9 && e.shiftKey) { // SHIFT + TAB
    // shift+tab from "X" (close) button to the "Cancel" button
    if (target === $close[0] || target === $modal[0]) {
      e.preventDefault();
      $cancel.focus();
    }
  } else if (which === 9) { // TAB
    // tab from "Cancel" button to "X" (close) button
    if (target === $cancel[0]) {
      e.preventDefault();
      $close.focus();
    }
  } else if (which === 27) { // ESCAPE
    // click the cancel button which hides the modal and focuses it's trigger
    $cancel.click();
  }
});

// clicks on the modal's "Submit" button
$submit.on('click', function () {
  var erroneousInputs = [];
  // validation:
  $([$first[0], $last[0], $email[0]]).each(function () {
    // initial clean up:
    $(this).removeAttr('aria-invalid').removeAttr('aria-describedby');
    $('#' + this.id + '-error').hide();

    if (!this.value) {
      // applies aria-invalid="true" and associates the input
      // with it's error message via `aria-describedby`
      erroneousInputs.push(this);
      $(this).attr({
        'aria-invalid': 'true',
        'aria-describedby': this.id + '-error'
      });

      // display the error message
      $('#' + this.id + '-error').show();
    }
  });

  if (!erroneousInputs.length) { // NO ERRORS!
    $modal.hide();
    $container.removeAttr('aria-hidden');
    $('#success-cage').html(successMarkup);
    $('#success-bin').focus();
  } else {
    // focus the first erroneous input
    erroneousInputs[0].focus();
  }
});


// clicking outside of the modal while the modal is
// open will close the dialog and focus the trigger
$(document).on('click', function (e) {
  if ($modal.is(':visible') && !$(e.target).closest('#continue-dialog')[0]) {
    $container.removeAttr('aria-hidden');
	$('#temporaryOverlay').remove();
    $modal.hide();
    $trigger.focus();
  }
});
