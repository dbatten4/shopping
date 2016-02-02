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

  it("doesn't remove an item not in the basket", function() {
    order.addProduct(0);
    order.removeProduct(1);
    expect(order.shoppingCart[0]).toEqual(0);
  });

  it("should be able to calculate the total price for the cart", function() {
    order.addProduct(0);
    order.addProduct(1);
    expect(order.runningTotal).toEqual(141);
  });

  it("can apply a £5.00 discount", function() {
    order.addProduct(0);
    order.applyDiscount("five");
    expect(order.runningTotal).toEqual(94);
  });

  it("can apply a £10.00 discount", function() {
    order.addProduct(0);
    order.applyDiscount("ten");
    expect(order.runningTotal).toEqual(89);
  });

  it("can apply a £15.00 discount", function() {
    order.addProduct(0);
    order.applyDiscount("fifteen");
    expect(order.runningTotal).toEqual(84);
  });

  it("should not be able to add a £5.00 discount when basket is empty", function() {
    order.applyDiscount("five");
    expect(order.runningTotal).toEqual(0);
    expect(order.voucherFiveError).toBe(true);
  });

  it("should not be able to add a £10.00 discount when basket is fewer than £50.00", function() {
    order.addProduct(1);
    order.applyDiscount("ten");
    expect(order.runningTotal).toEqual(42);
    expect(order.voucherTenError).toBe(true);
  });

  it("should not be able to add a £10.00 discount when basket is fewer than £50.00", function() {
    order.addProduct(1);
    order.applyDiscount("fifteen");
    expect(order.runningTotal).toEqual(42);
    expect(order.voucherFifteenError).toBe(true);
  });

  it("should not allow out of stock items to be added to basket", function() {
    order.addProduct(4);
    expect(order.shoppingCart[0]).not.toBeDefined();
    expect(order.stockError).toBe(true);
  });

});
