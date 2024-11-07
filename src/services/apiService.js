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
    },
    async getTransactionById(id) {
        try {
            const response = await apiClient.get(`transactions/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    async deleteTransaction(id) {
        try {
            await apiClient.delete(`transactions/${id}`);
            return "Transacción eliminada con éxito."
        } catch (error) {
            console.error(error);
        }
    },
    async editTransaction(id, body) {
        try {
            await apiClient.patch(`transactions/${id}`, body);
            return "Transacción editada con éxito."
        } catch (error) {
            console.error(error);
        }
    }
}