import { useEffect, useState } from "react";
import { fetchAllPoleras, fetchAllPrints} from "../services/productApiService";


export const useFetchProducts = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const getProducts = async () => {
        try {
            setLoading(true);
                setError(null);

                const poleras = await fetchAllPoleras();
                const prints = await fetchAllPrints();

                // ¡Nuevos console.log CLAVE aquí!
                console.log("Valor de 'poleras':", poleras, "Es Array:", Array.isArray(poleras));
                console.log("Valor de 'prints':", prints, "Es Array:", Array.isArray(prints));

                // Aseguramos que son arrays antes de hacer spread.
                // Esto NO DEBERÍA ser necesario si las APIs devuelven un array,
                // pero lo ponemos para diagnóstico y robustez.
                const safePoleras = Array.isArray(poleras) ? poleras : [];
                const safePrints = Array.isArray(prints) ? prints : [];

                const allProducts = [...safePoleras, ...safePrints];

                console.log("allProducts después de spread:", allProducts);
                setProductos(allProducts);
        } catch (err) {
          setError(err);
          console.error("Error en useFetchProducts:", err);
        } finally {
          setLoading(false);
        }
      };

      getProducts();
    }, []);

    return { productos, loading, error };
    //return [productos, loading, error];
}
/*
{
    productos: productos,
    loading: loading,
    error: error,
}

[productos, loading, error]



const { productos, loading, error } = useFetchProducts(); // => Muchos prefieren esta forma

const [ zapatillas, carganding, malioSal ] = useFetchProducts(); // => Se recomienda para altos niveles de abstracción
*/