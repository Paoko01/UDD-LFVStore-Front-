import { apiClient } from "../../../shared/services/apiClient"

export const fetchAllPoleras = async() => {
    try {
        const { data } = await apiClient.get('/poleras');
        return data;
    } catch (error) {
        console.error('Error obteniendo las poleras', error);
        throw new Error(error);
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
        const { data } = await apiClient.get('/prints');
        return data;
    } catch (error) {
        console.error('Error obteniendo los prints', error);
        throw new Error(error);
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