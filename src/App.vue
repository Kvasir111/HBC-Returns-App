<template>
	<div id="app">
		<img v-bind:src="image" v-bind:alt="logoAlt">
		<form id="information input" @submit.prevent="exportPDF" class="mx-auto" v-model="shit">
			<div id="customerInformation" class="mx-auto">
			<input type="text" v-model="customerName" placeholder="Customer Name">
				<input type="number" v-model="customerAccount" placeholder="Account Number">
				<input type="tel" v-model="customerPhoneNumber" placeholder="Phone number">
				<input type="text" v-model="customerAddress" placeholder="Service Address">
			</div>
			<div id="equipment-type">
				<select v-model="equipmentType" class="p-2 m-2">
					<option disabled >Select Equipment Type</option>
					<option value="DVR/Set-Top Box">DVR/Set-Top Box</option>
					<option value="Gateway/Modem">Gateway/Modem</option>
					<option value="Wireless Router">Wireless Router</option>
					<option value="DTA">DTA</option>
				</select>
				<input class="p-2 m-2" v-model="equipmentNum" type="text" placeholder="CMAC/SN">
				<input class="p-2 m-2" type="checkbox" v-model="powerCord" true-value="Power Cord" false-value="">Power Cord?
				<input class="p-2 m-2" type="checkbox" v-model="remote" true-value="Remote" false-value="">Remote?
			</div>
			<div id="return-information">
				<input name="equipment" type="radio" id="Swap" value="Swap" v-model="returnType">
				<label for="Swap">Swapping Equipment</label>
				<br>
				<input name="equipment" type="radio" id="Cancelling" value="Cancelling" v-model="returnType">
				<label for="Cancelling">Cancelling Service</label>
				<br>
				<input name="equipment" type="radio" id="Moving" value="Moving" v-model="returnType">
				<label for="Moving">Moving</label>
				<br>
			</div>
			<div id="notes">
				<span>Notes</span>
				<br>
				<textarea v-model="notes" placeholder="Enter notes here"></textarea>
			</div>
			<input type="submit" value="Submit">
		</form>
	</div>
</template>

<script>
	import jspdf from 'jspdf'
	export default {
		component:{
		},
		data() {
			return {
				customerName: null,
				customerPhoneNumber: null,
				customerAddress: null,
				customerAccount: null,

				equipmentType: null,
				equipmentNum: null,
				powerCord: null,
				remote: null,
				
				returnType: null,
				
				notes: null,
				
				shit: null,
				image: "https://bloximages.chicago2.vip.townnews.com/winonadailynews.com/content/tncms/assets/v3/editorial/4/44/4444c7a3-8473-5f32-be6e-c72a804dc6ee/59d7d6ed20146.image.jpg",
				logoAlt: "Hiwatha Broadband Communications"
			}
		},
		methods:{
			collateData(){
				return data;
			},
			exportPDF(){
				let name = this.customerName;
				let phone = this.customerPhoneNumber;
				let address = this.customerAddress;
				let account = this.customerAccount;
				let returnType = this.returnType;
				let notes = this.notes;
				let data = [customerName, phone, address, account, returnType, notes];
			let doc = new jspdf({
				orientation: 'p',
				unit:        'in',
				format:      'a4'
				
			});
			console.log(data)
			//doc.text(data, 2, 2);
			//doc.save("return.pdf")
			
			},

		}
	}
</script>
<style>

</style>
