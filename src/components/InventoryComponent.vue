<template>
    <nav class="inventory-nav">
        <router-link :to="{ name:'shop'}"><button>Volver a la Tienda</button></router-link>
    </nav>
    <div class="main-container">
        <img src="../assets/icons/backpack.png" alt="mochila">
        <div class="inventory-container">
            <ul class="item-list">
                <li v-for="item in items" :key="item.id" class="item">
                    <div class="item-info">
                        <p class="item-name">{{ item.param1 }}: {{ item.param6 }}</p>
                        <div class="item-btn">
                            <button>Asignar apodo</button>
                            <button>Descartar</button>
                        </div>
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
            items: [],
        };
    },
    methods: {
        async getInventoryItems() {
            try {
                this.items = await apiClient.getAllInventoryItems();
                console.log(this.items);
            } catch (error) {
                console.error("Error al obtener los elementos del inventario:", error);
            }
        },
        getIconPath(param5) {
        return new URL(`../assets/icons/${param5}.png`, import.meta.url).href;
        }
    },
    
    created() {
        this.getInventoryItems();
    }
};
</script>

<style scoped>
:deep(body) {
    background-image: url('../assets/icons/Background.webp');
    background-size: cover;
    background-repeat: no-repeat;
}

.inventory-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
}

.main-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
}

.main-container img {
    height: 350px;
}

.inventory-container {
    display: flex;
    flex-direction: r;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: rgb(3, 153, 158);
    background-size: cover;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 600px
}



.item-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;
    list-style-type: none;
    margin: 0;
}

.item {
    width: auto;
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

.item-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.item-name {
    font-size: 14px;
    margin: 0;
}

.item-btn {
    margin-top: 10px;
    display: flex;
    gap: 5px;
    flex-direction: column;
}

.item-btn button {
    background-color: turquoise;
    color: black;
}
</style>
