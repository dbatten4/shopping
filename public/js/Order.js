Order = function() {
  this.shoppingCart = [];
};

Order.prototype.addProduct = function(productID) {
  var product = findById(productID);
  var cartObject = new Object;
  cartObject[product.name] = 1;
  this.shoppingCart.push(cartObject);
};

function findById(id) {
  return productData.filter(function(product) {
    return parseInt(product.id) === id;
  })[0];
};

