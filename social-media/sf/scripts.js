var $toolbar = $('#social-toolbar');
var $items = $toolbar.find('li');
$toolbar.on('keydown', 'button', function (e) {
  var which = e.which;
  var target = e.target;

  if (which === 37 || which === 38) { // LEFT |or| UP
    focusAdjacentItem(target, which, $items);
  } else if (which === 39 || which === 40) { // RIGHT |or| DOWN
    focusAdjacentItem(target, which, $items);
  }
});

/**
 * Focuses the adjacent item in the toolbar
 * @param  {HTMLElement} element   The target of the keyboard event
 * @param  {Integer} keystroke     The keycode
 * @param  {Object} $items         The jQuery object of items in the toolbar (array-like)
 */
function focusAdjacentItem(element, keystroke, $items) {
  var dir = (keystroke === 37 || keystroke === 38) ? 'prev' : 'next';
  var $li = $(element).closest('li');
  var $adjacentLi = (dir === 'next') ?
                    $li.next().first() :
                    $li.prev().first();
  if (!$adjacentLi[0]) {
    if (dir === 'next') {
      // there wasn't a found adjacent sibling
      // so let's go from the last to the first
      $adjacentLi = $($items[0]);
    } else {
      // there wasn't a found adjacent sibling
      // so let's go from the first to the last
      $adjacentLi = $($items[$items.length - 1]);
    }
  }
  var adjacentBtn = $adjacentLi.find('button')[0];

  if (adjacentBtn) {
    adjacentBtn.focus();
    adjacentBtn.tabIndex = 0; // make the "active" button the natively focusable aspect
    element.tabIndex = -1;
  }
}


/// Access Key ///
$(document.body).on('keydown', function (keyVent) {
  // access keys involve the alt key
  if (!keyVent.altKey) {
    return;
  }

  // s
  if (keyVent.which === 83) {
    keyVent.preventDefault();
    $toolbar.focus();
  }
});

// iOS specific fix:
// Applies aria-describedby="hidden-share" so the display: none
// message "Share Page" is read out as help text
var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
if (iOS) {
  $('#social-toolbar button').each(function () {
    this.setAttribute('aria-describedby', 'hidden-share');
  });
}
