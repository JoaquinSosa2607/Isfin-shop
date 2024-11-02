import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";
import HomeView from "../views/HomeView.vue";

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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router