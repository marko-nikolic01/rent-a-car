Vue.component("managerAddVehicle", { 
	data: function () {
	    return {
			vehicle: {
				brand: '',
				model: '',
				price: 0,
				type: 'CAR',
				transmission: 'MANUAL',
				fuel: 'PETROL',
				fuelConsumption: 0,
				doors: 0,
				numberOfPassengers: 0,
				description: '',
				photoURL: ''
			}
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
      <td><input type="number" v-model="vehicle.price"/></td>
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
	  </td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Fuel consumption:</label></td>
      <td><input type="number" v-model="vehicle.fuelConsumption"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">No. doors:</label></td>
      <td><input type="number" v-model="vehicle.doors"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">No. passengers:</label></td>
      <td><input type="number" v-model="vehicle.numberOfPassengers"/></td>
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
		<td><input v-on:click="addVehicle" type="submit" class="button" value="Add"/></td>
    </tr>
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
    	addVehicle: function() {
			console.log("dodato");
		}
    }
});