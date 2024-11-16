<template>
    <div class="main-container">
        <NavBarComponent name="crypto"></NavBarComponent>
        <div class="transactions-container">
            <div class="options">
                <h3>Historial de movimientos de {{ username }}</h3>
                <router-link :to="{ name: 'data'}">
                    <button>Análisis</button>
                </router-link>
            </div>
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
                <tbody>
                    <tr v-for="(transaction, index) in transactions" :key="index">
                        <td>{{ transaction.crypto_code.toUpperCase() }}</td>
                        <td>{{ transaction.crypto_amount }}</td>
                        <td>{{ transaction.money }}</td>
                        <td>{{ transaction.action === 'purchase' ? 'Compra' : 'Venta' }}</td>
                        <td>{{ transaction.datetime }}</td>
                        <td>
                            <button @click="openTransactionModal(transaction._id)">✔</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
                <h3>Detalles de la Transacción</h3>
                <p><strong>Moneda:</strong> {{ selectedTransaction.crypto_code.toUpperCase() }}</p>
                <p><strong>ARS:</strong> {{ selectedTransaction.money }}</p>
                <p><strong>Tipo de Transacción:</strong> {{ selectedTransaction.action === 'purchase' ? 'Compra' : 'Venta' }}</p>
                <p><strong>Fecha:</strong> {{ selectedTransaction.datetime }}</p>

                <div v-if="isEditing">
                    <label><strong>Cantidad:</strong></label>
                    <input v-model="editAmount" type="number" />
                    <div class="modal-buttons">
                        <button @click="saveEdit">Guardar</button>
                        <button @click="cancelEdit">Cancelar</button>
                    </div>
                </div>
                
                <div v-else>
                    <p><strong>Cantidad:</strong> {{ selectedTransaction.crypto_amount }}</p>
                    <div class="modal-buttons">
                        <button @click="startEdit">Editar</button>
                        <button @click="deleteUserTransaction">Eliminar</button>
                    </div>
                </div>
            </div>
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
            loading: true,
            showModal: false,
            selectedTransaction: {},
            isEditing: false,
            editAmount: null
        }
    },
    methods: {
        async getTransactions() {
            const userStore = useUserStore();
            this.transactions = await apiClient.getUserTransactions(userStore.name);
            this.loading = false;
        },
        async openTransactionModal(id) {
            try {
                this.selectedTransaction = await apiClient.getTransactionById(id);
                this.editAmount = this.selectedTransaction.crypto_amount;
                this.showModal = true;
            } catch (error) {
                console.error("Error al obtener la transacción:", error);
            }
        },
        closeModal() {
            this.showModal = false;
            this.selectedTransaction = {};
            this.isEditing = false;
            this.editAmount = null;
        },
        startEdit() {
            this.isEditing = true;
        },
        cancelEdit() {
            this.isEditing = false;
            this.editAmount = this.selectedTransaction.crypto_amount;
        },
        async saveEdit() {
            try {
                const body = { crypto_amount: this.editAmount };
                await apiClient.editTransaction(this.selectedTransaction._id, body);
                await this.getTransactions();
                alert("Transacción editada con éxito");
                this.closeModal();
            } catch (error) {
                console.error("Error al editar la transacción:", error);
            }
        },
        async deleteUserTransaction() {
            try {
                await apiClient.deleteTransaction(this.selectedTransaction._id);
                await this.getTransactions();
                this.closeModal();
            } catch (error) {
                console.error("Error al eliminar la transacción:", error);
            }
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
        margin: 20px;
        padding: 20px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        flex-grow: 1;
        overflow: auto;
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

    .options {
        display: flex;
        justify-content: center;
        gap: 20px;
        align-items: center;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .modal-buttons {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }

    .modal-buttons button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
</style>
