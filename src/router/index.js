import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";
import HomeView from "../views/HomeView.vue";
import InventoryView from "../views/InventoryView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/shop',
        name: 'shop',
        component: ShopView
    },
    {
        path: '/inventory',
        name: 'inventory',
        component: InventoryView
    }
]

const router = createRouter({
    history: createWebHistory('/Isfin-shop/'),
    routes
})

export default router