// helpLink is clicked:
// - focus the tooltip
// - when tab or shift tab is presed, trap focus on the close button
// - allow escape to dismiss the tip and return focus to the trigger
// - if anywhere outside of the dialog is clicked, close the dialog and return focus to the trigger

var $helpLink = $('#help-link');
var $tool = $('#help-tool-dialog');
var $toolClose = $('#dialog-close');
// clicks on the help link -> focus the tooltip
$helpLink.on('click', function (e) {
  e.stopPropagation();
  $tool.show();
  $toolClose[0].focus();
});

// keydowns on the tooltip
$tool.on('keydown', function (e) {
  if (e.which === 9) { // TAB
    e.preventDefault();
    $toolClose.focus();
  } else if (e.which === 27) { // ESCAPE
    $toolClose.click();
  }
});

$toolClose.on('keydown', function (e) {
  if (e.which === 9) { // TAB or SHIFT+TAB
    e.preventDefault(); // trap focus within tooltip
  }
});

// clicks on the close button -> hide tooltip and focus it's trigger
$toolClose.on('click', function () {
  $tool.fadeOut();
  $helpLink.focus();
});

// "Account Number" helper
var $accTrigger = $('#account-help-trigger');
var $accDialog = $('#account-help-dialog');
var $accDialogClose = $('#help-dialog-close');

$accTrigger.on('click', function (e) {
  e.stopPropagation(); // prevents the document's click listener from receiving this click
  e.preventDefault(); // dont scroll
  $accDialog.show();
  $accDialogClose[0].focus();
});

$accDialogClose.on('click', function () {
  $accDialog.hide();
  $accTrigger.focus();
});

$accDialogClose.on('keydown', function (e) {
  if (e.which === 9) { // TAB or SHIFT+TAB
    e.preventDefault(); // trap focus within tooltip
  } else if (e.which === 27) {
    $accDialogClose[0].click();
  }
});



// clicking outside of the body should close the tooltip and focus the help link
$(document).on('click', function (e) {
  if ($tool.is(':visible') && !$(e.target).closest('#help-tool-dialog')[0]) {
    $tool.fadeOut();
    $helpLink.focus();
  } else if ($accDialog.is(':visible') && !$(e.target).closest('#account-help-dialog')[0]) {
    $accDialogClose.click();
  }
});