export class prodDetails {
    addToCart(): void {
        let quantity = Number($('[class="quantity"]').getText())
        $('button.btn-success').click();

        browser.waitUntil(function () {
            return quantity + 1 == Number($('[class="quantity"]').getText());
        })

    }
    openCart(): void {
        $('[href*="/checkout"]').click();
        let prod = $('button[type="submit"][name="remove_cart_item"]');
        browser.waitUntil(function (){
            return prod.isDisplayed() == true;
        })
    }
}
export const Cart = new prodDetails();

