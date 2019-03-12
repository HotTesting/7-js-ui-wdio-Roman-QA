export class prodDetails {
    addToCart(): void {
        $("button.btn-success").click();
    }
    openCart(): void {
        $('[href*="/checkout"]').click();
    }
}
export const Cart = new prodDetails();

