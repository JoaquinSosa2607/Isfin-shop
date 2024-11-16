<template>
      <div class="main-container">
            <div class="analysis-container">
                <div v-if="isLoading" class="loading-container">
                    <div class="spinner"></div>
                    <p style="color: black">Cargando tus datos...</p>
                </div>
                <div v-else class="options">
                    <h2>Estado actual de tus inversiones</h2>
                    <router-link :to="{ name: 'profile'}">
                        <button>Volver</button>
                    </router-link>
                </div>
                <canvas id="cryptoChart"></canvas>
            </div>
      </div>
</template>

<script>
import { Chart, PieController, ArcElement, Tooltip, Legend, Title } from "chart.js";
import apiClient from "../services/apiService.js"

Chart.register(PieController, ArcElement, Tooltip, Legend, Title);

export default {
    data() {
        return {
            transactions: [],
            cryptoTotals: {
                btc: 0,
                eth: 0,
                dai: 0
            },
            chart: null,
            isLoading: true,
        }
    },
    methods: {
        async getTransactions() {
            try {
                const username = localStorage.getItem("userName");
                if (!username) {
                    console.error("Usuario no encontrado");

                }
                this.transactions = await apiClient.getUserTransactions(username);
                this.calculateTotals();
                this.renderChart();
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false;
            }
        },
        calculateTotals() {
            this.cryptoTotals = { btc: 0, eth: 0, dai: 0 };
            this.transactions.forEach(transaction => {
                const { action, crypto_code, crypto_amount } = transaction;
                if(action === "purchase") {
                    this.cryptoTotals[crypto_code] += crypto_amount;
                } else if (action === "sale") {
                    this.cryptoTotals[crypto_code] -= crypto_amount;
                }
            })
        },
        renderChart() {
            if(this.chart) {
                this.chart.destroy();
            }

            const ctx = document.getElementById("cryptoChart");
            const data = {
                labels: ["Bitcoin (BTC)", "Ethereum (ETH)", "Dai (DAI)"],
                datasets: [
                    {
                        label: "Total por Criptomoneda",
                        data: Object.values(this.cryptoTotals),
                        backgroundColor: ["#f7931a", "#3c3c3d", "#f4a261"],
                        hoverBackgroundColor: ["#ffa600", "#62626e", "#ffbe76"],
                    }
                ]
            };

            this.chart = new Chart(ctx, {
                type: "pie",
                data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top"
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || "";
                                const value = context.raw || 0;
                                return `${label} ${value.toFixed(5)}`;
                            }
                        }
                    }
                }
            });
        }
    },
    async mounted() {
        await this.getTransactions();
    }
}
</script>

<style scoped>
.analysis-container {
    width: 60vh;
    margin: 20px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}
canvas {
    max-width: 100%;
    height: auto;
}

.options {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
</style>