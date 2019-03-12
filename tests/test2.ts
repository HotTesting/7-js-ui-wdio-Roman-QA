import { expect } from "chai";
import { Cart } from "../testProject/po/prodDetails";

describe('WDIO', function () {
  it('Open website', function () {
    browser.url('/')
  })
})

describe("Cart", function () {

  beforeEach(function () {
    $('input[type="search"]').setValue('Purple');
    $('input[type="search"]').waitForDisplayed()
    $('input[type="search"]').addValue('Enter');
    const text = $('[class="col-sm-6 col-md-4"] [class="title"]').getText();
    console.log(text)
    expect(text).to.equal('Purple Duck');
  })

  afterEach(function () {
    $('[src="http://ip-5236.sunline.net.ua:38015/images/logotype.png"]').click();
    // browser.waitUntil (function(){
    //   return !browser.url().getValue().includes('checkout')
    // })
  })

  it("adding one item to cart should be successful", function () {
    Cart.addToCart()
    expect($('[class="quantity"]')).not.to.equal(0);

  });

  it("removing one item from cart should be successful", function () {

    Cart.openCart()
    $('button[type="submit"][name="remove_cart_item"]').waitForDisplayed();
    $('button[type="submit"][name="remove_cart_item"]').click();

    expect($('[class="cart wrapper"]').isDisplayed()).to.equal(true);
    const text = $('[class="cart wrapper"]').getText();
  });

  // from 1 to 2 for example
  it("increasing item quantity in cart should be successful", function () {
    Cart.addToCart();
    expect($('[class="quantity"]')).not.to.equal(0);
    Cart.openCart();
    $('[class="item"] [type="number"]').clearValue();
    $('[class="item"] [type="number"]').addValue(2);

    const quantity = ($('[class="item"] [type="number"]').getValue());
    expect(quantity).equal('2');

  });

  // // from 2 to 1 for example
  // it("decreasing item quantity in cart should be successful", function () {
  //   Cart.addToCart();
  //   expect($('[class="quantity"]')).not.to.equal(0);
  //   Cart.openCart();
    
  // });
});

// // This test gives you 20 points
// describe("Prices", function () {
//   it("can be switched to EUR", function () {

//   });
// })

