<template>
	<div class="mt-2">
		<form-header v-bind:card-subtitle="subtitle" v-bind:card-title="title"></form-header>
		<form class="card" @submit.prevent="exportPDF" id="informationInputForm">
			<div class="text-center lg:block" id="customerInformation">
				<div id="topCustomerRow">
					<input class="customerInformationInput" id="firstName" placeholder="First Name" type="text" v-model="firstName">
					<input class="customerInformationInput" id="lastName" placeholder="Last Name" type="text" v-model="lastName">
					<input class="customerInformationInput" id="accountNumber" min="0" placeholder="Account #"
					       type="number" v-model="account">
				</div>
				<div id="bottomCustomerRow">
					<input class="customerInformationInput" id="phoneNumber" placeholder="Phone #" type="tel" v-model="phone">
					<input class="customerInformationInput" id="serviceAddress" placeholder="Service Address"
					       type="text" v-model="address">
					<input class="customerInformationInput" id="email" placeholder="Email" type="email" v-model="email">
				</div>
			</div>
			<div class="text-center block" id="equipmentInformation">
				<table class="mx-auto max-w-full md:text-center px-4">
					<tr class="lg:invisible border-b-2 lg:border-transparent">
						<td>Equipment Type</td>
						<td>CMAC/SN</td>
						<td>Accessories</td>
					</tr>
					<tbody class="">
					<tr class="" v-for="(row, index) in rows">
						<td class=""><select class="border-b-2 border-blue-500 px-2 py-2 m-2 focus:outline-none"
						                     id="equipmentType"
						                     required v-model="rows[index].device">
							<option disabled selected>Select a device type</option>
							<option :key="index" v-for="(equipmentType,index) in equipmentTypes">
								{{ equipmentType.text }}
							</option>
						</select></td>
						<td class=""><input autocomplete="off"
						                    class="border-b-2 border-blue-500 m-2 p-2 focus:outline-none inline"
						                    id="CMAC/SN input" placeholder="CMAC/SN" type="text"
						                    v-model="rows[index].equipmentNum"></td>
						<td class="block m-2 p-2 align-text-bottom">
							<label for="powerCord">Power Cord</label>
							<input class="form-checkbox m-2 " id="powerCord" type="checkbox"
							       v-model="rows[index].powerCord">
							<label for="remote">Remote</label>
							<input class="form-checkbox m-2" id="remote" type="checkbox"
							       v-model="rows[index].remote">
						</td>
						<td class="">
							<input class="removeEquipmentButton "
							       style="cursor: pointer"
							       type="button"
							       v-on:click="removeElement(index)"
							       value="X">
						</td>
					</tr>
					</tbody>
				</table>
				<div>
					<button class="addEquipmentButton"
					        v-on:click.prevent="addRow">Add +
					</button>
				</div>
			</div>
			<div id="returnInformation">
				<div>
					<div class="text-center" id="return-information">
						<select class="border-b-2 border-blue-500 p-2 focus:outline-none" id="returnType" required
						        v-model="returnType">
							<option disabled selected>Select Reason</option>
							<option :key="index" v-bind:value="returnOption.value"
							        v-for="(returnOption,index) in returnOptions">
								{{ returnOption.text }}
							</option>
						</select>
					</div>
					<div class="text-center" id="notes">
						<textarea class="mx-auto border-2 border-blue-500 text-center  p-2 m-4 max-w-full" cols="50"
						          id="explanation" required
						          rows="4"
						          v-bind:placeholder="returnType"></textarea>
					</div>
					<input class="submitButton hover:cursor-pointer" type="submit" value="Submit">
				</div>
			</div>
		</form>
	</div>
</template>

<script>
    import FormHeader from "./formHeader";
    import jspdf from 'jspdf';

    export default {
        name: "informationInput",
        components: {FormHeader},
        data: function () {
            return {
                //data for page
                title: "Information Input",
                subtitle: "Please enter information for return",
                //data for customer information
                firstName: "",
                lastName: "",
                address: "",
                phone: "",
                account: "",
                email: "",
                //data for return reasons
                returnType: 'Select Reason',
                returnOptions: [
                    {text: 'Exchange/Defective Equipment', value: 'Enter CMAC/SN of device being exchanged'},
                    {text: 'Cancelling Service', value: 'Enter Reason'},
                    {text: 'Moving', value: 'Enter Forwarding Address'},
                    {text: 'Other', value: 'Enter Notes'}
                ],
                //data for equipment
                equipmentType: "Select a Device Type",
                equipmentTypes: [
                    {text: "Modem/Router", value: "Modem/Router"},
                    {text: "DTA", value: "DTA"},
                    {text: "Gateway", value: "Gateway"},
                    {text: "DVR/STB", value: "DVT/STB"}
                ],
                rows: [
                    {device: ""},
                    {powerCord: ""},
                    {remote: ""},
                    {equipmentNum: "",}
                ],
                equipmentItem: [],
                //data for headings
                image: "https://www.hbci.com/wp-content/uploads/footer-logo.png",
	            altImage: "https://bloximages.chicago2.vip.townnews.com/winonadailynews.com/content/tncms/assets/v3/editorial/4/44/4444c7a3-8473-5f32-be6e-c72a804dc6ee/59d7d6ed20146.image.jpg",
                logoAlt: "Hiawatha Broadband Communications",
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
            //removes a row from equipment table
            removeElement(index) {
                this.rows.splice(index, 1);
            },
            exportPDF() {
                let customerInfo = this.buildCustomerString();
                let equipmentInfo = this.buildEquipmentString();
                let returnInfo = this.buildReturnString();
                let date = this.buildDateTimeStamp();

                let compiledString = customerInfo + "\n" + equipmentInfo + "\n" + returnInfo + "\n" + date;

                let doc = new jspdf({
	                orientation : "p",
	                unit: "in",
	                format: "a4"
                });

                doc.text(compiledString, 1, 1);
                doc.save(this.firstName + "_" + this.lastName + "_return.pdf");
            },
            buildCustomerString() {
                let customerString = [
                    "Name: " + this.firstName + " " + this.lastName + "\n"
                    + "Service Address: " + this.address + "\n"
                    + "Account: " + this.account + "\n"
                    + "Contact Number : " + this.phone + "\n"
                    + "Email: " + this.email + "\n"
                ];
                return customerString;
            },
            buildEquipmentString() {
                let str = "";
                for (let i = 0; i < this.rows.length; i++) {
                    str += "Device: " + this.rows[i].device;
                    str += "\n";
                    str += "CMAC/SN: " + this.rows[i].equipmentNum;
                    str += "\n";
                    str += "Accessories: ";
                    if (this.rows[i].remote) {
                        str += "Remote Included ";
                    }
                    if (this.rows[i].powerCord) {
                        str += "Power Cord included";
                    }
                    str += "\n";
                }
                return str;
            },
            buildReturnString() {
                let returnReasonString = "";
                let temp = document.getElementById("returnType");
                temp = temp.options[temp.selectedIndex].text;
                returnReasonString += "Reason for Return: " + temp;
                returnReasonString += "\n";
                returnReasonString += "Notes: " + document.getElementById("explanation").value;
                return returnReasonString;
            },
            buildDateTimeStamp() {
                let date = new Date();
                let myDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
                return myDate;
            },
        }
    }
</script>

<style scoped>

</style>