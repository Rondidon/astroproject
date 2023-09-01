// items in the webshop
export type ShopItem = {
    id: number;
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
    }
    price: string;
}

// items in the shopping basket
export type CartItem = {
    quantity: number;
    item: ShopItem;
}

export type NavItem = {
    path: string;
    label: string;
}