import { apiClient } from "../../../shared/services/apiClient"

export const fetchAllPoleras = async() => {
    try {
        // Renombramos la variable 'data' de la desestructuración de Axios a 'responseAxiosData'
        // para evitar confusión con la propiedad 'data' anidada
        const { data: responseAxiosData } = await apiClient.get('/poleras'); 
        
        // Aquí extraemos el array de productos REAL que está dentro de la propiedad 'data'
        // del objeto que tu backend te devuelve.
        console.log("API Response for poleras:", responseAxiosData); // Esto te mostrará el objeto completo
        const actualPolerasData = responseAxiosData.data; // <-- ¡ESTO ES EL CAMBIO CLAVE!
        
        console.log("Extracted actual product data for poleras:", actualPolerasData);
        return actualPolerasData; // Retornamos el array de poleras
    } catch (error) {
         console.error("Error obteniendo las poleras:", error);
        throw error;
    }
};

export const fetchPoleraById = async(id) => {
      try {
        const { data } = await apiClient.get(`/poleras/${id}`);
        return data;
    } catch (error) {
        console.error(`Error obteniendo la polera con el id: ${id}`, error);
        throw new Error(error);
    }
};

export const fetchAllPrints = async() => {
    try {
        const { data: responseAxiosData } = await apiClient.get('/prints');
        console.log("API Response for prints:", responseAxiosData);
        const actualPrintsData = responseAxiosData.data; // <-- ¡ESTO ES EL CAMBIO CLAVE!
        
        console.log("Extracted actual product data for prints:", actualPrintsData);
        return actualPrintsData; // Retornamos el array de prints
    } catch (error) {
         console.error("Error in fetchAllPrints:", error);
        throw error;
    }
};

export const fetchPrintById = async(id) => {
      try {
        const { data } = await apiClient.get(`/prints/${id}`);
        return data;
    } catch (error) {
        console.error(`Error obteniendo el print con el id: ${id}`, error);
        throw new Error(error);
    }
};