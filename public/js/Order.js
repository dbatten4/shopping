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
  if (voucherErrorCheck(number, this.runningTotal, this.shoppingCart)) {
    return this.voucherErrorObject = getVoucherError(number, this.runningTotal, this.shoppingCart);
  }
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

function voucherErrorCheck(number, currentBasketTotal, cart) {
  if (number === "five" && currentBasketTotal < 5 ||
      number === "ten" && currentBasketTotal < 50 ||
      number === "fifteen" && voucherFifteenErrorCheck(cart, currentBasketTotal)) {
     return true
   };
};

function getVoucherError(number, currentBasketTotal, cart) {
  if (number === "five" && currentBasketTotal < 5) {
    return {
      type: 'five',
      message: 'Basket total must be more than £5.00'
    };
  };
  if (number === "ten" && currentBasketTotal < 50) {
    return {
      type: 'ten',
      message: 'Basket total must be more than £50.00'
    };
  };
  if (number === "fifteen" && voucherFifteenErrorCheck(cart, currentBasketTotal)) {
    return {
      type: 'fifteen',
      message: 'Basket total must be more than £75.00 and have at least one footwear item'
    };
  };
};

function voucherFifteenErrorCheck(cart, currentBasketTotal) {
  if (currentBasketTotal < 75 || noFootwearIn(cart)) { return true };
};

function noFootwearIn(basket) {
  var noFootwear = true;
  for (var i = 0; i < basket.length; i++) {
    if (findById(basket[i]).category == "Footwear") {
      noFootwear = false;
    };
  };
  return noFootwear;
};
