Order = function() {
  this.shoppingCart = [];
  this.runningTotal = 0;
};

Order.prototype.addProduct = function(productID) {
  this.shoppingCart.push(productID);
  return this.runningTotal = calculateRunningTotal(this.shoppingCart);
};

Order.prototype.removeProduct = function(productID) {
  var index = this.shoppingCart.indexOf(productID);
  this.shoppingCart.splice(index, 1);
  return this.runningTotal = calculateRunningTotal(this.shoppingCart);
};

Order.prototype.applyDiscount = function(number) {
  var discount = {
    five: 5,
    ten: 10,
    fifteen: 15
  };
  if (number === "five" && this.runningTotal < 5) { return this.voucherFiveError = true };
  if (number === "ten" && this.runningTotal < 50) { return this.voucherTenError = true };
  if (number === "fifteen" && this.runningTotal < 75) { return this.voucherFifteenError = true };
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
