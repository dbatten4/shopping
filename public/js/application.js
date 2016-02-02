$(document).ready(function() {
  console.log('working');

  function findById(id) {
    return productData.filter(function(product) {
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
      + '<div class="category">' + product.gender + product.category + '</div>'
      + '<div class="price">' + product.price + '</div>'
    + '</div>';
    $('.product-area').append(appendItem);
  });

});
