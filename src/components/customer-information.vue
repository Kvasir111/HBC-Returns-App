<template>
	<div class="p-2" id="customerInformation">
		<div class="text-center">
			<input
					autocomplete="no"
					class="form-input m-2"
					placeholder="First Name"
					required
					type="text"
					v-model="firstName"
			>
			<input
					autocomplete="no"
					class="form-input m-2"
					placeholder="Last Name"
					required
					type="text"
					v-model="lastName"
			>
			<input
					class="form-input m-2"
					min="0"
					placeholder="Account Number"
					type="number"
					v-model="account"
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
					v-model="phone"
			>
			<input
					class="form-input m-2"
					placeholder="Service Address"
					required
					type="text"
					v-model="address"
			>
			<input
			class="form-input m-2"
			placeholder="Customer Email"
			required
			type="email"
			v-model="email"
			>
		</div>
	</div>
</template>

<script>
	export default {
		name: "customer-information",

		data(){
			return{
				firstName: "",
				lastName: "",
				address: "",
				phone: "",
				account: "",
				email: "",

			}
		},
		methods:{

		}
	}
</script>

<style scoped>

</style>