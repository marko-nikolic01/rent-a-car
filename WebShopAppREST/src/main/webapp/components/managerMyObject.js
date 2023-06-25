Vue.component("managerMyObject", { 
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
  
  <h4 class="headingCenter">Rent-A-Car object info</h4> 
			
  <table class="center">
    <tr>
      <td><label class="signUpLabel">Name:</label></td>
      <td><label>{{signedInUser.rentACarObject.name}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Working hours:</label></td>
      <td><label>{{signedInUser.rentACarObject.workingHours.startTime}} - {{signedInUser.rentACarObject.workingHours.endTime}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Status:</label></td>
      <td><label>{{signedInUser.rentACarObject.working}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Location:</label></td>
      <td><label>{{signedInUser.rentACarObject.location.address.city}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Logo:</label></td>
      <td><img v-bind:src="signedInUser.rentACarObject.logoURL" height="100" class="containerImage"></img></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Rating:</label></td>
      <td><label>{{signedInUser.rentACarObject.rating}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Vehicles:</label></td>
      <td><button class="button" v-on:click="addVehicle">Add vehicle</button></td>
    </tr>
  </table>
  
  <div v-for="vehicle in signedInUser.rentACarObject.vehicles" class='container' style="height: 220px; margin-left: 20%; margin-right: 20%">
  	<img v-bind:src="vehicle.photoURL" height="200" class="containerImage">
	<label class='containerLabel'>Name: {{vehicle.brand}} {{vehicle.model}}</label></br>
	<label class='containerLabel'>Price: {{vehicle.price}}</label></br>
	<label class='containerLabel'>Type: {{vehicle.type}}</label></br>
	<label class='containerLabel'>Fuel: {{vehicle.fuel}} ({{vehicle.fuelConsumption}} l/100km)</label></br>
	<label class='containerLabel'>No. passengers: {{vehicle.doors}}</label></br>
	<label class='containerLabel'>Description: {{vehicle.description}}</label></br>
	<label class='containerLabel'>Status: {{vehicle.status}}</label></br>
	<button class="button" v-on:click="deleteVehicle(vehicle)">Delete</button>
	<button class="button">Edit</button>
	</div>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => (this.signedInUser = response.data));
    },
    methods: {
    	editProfile : function() {
			router.push("/manager/editProfile/");
    	},
    	signOut : function() {
			router.push('/');
    	},
    	myObject : function() {
			router.push('/manager/myObject/');
    	},
    	home : function() {
			router.push('/manager/home/');
    	},
    	addVehicle : function() {
			router.push('/manager/addVehicle/');
		},
		deleteVehicle: function(vehicle) {
			let id = vehicle.id;
			axios.delete("rest/vehicles/delete/" + id);
		}
    }
});