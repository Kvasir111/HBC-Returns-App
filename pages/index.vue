<template>
	<div class="flex h-screen">
	<div  class="m-auto" id="app">
	<img class="mx-auto mb-2" v-bind:alt="logoAlt" v-bind:src="image" width="200px">
    <information-input class="w-10/12 md:w-2/3 mx-auto"></information-input>
	</div>
	</div>
</template>

<script>
	import InformationInput from "../components/informationInput";

	export default {
  components: {
    InformationInput,
  },
  data : function () {
	  return{
          image: "https://www.hbci.com/wp-content/uploads/footer-logo.png",
          logoAlt: "Hiawatha Broadband Communications",
	  }
  }
}
</script>

<style>
	html {
		background-color: #0075b6;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%231e2126'/%3E%3Cstop offset='1' stop-color='%232c4e6e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%230075b6' cx='12' cy='12' r='12'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
	}
</style>
