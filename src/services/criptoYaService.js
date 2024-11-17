import axios from "axios";

const cryptoClient = axios.create({
    baseURL: 'https://criptoya.com/api/argenbtc/'
});

export default {
    async getCryptoInfo(crypto) {
        try {
            const response = await cryptoClient.get(`/${crypto.toLowerCase()}/ars/0.1`);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo las criptos: ', error);
        }
    }
}