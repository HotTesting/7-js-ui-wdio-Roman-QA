export class cartDetails {
    get itemsInCart (){
        return $$('[class="item"]');
    }
}
export const Items = new cartDetails;