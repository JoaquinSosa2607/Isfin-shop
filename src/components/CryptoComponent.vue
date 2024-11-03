<template>
    <div class="main-container">
        <NavBarComponent></NavBarComponent>
        <div v-if="loading" class="loading-container">
            <div class="spinner"></div>
            <p>Cargando...</p>
        </div>
		<div v-else class="crypto-container">
            <div class="exchange-container">
                <ul class="crypto-list">
                    <li  v-for="(coin, index) in exchanges" :key="index" class="crypto-item" @click="openModal(coin.name)">
                        <div class="exchange-info">
                            <p class="coin-name">{{ coin.name.toUpperCase() }}</p>
                            <p class="coin-price"> Compra: {{ coin.buy }} </p>
                            <p class="coin-price"> Venta: {{ coin.sell }} </p>
                        </div>
                    </li>
                </ul>
            </div>
		</div>
    </div>

    <CustomModal :isVisible="isModalVisible" message="Que quieres hacer?" confirmText="Comprar" cancelText="Vender" @confirm="redirectToAction('purchase', selectedCrypto)" @cancel="redirectToAction('sale', selectedCrypto)" @exit="closeModal" :disableButtons="modalLoading" :disableCancel="!canSell"></CustomModal>
</template>

<script>
import cryptoClient from "../services/criptoYaService";
import apiClient from "../services/apiService";
import CustomModal from "./CustomModal.vue";
import NavBarComponent from "./NavBarComponent.vue";
import { useUserStore } from "../stores/useUserStore";
export default {
    data() {
		return {
			exchanges: [
				{ name: 'btc', buy: null, sell: null},
				{ name: 'eth', buy: null, sell: null},
				{ name: 'dai', buy: null, sell: null},
			],
            loading: true,
            isModalVisible: false,
            selectedCrypto: null,
            canSell: false,
            modalLoading: false
		}
    },
	methods: {
		async getCoins() {
			for(let coin of this.exchanges) {
				try {
					const response = await cryptoClient.getCryptoInfo(coin.name);
					coin.buy = response.totalAsk;
					coin.sell = response.totalBid;
				} catch (error) {
					console.error(error);
				}
			}
            this.loading = false;
		},
        async openModal(cryptoCode) {
            this.isModalVisible = true;
            this.selectedCrypto = cryptoCode;
            this.modalLoading = true;
            await this.checkUserTransactions(cryptoCode);
            this.modalLoading = false;
        },
        closeModal(){
            this.isModalVisible = false;
        },
        redirectToAction(action, cryptoCode) {
            
            this.$router.push({ name: 'action', params: { action, cryptoCode } });
        },
        async checkUserTransactions(cryptoCode) {
            const userStore = useUserStore();

            try {
                const transactions = await apiClient.getUserTransactions(userStore.name);
                console.log(transactions)
                let totalAmount = 0;
                transactions.forEach(transaction => {
                    if (transaction.crypto_code === cryptoCode) {
                        const amount = parseFloat(transaction.crypto_amount);
                        if (transaction.action === "purchase") {
                            totalAmount += amount;
                        } else if (transaction.action === "sale") {
                            totalAmount -= amount;
                        }
                    }
                });
                
                this.canSell = totalAmount > 0;
            } catch (error) {
                console.error(error);
            }
        }
	},
    created() {
		this.getCoins();
    },
    components: {
        NavBarComponent,
        CustomModal
    }
};
</script>


<style scoped>


    .crypto-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
    }

    .exchange-container {
        display: grid;
        justify-content: center;
        align-content: center;
        width: auto;
    }

    .crypto-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        padding: 20px;
        background-image: url("../assets/icons/dark-wood-texture.jpg");
        background-size: cover;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        margin: 0;
    }

    .crypto-item {
        width: 170px;
        height: 130px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.356);
        color: black;
        font-weight: bold;
        border: 2px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        padding: 5px;
        text-align: center;
        cursor: pointer;
    }

    .crypto-item:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }

    .exchange-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .coin-name {
        font-size: 14px;
        margin: 0;
    }

    .coin-price {
        font-size: 15px;
        color: rgb(231, 175, 33);
        margin: 0;
        text-shadow: 1px 1px 2px black;
    }

    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        color: white
    }

    .spinner {
        border: 8px solid rgba(0, 0, 0, 0.1);
        border-top: 8px solid rgb(231, 175, 33);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>