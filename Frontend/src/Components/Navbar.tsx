import { useState } from "react";
import { ShoppingCart, History } from "lucide-react";
import { useCart } from "../Hooks/CartContext";
import { Cart } from "./CartComponent";
import axios from "axios";

type OrderItem = {
  id: number;
  menuItem: { name: string };
  quantity: number;
};

type Order = {
  id: number;
  createdAt: string;
  totalAmount: number;
  orderItems: OrderItem[];
};

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const { cartItems } = useCart();

  const getOrders = async () => {
    try {
      setLoading(true);
      const mobileNumber = localStorage.getItem("number");
      if (!mobileNumber) return;

      const res = await axios.get(`http://localhost:3000/api/v1/order/getOrders/${mobileNumber}`);

      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleHistory = () => {
    const shouldOpen = !isHistoryOpen;
    setIsHistoryOpen(shouldOpen);
    setIsCartOpen(false);
    if (shouldOpen) getOrders();
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center relative">
        <div className="text-2xl font-bold text-indigo-600 tracking-wide">
          Foodie
        </div>

        <div className="flex gap-6">
          {/* History */}
          <div className="relative cursor-pointer" onClick={toggleHistory}>
            <History className="w-7 h-7 text-gray-700" />
            {isHistoryOpen && (
              <div className="absolute right-0 mt-10 w-96 bg-white shadow-lg rounded-md p-4 z-50">
                <h2 className="text-lg font-semibold mb-3">Order History</h2>
                {loading ? (
                  <p className="text-sm text-gray-500">Loading...</p>
                ) : orders.length > 0 ? (
                  <ul className="space-y-4 max-h-64 overflow-y-auto">
                    {orders.map(order => (
                      <li key={order.id} className="border-b pb-3 last:border-none">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Order #{order.id}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                        <ul className="ml-4 space-y-1 text-sm text-gray-700">
                          {order.orderItems.map(item => (
                            <li key={item.id} className="flex justify-between">
                              <span>{item.menuItem.name}</span>
                              <span className="text-gray-500">x{item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 text-right font-semibold">
                          Total: ₹{order.totalAmount}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No previous orders.</p>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => {
              setIsCartOpen(!isCartOpen);
              setIsHistoryOpen(false);
            }}
          >
            <ShoppingCart className="w-7 h-7 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
            {isCartOpen && <Cart />}
          </div>
        </div>
      </div>
    </nav>
  );
}
