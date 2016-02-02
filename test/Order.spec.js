describe("Order", function() {

  var order;

  beforeEach(function() {
    order = new Order();
  });

  it("should be able to add a product to the shopping cart", function() {
    order.addProduct(0);
    expect(order.shoppingCart[0]).toEqual(0);
  });

  it("should be able to remove a product from the shopping basket", function() {
    order.addProduct(0);
    order.removeProduct(0);
    expect(order.shoppingCart[0]).not.toBeDefined();
  });

  it("should be able to calculate the total price for the cart", function() {
    order.addProduct(0);
    order.addProduct(1);
    expect(order.runningTotal).toEqual(141);
  });

});
