
// mimic functionality of clicking a
// label with a proper for attribute
$(document.body).on('click', '.label', function (e) {
  var assocInput = $('[aria-labelledby="' + this.id + '"]')[0];

  if (assocInput) {
    assocInput.click();
  }
});

$(document.body).on('click', '.checkbox', function (e) {
  var $target = $(this);
  var $icon = $target.find('i.fa').first();
  var wasChecked = $icon.hasClass('fa-check-square-o');
  var newClass = (wasChecked) ? 'fa-square-o' : 'fa-check-square-o';
  var oldClass = (wasChecked) ? 'fa-check-square-o' : 'fa-square-o';
  var ariaCheckedVal = (wasChecked) ? 'false' : 'true';

  $icon
    .removeClass(oldClass)
    .addClass(newClass);
  $target.attr('aria-checked', ariaCheckedVal);
});



$(document.body).on('keydown', '.checkbox', function (e) {
  var which = e.which;

  if (which === 13 || which === 32) {
    e.preventDefault(); // don't scroll
    e.target.click();
  }
});


var $radios = $('.radio');

$(document.body).on('click', '.radio', function (e) {
  var $target = $(this);
  var $icon = $target.find('i.fa');

  $icon
    .removeClass('fa-circle-o')
    .addClass('fa-dot-circle-o');
  $target
    .attr('aria-checked', 'true')
    .prop('tabindex', '0');

  $radios.each(function () {
    if (this !== $target[0]) {
      $(this)
        .attr('aria-checked', 'false')
        .prop('tabindex', '-1')
        .find('i')
          .removeClass('fa-dot-circle-o')
          .addClass('fa-circle-o');
    }
  });
});


$(document.body).on('keydown', '.radio', function (keyVent) {
  var which = keyVent.which;
  var target = keyVent.target;

  if (which === 37 || which === 38) { // LEFT |or| UP
    selectAdjacentRadio(target, 'prev');
  } else if (which === 39 || which === 40) { // RIGHT |or| DOWN
    selectAdjacentRadio(target, 'next');
  }

});

// iOS support for clicking on these 'non-natively clickable' elements
$(document.body).on('touchstart', '.radio, .checkbox', function () {
  this.click();
});


function selectAdjacentRadio(radio, dir) {
  var currentIndex = $.inArray(radio, $radios);
  var adjacentIndex = (dir === 'next') ? currentIndex + 1 : currentIndex - 1;
  var adjacentRadio = $radios[adjacentIndex];

  if (!adjacentRadio) {
    // go from last to first and vice versa
    adjacentRadio = (dir === 'next') ? $radios[0] : $radios[$radios.length - 1];
  }

  adjacentRadio.click();
  adjacentRadio.focus();
}
