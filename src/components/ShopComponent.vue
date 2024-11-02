<template>
    <div class="main-container">
        <div class="list-container">
            <div class="money-display">
                Dinero: 1000
            </div>
            <div class="product-container">
                <ul class="product-list">
                    <li v-for="product in products" :key="product.id" class="product-item">
                        <img class="product-img" :src="getIconPath(product.type)" :alt="product.name"/>
                        <div class="product-info">
                            <p class="product-name">{{ product.name }}</p>
                            <p class="product-price">{{ product.price }} gold</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import CustomModal from "./CustomModal.vue";

export default {
    data() {
        return {
            products: [],
        };
    },
    methods: {
        getProducts() {
            this.products = [ 
                {name: "Gran Hacha", price: "30", type: "axe"}, 
                {name: "Espadón", price: "50", type: "sword"},
                {name: "Arco Largo", price: "50", type: "bow"},
                {name: "Ballesta", price: "75", type: "crossbow"},
                {name: "Varita de Fuego", price: "150", type: "wand"},
                {name: "Anillo de Trueno", price: "300", type: "ring"},
                {name: "Capa de Lobo", price: "50", type: "cloak"},
                {name: "Casco de Plata", price: "500", type: "helmet"},
            ]
        },
        getIconPath(param5) {
            return new URL(`../assets/icons/${param5}.png`, import.meta.url).href;
        },
    },
    created() {
        this.getProducts();
    },
    components: {
        CustomModal
    }
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
    max-width: 605px;
    flex-wrap: wrap;
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

.product-container {
    display: flex;
    width: 530px;
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
</style>
