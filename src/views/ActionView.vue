<template>
    <ActionComponent :action="action" :crypto_code="crypto"></ActionComponent>
</template>

<script>
import ActionComponent from '../components/ActionComponent.vue';

    export default {
        components: {
            ActionComponent
        },
        computed: {
        action() {
            return this.$route.params.action;
        },
        crypto() {
            return this.$route.params.cryptoCode;
        }
    }
    }
</script>