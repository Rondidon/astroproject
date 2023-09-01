import { computed, map } from 'nanostores';
import type { CartItem, ShopItem } from '../types';

// quantity -> cartItem
export const $cart = map<Record<number, CartItem | undefined>>({});


export const addItemToCart = (item: ShopItem) => {
    const cartItem = $cart.get()[item.id];
    const quantity = cartItem ? cartItem.quantity : 0;
    $cart.setKey(item.id, {
        item,
        quantity: quantity + 1
    });
}

export const removeItemFromCart = (itemId: number) => {
    $cart.setKey(itemId, undefined);
}

export const subtotal = computed($cart, (entries) => {
    let subtotal: number = 0;
    Object.values(entries).forEach((entry) => {
        if (!entry) return;
        if (entry) {
            subtotal += parseFloat(entry.item.price) * entry.quantity;
        }
    })
    return subtotal;
});