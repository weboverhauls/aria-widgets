//--------------------------------------------------------------------------------------------------
// make the input-trigger aria-describedby some offscreen
// helptext describing how to use this combobox

// aria-activedescendant -> as options are traversed set the value to the id of the option

// Pressing Enter or Alt+Up while aria-activedescendant is set will cause
// the referenced value to be saved and the Listbox to be closed, or pressing
// Escape will cancel and close the Listbox.


//--------------------------------------------------------------------------------------------------

// initial function call:
$(document).ready(listboxHandler);

function listboxHandler() {
  var $listbox = $('#state');
  var $downArrow = $('#down-arrow');
  var $optionList = $('#state-list');

  // clicks on the custom listbox
  $listbox.on('click', function () {
    var isOpen = $optionList.is(':visible');

    if (isOpen) {
      // it was open so let's call upon the close function
      closeList($listbox, $downArrow, $optionList);
    } else {
      // it was closed so let's call upon the open function
      openList($listbox, $downArrow, $optionList);
    }
  });

  // when the arrow is clicked, click the state listbox input
  $downArrow.on('click', function () {
    $listbox[0].click();
    $listbox[0].focus();
  });

  // keydowns on the custom listbox
  var adjacentOption;
  $listbox.on('keydown', function (e) {
    var listOpen = $optionList.is(':visible');
    e.stopPropagation();
    var target = e.target;
    var which = e.which;

    if (which === 40) { // DOWN ARROW
      e.preventDefault();
      if (!listOpen) {
        openList($listbox, $downArrow, $optionList);
      } else {
        adjacentOption = findAdjacentOption($listbox, $optionList, 'next');

        if (adjacentOption) {
          setActiveOption(adjacentOption, $listbox, $optionList);
        }
      }
    } else if (which === 38 && listOpen) { // UP ARROW
      e.preventDefault();
      adjacentOption = findAdjacentOption($listbox, $optionList, 'prev');

      if (adjacentOption) {
        setActiveOption(adjacentOption, $listbox, $optionList);
      }
    } else if (which === 9 && listOpen) { // TAB
      e.preventDefault(); // preventing default b/c we control what recieves focus...
      setSelectedOption($listbox, $optionList);
      closeList($listbox, $downArrow, $optionList);
      $listbox.focus();
    } else if (which === 27 && listOpen) {
      closeList($listbox, $downArrow, $optionList);
      $listbox[0].focus();
    } else if (which === 13 && listOpen) {
      setSelectedOption($listbox, $optionList);
      $listbox[0].click();
    } else if (which >= 65 && which <= 90) { // Any letter (z-a)
      var nextLetterOption = letterSearch(which, $optionList);
      if (nextLetterOption) {
        setActiveOption(nextLetterOption, $listbox, $optionList);
      }
    }
  });

  // clicks on the options
  $optionList.on('click', 'li', function () {
    setActiveOption(this, $listbox, $optionList);
    setSelectedOption($listbox, $optionList);
    $listbox[0].click();
  });


  // extend a `scrollTo` function used to scroll the currently
  // highlighted option to the top of it's container
  jQuery.fn.scrollTo = function(elem) {
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
    return this;
  };
}


function openList($listbox, $downArrow, $optionList) {
  // display the list of options
  $optionList.show();
  // tell ATs that the list is open
  $listbox.attr('aria-expanded', 'true');

  // finds the 'active' option (defaults to the first one if none are active)
  var activeOption = findActiveOption($listbox, $optionList);

  // ensure this option is programatically active
  setActiveOption(activeOption, $listbox, $optionList);

  // ensure the up arrow is shown
  var arrowIcon = $downArrow.find('i.fa')[0];
  if ($(arrowIcon).hasClass('fa-chevron-down')) {
    $(arrowIcon)
    .removeClass('fa-chevron-down')
    .addClass('fa-chevron-up');
  }
}

