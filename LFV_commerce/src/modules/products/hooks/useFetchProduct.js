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
                const allProducts = [...poleras, ...prints];

                console.log(allProducts);
                setProductos(allProducts);
                setError(null);
        } catch (err) {
          setError(err);
          console.error(err);
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