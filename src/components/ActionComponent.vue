<template> 
    <div class="form-container">
        <div class="form-wrapper">
            <div class="purchase-form">
                <form @submit.prevent="handleSubmit">
                    <section>
                        <label for="exchange">Moneda</label>
                        <input type="text" readonly v-model="cryptoName"></input>
                    </section>
                    <section>
                        <label for="cryptoAmount">Cantidad</label>
                        <input type="number" v-model="form.crypto_amount" @input="calculateAmount" step="0.00001" required>
                    </section>
                    <section>
                        <label for="datetime">Fecha y Hora</label>
                        <input type="datetime-local" v-model="form.datetime" required>
                    </section>
                    <section>
                        <label for="money">Monto</label>
                        <input type="number" v-model="form.money" step="0.01" required readonly>
                    </section>
                    <section class="button-group">
                        <button v-if="action === 'purchase'" type="submit">Comprar</button>
                        <button v-else-if="action === 'sale'" type="submit">Vender</button>
                        <router-link :to="{ name: 'crypto'}">
                            <button>Volver</button>
                        </router-link>
                    </section>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import cryptoClient from "../services/criptoYaService"
import apiClient from "../services/apiService"

export default {
    data() {
        return {
            form: {
                user_id: null,
                action: this.action,
                crypto_code: this.crypto_code,
                crypto_amount: null,
                money: null,
                datetime: null
            },
            cryptoPrice: null,
            cryptoName: null
        }
    },
    props: {
        action: { type: String, required: true },
        crypto_code: { type: String, required: true }
    },
    methods: {
        setCryptoName() {
            if(this.crypto_code === 'btc') {
                this.cryptoName = 'Bitcoin'
            } else if(this.crypto_code === 'eth') {
                this.cryptoName = 'Ethereum'
            } else {
                this.cryptoName = 'Dai'
            }
        },
        async fetchCryptoPrice() {
            try {
                const response = await cryptoClient.getCryptoInfo(this.crypto_code);
                this.cryptoPrice = response.totalAsk;
            } catch (error) {
                console.error("Error fetching crypto price:", error);
            }
        },
        calculateAmount() {
            if (this.cryptoPrice && this.form.crypto_amount > 0) {
                this.form.money = (this.cryptoPrice * this.form.crypto_amount).toFixed(2);
            } else {
                this.form.money = null;
            }
        },
        async handleSubmit() {
            try {
                const response = await apiClient.createTransaction(this.form);
                alert("Transacción creada con éxito!", response);
                this.form.crypto_code = "";
                this.form.action = this.action;
                this.form.crypto_amount = 0;
                this.form.money = 0;
                this.form.datetime = "";
            } catch (error) {
                console.error("Error creando transacción:", error);
            }
        },
        goBack() {
            this.$router.push('crypto');
        },
    },
    async mounted() {
        const username = localStorage.getItem('userName');
        if (username) {
            this.form.user_id = username;
        } else {
            console.error('No username found');
        }
        await this.fetchCryptoPrice();
        this.setCryptoName();
    },
    watch: {
        crypto_code: "fetchCryptoPrice",
    }
};
</script>


<style scoped>
    .form-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-image: url('../assets/icons/TheCellar.webp');
        background-size: cover;
        background-repeat: no-repeat;
    }

    .form-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        width: 100%;
    }

    .purchase-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    form section {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
    }

    label {
        font-weight: bold;
        font-size: 14px;
        color: #333;
    }

    select, input {
        padding: 10px;
        border-radius: 8px;
        border: none;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .button-group {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 20px;
    }
</style>