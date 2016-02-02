describe("Order", function() {

  var order;

  beforeEach(function() {
    order = new Order();
  });

  it("should be able to add a product to the shopping cart", function() {
    var testOrderItem = {"Almond Toe Court Shoes":1};
    order.addProduct(0);
    expect(order.shoppingCart[0]).toEqual(testOrderItem);
  });

});
