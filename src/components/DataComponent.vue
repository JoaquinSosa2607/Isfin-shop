<template>
    <div class="main-container">
        <router-link :to="{ name: 'profile'}">
            <button>Volver</button>
        </router-link>
        <div class="analysis-container">
            <div class="status-container">
                <div v-if="isLoading" class="loading-container">
                    <div class="spinner"></div>
                    <p style="color: black">Cargando tus datos...</p>
                </div>
                <div v-else class="options">
                    <h2>Estado actual de tus inversiones</h2>

                </div>
                <h2>Total de criptomonedas: {{ cryptoTotals.btc + cryptoTotals.eth + cryptoTotals.dai }}</h2>
                <canvas id="cryptoChart"></canvas>
            </div>
            <div class="investment-container">
                <h3>Resultado de tus inversiones</h3>
                <div v-if="isLoading" class="loading-container">
                    <div class="spinner"></div>
                    <p style="color: black">Calculando tus inversiones...</p>
                </div>
                <table v-else class="results-table">
                    <thead>
                    <tr>
                        <th>Criptomoneda</th>
                        <th>Resultado (ARS)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(result, crypto) in results" :key="crypto">
                        <td>{{ crypto.toUpperCase() }}</td>
                        <td :class="{ profit: result >= 0, loss: result < 0 }">
                            {{ result.toFixed(2) }}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import {Chart, PieController, ArcElement, Tooltip, Legend, Title} from "chart.js";
import apiClient from "../services/apiService.js";
import cryptoClient from "../services/criptoYaService.js";

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
            results: {},
            cryptoPrices: {}
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
                await this.getCryptoPrices();
                this.calculateResults();
                this.calculateTotals();
                this.renderChart();
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false;
            }
        },
        async getCryptoPrices() {
            try {
                const responseBTC = await cryptoClient.getCryptoInfo("btc");
                const responseETH = await cryptoClient.getCryptoInfo("eth");
                const responseDAI = await cryptoClient.getCryptoInfo("dai");
                this.cryptoPrices["bitcoin"] = responseBTC.bid;
                this.cryptoPrices["ethereum"] = responseETH.bid;
                this.cryptoPrices["dai"] = responseDAI.bid;
            } catch (error) {
                console.error("Error al obtener los precios de las criptomonedas", error);
            }
        },
        calculateResults() {
            const investmentData = {};

            this.transactions.forEach(({ crypto_code, action, money, crypto_amount }) => {
                if (!investmentData[crypto_code]) {
                    investmentData[crypto_code] = {
                        totalSpent: 0,
                        totalEarned: 0,
                        totalCrypto: 0
                    };
                }

                if (action === "purchase") {
                    investmentData[crypto_code].totalSpent += parseFloat(money);
                    investmentData[crypto_code].totalCrypto += parseFloat(crypto_amount);
                } else if (action === "sale") {
                    investmentData[crypto_code].totalEarned += parseFloat(money);
                    investmentData[crypto_code].totalCrypto -= parseFloat(crypto_amount);
                }
            });

            Object.entries(investmentData).forEach(([crypto, data]) => {
                const { totalSpent, totalEarned, totalCrypto } = data;
                const currentPrice = this.cryptoPrices[crypto] || 0;

                if (totalEarned > totalSpent) {
                    this.results[crypto] = totalEarned - totalSpent;
                } else if (totalCrypto > 0) {
                    const currentMarketValue = totalCrypto * currentPrice;
                    this.results[crypto] = currentMarketValue - totalSpent;
                } else {
                    this.results[crypto] = totalEarned - totalSpent;
                }
            });
        }
        ,
        calculateTotals() {
            this.cryptoTotals = {btc: 0, eth: 0, dai: 0};
            this.transactions.forEach(transaction => {
                const {action, crypto_code, crypto_amount} = transaction;
                if (action === "purchase") {
                    this.cryptoTotals[crypto_code] += crypto_amount;
                } else if (action === "sale") {
                    this.cryptoTotals[crypto_code] -= crypto_amount;
                }
            })
        },
        renderChart() {
            if (this.chart) {
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
    display: flex;
    flex-direction: row;
    justify-self: center;
    align-items: center;
}
.status-container {
    width: 60vh;
    margin: 20px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;

}

.investment-container {
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-content: center;
    width: 60vh;
    height: 30vh;
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
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.results-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
}

.results-table th, .results-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.results-table th {
    background-color: #dd8715;
    font-weight: bold;
    color: white;
}

.results-table td.profit {
    color: green;
}

.results-table td.loss {
    color: red;
}
</style>