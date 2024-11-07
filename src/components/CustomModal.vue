<template>
    <div v-if="isVisible" class="modal">
        <div class="modal-content">
            <div class="exit" @click="onExit">
                <span>X</span>
            </div>
            <p> {{ message }} </p>
            <div class="modal-actions">
                <button :class="{ disableButtons: disableButtons }" @click="onConfirm"> {{ confirmText }}</button>
                <button :class="{ disableButtons: disableButtons } || disableCancel" @click="onCancel"> {{ cancelText }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isVisible: { type: Boolean, default: false },
            message: { type: String, required: true },
            confirmText: { type: String, default: "Confirmar" },
            cancelText: { type: String, default: "Cancelar" },
            disableCancel: { type: Boolean, default: false },
            disableButtons: { type: Boolean, default: false } 
        },
        emits: ["confirm", "cancel", "exit"],
        methods: {
            onConfirm() {
                this.$emit("confirm", "purchase");
            },
            onCancel() {
                this.$emit("cancel", "sale");
            },
            onExit() {
                this.$emit("exit");
            }
        }
        
    }
</script>

<style scoped>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modal-content {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        width: 300px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;

    }
    .modal-actions {
        margin-top: 10px;
        display: flex;
        gap: 20px;
        justify-content: center;
    }
    .modal-content input {
        margin-bottom: 10px;
        padding: 8px;
        width: 70%;
        border-radius: 10px;
        border: 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .exit {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
</style>