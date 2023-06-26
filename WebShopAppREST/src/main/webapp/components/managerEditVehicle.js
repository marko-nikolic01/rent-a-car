Vue.component("managerEditVehicle", { 
	data: function () {
	    return {			
			vehicle: {
				id: -1,
				brand: '',
				model: '',
				price: 1,
				type: 'CAR',
				transmission: 'MANUAL',
				fuel: 'PETROL',
				fuelConsumption: 1,
				doors: 1,
				numberOfPassengers: 1,
				description: '',
				photoURL: '',
				status: 'AVAILABLE',
				rentACarObjectId: -1,
				isDeleted: false
			},
			vehicleCopy: {
				id: -1,
				brand: '',
				model: '',
				price: 1,
				type: 'CAR',
				transmission: 'MANUAL',
				fuel: 'PETROL',
				fuelConsumption: 1,
				doors: 1,
				numberOfPassengers: 1,
				description: '',
				photoURL: '',
				status: 'AVAILABLE',
				rentACarObjectId: -1,
				isDeleted: false
			},
			valid: true,
			same: false
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li style="float:right"><a>Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
    <li style="float:left"><a class="selectedTab">My object</a></li>
  </ul>
  
  <h4 class="headingCenter">Add vehicle</h4> 
			
  <table class="center">
    <tr>
      <td><label class="signUpLabel">Brand:</label></td>
      <td><input type="text" v-model="vehicle.brand"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Model:</label></td> 
      <td><input type="text" v-model="vehicle.model"/></td>
     </tr>
     <tr>
      <td><label class="signUpLabel">Price:</label></td>
      <td><input type="number" v-model="vehicle.price" min="1"/></td>
    </tr>
    <tr>
      <td><label class="signUpLabel">Type:</label></td>
	  <td>
		<input v-model="vehicle.type" type="radio" id="car" name="type" value="CAR"/>Car
		<input v-model="vehicle.type" type="radio" id="van" name="type" value="VAN"/>Van
		<input v-model="vehicle.type" type="radio" id="mobile_home" name="type" value="MOBILE_HOME"/>Mobile home
	  </td>
    </tr>
    <tr>
      <td><label class="signUpLabel">Transmission:</label></td>
	  <td>
		<input v-model="vehicle.transmission" type="radio" id="manual" name="transmission" value="MANUAL"/>Manual
		<input v-model="vehicle.transmission" type="radio" id="automatic" name="transmission" value="AUTOMATIC"/>Automatic
	  </td>
    </tr>
    <tr>
      <td><label class="signUpLabel">Fuel:</label></td>
	  <td>
		<input v-model="vehicle.fuel" type="radio" id="petrol" name="fuel" value="PETROL"/>Petrol
		<input v-model="vehicle.fuel" type="radio" id="diesel" name="fuel" value="DIESEL"/>Diesel
		<input v-model="vehicle.fuel" type="radio" id="hybrid" name="fuel" value="HYBRID"/>Hybrid
		<input v-model="vehicle.fuel" type="radio" id="electric" name="fuel" value="ELECTRIC"/>Electric
	  </td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Fuel consumption:</label></td>
      <td><input type="number" v-model="vehicle.fuelConsumption" min="1"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">No. doors:</label></td>
      <td><input type="number" v-model="vehicle.doors" min="1"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">No. passengers:</label></td>
      <td><input type="number" v-model="vehicle.numberOfPassengers" min="1"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Description:</label></td>
      <td><input type="text" v-model="vehicle.description"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Photo URL:</label></td>
      <td><input type="text" v-model="vehicle.photoURL"/></td>
    </tr>
    
    <tr>
    	<td><button class="button" v-on:click="goBack">Back</button></td>
		<td><input v-on:click="applyChanges" type="submit" class="button" value="Apply"/></td>
    </tr>
  </table>
	<table class="center">
		<tr><td><label v-if="!valid" class="labelError">You didn't fill the form correctly!</label></td></tr>
	</table>
	<table class="center">
		<tr><td><label v-if="same" class="labelError">You didn't change anything!</label></td></tr>
	</table>
</div>
	    `,
    mounted () {
		axios.get("rest/vehicles/" + this.$route.params.id).then(response => { this.vehicle = response.data;
		this.vehicleCopy = structuredClone(this.vehicle)});
    },
    methods: {
    	signOut : function() {
			router.push('/');
    	},
    	goBack : function() {
			router.push('/manager/myObject/');
    	},
    	home : function() {
			router.push('/manager/home/');
    	},
    	checkIfSame: function() {
			if (this.vehicle.brand == this.vehicleCopy.brand &&
				this.vehicle.model == this.vehicleCopy.model &&
				this.vehicle.price == this.vehicleCopy.price &&
				this.vehicle.type == this.vehicleCopy.type &&
				this.vehicle.transmission == this.vehicleCopy.transmission &&
				this.vehicle.fuel == this.vehicleCopy.fuel &&
				this.vehicle.fuelConsumption == this.vehicleCopy.fuelConsumption &&
				this.vehicle.doors == this.vehicleCopy.doors &&
				this.vehicle.numberOfPassengers == this.vehicleCopy.numberOfPassengers &&
				this.vehicle.description == this.vehicleCopy.description &&
				this.vehicle.photoURL == this.vehicleCopy.photoURL) {
					this.same = true;
					return;
				}
				this.same = false;
		},
		validate: function() {
			if (this.vehicle.brand === '' ||
				this.vehicle.model === '' ||
				this.vehicle.price < 1 ||
				this.vehicle.fuelConsumption < 1 ||
				this.vehicle.doors < 1 ||
				this.vehicle.numberOfPassengers < 1 ||
				this.vehicle.photoURL === '') {
					this.valid = false;
					return;
				}
				this.valid = true;
		},
		applyChanges: function() {
			this.validate();
			this.checkIfSame();
			if (this.valid && !this.same) {
				axios.put("rest/vehicles/update", this.vehicle).then(response => (this.goBack()));
			}
		}
    }
});