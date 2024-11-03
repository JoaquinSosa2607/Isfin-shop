import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";
import HomeView from "../views/HomeView.vue";
import CryptoView from "../views/CryptoView.vue";
import ActionView from "../views/ActionView.vue";
import ProfileView from "../views/ProfileView.vue";

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
        path: '/crypto',
        name: 'crypto',
        component: CryptoView
    },
    {
        path: '/:action/:cryptoCode',
        name: 'action',
        component: ActionView
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router