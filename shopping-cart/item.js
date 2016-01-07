
/**
 * Module dependencies.
 */

var itemHtml = require('./item.html');
var classes = require('component/classes');
var domify = require('component/domify');
var events = require('component/events');
var Emitter = require('component/emitter');
var closest = require('component/closest');
var Confirmation = require('component/confirmation');
var focusTrap = require('stephenmathieson/focus-trap');
var fmt = require('yields/fmt');

/**
 * Extend `fmt` to format currency values.
 */

fmt.c = function (n) {
  return Number(n || 0).toFixed(2);
};

/**
 * Expose `Item`.
 */

module.exports = Item;

/**
 * Create a new `Item`.
 *
 * @param {String} name
 * @api public
 */

function Item(name) {
  this.el = domify(itemHtml);
  this.name = name;
  this.price = 9.99;
  this.quantity = 1;
  this.warrantyCost = 4.99;
  this.giftwrapCost = 2.99;
  this.nameEl = this.el.querySelector('.name');
  this.thumb = this.el.querySelector('.thumb img');
  this.priceEl = this.el.querySelector('.price .dollars');
  this.quantityEl = this.el.querySelector('.quantity input');
  this.extrasEl = this.el.querySelector('.extras');
  this.totalEl = this.el.querySelector('td.total .dollars');
  this.events = events(this.el, this);
  this.events.bind('change .quantity input', 'updateTotal');
  this.events.bind('click button.warranty', 'toggleExtra');
  this.events.bind('click button.giftwrap', 'toggleExtra');
  this.events.bind('click button.remove', 'remove');
}

/**
 * Mixin `Emitter`.
 */

Emitter(Item.prototype);

/**
 * Sets up the Item. Invoke prior to `#appendTo`.
 *
 * @return {Item}
 * @api public
 */

Item.prototype.initialize = function () {
  var altStr = 'Thumbnail image of ';
  this.nameEl.innerHTML = this.name;
  this.thumb.setAttribute('alt', altStr + this.name);
  this.priceEl.innerHTML = this.price;
  this.quantityEl.value = this.quantity;
  this.totalPrice = this.totalEl.innerHTML =
    Number(this.price * this.quantity).toFixed(2);
  return this;
};

/**
 * Appends the Item to a given `cart`.
 *
 * @param {Cart} cart
 * @return {Item}
 * @api public
 */

Item.prototype.appendTo = function (cart) {
  cart.listEl.appendChild(this.el);
  cart.items.push(this);
  return this;
};

/**
 * Updates `Item#totalPrice` and `Item#totalEl.innerHTML`
 * using available item info.
 *
 * @return {Item}
 * @api public
 */

Item.prototype.updateTotal = function () {
  var qty = this.quantity = this.quantityEl.value;
  var warranty = this.extrasEl.querySelector('.warranty.active')
    ? this.warrantyCost * qty : 0;
  var giftwrap = this.extrasEl.querySelector('.giftwrap.active')
    ? this.giftwrapCost * qty : 0;

  this.totalPrice = (this.price * this.quantityEl.value)
    + warranty
    + giftwrap;

  this.totalEl.innerHTML = Number(this.totalPrice).toFixed(2);
  this.emit('updated');
  this.log(fmt('Item total: %c dollars', this.totalPrice));

  return this;
};

/**
 * Handles clicks on "action" items which toggle "extras".
 *
 * @param {Event} e
 * @return {Item}
 * @api public
 */

Item.prototype.toggleExtra = function (e) {
  var button = closest(e.target, 'button', true);
  var extraName = button.className;
  var extra = this.extrasEl.querySelector('.' + extraName);
  var action = button.querySelector('.action');
  var origState = action.innerHTML;
  var extraMsg;

  // Toggle "active" class to display/hide the "extra"
  classes(extra).toggle('active');

  // Toggle the trigger button's text
  if (origState == 'Add') {
    action.innerHTML = 'Remove';
    extraMsg = extraName + ' added. ';
  } else {
    action.innerHTML = 'Add';
    extraMsg = extraName + ' removed. ';
  }

  this.updateTotal();
  this.log(extraMsg + fmt('Item total: %c dollars', this.totalPrice));

  return this;
};

/**
 * Handles clicks on the "Remove Item" button.
 *
 * Triggers a confirmation prompt before
 * removing the item.
 *
 * @api public
 */

Item.prototype.remove = function () {
  var self = this;
  var trigger = self.el.querySelector('button.remove');

  new Confirmation('Do you really want to remove ' + self.name + ' from your cart?')
  .ok('Yes')
  .cancel('No')
  .fixed()

  .on('show', function () {
    focusTrap(this.el.querySelector('.confirmation-actions'));
    this.el.setAttribute('role', 'alertdialog');
  })

  .on('ok', function () {
    self.totalPrice = 0;
    self.el.parentNode.removeChild(self.el);
    self.emit('removed');
    self.log(self.name + ' removed from cart');
    trigger.focus();
  })

  .on('cancel', function () {
    trigger.focus();
  })

  .show();
};


Item.prototype.log = function (msg) {
  this.emit('log', {
    msg: '<span>' + msg + '</span>'
  });
};
