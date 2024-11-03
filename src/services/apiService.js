import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://labor3-d60e.restdb.io/rest/',
    headers: { 'x-apikey': '64a2e9bc86d8c525a3ed8f63' }
});

export default {
    async createTransaction(transaction) {
        try {
            const response = await apiClient.post('transactions', transaction);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async getUserTransactions(user) {
        try {
            const response = await apiClient.get(`transactions?q={"user_id":"${user}"}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}