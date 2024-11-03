<template>
    <div class="main-container">
        <NavBarComponent name="crypto"></NavBarComponent>
        <div class="transactions-container">
            <h3>Historial de movimientos de {{ username }}</h3>
            <div v-if="loading" class="loading-container">
                <div class="spinner"></div>
                <p style="color: black;">Buscando transacciones...</p>
            </div>
            <table v-else class="transactions-table">
                <thead>
                    <tr>
                        <th>Moneda</th>
                        <th>Cantidad</th>
                        <th>ARS</th>
                        <th>Tipo de Transacción</th>
                        <th>Fecha</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody >
                    <tr  v-for="(transaction, index) in transactions" :key="index">
                        <td>{{ transaction.crypto_code.toUpperCase() }}</td>
                        <td>{{ transaction.crypto_amount }}</td>
                        <td>{{ transaction.money }}</td>
                        <td>{{ transaction.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
                        <td>{{ transaction.datetime }}</td>
                        <td> ✔ </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import NavBarComponent from '../components/NavBarComponent.vue';
import apiClient from '../services/apiService';
import { useUserStore } from '../stores/useUserStore';

export default {
    data() {
        return {
            transactions: [],
            username: localStorage.getItem('userName'),
            loading: true
        }
    },
    methods: {
       async getTransactions() {
            const userStore = useUserStore();
            this.transactions = await apiClient.getUserTransactions(userStore.name);
            this.loading = false;
            console.log(this.transactions);
        }
    },
    components: {
        NavBarComponent
    },
    mounted() {
        this.getTransactions();
    }
}
</script>

<style scoped>

    .transactions-container {
        width: 100%;
        max-width: 800px;
        max-height: 80vh;
        margin-top: 20px;
        padding: 20px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        flex-grow: 1;
    }

    h3 {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
    }

    .transactions-table {
        width: 100%;
        border-collapse: collapse;
        text-align: center;
    }

    .transactions-table th,
    .transactions-table td {
        padding: 10px;
        border: 1px solid #ddd;
    }

    .transactions-table th {
        background-color: #dd8715;
        color: white;
        font-weight: bold;
    }

    .transactions-table tbody tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    .transactions-table td {
        color: #555;
    }
</style>
