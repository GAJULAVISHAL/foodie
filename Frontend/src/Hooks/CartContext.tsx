import { createContext, useContext, useState, ReactNode } from "react";

// Define the type of a Cart Item
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

// Define what your context value looks like
interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  quantities: Record<number, number>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

// Create context with default empty values
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Calculate totals dynamically
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // Remove the item if the quantity is 1
          const updatedItems = prevItems.filter((i) => i.id !== id);
          return updatedItems;
        }

        // Decrease the quantity otherwise
        const updatedItems = prevItems.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        );
        return updatedItems;
      }

      return prevItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setQuantities({});
  };

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, totalQuantity, addToCart, removeFromCart, clearCart , quantities, setQuantities}}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context easily
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
