import { expect } from "chai";
import { Cart } from "../testProject/po/prodDetails";

describe("Cart", function () {

  beforeEach(function () {
    browser.url('/')
    $('input[type="search"]').setValue('Purple');
    $('input[type="search"]').waitForDisplayed()
    $('input[type="search"]').addValue('Enter');
    const text = $('[class="col-sm-6 col-md-4"] [class="title"]').getText();
    console.log(text)
    expect(text).to.equal('Purple Duck');
  })

  // afterEach(function () {
  //   $('[src="http://ip-5236.sunline.net.ua:38015/images/logotype.png"]').click();

  //   browser.waitUntil (function(){
  //     return !browser.getUrl().includes('checkout')
  //   })
  // })

  it("adding one item to cart should be successful", function () {
    Cart.addToCart()
    console.log($('[class="quantity"]').getText())
    expect($('[class="quantity"]').getText()).to.equal("1");

  });

  it("removing one item from cart should be successful", function () {

    Cart.openCart()

    $('button[type="submit"][name="remove_cart_item"]').click();

    browser.waitUntil(function () {
      return ($('[class="cart wrapper"]').isDisplayed() == true)
    })

    expect($('[class="cart wrapper"]').isDisplayed()).to.equal(true);
    const text = $('[class="cart wrapper"]').getText();
    expect(text).to.contain('There are no items in your cart.');
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

  // from 2 to 1 for example
  it("decreasing item quantity in cart should be successful", function () {
    Cart.addToCart();
    expect($('[class="quantity"]')).not.to.equal(0);
    Cart.openCart();

    $('[class="item"] [type="number"]').clearValue();
    $('[class="item"] [type="number"]').addValue(1);

    const quantity = ($('[class="item"] [type="number"]').getValue());
    expect(quantity).equal('1');

  });
});

// This test gives you 20 points
describe("Prices", function () {
  it("can be switched to EUR", function () {

    browser.url('/')
    $('[href*="/regional_settings"][data-toggle="lightbox"]').click();
    browser.waitUntil(function () {
      return ($('[name="currency_code"]').isDisplayed() == true)
    })
    $('[name="currency_code"]').click()
    $('[data-suffix=" €"]').click()
    $('[name="save"]').click()

    expect($('[class="alert alert-success"]').isDisplayed()).to.equal(true);
        const text = $('[class="alert alert-success"]').getText();
        expect(text).to.contain('×\nChanges saved successfully');
    browser.pause(3000)
  })
})

