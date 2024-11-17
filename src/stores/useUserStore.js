import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        name: localStorage.getItem('userName') || "",
        money: 1000
    }),
    actions: {
        setUser(name) {
            this.name = name;
            localStorage.setItem('userName', name);
        }
    }
})