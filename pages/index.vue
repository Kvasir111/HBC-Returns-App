<template>
	<div id="app">
	<img class="mx-auto mb-2" v-bind:alt="logoAlt" v-bind:src="image" width="200px">
    <information-input></information-input>
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
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
