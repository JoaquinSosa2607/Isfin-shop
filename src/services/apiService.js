import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api.yumserver.com/16464/generic'
});

export default {

    async getAllProducts() {
        try {
            const response = await apiClient.get('/productos');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async purchaseProduct(product) {
        try {
            const response = await apiClient.post(`/inventario`, product);
            return response.statusText;
        } catch (error) {
            console.error(error);
        }
    },
    async getAllInventoryItems() {
        try {
            const response = await apiClient.get('/inventario');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}