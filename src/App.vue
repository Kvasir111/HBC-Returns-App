<template>
	<div class id="app">
		<img class="mx-auto mb-2" v-bind:alt="logoAlt" v-bind:src="image" width="200px">
		<div class="text-left text-black  p-4 bg-gray-300 w-2/3 mx-auto">
		<h1 class="text-2xl font-bold">HBC Equipment Return</h1>
		<h2 class="font-bold text-gray-600">Enter Information below to complete form</h2>
		</div>
		<InformationInput></InformationInput>
	</div>
</template>

<script>
	import InformationInput from "./components/informationInput"
	import Vue from 'vue'
	import VueRouter from 'vue-router'
	import VueHead from 'vue-head'

	Vue.use(VueHead);
	Vue.use(VueRouter);
	export default {
		components: {InformationInput},
		data : function () {
			return{
				image: "https://www.hbci.com/wp-content/uploads/footer-logo.png",
				logoAlt: "Hiawatha Broadband Communications",
			}
		},
	}

</script>
<style>
	body {
		background-color: #00a0df;
	}

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
