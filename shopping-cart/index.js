
/**
 * Module dependencies.
 */

var data = require('./data.json');
var Item = require('./item');
var Cart = require('./cart');

/**
 * Create the cart, and add all the items.
 */

var cart = new Cart();

while (data.items.length) {
  var _name = data.items.shift();
  addItem(_name);
}

cart.updateTotal();

/**
 * Creates a new `Item#` and appends it to `Cart#`.
 *
 * @param {String} name
 * @api private
 */

function addItem(name) {
  new Item(name)
  .initialize()
  .appendTo(cart)
  .on('updated', function () {
    cart.updateTotal();
  })
  .on('removed', function () {
    cart.updateTotal();
    cart.focusWrapper();
  })
  .on('log', function (data) {
    cart.log(data.msg);
  });
}
