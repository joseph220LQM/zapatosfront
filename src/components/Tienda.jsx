
import { useEffect, useState } from 'react';

import Layout from './Layout';
import { useCart } from "../context/CartContext";
import { getProducts } from "../services/api";
import { Plus } from "lucide-react";

export default function Tienda() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    }, []);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <Layout>
        <div>
            <h2 className="text-xl font-bold mb-4 text-black">Productos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                <div
                    key={product._id}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col"
                >
                    <div className="w-full aspect-[4/3] mb-4 overflow-hidden rounded">
                    <img
                        src={product.img}
                        alt={product.nombre}
                        className="w-full h-full object-cover"
                    />
                    </div>

                    <div className="flex flex-col flex-1">
                    <span className="text-gray-400 text-sm">{product.marca}</span>
                    <h3 className="text-lg font-semibold mb-1 text-black ">
                        {product.nombre}
                    </h3>
                    
                    <div className="mt-auto flex items-center justify-between">
                        <p className="text-blue-600 font-bold">${product.precio}</p>
                        <button className="p-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" onClick={() => addToCart(product)}>
                            <Plus className="h-5 w-5" />
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>

        </Layout>
    );
}