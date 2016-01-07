function initMegaMenu() {
  var megaMenu = document.getElementById('mega-menu');
  // keyboard stuff
  $(megaMenu).delegate('li a', 'keydown', keyboardHandler);

  // mouse stuff
  $(' > li.has-drop', megaMenu).each(function () {
    var dropdown = $('.droplet', $(this)[0]);

    $(this).hover(
      function () {
        $(this).addClass('active');
        $('.droplet', megaMenu).each(function (index, drop) {
          if (drop !== dropdown) {
            $(drop).hide();
          }
        });

        $(dropdown).slideDown(100);

      }, function () {
        $(this).removeClass('active');
        $(dropdown).slideUp(100);
      }
    );
  });

}


function keyboardHandler(keyVent) {
  var target = keyVent.target;
  var which = keyVent.which;

  if (which === 39) { // RIGHT
    if (isTopLevel(target)) {
      // top level item
      var nextTopItem = adjacentTopLevelItem(target, 'next');

      if (nextTopItem) {
        keyVent.preventDefault();
        nextTopItem.focus();
      }
    } else {
      // dropdown item
      var nextDropletItem = adjacentDropdownItem(target, 'next');
      if (nextDropletItem) {
        keyVent.preventDefault();
        nextDropletItem.focus();
      }
    }
  } else if (which === 37) { // LEFT
    if (isTopLevel(target)) {
      // top level item
      var prevTopItem = adjacentTopLevelItem(target, 'prev');

      if (prevTopItem) {
        keyVent.preventDefault();
        prevTopItem.focus();
      }
    } else {
      // dropdown item
      var prevDropItem = adjacentDropdownItem(target, 'prev');
      if (prevDropItem) {
        keyVent.preventDefault();
        prevDropItem.focus();
      }
    }
  } else if (which === 40) { // DOWN
    if (isTopLevel(target) && hasDropdown(target)) {
      // top level item w/ dropdown -- open dropdown
      openDropdown(target);
    } else {
      // dropdown item
      var nextDropItem = adjacentDropdownItem(target, 'next');

      if (nextDropItem) {
        keyVent.preventDefault();
        nextDropItem.focus();
      }
    }
  } else if (which === 38) { // UP
    if (!isTopLevel(target)) {
      if (isFirstDropItem(target)) {
        keyVent.preventDefault();
        var top = closeDropdown(target);
        setTimeout(function () {
          top.focus();
        }, 0);
      } else {
        var prevDropAnchor = adjacentDropdownItem(target, 'prev');

        if (prevDropAnchor) {
          keyVent.preventDefault();
          prevDropAnchor.focus();
        }
      }
    }
  } else if (which === 27) { // ESCAPE
    if (!isTopLevel(target)) {
      var topper = closeDropdown(target);
      setTimeout(function () {
        topper.focus();
      }, 0);
    }
  } else if (which === 9 && keyVent.shiftKey) { // SHIFT + TAB
    if (!isTopLevel(target) && isFirstDropItem(target)) {
      keyVent.preventDefault();
      var topA = closeDropdown(target);
      setTimeout(function () {
        topA.focus();
      }, 0);
    }
  } else if (which === 9) { // TAB
    if (!isTopLevel(target) && isLastDropItem(target)) {
      keyVent.preventDefault();
      var topItem = closeDropdown(target);
      var nextLi = $(topItem.parentNode).next()[0];
      var nextAnchor = $('a', nextLi)[0];
      nextAnchor.focus();
    }
  } else if (which === 13 || which === 32) {
    if (isTopLevel(target) && $(target.parentNode).hasClass('has-drop')) {
      openDropdown(target);
    }
  }
}

// determines if the item is a top-level one
function isTopLevel(item) {
  return $(item).is('#mega-menu > li > a');
}

// determines if the item has a dropdown
function hasDropdown(item) {
  return $(item.parentNode).hasClass('has-drop');
}

// determines if the item is the first in the dropdown
function isFirstDropItem(item) {
  var drop = $(item).closest('.droplet')[0];
  var firstInDrop = $('li a', drop)[0];

  return firstInDrop === item;

}

// determines if the item is the last in the dropdown
function isLastDropItem(item) {
  var drop = $(item).closest('.droplet')[0];
  var lastInDrop = $('li a', drop).last()[0];

  return lastInDrop === item;
}

// finds the adjacent top level item
function adjacentTopLevelItem(item, dir) {
  var li = item.parentNode; // <li />
  var adjacentLi = (dir === 'next') ?
                    $(li).next()[0] :
                    $(li).prev()[0];
  var adjacentItem = adjacentLi && $('a', adjacentLi)[0];

  return adjacentItem;
}

// finds the next or prev dropdown item
function adjacentDropdownItem(item, dir) {
  var adjacentDropItem;
  var li = item.parentNode;
  var adjacentSameCol = (dir === 'next') ?
                        $(li).next()[0] :
                        $(li).prev()[0];
  if (adjacentSameCol) {
    // there is one in the same col
    adjacentDropItem = $('a', adjacentSameCol)[0];
  } else {
    // lets look for one in the adjacent column
    var col = $(li).closest('.col')[0];
    var adjacentCol = (dir === 'next') ?
                      $(col).next()[0] :
                      $(col).prev()[0];
    if (adjacentCol) {
      // we've found the adjacent column
      var adjacentItem = (dir === 'next') ?
                          $('li a', adjacentCol)[0] :
                          $('li a', adjacentCol).last()[0];

      if (adjacentItem) {
        adjacentDropItem = adjacentItem;
      }
    }
  }

  return adjacentDropItem;
}


function openDropdown(item) {
  $(item.parentNode).addClass('active');
  var droplet = $(item).next()[0];
  // open the dropdown...
  $(droplet).slideDown(100);
  // ...and focus the first item
  setTimeout(function () {
    $('a', droplet)[0].focus();
  }, 100);
}

function closeDropdown(item) {
  var droplet = $(item).closest('.droplet')[0];
  var topLevelItem = $(droplet).prev()[0];
  $(topLevelItem.parentNode).removeClass('active');
  $(droplet).slideUp(100);

  return topLevelItem;
}



////////////////////////////////////
$(document).ready(initMegaMenu);
////////////////////////////////////
