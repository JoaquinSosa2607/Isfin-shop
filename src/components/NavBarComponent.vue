<template>
    <nav class="main-nav">
        <router-link :to="{ name: 'shop' }"> <button> Tienda </button></router-link>
        <router-link :to="{ name: 'shop' }"> <button> Perfil </button></router-link>
    </nav>
</template>

<style scoped>
    .main-nav {
        display: flex;
        flex-direction: row;
        gap: 20px;
        margin: 20px;
    }
</style>