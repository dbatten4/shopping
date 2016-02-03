$(document).ready(function() {
  order = new Order();
  $('.basket').hide();

  function findProductByIDFromArray(array, id) {
    return array.filter(function(product) {
      return parseInt(product.id) === id;
    })[0];
  };

  $.each(productData, function(_, product) {
    var appendItem =
      '<div class="product-container">'
      + '<div class="title">'
        + '<span class="name">' + product.name + '</span>'
        + '<span class="colour">' + product.colour + '</span>'
      + '</div>'
      + '<div class="category">' + product.gender + ' ' + product.category + '</div>'
      + '<div class="price">£' + product.price + '</div>'
      + '<div class="add-product">'
        + '<a href="#" class="add" id="'+product.id+'">Add to basket</a>'
        + '<div class="add-error"></div>'
      + '</div>'
    + '</div>';
    $('.product-area').append(appendItem);
  });

  $('.add').click(function() {
    var productID = parseInt($(this).attr('id'));
    order.addProduct(productID);
    if (order.alreadyAdded) {
      $(this).next().html('<span class="error"> This item has already been added</span>');
      order.alreadyAdded = null;
    };
    if (order.stockError) {
      $(this).next().html('<span class="error"> This item is out of stock</span>');
      order.stockError = null;
    };
    updateShoppingCartDisplay();
  });

  $('.basket-items').on("click", "a.remove", function() {
    var productID = parseInt($(this).attr('id'));
    order.removeProduct(productID);
    updateShoppingCartDisplay();
  });

  $('.voucher').click(function() {
    var number = $(this).attr('id');
    order.applyDiscount(number);
    if (order.voucherErrorObject) {
      $('.voucher-error-message').html('<span class="error">' + order.voucherErrorObject.message + '</span>');
      order.voucherErrorObject = null;
      return;
    };
    $(this).hide();
    $('.basket-price').text('£' + order.runningTotal.toFixed(2));
  });

  $('a').click(function() {
    event.preventDefault();
  });

  function updateShoppingCartDisplay() {
    basketCheck();
    $('.basket-items').empty();
    $.each(order.shoppingCart, function(_, id) {
      var product = findProductByIDFromArray(productData, id)
      var listItem =
        '<li class="basket-item">'
        + product.name + ' <a href="#" class="remove" id="'+id+'">x</a>'
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
