const CART_ITEM_KEY = 'Cart';

const Cart = {
    items: JSON.parse(localStorage.getItem(CART_ITEM_KEY)) || [],

    add(id) {
        if (! this.inCart(id)) {
            this.items = this.items.concat(id);
        }

        return this._save();
    },

    remove(id) {
        this.items = this.items.filter(itemId => itemId !== id);
        
        return this._save();
    },

    all() {
        return this.items;
    },

    count() {
        return this.all().length;
    },

    inCart(id) {
        return this.items.indexOf(id) > -1;
    },

    _save() {
        localStorage.setItem(CART_ITEM_KEY, JSON.stringify(this.items));

        return this.items;
    },
}

export default Cart;
