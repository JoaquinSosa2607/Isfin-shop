<template>
    <div class="shop-title">
        <h2>Isfin Shop</h2>
    </div>
    <div class="main-container">
        <div class="list-container">
            <ul class="product-list">
                <li
                    v-for="product in products"
                    :key="product.id"
                    class="product-item"
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
        getIconPath(param5) {
            return new URL(`../assets/icons/${param5}.png`, import.meta.url).href;
        }
    },
    created() {
        this.getProducts();
    },
};
</script>

<style scoped>

.main-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 80vh;
    margin: 0;
}

.list-container {
    margin-left: 20px;
    max-width: 525px;
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
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.2);
    color: black;
    font-weight: bold;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 5px;
    text-align: center;
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
    color: darkgoldenrod;
    margin: 0;
    text-shadow: 1px 1px 2px black
}

.shop-title {
    display: flex;
    justify-content: center;
    background-image: url('../assets/icons/banner.png');
    background-size: 200px;
    background-repeat: no-repeat;
    background-position: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.shop-title h2 {
    transform: rotate(-5deg);
}
</style>

