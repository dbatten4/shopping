Order = function() {
  this.shoppingCart = [];
  this.runningTotal = 0;
};

Order.prototype.addProduct = function(productID) {
  if (isInArray(this.shoppingCart, productID)) { return this.alreadyAdded = true };
  var product = findProductByIDFromArray(productData, productID);
  if (parseInt(product.quantity) == 0 ) { return this.stockError = true }
  this.shoppingCart.push(productID);
  return this.runningTotal = calculateRunningTotal(this.shoppingCart);
};

Order.prototype.removeProduct = function(productID) {
  if (isInArray(this.shoppingCart, productID)) {
    var index = this.shoppingCart.indexOf(productID);
    this.shoppingCart.splice(index, 1);
    return this.runningTotal = calculateRunningTotal(this.shoppingCart);
  };
};

Order.prototype.applyDiscount = function(number) {
  if (voucherErrorCheck(number, this.runningTotal, this.shoppingCart)) {
    return this.voucherErrorObject = getVoucherError(number);
  };
  var discount = {
    five:    5,
    ten:     10,
    fifteen: 15
  };
  return this.runningTotal -= discount[number];
};

function findProductByIDFromArray(array, id) {
  return array.filter(function(product) {
    return parseInt(product.id) === id;
  })[0];
};

function isInArray(array, item) {
  return array.indexOf(item) > -1;
};

function calculateRunningTotal(cart) {
  var pricesArray = convertArrayToFloats(mapIDToProperty('discounted', cart, 'price'));
  return sumArray(pricesArray);
};

function mapIDToProperty(property, array, alternativeProperty) {
  return array.map(function(id) {
    var product = findProductByIDFromArray(productData, id);
    return product[property] || product[alternativeProperty];
  });
};

function convertArrayToFloats(array) {
  return array.map(function(element) {
    return parseFloat(element);
  });
};

function sumArray(array) {
  return array.reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
};

function voucherErrorCheck(number, currentBasketTotal, cart) {
  return (number === "five"    && currentBasketTotal < 5)  ||
         (number === "ten"     && currentBasketTotal < 50) ||
         (number === "fifteen" && voucherFifteenErrorCheck(cart, currentBasketTotal));
};

function getVoucherError(number) {
  var errorReference = {
       five: {
              type:    'five',
              message: 'Basket total must be more than £5.00'
             },
        ten: {
              type:    'ten',
              message: 'Basket total must be more than £50.00'
             },
    fifteen: {
              type:    'fifteen',
              message: 'Basket total must be more than £75.00 and have at least one footwear item'
             }
  };
  return errorReference[number];
};

function voucherFifteenErrorCheck(cart, currentBasketTotal) {
  return currentBasketTotal < 75 || !isValueIn(cart, 'category', 'Footwear');
};

function isValueIn(basket, property, searchTerm) {
  var mappedArray = mapIDToProperty(property, basket);
  return isInArray(mappedArray, searchTerm);
};
