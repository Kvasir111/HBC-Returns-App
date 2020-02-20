<template>
    <svg xmlns="http://www.w3.org/2000/svg" v-bind:width="size" v-bind:height="size" viewBox="0 0 24 24" fill="none" v-bind:stroke="color" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
</template>

<script>
    export default {
        props: ['color', 'size',],
        name: "x_button"
    }
</script>

<style scoped>

</style>