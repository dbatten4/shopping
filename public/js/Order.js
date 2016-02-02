Order = function() {
  this.shoppingCart = [];
};

Order.prototype.addProduct = function(productID) {
  var product = findById(productID);
  return this.shoppingCart.push(product.name);
};

Order.prototype.removeProduct = function(productID) {
  var product = findById(productID);
  var index = this.shoppingCart.indexOf(product.name);
  return this.shoppingCart.splice(index, 1);
};

function findById(id) {
  return productData.filter(function(product) {
    return parseInt(product.id) === id;
  })[0];
};

