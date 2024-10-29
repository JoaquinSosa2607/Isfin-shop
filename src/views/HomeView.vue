<template>
        <div class="home-container">
        <form @submit.prevent="saveUserName">
            <label for="username">Ingresa tu nombre:</label>
            <input
                type="text"
                id="username"
                v-model="userName"
                placeholder="Tu nombre"
                required
            />
            <button type="submit">Guardar</button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "../stores/useUserStore";
import { useRouter } from "vue-router";

export default {
    data() {
        const userStore = useUserStore();
        const userName = ref("");
        const router = useRouter();

        const saveUserName = () => {
            userStore.setUser(userName.value);
            router.push({ name: 'shop' });
        };

        return { userName, saveUserName };
    },
    methods: {}
};
</script>

<style scoped>
.home-container {
    background-color: rgba(255, 255, 255, 0.651);
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: center;
    justify-self: center;
    border-radius: 25px;
    padding: 20px;
    min-height: 100%;
    position: relative;
    margin-top: 20px;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

input[type="text"] {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
</style>
