/** @jsxImportSource react */

import {useStore} from '@nanostores/react';
import { $cart as cart, removeItemFromCart, subtotal as subtotalStore } from '../stores/cart';
import { useState } from 'react';
import type { CartItem } from '../types';
import { formatCurrency } from './utils';

const EmptyState = () => {
    return (
        <>
            <p className={"cart-style-icon"}>
                <span role="img" aria-label="knuddel">😊</span>
            </p>
            <p className={"cart-style-empty"}>Dein Warenkorb ist leer.</p>
        </>
    )
}

interface FilledStateProps {
    $cart: Record<number, CartItem | undefined>;
}

const FilledState = (props: FilledStateProps) => {
    const [showNotice, setShowNotice] = useState(false);
    const $subtotal = useStore(subtotalStore);

    return (
        <>
            <ul className={"cart-style-items"}>
                {Object.values(props.$cart).map((item: CartItem | undefined) => {
                    if (!item) return null;
                    return (
                        <li className={"cart-style-item"}>
                            <span className={"cart-style-quantity"}>{item.quantity}x</span>
                            <span className={"cart-style-name"}>{item.item.title}</span>
                            <span className={"cart-style-remove"}>
                                <button title="cart-style-remove-item" onClick={() => removeItemFromCart(item.item.id)}>&times;</button>
                            </span>
                            <span className={"cart-style-price"}>{formatCurrency(parseFloat(item.item.price))}</span>
                        </li>
                    )
                })}
            </ul>

            <div className = {"cart-style-details"}>
                <p className={"cart-style-subtotal"}>
                    <span className={"cart-style-label"}>Zwischensumme:</span>{' '}
                    <span className={"cart-style-value"}>{formatCurrency($subtotal) }</span>
                </p>
                <p className={"cart-style-shipping"}>
                    <span className={"cart-style-label"}>Versand:</span>{' '}
                    <del className='cart-style-shipping-del'>5,90€</del>
                    <ins className='cart-style-shipping-ins'>KOSTENLOS</ins>
                </p>
                <p className={"cart-style-total"}>
                    <span className={"cart-style-label"}>Total:</span>{' '}
                    {formatCurrency($subtotal)}
                </p>

                <p className={"cart-style-checkout"}>
                    <button className="big-link" onClick={() => setShowNotice(true)}>Zur Kasse</button>
                </p>

                {showNotice &&
                    <CheckoutNotice />
                }
            </div>
        </>
    );
}

const CheckoutNotice = () => {
    return (
        <>
            <p className={"cart-style-icon"}>
                <span role="img" aria-label="checkout">🛒</span>
            </p>
            <p className={"cart-style-empty"}>Checkout ist noch nicht implementiert.</p>
        </>
    )
}

export const Cart = () => {
    const $cart = useStore(cart)

    return (
        <aside className={"cart-style-cart"}>
            <h2>Warenkorb</h2>
            {Object.values($cart).length > 0 
                ? <FilledState $cart={$cart} />
                : <EmptyState />
            }
        </aside>
    )
}