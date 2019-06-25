<template>
	<div class id="app">
		<img class="mx-auto" v-bind:alt="logoAlt" v-bind:src="image" width="200px">
		<h1 class="text-center text-2xl font-bold text-white p-2">Enter Information for Equipment Return</h1>
		<InformationInput></InformationInput>
	</div>
</template>

<script>
	import InformationInput from "./components/informationInput"
	export default {
		components: {InformationInput},
		data : function () {
			return{
				image: "https://www.hbci.com/wp-content/uploads/footer-logo.png",
				logoAlt: "Hiawatha Broadband Communications",
			}

		}
	}

</script>
<style>
	body {
		background-color: #4a5568;
	}

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
