<template>
    <div v-if="isVisible" class="modal">
        <div class="modal-content">
            <p> {{ message }} {{ value }}</p>
            <p v-if="result">Resultado de la tirada: {{ result }}</p>
            <input v-if="showInput" v-model="inputValue" type="text" placeholder="Ingrese el texto..."/>
            <div class="modal-actions">
                <button :disabled="disableConfirm" @click="onConfirm"> {{ confirmText }}</button>
                <button @click="onCancel"> {{ cancelText }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isVisible: { type: Boolean, default: false },
            message: { type: String, required: true },
            value: { type: String },
            confirmText: { type: String, default: "Confirmar" },
            cancelText: { type: String, default: "Cancelar" },
            showInput: { type: Boolean, default: false },
            result: { type: Number, default: null },
            disableConfirm: { type: Boolean, default: false }
        },
        data() {
            return {
                inputValue: null
            }
        },
        emits: ["confirm", "cancel"],
        methods: {
            onConfirm() {
                this.$emit("confirm", this.inputValue);
            },
            onCancel() {
                this.$emit("cancel");
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
</style>