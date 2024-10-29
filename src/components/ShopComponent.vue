<template>
    <nav class="shop-nav">
        <router-link :to="{ name:'inventory'}"><button>Inventario</button></router-link>
    </nav>
    <div class="main-container">
        <div class="list-container">
            <div class="money-display">Dinero: {{ userStore.money }}</div>
            <ul class="product-list">
                <li
                    v-for="product in products"
                    :key="product.id"
                    class="product-item"
                    @click="showModal(product)"
                >
                    <img
                        class="product-img"
                        :src="getIconPath(product.param5)" 
                        :alt="product.param1"
                    />
                    <div class="product-info">
                        <p class="product-name">{{ product.param1 }}</p>
                        <p class="product-price">{{ product.param2 }} gold</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <div v-if="isModalVisible" class="modal">
        <div class="modal-content">
            <p>¿Comprar este objeto?</p>
            <button @click="purchaseProduct(selectedProduct)">Comprar</button>
            <button @click="closeModal">Cancelar</button>
        </div>
    </div>
</template>

<script>
import apiClient from "../services/apiService";
import { useUserStore } from "../stores/useUserStore";

export default {
    setup() {
        const userStore = useUserStore();

        return { userStore };
    },
    data() {
        return {
            products: [],
            isModalVisible: false,
            selectedProduct: null,
        };
    },
    methods: {
        async getProducts() {
            this.products = await apiClient.getAllProducts();
        },
        getIconPath(param5) {
            return new URL(`../assets/icons/${param5}.png`, import.meta.url).href;
        },
        showModal(product) {
            this.selectedProduct = product;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.selectedProduct = null;
        },
        async purchaseProduct(product) {
            try {
                if(this.userStore.money > 0) {
                    await apiClient.purchaseProduct(product);
                    this.closeModal();
                    this.userStore.purchaseItem(product.param2)
                } else {
                    alert("No tiene el suficiente dinero")
                }
                
            } catch (error) {
                console.error("Error al comprar el producto:", error);
            }
        }
    },
    created() {
        this.getProducts();
    },
};
</script>

<style scoped>

.shop-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
}

.main-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 80vh;
    margin: 0;
}

.list-container {
    margin-left: 20px;
    max-width: 530px;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
    background-image: url("../assets/icons/wood-texture.jpg");
    background-size: cover;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin: 0;
}

.money-display {
    font-size: 18px;
    display: flex;
    align-self: center;
    justify-self: center;
    font-weight: bold;
    color: rgb(231, 175, 33);
    background-image: url("../assets/icons/wood-texture.jpg");
    background-size: cover;
    text-align: center;
    text-shadow: 1px 1px 2px black;
    padding: 10px;
    margin-bottom: 5px;
}

.product-item {
    width: 100px;
    height: 120px;
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

.product-item:hover {
    background-color: rgba(255, 255, 255, 0.5);
}

.product-img {
    height: 35px;
    margin-bottom: 5px;
}

.product-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-name {
    font-size: 14px;
    margin: 0;
}

.product-price {
    font-size: 15px;
    color: rgb(231, 175, 33);
    margin: 0;
    text-shadow: 1px 1px 2px black;
}


.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: rgba(255, 255, 255, 0.726);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

.modal-content p {
    margin: 0 0 10px 0;
}

.modal-content button {
    margin: 5px;
}
</style>
