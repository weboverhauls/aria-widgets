/**
 * Live region playground
 *
 * @author Harris Schneiderman
 */


var i = 1;
var contentChanges = 1;
var interval;
var $role = $('#role');
var $stop = $('#stop');
var $mean = $('#mean');
var $update = $('#update');
var $fixture = $('#fixture');
var $ariaLive = $('#aria-live');
var $ariaAtomic = $('#aria-atomic');
var $ariaRelevant = $('#aria-relevant');

configureRegion();

// apply attrs based on fields
$('#submit').on('click', configureRegion);

// clear the live region div (except for the "static content")
$('#clear').on('click', function () {
  $update.empty();
  i = 1;
  contentChanges = 1;
});

$('input[name="cus-def"]').on('change', function () {
  if ($('#default').is(':checked')) {
    $ariaLive.attr('disabled', 'disabled').attr('aria-disabled', 'true');
    $ariaAtomic.attr('disabled', 'disabled').attr('aria-disabled', 'true');
    $ariaRelevant.attr('disabled', 'disabled').attr('aria-disabled', 'true');
  } else {
    $ariaLive.removeAttr('disabled').removeAttr('aria-disabled', 'true');
    $ariaAtomic.removeAttr('disabled').removeAttr('aria-disabled', 'true');
    $ariaRelevant.removeAttr('disabled').removeAttr('aria-disabled', 'true');
  }
});

// stop adding content
$stop.on('click', function () {
  if (interval) {
    clearInterval(interval);
  }
});

// configure vals of others based on newly selected role
$role.on('change', onroleChange);

function configureRegion(e) {
  if (interval) {
    clearInterval(interval);
  }

  // configure attributes
  $fixture
    .attr({
      'role': $role.val(),
      'aria-live': $ariaLive.val(),
      'aria-atomic': $ariaAtomic.val(),
      'aria-relevant': $ariaRelevant.val()
    });

  // configure content insertion (if submit was clicked)
  if (e) {
    configureInsertion();
  }
}

function configureInsertion() {
  var freq = $('input[name="trigger-type"]:checked').val();

  // call `insertContent` based on frequency chosen
  if (freq === 'once') {
    $stop.attr('disabled', 'disabled');
    insertContent();
  } else {
    $stop.removeAttr('disabled');
    var freq = (freq === 'five') ? 5 : 10;
    interval = setInterval(insertContent, freq * 1000);
  }
}

function insertContent() {
  if (contentChanges < 10) {
    if (isOdd(contentChanges)) {
      $update.append('<div><span class="added">Added Content</span> #' + i + '</div>');
      if (contentChanges === 9) {
        $update.append('<div>Also, more <span class="added">added content</span>! Unfortunately, I will be removed next...</div>');
      }
      i++;
    } else {
      $update.find('.added').last().html('Modified Content');
    }
  } else {
    $update.children().last().remove();
    contentChanges = 1; // reset it.
  }
  contentChanges++;
}

function onroleChange() {
  if ($('#custom').is(':checked')) {
    return;
  }

  var activeCache = document.activeElement;
  var role = $role.val();

  // update <select /> vals based on role
  if (role == 'alert') {
    $ariaLive.val('polite');
    $ariaAtomic.val('true');
    $ariaRelevant.val('text');
  } else if (role == 'log') {
    $ariaLive.val('polite');
    $ariaAtomic.val('false');
    $ariaRelevant.val('text');
  } else if (role == 'status') {
    $ariaLive.val('polite');
    $ariaAtomic.val('true');
    $ariaRelevant.val('text');
  } else if (role == 'marquee') {
    $ariaLive.val('off');
    $ariaAtomic.val('false');
    $ariaRelevant.val('text');
  }
}

function isOdd(n) {
  return Math.abs(n) % 2 == 1;
}