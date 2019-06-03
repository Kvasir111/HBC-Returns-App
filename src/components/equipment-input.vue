<template>
	<div class="text-center">
		<label for="equipmentDropdown" invisible></label>
		<select class="form-multiselect bg-gray-200 m-2" id="equipmentDropdown" v-bind:aria-valuemax="equipmentType"
		        v-model="equipmentType">
			<option class="" disabled selected>Select Equipment Type</option>
			<option value="DVR/Set-Top Box">DVR/Set-Top Box</option>
			<option value="Gateway/Modem">Gateway/Modem</option>
			<option value="Wireless Router">Wireless Router</option>
			<option value="DTA">DTA</option>
		</select>
		<input class="form-input inline" placeholder="CMAC/SN" type="text" v-bind:aria-valuemax="equipmentNum"
		       v-model="equipmentNum" id="CMAC/SN input">
		<input class="p-2 m-2 form-checkbox" false-value="" true-value="Power Cord" type="checkbox"
		       v-bind:aria-valuemax="powerCord"
		       v-model="powerCord">Power Cord?
		<input class="p-2 m-2 form-checkbox" false-value="" true-value="Remote" type="checkbox" v-bind:aria-valuemax="remote"
		       v-model="remote">Remote?
	</div>
</template>

<script>
	export default {
		name: "equipment-input",
		data(){
			return{
				equipmentType: null,
				equipmentNum: null,
				powerCord: null,
				remote: null,
			}
		}
	}
</script>

<style scoped>

</style>