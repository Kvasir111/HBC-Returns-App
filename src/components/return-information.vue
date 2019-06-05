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
		<input class="mx-auto newInput hover:bg-blue-300" type="submit" value="Submit">
	</div>
		<div id="notes" class="mx-auto">
			<textarea v-if="returnType === 'Exchange/Defective Equipment'" placeholder="Enter CMAC/SN of Returned Equipment" rows="4" cols="50" class="mx-auto bg-gray-200 text-center"></textarea>
			<textarea v-if="returnType === 'Cancelling Service'" placeholder="Enter Reason and Forwarding Address" rows="4" cols="50" class="mx-auto bg-gray-200 text-center"></textarea>
			<textarea v-if="returnType === 'Moving'" placeholder="Enter new Address" rows="4" cols="50" class="mx-auto bg-gray-200 text-center"></textarea>
			<textarea v-if="returnType === 'Other'" placeholder="Enter notes" rows="4" cols="50" class="mx-auto bg-gray-200 text-center"></textarea>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				returnType: 'Select Reason',
				returnOptions: [
					{text: 'Exchange/Defective Equipment', value: 'Exchange/Defective Equipment'},
					{text: 'Cancelling Service', value: 'Cancelling Service'},
					{text: 'Moving', value: 'Moving'},
					{text: 'Other', value: 'Other'}
				],
			}

		}
	}
</script>

<style scoped>

</style>