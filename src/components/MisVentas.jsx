import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getMisCompras } from "../services/api";
import Layout from './Layout';

export default function MisVentas() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useUser();
    const userId = user?.id;

    useEffect(() => {
        if (!userId) return;
        getMisCompras(userId)
          .then((data) => {
            setProducts(data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
    }, [userId]);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <Layout>
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4 text-black">Mis Compras</h2>
    {products.length === 0 ? (
      <p>No tienes compras registradas.</p>
    ) : (
      <ul className="space-y-4 text-black">
        {products.map((compra, idx) => (
          <li key={idx} className="border p-2 rounded">
            <p><b>Fecha:</b> {compra.fecha}</p>
            <p><b>Total:</b> {compra.total}</p>
            <p><b>Producto:</b> {compra.productoInfo?.nombre}</p>
            <p><b>Cantidad:</b> {compra.productos?.cantidad}</p>
            
          </li>
        ))}
      </ul>
    )}
  </div>
</Layout>
);

}