
/**
 * Module dependencies.
 */

var Emitter = require('component/emitter');
var events = require('component/events');

/**
 * Expose `Cart`.
 */

module.exports = Cart;

/**
 * Create a new `Cart`.
 *
 * @api public
 */

function Cart() {
  this.el = document.querySelector('#cart');
  this.items = [];
  this.listEl = this.el.querySelector('.list tbody');
  this.totalEl = this.el.querySelector('#cart-total .total');
  this.logEl = this.el.querySelector('#cart-log');
  this.events = events(this.el, this);
}

/**
 * Mixin `Emitter`.
 */

Emitter(Cart.prototype);

/**
 * Update the text content of the cart's total.
 *
 * @return {Cart}
 * @api public
 */

Cart.prototype.updateTotal = function () {
  var total = 0;
  this.items.forEach(function (item) {
    total += parseFloat(item.totalPrice);
  });
  this.totalEl.innerHTML = Number(total).toFixed(2);

  // Update the total in the table caption as well
  var captionTotal = this.el.querySelector('caption .total');
  captionTotal.innerHTML = Number(total).toFixed(2);

  return this;
};

/**
 * Focuses the outermost wrapper of the shopping cart.
 *
 * @return {Cart}
 * @api public
 */

Cart.prototype.focusWrapper = function () {
  var wrapper = this.el.querySelector('.list');
  wrapper.focus();
  return this;
};

/**
 * Assertively announces a given `msg`.
 *
 * @param {String} msg
 * @return {Cart}
 * @api public
 */

Cart.prototype.log = function (msg) {
  this.logEl.innerHTML = msg + '<span>Cart Total: ' + this.totalEl.innerHTML + ' dollars</span>';
  return this;
};
