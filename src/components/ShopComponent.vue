<template>
    <div class="shop-title">
        <h2>Isfin Shop</h2>
    </div>
    <div class="list-container">
        <ul class="product-list">
            <li
                v-for="product in products"
                :key="product.id"
                class="product-item"
            >
                {{ product.param2 }}
            </li>
        </ul>
    </div>
</template>

<script>
import apiClient from "../services/apiService";

export default {
    data() {
        return {
            products: [],
        };
    },
    methods: {
        async getProducts() {
            this.products = await apiClient.getAllProducts();
        },
    },
    created() {
        this.getProducts();
    },
};
</script>

<style scoped>
.list-container {
    margin-left: 20px;
    position: relative;
    display: flex;
    align-items: start;
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
}

.product-item {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
    font-weight: bold;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.shop-title {
    display: flex;
    justify-content: center;
    background-image: url('../assets/icons/banner.png');
    background-size: 200px;
    background-repeat: no-repeat;
    background-position: center;
    font-family:Georgia, 'Times New Roman', Times, serif;
}
</style>
