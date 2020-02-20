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

</style>
