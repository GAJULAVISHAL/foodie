import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../Hooks/CartContext";
import axios from "axios";

export function Cart() {
    const { cartItems, clearCart, totalPrice } = useCart();
    const [showMobileInput, setShowMobileInput] = useState(false);
    const [phone, setPhone] = useState("");

    const handlePlaceOrder = (phone: string) => {
        axios.post("http://localhost:3000/api/v1/order/placeOrder",{totalAmount : totalPrice, mobileNumber:phone,Items:cartItems })
        .then(()=>{
            localStorage.setItem("number", phone);// Clear cart in local storage
            toast.success(`Order placed successfully! 📱 ${phone}`);
            clearCart();
            setShowMobileInput(false);
            setPhone("");
        })
    };

    const handlePlaceOrderClick = (e: React.MouseEvent) => {
        console.log(cartItems)
        e.stopPropagation();      // prevent dropdown from closing
        setShowMobileInput(true);
    };

    const confirmOrder = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (phone.trim().length < 10) {
            toast.error("Please enter a valid mobile number");
            return;
        }
        handlePlaceOrder(phone);
    };

    return (
        <div
            onClick={(e) => e.stopPropagation()}   // prevent click‐outside logic from closing
            className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-4 z-50"
        >
            <h2 className="text-lg font-semibold mb-2">Cart Items</h2>

            {cartItems.length > 0 ? (
                <>
                    <ul className="space-y-2 max-h-48 overflow-y-auto">
                        {cartItems.map((item: any) => (
                            <li key={item.id} className="flex justify-between">
                                <span>{item.name}</span>
                                <span className="text-gray-500">x{item.quantity}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 flex justify-between items-center">
                        <span className="font-semibold">Total:</span>
                        <span className="text-lg font-bold">₹{totalPrice}</span>
                    </div>

                    <div className="mt-4 space-y-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); clearCart(); }}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                        >
                            Clear Cart
                        </button>

                        {!showMobileInput ? (
                            <button
                                onClick={handlePlaceOrderClick}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
                            >
                                Place Order
                            </button>
                        ) : (
                            <div className="space-y-2">
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter mobile number"
                                    className="w-full border rounded px-3 py-2"
                                />
                                <button
                                    onClick={confirmOrder}
                                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p className="text-gray-500 text-sm">Your cart is empty</p>
            )}
        </div>
    );
}