function closeList($listbox, $downArrow, $optionList) {
  // hide the list of options
  $optionList.hide();
  // tell ATs the the list is now closed
  $listbox.attr('aria-expanded', 'false');

    // ensure the up arrow is shown
  var arrowIcon = $downArrow.find('i.fa')[0];
  if ($(arrowIcon).hasClass('fa-chevron-up')) {
    $(arrowIcon)
    .removeClass('fa-chevron-up')
    .addClass('fa-chevron-down');
  }
}


///////////////////////////////////////////
//////////////// UTILITIES ////////////////
///////////////////////////////////////////

/**
 * Finds the active option
 * @param  {Object} $listbox    jQuery object containing the input reference
 * @param  {Object} $optionList jQuery object containing the list of options' container
 * @return {HTMLElement}        the HTML element reference to the active option
 */
function findActiveOption($listbox, $optionList) {
  var activeOption = $('li.active', $optionList[0])[0];

  if (!activeOption) {
    // default to the first option...
    activeOption = $('li', $optionList[0])[0];
  }

  return activeOption;
}


/**
 * Sets an option as 'active' while making it's siblings 'inactive'
 * - toggles the class 'active' on the active/inactive options
 * - updates the `aria-activedescendant` attribute of the input
 * @param {HTMLElement} activeOption the newly active option
 * @param {Object} $listbox the jQuery object containing the reference to the input
 */
function setActiveOption(activeOption, $listbox, $optionList) {
  // removes the active class from all
  // of the active option's siblings
  $(activeOption).siblings().each(function () {
    $(this).removeClass('active');
  });

  // ensures the active option recieves the 'active' class
  $(activeOption).addClass('active');

  // scroll the option list to the 'active' option
  $optionList.scrollTo(activeOption);

  // ensure the active option has an id (without clobbering an existing id)
  activeOption.id = activeOption.id || uniqueString();

  // update the `aria-activedescendant` attribute to the id of the newly active option
  $listbox.attr('aria-activedescendant', activeOption.id);
}

/**
 * Finds the adjacent option
 * @param  {Object} $listbox    jQuery reference to input
 * @param  {Object} $optionList jQuery reference to list element
 * @param  {String} dir         "prev" or "next" (determines adjacent direction)
 * @return {HTMLElement}        the adjacent option
 */
function findAdjacentOption($listbox, $optionList, dir) {
  var currentActive = findActiveOption($listbox, $optionList);
  var adjacentOption = (dir === 'next') ?
                      $(currentActive).next()[0] :
                      $(currentActive).prev()[0];
  return adjacentOption;
}


function setSelectedOption($listbox, $optionList) {
  var currentlyActive = $('li.active', $optionList[0])[0];
  if (currentlyActive) {
    $listbox[0].value = $(currentlyActive).attr('data-value');
    currentlyActive.setAttribute('aria-selected', 'true');
    $(currentlyActive).siblings().each(function () {
      this.setAttribute('aria-selected', 'false');
    });
  }
}

function letterSearch(key, $optionList) {
  var nextOption;
  var active = $optionList.find('li.active')[0];
  var letter = String.fromCharCode(key);
  var isCurrentLetter = $(active)
                          .attr('data-value')
                          .toLowerCase()[0] === letter.toLowerCase();

  var startsWithLetter = []; // cache all options with that first character
  $optionList.find('li').each(function (i, li) {
    var optionValue = li.getAttribute('data-value');
    if (optionValue.toLowerCase()[0] === letter.toLowerCase()) {
      startsWithLetter.push(li);
    }
  });

  var activeIndex = isCurrentLetter && $.inArray(active, startsWithLetter);

  if (activeIndex || activeIndex === 0) {
    if (activeIndex === startsWithLetter.length -1) {
      // go from the last back to the first option...
      nextOption = startsWithLetter[0];
    } else {
      nextOption = startsWithLetter[activeIndex + 1];
    }
  } else {
    nextOption = startsWithLetter[0];
  }

  return nextOption;
}

// generates a UNIQUE string
function uniqueString() {
  return Math.floor(Math.random() * 0x0deadbeef);
}
