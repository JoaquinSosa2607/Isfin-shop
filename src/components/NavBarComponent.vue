<template>
    <nav class="main-nav">
        <router-link :to="{ name: 'shop' }"> <button> Tienda </button></router-link>
        <router-link :to="{ name: `${this.name}` }"> <button> {{ displayName }} </button></router-link>
    </nav>
</template>

<script>
    export default {
        props: { name: { type: String, required: true } },
        computed: {
            displayName() {
                if(this.name === 'profile') return "Perfil"
                if(this.name === 'crypto') return "Criptos"
            }
        }
    }
</script>

<style scoped>
    .main-nav {
        display: flex;
        flex-direction: row;
        gap: 20px;
        margin: 20px;
    }
</style>