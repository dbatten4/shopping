Order = function() {
  this.shoppingCart = [];
  this.runningTotal = 0;
};

Order.prototype.addProduct = function(productID) {
  var product = findById(productID);
  if (parseInt(product.quantity) == 0 ) { return this.stockError = true }
  this.shoppingCart.push(productID);
  return this.runningTotal = calculateRunningTotal(this.shoppingCart);
};

Order.prototype.removeProduct = function(productID) {
  if (this.shoppingCart.indexOf(productID) > -1) {
    var index = this.shoppingCart.indexOf(productID);
    this.shoppingCart.splice(index, 1);
    return this.runningTotal = calculateRunningTotal(this.shoppingCart);
  };
};

Order.prototype.applyDiscount = function(number) {
  if (number === "five" && this.runningTotal < 5) { return this.voucherFiveError = true };
  if (number === "ten" && this.runningTotal < 50) { return this.voucherTenError = true };
  if (number === "fifteen" && this.runningTotal < 75) { return this.voucherFifteenError = true };
  var discount = {
    five: 5,
    ten: 10,
    fifteen: 15
  };
  return this.runningTotal -= discount[number];
};

function findById(id) {
  return productData.filter(function(product) {
    return parseInt(product.id) === id;
  })[0];
};

function calculateRunningTotal(cart) {
  var sum = 0;
  for (var i = 0; i < cart.length; i++) {
    var price = parseFloat(findById(cart[i]).price);
    sum += price;
  };
  return sum
};

