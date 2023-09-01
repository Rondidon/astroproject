/** @jsxImportSource react */

import { addItemToCart } from '../stores/cart';
import type { ShopItem } from '../types';

export const AddToCart = ( { item }:  { item: ShopItem }) => {
    return (
        <>
            <button className={"big-link"} onClick={() => addItemToCart(item)}>In den Warenkorb</button>
        </>
    )
}