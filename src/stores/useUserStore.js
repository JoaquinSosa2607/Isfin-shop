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
        },
        purchaseItem(price) {
            if(this.money > 0) {
                this.money = this.money - price;
            } else {
                return
            }
        }
    }
})