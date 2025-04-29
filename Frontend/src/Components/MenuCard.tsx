import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../Hooks/CartContext';

interface Item {
    id: number;
    name: string;
    price: number;
    category: string;
}

interface GroupedItems {
    [category: string]: Item[];
}

// Assigning colors for different categories
const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
    MAIN_COURSE: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    SOUP: { bg: 'bg-green-100', text: 'text-green-800' },
    DESSERT: { bg: 'bg-pink-100', text: 'text-pink-800' },
    STARTER: { bg: 'bg-blue-100', text: 'text-blue-800' },
    BEVERAGE: { bg: 'bg-purple-100', text: 'text-purple-800' },
    // fallback if no style defined
    DEFAULT: { bg: 'bg-gray-100', text: 'text-gray-800' },
};

const MenuCard: React.FC = () => {
    const [items, setItems] = useState<GroupedItems>({});
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const { addToCart, removeFromCart, quantities, setQuantities } = useCart(); // Assuming you have a custom hook to get cart items

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/menu/get`)
            .then(res => {
                const fetched: Item[] = res.data.items;
                const grouped = fetched.reduce((acc: GroupedItems, item) => {
                    acc[item.category] = acc[item.category] || [];
                    acc[item.category].push(item);
                    return acc;
                }, {});
                setItems(grouped);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-gray-500">Loading menu...</div>;
    }
    const filteredItems = (list: Item[]) =>
        list.filter(i => i.name.toLowerCase().includes(filter.toLowerCase()));

    const increment = (id: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const decrement = (id: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0), // avoid going below 0
        }));
    };


    return (
        <div className="max-w-6xl mx-auto p-6 space-y-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Delicious Menu</h1>

            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search dishes…"
                    className="w-full md:w-1/2 px-4 py-2 border-2 border-indigo-300 rounded-full focus:outline-none focus:border-indigo-500"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
            </div>

            {Object.entries(items).map(([category, itemList]) => {
                const visible = filteredItems(itemList);
                if (!visible.length) return null;
                const styles = CATEGORY_STYLES[category] || CATEGORY_STYLES.DEFAULT;

                return (
                    <div key={category} className={`${styles.bg} p-6 rounded-2xl shadow-md`}>
                        {/* Category Title */}
                        <h2 className={`text-3xl font-bold mb-6 ${styles.text} text-center`}>
                            {category.replace('_', ' ')}
                        </h2>

                        {/* Menu Items */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visible.map(item => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl p-4 border hover:border-indigo-400 shadow-sm hover:shadow-lg transition"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                    <p className="mt-2 text-indigo-600 font-bold">₹{item.price}</p>

                                    {/* Counter Section */}
                                    <div className="mt-4 flex items-center space-x-3">
                                        <button
                                            onClick={() => {
                                                decrement(item.id);
                                                removeFromCart(item.id);
                                            }}
                                            className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full text-lg font-bold hover:bg-red-200"
                                        >
                                            -
                                        </button>

                                        <span className="text-md font-semibold text-gray-700">
                                            {quantities[item.id] || 0}
                                        </span>

                                        <button
                                            onClick={() => {
                                                increment(item.id);
                                                addToCart({ ...item, quantity: 1 });
                                            }}
                                            className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full text-lg font-bold hover:bg-green-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                );
            })}
        </div>
    );
};

export default MenuCard;
