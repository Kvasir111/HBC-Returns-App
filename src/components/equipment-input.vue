<template>
	<div class="text-center">
		<table>
				<tr>
					<td>Equipment Type</td>
					<td>CMAC/SN</td>
					<td>Accessories</td>
				</tr>
			<tbody>
			<tr v-for="(row, index) in rows">
				<td><select class="form-select bg-gray-200 m-2" id="equipmentType" v-model="equipmentType">
					<option disabled selected>Select a device type</option>
					<option :key="index" v-bind:value="equipmentType.value" v-for="(equipmentType,index) in equipmentTypes">
						{{ equipmentType.text }}
					</option>
				</select></td>
				<td><input class="form-input inline" id="CMAC/SN input" placeholder="CMAC/SN" type="text"
				           v-bind:equipmentNumber.value="equipmentNum" v-model="equipmentNum"></td>
				<td>
					<input class="p-2 m-2 form-checkbox" value="Power Cord" type="checkbox"
				           v-model="powerCord">Power Cord?
					<input class="p-2 m-2 form-checkbox" value="Remote" type="checkbox"
					       v-model="remote">Remote?
				</td>
				<td><a class="block mx-auto px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-300 hover:font-bold"
				       style="cursor: pointer" v-on:click="removeElement(index)">Remove</a></td>

			</tr>
			</tbody>
		</table>
		<div>
			<button class="block mx-auto px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-300 hover:font-bold"
			        v-on:click.prevent="addRow">Add More Equipment +
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		data: function () {
			return {
				equipmentType: "Select a Device Type",
				equipmentTypes: [
					{text: "Modem/Router", value: "Modem/Router"},
					{text: "DTA", value: "DTA"},
					{text: "Gateway", value: "Gateway"},
					{text: "DVR/STB", value: "DVT/STB"}
				],
				equipmentNum: '',
				powerCord: '',
				remote: '',
				
				rows: [],
			}
		},
		methods: {
			addRow() {
				let elem = document.createElement('tr');
				this.rows.push({
					'Equipment Type': "",
					'CMAC/SN': "",
					'Accessories': ""
				});
			},
			removeElement(index) {
				this.rows.splice(index, 1);
			},

		}
	}
</script>

<style scoped>

</style>