<template>
    <nav class="shop-nav">
        <router-link :to="{ name:'inventory'}"><button>Inventario</button></router-link>
    </nav>
    <div class="main-container">
        <div class="list-container">
            <div class="money-display">
                Dinero: {{ userStore.money }}
            </div>
            <div class="product-container">
                <ul class="product-list">
                    <li v-for="product in products" :key="product.id" class="product-item" @click="showModal(product)">
                        <img class="product-img" :src="getIconPath(product.param5)" :alt="product.param1"/>
                        <div class="product-info">
                            <p class="product-name">{{ product.param1 }}</p>
                            <p class="product-price">{{ product.param2 }} gold</p>
                        </div>
                    </li>
                </ul>
                <img class="discount-attempt" src="../assets/icons/d20.png" alt="D20" @click="showDiscountModal">
            </div>
        </div>
    </div>

    <CustomModal
        :isVisible="isDiscountModalVisible"
        message="¿Quieres intentar obtener un descuento? Tendrás que superar:"
        :value="difficulty"
        :result="diceRoll"
        :disableConfirm = "hasAttemptedDiscount"
        confirmText="Persuadir"
        cancelText="Cancelar"
        @confirm="discountAttempt"
        @cancel="closeModal"
    />

    <CustomModal
        :isVisible="isModalVisible"
        message="¿Comprar este objeto?"
        confirmText="Comprar"
        cancelText="Cancelar"
        @confirm="purchaseProduct(selectedProduct)"
        @cancel="closeModal"
    />
</template>

<script>
import apiClient from "../services/apiService";
import { useUserStore } from "../stores/useUserStore";
import CustomModal from "./CustomModal.vue";

export default {
    setup() {
        const userStore = useUserStore();

        return { userStore };
    },
    data() {
        return {
            products: [],
            isModalVisible: false,
            isDiscountModalVisible: false,
            selectedProduct: null,
            difficulty: null,
            diceRoll: null,
            hasAttemptedDiscount: false
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
        showDiscountModal() {
            this.isDiscountModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.isDiscountModalVisible = false;
            this.selectedProduct = null;
        },
        async purchaseProduct(product) {
            try {
                if(this.userStore.money > 0) {
                    await apiClient.purchaseProduct(product);
                    await this.setDifficulty();
                    this.closeModal();
                    this.userStore.purchaseItem(product.param2)
                } else {
                    alert("No tiene el suficiente dinero")
                }
                
            } catch (error) {
                console.error("Error al comprar el producto:", error);
            }
        },
        async setDifficulty() {
            const items = await apiClient.getAllInventoryItems();
            if(items.length == 0) {
                this.difficulty = "15"
            } else if(items.length > 0 && items.length <= 5) {
                this.difficulty = "12"
            } else {
                this.difficulty = "10"
            }
        },
        async discountAttempt() {
            this.diceRoll = Math.floor(Math.random() * 20) + 1;
            
            if (this.diceRoll >= this.difficulty) {
                try {

                    const updatedProducts = this.products.map(product => ({
                        ...product,
                        param2: product.param2 - 20
                    }));

                    const patchPromises = updatedProducts.map(async updatedProduct => {
                        return await apiClient.updateProduct(updatedProduct);
                    });

                    await Promise.all(patchPromises);

                    this.products = updatedProducts;
                    alert("¡Descuento aplicado con éxito!");
                    this.diceRoll = null;
                    this.hasAttemptedDiscount = true

                } catch (error) {
                    console.error("Error al aplicar el descuento:", error);
                }
            } else {
                alert(`Fallaste la tirada (Resultado: ${this.diceRoll}). No puedes volver a intentarlo.`);
                this.diceRoll = null;
                this.hasAttemptedDiscount = true;
            }
            this.closeModal();
        },
    },
    created() {
        this.getProducts();
        this.setDifficulty();
    },
    components: {
        CustomModal
    }
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

.discount-attempt{
    width: 75px;
    display: flex;
    align-self: center;
    justify-self: center;
}
</style>
