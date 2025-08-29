const API_URL = "https://zapateria-back.vercel.app";

import { toast } from 'react-toastify';

export async function getProducts() {
  const res = await fetch(`${API_URL}/zapatos/getProductos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function checkout(cart, total, userId) {

  const productos = cart.map((item) => ({
    productoId: item._id,
    cantidad: item.qty,
    valor: item.precio,
  }));

  const res = await fetch(`${API_URL}/zapatos/crearCompra`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      productos,
      total,
    }),
  });

  if (!res.ok) {
    toast.error("❌ Error al procesar la compra");
    return null;
  }

  const data = await res.json();
  toast.success("✅ Compra realizada con éxito");
  return data;
};


export async function getMisCompras(userId) {
  const res = await fetch(`${API_URL}/zapatos/getCompras`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    toast.error("❌ Error al procesar la compra");
    return [];
  }

  const data = await res.json();

  if (data.length === 0) {
    toast.info("ℹ️ No tienes compras registradas");
  } 

  return data;
}
