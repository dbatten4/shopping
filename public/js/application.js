$(document).ready(function() {
  order = new Order();
  $('.basket').hide();

  $.each(productData, function(_, product) {
    var appendItem =
      '<div class="product-container">'
      + '<div class="title">'
        + '<span class="name">' + product.name + '</span>'
        + '<span class="colour">' + product.colour + '</span>'
      + '</div>'
      + '<div class="category">' + product.gender + ' ' + product.category + '</div>'
      + '<div class="price" id="price-'+product.id+'">£' + product.price + '</div>'
      + '<div class="discounted-price" id="discounted-price-'+product.id+'"></div>'
      + '<div class="add-product">'
        + '<a href="#" class="add" id="'+product.id+'-add">Add to basket</a>'
        + '<div class="add-error"></div>'
      + '</div>'
    + '</div>';
    $('.product-area').append(appendItem);
    discountAndStockCheck(product);
  });

  $('.add').click(function() {
    $('.error').html(' ');
    var productID = parseInt($(this).attr('id'));
    order.addProduct(productID);
    addErrorCheck.call(this);
    updateShoppingCartDisplay();
  });

  $('.basket-items').on("click", "a.remove", function() {
    $('.error').html(' ');
    var productID = parseInt($(this).attr('id'));
    order.removeProduct(productID);
    updateShoppingCartDisplay();
  });

  $('.voucher').click(function() {
    $('.error').html(' ');
    var number = $(this).attr('id');
    order.applyDiscount(number);
    if (voucherErrorCheck()) { return };
    $(this).hide();
    $('.basket-price').text('£' + order.runningTotal.toFixed(2));
  });

  $('a').click(function() {
    event.preventDefault();
  });

  function findProductByIDFromArray(array, id) {
    return array.filter(function(product) {
      return parseInt(product.id) === id;
    })[0];
  };

  function discountAndStockCheck(product) {
    if (product.discounted) {
      $('#price-' + product.id).wrap("<strike>");
      $('#discounted-price-' + product.id).html(product.discounted);
    };
    if (parseInt(product.quantity) == 0) {
      $('#' + product.id + '-add').next().html('<span class="stock-error"> This item is out of stock</span>');
    };
  };

  function addErrorCheck() {
    if (order.alreadyAdded) {
      $(this).next().html('<span class="error"> This item has already been added</span>');
      order.alreadyAdded = null;
    };
    if (order.stockError) {
      $(this).next().html('<span class="stock-error"> This item is out of stock</span>');
      order.stockError = null;
    };
  };

  function voucherErrorCheck() {
    if (order.voucherErrorObject) {
      $('.voucher-error-message').html('<span class="error">' + order.voucherErrorObject.message + '</span>');
      order.voucherErrorObject = null;
      return true;
    };
  };

  function updateShoppingCartDisplay() {
    basketCheck();
    $('.basket-items').empty();
    $.each(order.shoppingCart, function(_, id) {
      var product = findProductByIDFromArray(productData, id)
      var listItem =
        '<li class="basket-item">'
        + '<a href="#" class="remove" id="'+id+'-remove">x</a> ' + product.name
      + '</li>';
      $('.basket-items').append(listItem);
    })
    $('.basket-price').text('Total £' + order.runningTotal.toFixed(2));
  };

  function basketCheck() {
    if( order.shoppingCart.length != 0) {
      return $('.basket').show();
    };
    return $('.basket').hide();
  };

});
