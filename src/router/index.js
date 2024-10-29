import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: ShopView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router