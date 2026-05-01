// CartProvider.jsx
import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    // Save cart to local storage whenever it changes
    AsyncStorage.setItem("CART", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ SAFE LOAD
  const loadCart = async () => {
    try {
      const data = await AsyncStorage.getItem("CART");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setCartItems(parsedData);
        }
      }
    } catch (e) {
      console.log("Cart load error", e);
    }
  };

  // 🔥 FIXED CORE LOGIC
  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => String(i.id) === String(item.id));

      // ✅ SERVICE LOGIC (NO QUANTITY INCREMENT)
      if (item.source === "service") {
        if (exists) return prev; // already added, do nothing
        return [
          ...prev,
          {
            ...item,
            quantity: 1,
            source: "service",
          },
        ];
      }

      // ✅ PRODUCT LOGIC (WITH QUANTITY)
      if (exists) {
        return prev.map((i) =>
          String(i.id) === String(item.id)
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
          source: item.source || "store",
        },
      ];
    });
  };

  // 🔧 REMOVE (Improved for services)
  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const item = prev.find((i) => String(i.id) === String(id));

      // If it's a service, remove it entirely immediately
      if (item?.source === "service") {
        return prev.filter((i) => String(i.id) !== String(id));
      }

      // If it's a product, decrement quantity and filter out if 0
      return prev
        .map((i) =>
          String(i.id) === String(id) ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    AsyncStorage.removeItem("CART"); // Explicitly clear storage
  };

  // ✅ TOTAL (works for both)
  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ COUNT (products + services)
  const getCount = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems, // Optional: in case you need direct state access
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        getCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
