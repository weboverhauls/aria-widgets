var $submit = $('#submit-button');
var $accNum = $('#account-number');
var $amount = $('#amount');
var $srcAcc = $('#source-account');
var $destAcc = $('#destination-account');
var $bin = $('#bin');
var binFocus;
var binHasFocus = false;
var pageFocus;
var counter = 0;

// Toggle focus between the page and the dialog
function toggleFocus() {
  if (binHasFocus) {
    // Hide the dialog and focusable elements
    // from assistive technology when not active
    $('.bin-focusable').attr('tabindex', '-1');
    $bin.attr('aria-hidden', 'true');

    $bin.addClass('bin-inactive');
    $bin.removeClass('bin-active');
    pageFocus.focus();
  } else {
    $('.bin-focusable').attr('tabindex', '0');
    $bin.removeAttr('aria-hidden');
    $bin.addClass('bin-active');
    $bin.removeClass('bin-inactive');
    binFocus.focus();
  }
  binHasFocus = !binHasFocus;
}

function closeDialog() {
  binHasFocus = false;
  $bin.attr('aria-hidden', 'true');
  $bin.unbind();
  $bin.hide();
  pageFocus.focus();
}


$submit.on('click', function (submitEvent) {
  submitEvent.stopPropagation();
  submitEvent.preventDefault();

  $('input, select').each(function () { // clean up:
    this.removeAttribute('aria-invalid');
    this.removeAttribute('aria-describedby');
  });

  $bin.html('').hide();
  $bin.unbind();
  $('#success-bin').html('').hide();

  // check all of the (required) inputs to see if they have been filled out...
  var binMarkup = '';
  var invalids = [];
  var firstLink;

  if (!$accNum.val()) {
    firstLink = 'account-number-error';
    binMarkup += '<div id="account-number-error" tabindex="0" role="link" class="error-link bin-focusable">' +
                '<i class="fa fa-exclamation-triangle" role="presentation" aria-hidden="true"></i>' +
                '<span class="offscreener">Error: </span>' +
                'Please provide your Account Number</div>';
    invalids.push($accNum[0]);
  }

  if (!$amount.val()) {
    if (!firstLink) firstLink = 'amount-error';
    binMarkup += '<div id="amount-error" tabindex="0" role="link" class="error-link bin-focusable">' +
                '<i class="fa fa-exclamation-triangle" role="presentation" aria-hidden="true"></i>' +
                '<span class="offscreener">Error: </span>' +
                'Please enter an amount in dollars</div>';
    invalids.push($amount[0]);
  }

  if ($srcAcc.val() === '0') {
    if (!firstLink) firstLink = 'source-account-error';
    binMarkup += '<div id="source-account-error" tabindex="0" role="link" class="error-link bin-focusable">' +
                '<i class="fa fa-exclamation-triangle" role="presentation" aria-hidden="true"></i>' +
                '<span class="offscreener">Error: </span>' +
                'Please select a source account</div>';
    invalids.push($srcAcc[0]);
  }

  if ($destAcc.val() === '0') {
    if (!firstLink) firstLink = 'destination-account-error';
    binMarkup += '<div id="destination-account-error" tabindex="0" role="link" class="error-link bin-focusable">' +
                '<i class="fa fa-exclamation-triangle" role="presentation" aria-hidden="true"></i>' +
                '<span class="offscreener">Error: </span>' +
                'Please select a destination account</div>';
    invalids.push($destAcc[0]);
  }

  if (invalids.length) { // there were errors with the form
    $bin.removeClass('success');
    $(invalids).each(function () {
      var descVal = this.id + '-error';
      // for each invalid input, apply:
      // - aria-invalid="true"
      // - aria-describedby="{the id of the input's error message}"
      this.setAttribute('aria-invalid', 'true');
      // for the "Amount" field, there is existing
      //  help text which we don't want to remove
      // (aria-describedby accepts a token list of IDs)
      if (this.id === 'amount') {
        descVal = descVal + ' ' + 'helper';
      }
      this.setAttribute('aria-describedby', descVal);
    });
    $bin.attr('aria-label', 'Errors');
    binMarkup = '<div role="heading" aria-level="2" id="error-head" tabindex="-1">There were errors in the form submission</div>' + binMarkup + '<div><button class="close bin-focusable" id="close-btn" >Close</button></div>';
    $bin.html(binMarkup).show();
    $('#error-head')[0].focus();
    binFocus = $('#error-head');
    pageFocus = $submit;
    toggleFocus();
    //binHasFocus = true;

    // EVENT HANDLERS 
    $bin.click( function(e) {
      e.stopPropagation();
      if (!binHasFocus) {
        toggleFocus();
      } else {
        binFocus = $(document.activeElement);
      }
    });
    $bin.keydown( function(e) {
      e.stopPropagation();
      
      if (e.which === 27) {
        closeDialog();
      } else if (e.which === 117) {
        toggleFocus();
      }
    });
    $bin.keyup( function(e) {
      e.stopPropagation();
      if (e.which === 9) {
        binFocus = $(document.activeElement);
      }
    });
    $('#' + firstLink).keydown( function(e) {
      if (e.which === 9 && e.shiftKey) {
        e.preventDefault();
        $('#close-btn').focus();
      }
    });
    $("#close-btn").keydown( function(e) {
      if (e.which === 9 && !e.shiftKey) {
        e.preventDefault();
        $('#' + firstLink).focus();
      }
    });
    $("#close-btn").click(closeDialog);
    $('.error-link').on('click keydown', function (e) {
      if (e.which === 1 || e.which === 13 || e.which === 32) {
        e.preventDefault();
        var linkID = e.target.id;
        var inputID = linkID && linkID.substr(0, linkID.length - 6);
        if (inputID) {
          var input = $('#' + inputID)[0];
          pageFocus = input;
          toggleFocus();
          input.focus();
        }
      }
    });


  } else { // there were no errors!
    var successBinMarkup = '<div id="alert-wrap" role="alert" tabindex="-1"><div id="success-head" role="heading" aria-level="2">Funds have been transferred successfully</div></div>';
    $('#success-bin').html(successBinMarkup).show();
    $('#alert-wrap')[0].focus();
  }
});

$(document.body).keydown(function (e) {
  if (e.which === 117 && $bin.is(":visible")) {
    toggleFocus();
  }
});
$(document.body).keyup(function (e) {
  if (e.which === 9) {
    pageFocus = $(document.activeElement);
  }
});
$(document.body).click(function (e) {
  if (binHasFocus) {
    toggleFocus();
  }
  pageFocus = $(document.activeElement);
});
