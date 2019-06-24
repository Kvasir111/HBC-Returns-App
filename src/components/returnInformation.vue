<template>
	<div>
	<div class="text-center" id="return-information">
		<label for="returnType">Select Reason for return</label>
		<select class="form-select m-2 bg-gray-200 text-black" id="returnType" v-model="returnType">
			<option disabled selected>Select Reason</option>
			<option :key="index" v-bind:value="returnOption.value" v-for="(returnOption,index) in returnOptions">
				{{ returnOption.text }}
			</option>
		</select>
	</div>
		<div id="notes" class="text-center">
			<textarea  rows="4" cols="50" v-bind:placeholder="returnType" class="mx-auto bg-gray-200 text-center"></textarea>
		</div>
		<input class="mx-auto newInput hover:bg-blue-300" type="submit" value="Submit">
	</div>
</template>

<script>
	export default {
		name: "returnInformation",
		data() {
			return {
				returnType: 'Select Reason',
				returnOptions: [
					{text: 'Exchange/Defective Equipment', value: 'Enter CMAC/SN of device being exchanged'},
					{text: 'Cancelling Service', value: 'Enter Reason'},
					{text: 'Moving', value: 'Enter Forwarding Address'},
					{text: 'Other', value: 'Enter Notes'}
				],
			}

		}
	}
</script>

<style scoped>

</style>