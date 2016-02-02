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
