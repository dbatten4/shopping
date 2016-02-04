$(document).ready(function() {
  order = new Order();
  $('.basket').hide();

  $.each(productData, function(_, product) {
    var appendItem =
      '<div class="product-container" id="product-' + product.id + '">'
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
    removeErrorMessages();
    var productID = parseInt($(this).attr('id'));
    order.addProduct(productID);
    addErrorCheck.call(this);
    updateShoppingCartDisplay();
  });

  $('.basket-items').on("click", "a.remove", function() {
    event.preventDefault();
    removeErrorMessages();
    var productID = parseInt($(this).attr('id'));
    order.removeProduct(productID);
    updateShoppingCartDisplay();
  });

  $('.voucher').click(function() {
    removeErrorMessages();
    var number = $(this).attr('id');
    order.applyDiscount(number);
    if (voucherErrorCheck()) { return };
    $(this).hide();
    $('.basket-price').text('£' + order.runningTotal.toFixed(2));
  });

  $('a').click(function() {
    event.preventDefault();
  });

  function discountAndStockCheck(product) {
    if (product.discounted) {
      $('#price-' + product.id).wrap("<strike>");
      $('#discounted-price-' + product.id).html(product.discounted);
    };
    if (parseInt(product.quantity) == 0) {
      $('#' + product.id + '-add').next().html(generateMessage('stock-error', 'This item is out of stock'));
    };
  };

  function addErrorCheck() {
    if (order.alreadyAdded) {
      $(this).next().html(generateMessage('error', 'This item has already been added'));
      order.alreadyAdded = null;
    };
  };

  function voucherErrorCheck() {
    if (order.voucherErrorObject) {
      $('.voucher-error-message').html(generateMessage('error', order.voucherErrorObject.message));
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
    return order.shoppingCart.length != 0 ? $('.basket').show() : $('.basket').hide();
  };

  function generateMessage(classType, message) {
    return '<span class="' + classType + '"> ' + message + ' </span>';
  };

  function removeErrorMessages() {
    return $('.error').html(' ');
  };

});
