import { expect } from "chai";
import * as faker from "faker";

describe('WDIO', function () {
    it('Should be alive', function () {
        browser.url('/')

    })
})

describe("Items search", function () {
    it("should show results in case multiple items matches", function () {
        $('input[type="search"]').setValue('duck');
        browser.pause(1000)
        $('input[type="search"]').addValue('Enter');
        browser.pause(1000)

        expect($('#box-search-results [class="col-xs-6 col-sm-4 col-md-3"]').isDisplayed()).to.equal(true);

    });

    it("should redirect to item page in case only one result matches", function () {
        $('input[type="search"]').setValue('Purple');
        browser.pause(1000)
        $('input[type="search"]').addValue('Enter');
        browser.pause(1000)

        const text = $('[class="col-sm-6 col-md-4"] [class="title"]').getText();
        console.log(text)
        expect(text).to.equal('Purple Duck');

    });

    it("should redirect to 'no matching results' in case no items matched", function () {

        $('input[type="search"]').setValue('some text');
        browser.pause(1000)
        $('input[type="search"]').addValue('Enter');
        browser.pause(1000)

        const text = $('#box-search-results > div > em').getText();
        console.log(text)
        expect(text).to.equal('No matching results');

    });
});


describe("Search results sorting", function () {
    it("correctly arranges items when using 'by price' sorting", function () {

        $('input[type="search"]').setValue('duck');
        browser.pause(1000)
        $('input[type="search"]').addValue('Enter');
        browser.pause(2000)
        $('[class="btn btn-default"][href*="sort=price"]').click();
        browser.pause(2000)
        // const a = $$('[class="price-wrapper"]');
        // for(let i=0;i<a.length - 1;i++){
        //     let first_price = 0;
        //     if(a[i].getElementsByClassName("price")){
        //         first_price = a[i].getElementsByClassName("price")[0].innerText
        //     } else {
        //         first_price = a[i].getElementsByClassName("campaign-price")[0].innerText
        //     }

        //     let second_price = 0;
        //     if(a[i+1].getElementsByClassName("price")){
        //         second_price = a[i+1].getElementsByClassName("price")[0].innerText
        //     } else {
        //         second_price = a[i+1].getElementsByClassName("campaign-price")[0].innerText
        //     }

        //     expect(first_price < second_price);
        // }
        // a.forEach(function (value) {
        //     console.log('###################');
        //     console.log(value.getText());

        // throw new Error("NOT IMPLEMENTED");
    });



    it("correctly arranges items when using 'by name' sorting", function () {

        $('input[type="search"]').setValue('duck');
        browser.pause(1000)
        $('input[type="search"]').addValue('Enter');
        browser.pause(2000)
        $('[class="btn btn-default"][href*="sort=name"]').click();
        browser.pause(2000)

    });

});
describe("Contact us form", function () {
    it("must send messages to shop administration", function () {

        $('[id=default-menu] a[href*="customer-service-s-0"]').click();
        browser.pause(2000)

        $('input[name="name"]').click();
        $('input[name="name"]').setValue('Tester456')
        browser.pause(2000)

        $('[class="col-md-6"] input[name="email"]').click();
        const email = faker.internet.email(undefined, undefined, 'ip-5236.sunline.net.ua');
        console.log(email)
        $('[class="col-md-6"] input[name="email"]').setValue(email);
        browser.pause(2000)

        $('input[name="subject"]').click();
        $('input[name="subject"]').setValue('Complaint')
        browser.pause(2000)

        $('[name="message"]').click();
        $('[name="message"]').setValue('BLA bla bla...')
        browser.pause(2000)

        $('button[name="send"]').click();
        browser.pause(2000)

        expect($('.alert.alert-success').isDisplayed()).to.equal(true);
        const text = $('.alert.alert-success').getText();
        expect(text).to.contain('×\nYour email has successfully been sent');
        // console.log(text);

    });
})