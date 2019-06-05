<template>
	<div class="p-2" id="customerInformation">
		<div class="text-center">
			<input
					autocomplete="no"
					class="form-input m-2"
					placeholder="First Name"
					required
					type="text"
					v-bind:aria-valuemax="firstName"
					v-model="firstName"
			>
			<input
					autocomplete="no"
					class="form-input m-2"
					placeholder="Last Name"
					required
					type="text"
					v-bind:aria-valuemax="lastName"
					v-model="lastName"
			>
			<input
					class="form-input m-2"
					min="0"
					placeholder="Account Number"
					type="number"
					v-bind:aria-valuemax="customerAccount"
					v-model="customerAccount"
			>
		</div>
		<div class="text-center">
			<input
					class="form-input m-2"
					maxlength="11"
					minlength="10"
					placeholder="Phone number"
					required
					type="tel"
					v-bind:aria-valuemax="customerPhoneNumber"
					v-model="customerPhoneNumber"
			>
			<input
					class="form-input m-2"
					placeholder="Service Address"
					required
					type="text"
					v-bind:aria-valuemax="customerAddress"
					v-model="customerAddress"
			>
			<input
			class="form-input m-2"
			placeholder="Customer Email"
			required
			type="email"
			v-bind:aria-valuemax="email"
			v-model="email">
		</div>
	</div>
</template>

<script>
	export default {
		name: "customer-information",

		data(){
			return{

			}
		},
		methods:{

		}
	}
</script>

<style scoped>

</style>