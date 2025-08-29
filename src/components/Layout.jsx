// Layout.jsx
import { useState } from "react";
import { UserButton, useUser  } from "@clerk/clerk-react";
import { checkout } from "../services/api";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { Home, Grid, Heart, ShoppingCart, X } from "lucide-react";
import { Link } from 'react-router';

export default function Layout({ children }) {
  const { user } = useUser();
  const userId = user?.id;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, removeFromCart, clearCart, increaseQty, decreaseQty, cartTotal } = useCart();


  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-50 p-6 border-b border-gray-300 shadow-md bg-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-black">Zapatos Store</h1>
          <button onClick={() => setIsCartOpen(true)} className="relative cursor-pointer">
            <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-black" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Contenido de la página */}
      <main className="flex-1 container mx-auto p-4 mb-20">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur shadow-md border-t border-gray-300 mt-10">
        <div className="flex justify-around items-center h-16">
          <Link to="/Tienda" className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer">
            <Home className="h-6 w-6" /> Home
          </Link>
          <Link to="/MisVentas" className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer">
            <Grid className="h-6 w-6" /> Mis Ventas
          </Link>
          <button className="flex flex-col items-center text-gray-600 hover:text-black">
            <Heart className="h-6 w-6" />
            <span className="text-xs">Favoritos</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 hover:text-black">
            <UserButton />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del carrito */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-black">Tu carrito</h2>
          <button onClick={() => setIsCartOpen(false)}>
            <X className="h-6 w-6 text-gray-600 hover:text-black cursor-pointer" />
          </button>
        </div>

        {/* Productos */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-220px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-2">
                  <img src={item.img} alt="" className="w-12 h-12 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold text-sm text-black">{item.nombre}</h3>
                    <p className="text-xs text-gray-500">${item.precio}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="px-2 py-1 border rounded text-black cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-black">{item.qty}</span>
                      <button
                        onClick={() => increaseQty(item._id)}
                        className="px-2 py-1 border rounded text-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="mt-2 text-red-500 hover:underline text-xs cursor-pointer"
                    >
                      Quitar producto
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold text-black">
                  ${(item.qty * item.precio).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer del carrito */}
        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between text-black font-bold">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={clearCart}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 cursor-pointer"
          >
            Vaciar carrito
          </button>

          <button
            onClick={async () => {
              if (cart.length === 0 || cartTotal <= 0) {
                return toast.error("❌ No hay productos en el carrito");
              }
              try {
                const data = await checkout(cart, cartTotal, userId);
                if (data) clearCart();
              } catch (err) {
                console.error(err);
              }
            }}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 cursor-pointer"
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
