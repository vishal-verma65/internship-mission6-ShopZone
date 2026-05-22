//* Cart Store
// Uses Zustand's `persist` middleware to automatically save cart
// to localStorage and restore it on page refresh.

import { create } from "zustand";
import { persist } from "zustand/middleware";

function calcTotals(items) {
  return items.reduce(
    (acc, item) => ({
      totalQty: acc.totalQty + item.quantity,
      totalPrice: acc.totalPrice + item.price * item.quantity,
    }),
    { totalQty: 0, totalPrice: 0 }
  );
}

const useCartStore = create(
  persist(
    (set, get) => ({
      //  State
      items: [], // Array of cart item objects
      totalQty: 0, // Total number of items (sum of quantities)
      totalPrice: 0, // Total price of all items

      //* Actions
      /**
       * addToCart: adds a product to the cart.
       * If the product already exists, increments its quantity by 1.
       * If not, adds it as a new item with quantity = 1.
       */
      addToCart: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === product.id);

        let updatedItems;
        if (existingItem) {
          // Product already in cart → just bump quantity
          updatedItems = currentItems.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          // New product → add with quantity 1
          updatedItems = [
            ...currentItems,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              category: product.category,
              quantity: 1,
            },
          ];
        }

        const { totalQty, totalPrice } = calcTotals(updatedItems);
        set({ items: updatedItems, totalQty, totalPrice });
      },

      /**
       * removeFromCart: removes a product entirely from the cart
       * regardless of its quantity.
       */
      removeFromCart: (productId) => {
        const updatedItems = get().items.filter((i) => i.id !== productId);
        const { totalQty, totalPrice } = calcTotals(updatedItems);
        set({ items: updatedItems, totalQty, totalPrice });
      },

      /**
       * updateQuantity: sets a specific item's quantity.
       * If new quantity <= 0, removes the item entirely.
       */
      updateQuantity: (productId, qty) => {
        if (qty <= 0) {
          get().removeFromCart(productId);
          return;
        }
        const updatedItems = get().items.map((i) =>
          i.id === productId ? { ...i, quantity: qty } : i
        );
        const { totalQty, totalPrice } = calcTotals(updatedItems);
        set({ items: updatedItems, totalQty, totalPrice });
      },

      /**
       * clearCart: empties the entire cart.
       * Used after successful checkout.
       */
      clearCart: () => set({ items: [], totalQty: 0, totalPrice: 0 }),
    }),

    //  Persist config
    {
      name: "shopzone-cart", // localStorage key name
      partialize: (state) => ({
        items: state.items,
        totalQty: state.totalQty,
        totalPrice: state.totalPrice,
      }),
    }
  )
);

export default useCartStore;
