var sortOrder;
var $container = $('#table-cage');
var $table = $('#employee-table');
var $tbody = $table.find('tbody');
var $sortables = $table.find('.sortable');
var $rows = $table.find('tbody tr');
var $captionSpan = $table.find('caption span');

$table.on('click', '.sortable', sortCol);
$table.on('keydown', '.th-body', function (e) {
  if (e.which === 13 || e.which === 32) {
    this.click();
  }
});

var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
if (iOS) {
  labelledbyConfig($table);
}

// ensure that the updating of the caption is read out by AT
$table.find('caption').attr({
  'aria-live': 'polite',
  'aria-atomic': 'false'
});


function sortCol() {
  // updates the sort icon and returns the new sort state
  sortOrder = updateIcon(this);
  var items = [];
  var sortType = this.getAttribute('data-sort');
  var thisIndex = $.inArray(this, $sortables);

  // loop through each row and build our `items` array
  // which will become an array of objects:
  // {
  //  tr: (the HTMLElement reference to the given row),
  //  val: (the String value of the corresponding td)
  // }
  $rows.each(function () {
    var item = {};
    item.tr = this;
    $tds = $(this).find('td');
    var td = $tds[thisIndex];
    item.val = $(td).text();
    items.push(item);
  });

  // sort the array of values
  if (!sortType || sortType === 'standard') {
    items.sort(standardSort);
  } else if (sortType === 'date') {
    items.sort(dateSort);
  } else if (sortType === 'text') {
    items.sort(textSort);
  } else if (sortType === 'money') {
    items.sort(moneySort);
  }

  // clear the tbody's contents
  $tbody.html('');

  // append each row in the new, sorted order
  $.each(items, function (i, item) {
    $tbody.append(item.tr);
  });

  // update the caption:
  $captionSpan.html(' (Sorted by ' + $(this).text() + ': ' + sortOrder + ')');
}

/**
 * Updates the arrow icon based on new sort status
 * @param  {HTMLElement} th    The table heading element reference
 * @return {String}      state The new sort state ("ascending" or "descending")
 */
function updateIcon(th) {
  var state = 'ascending';
  var $icon = $(th).find('i');
  if ($icon.hasClass('fa-arrows-v')) { // No sort -> Ascending
    $icon
      .removeClass('fa-arrows-v')
      .addClass('fa-arrow-up');
  } else if ($icon.hasClass('fa-arrow-down')) { // Descending -> Ascending
    $icon
      .removeClass('fa-arrow-down')
      .addClass('fa-arrow-up');
      state = 'ascending';
  } else { // Ascending -> Descending
    $icon
      .removeClass('fa-arrow-up')
      .addClass('fa-arrow-down');
    state = 'descending';
  }

  $(th).attr('aria-sort', state);

  $(th).siblings().each(function () {
    // update all other rows with the neutral sort icon
    $(this)
      .attr('aria-sort', 'none')
      .find('i')
      .removeClass('fa-arrow-up')
      .removeClass('fa-arrow-down')
      .addClass('fa-arrows-v');
  });
  return state;
}

/**
 * Executes a standard sort (direct comparisons)
 */
function standardSort(a, b) {
  return (sortOrder === 'ascending')
          ? a.val - b.val
          : b.val - a.val;
}

/**
 * Takes two formatted date/time values
 * (see `formatDate`) and compares them
 */
function dateSort(a, b) {
  return (sortOrder === 'ascending')
          ? formatDate(a.val) - formatDate(b.val)
          : formatDate(b.val) - formatDate(a.val);
}

function textSort(a, b) {
  if (sortOrder === 'ascending') {
    if (a.val.toLowerCase() < b.val.toLowerCase()) {
      return -1;
    }
    if (a.val.toLowerCase() > b.val.toLowerCase()) {
      return 1;
    }

    return 0;
  } else {
    if (a.val.toLowerCase() < b.val.toLowerCase()) {
      return 1;
    }
    if (a.val.toLowerCase() > b.val.toLowerCase()) {
      return -1;
    }

    return 0;
  }
}

function moneySort(a, b) {
  var strippedA = a.val.replace(/,/g , '');
  var strippedB = b.val.replace(/,/g , '');

  if (sortOrder === 'ascending') {
    if (strippedA < strippedB) {
      return -1;
    }
    if (strippedA > strippedB) {
      return 1;
    }

    return 0;
  } else {
    if (strippedA < strippedB) {
      return 1;
    }
    if (strippedA > strippedB) {
      return -1;
    }

    return 0;
  }
}


/**
 * Formats a date string ("01/01/01") as
 * a numeric value using `Date.getTime`
 */
function formatDate(dateString) {
  var formattedDate = new Date(dateString);
  return formattedDate.getTime();
}


function labelledbyConfig($table) {
  // below is an attempt to fix voiceover bug which
  // does not respect table cell to heading realationships
  var labelledbyText;
  var colHeadIDs = ['e-name', 'e-salary', 'e-extension', 'e-start-date', 'e-company'];
  var $tbody = $table.find('tbody').first();
  var $tds = $tbody.find('td');

  $tds.each(function () {
    var tdRole = this.getAttribute('role');

    if (tdRole === 'rowheader') {
      labelledbyText = 'e-name';
    } else {
      // find its index within its row
      var $rowTds = $(this).closest('tr').first().find('td');
      var index = $.inArray(this, $rowTds);
      labelledbyText = colHeadIDs[index] + ' ' + $rowTds[0].id;
    }

    this.setAttribute('aria-describedby', labelledbyText);
  });
}
