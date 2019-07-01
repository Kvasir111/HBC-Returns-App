<template>
	<div>
		<form-header v-bind:card-title="title" v-bind:card-subtitle="subtitle"></form-header>
		<div id="customerInformation">
		<p id="name"></p>
		<p id="address"></p>
		<p id="accountNumber"></p>
		</div>
		<div id="equipmentInformation">
			<p id="equipmentP"></p>
		</div>
	</div>
</template>

<script>
    import FormHeader from "../components/formHeader";
    export default {
        name: "output.vue",
        components: {FormHeader},
	    data : function () {
            return {
                title: "Your HBC Receipt",
	            subtitle: "Thank you for your business!"
            }
            }
    }
</script>

<style scoped>

</style>