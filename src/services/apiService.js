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
    }
}