Vue.component("managerAddVehicle", { 
	data: function () {
	    return {
			signedInUser: {
				id: -1,
				username: '',
				password: '',
				firstName: '',
				lastName: '',
				birthday: '',
				gender: '',
				role: 'CUSTOMER',
				rentACarObject: {
					id: -1,
					name: '',
					workingHours: '',
					location: {
						address: {
							city: '',
							country: ''
						}
					},
					open: '',
					logoURL: '',
					rating: 0
				},
				isDeleted: false,
				vehicles: []
			},
			
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
			valid: true
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li v-on:click="profile" style="float:right"><a>Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
    <li v-on:click="goBack" v-if="signedInUser.rentACarObject.id != -1" style="float:left"><a>My object</a></li>
    <li v-on:click="orders" style="float:left" v-if="signedInUser.rentACarObject.id != -1"><a>Orders</a></li>
  </ul>
  
  <h4 class="headingCenter">Add vehicle</h4> 
			
  <table class="center">
    <tr>
      <td><label class="signUpLabel">Brand:</label></td>
      <td><input type="text" v-model="vehicle.brand" class="signUpInput"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Model:</label></td> 
      <td><input type="text" v-model="vehicle.model" class="signUpInput"/></td>
     </tr>
     <tr>
      <td><label class="signUpLabel">Price:</label></td>
      <td><input type="number" v-model="vehicle.price" min="1" class="signUpInput"/></td>
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
      <td><input type="number" v-model="vehicle.fuelConsumption" min="1" class="signUpInput"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">No. doors:</label></td>
      <td><input type="number" v-model="vehicle.doors" min="1" class="signUpInput"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">No. passengers:</label></td>
      <td><input type="number" v-model="vehicle.numberOfPassengers" min="1" class="signUpInput"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Description:</label></td>
      <td><input type="text" v-model="vehicle.description" class="signUpInput"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Photo URL:</label></td>
      <td><input type="text" v-model="vehicle.photoURL" class="signUpInput"/></td>
    </tr>
    
    <tr>
    	<td><button class="button" v-on:click="goBack">Back</button></td>
		<td><button v-on:click="addVehicle" class="button" value="Add">Add</button></td>
    </tr>
  </table>
	<table class="center">
		<tr><td><label v-if="!valid" class="labelError">You didn't fill the form correctly!</label></td></tr>
	</table>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => (this.signedInUser = response.data));
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
    	profile : function() {
			router.push('/manager/userProfile/');
    	},
    	addVehicle: function() {
			this.vehicle.rentACarObjectId = this.signedInUser.rentACarObject.id;
			this.validate();
			if (this.valid) {
				axios.post("rest/vehicles/create", this.vehicle).then(response => (this.goBack()));
			}
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
		orders: function() {
			router.push('/manager/orders/');	
		}
    }
});