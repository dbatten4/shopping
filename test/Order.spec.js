describe("Order", function() {

  var order;

  beforeEach(function() {
    order = new Order();
  });

  it("should be able to add a product to the shopping cart", function() {
    order.addProduct(0);
    expect(order.shoppingCart[0]).toEqual('Almond Toe Court Shoes');
  });

  it("should be able to remove a product from the shopping basket", function() {
    order.addProduct(0);
    order.removeProduct(0);
    expect(order.shoppingCart[0]).not.toBeDefined();
  });

});
