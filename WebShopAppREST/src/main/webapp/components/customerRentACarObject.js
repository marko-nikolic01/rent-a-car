Vue.component("customerRentACarObject", { 
	data: function () {
	    return {
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
					rating: 0,
					vehicles: []
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
    <li v-on:click="orders" style="float:left"><a>Orders</a></li>
  </ul>
  
  <h4 class="headingCenter">Rent-A-Car object info</h4> 
			
  <table class="center">
    <tr>
      <td><label class="signUpLabel">Name:</label></td>
      <td><label>{{rentACarObject.name}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Working hours:</label></td>
      <td><label>{{rentACarObject.workingHours.startTime}} - {{signedInUser.rentACarObject.workingHours.endTime}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Status:</label></td>
      <td><label>{{rentACarObject.working}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Location:</label></td>
      <td><label>{{rentACarObject.location.address.city}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Logo:</label></td>
      <td><img v-bind:src="rentACarObject.logoURL" height="100" class="containerImage"></img></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Rating:</label></td>
      <td><label>{{rentACarObject.rating}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Vehicles:</label></td>
      <td><label class="signUpLabel"></label></td>
    </tr>
  </table>
  
  <div v-for="vehicle in rentACarObject.vehicles" class='container' style="height: 220px; margin-left: 20%; margin-right: 20%">
  	<img v-bind:src="vehicle.photoURL" height="200" class="containerImage">
	<label class='containerLabel'>Name: {{vehicle.brand}} {{vehicle.model}}</label></br>
	<label class='containerLabel'>Price: {{vehicle.price}}</label></br>
	<label class='containerLabel'>Type: {{vehicle.type}}</label></br>
	<label class='containerLabel'>Fuel: {{vehicle.fuel}} ({{vehicle.fuelConsumption}} l/100km)</label></br>
	<label class='containerLabel'>No. passengers: {{vehicle.doors}}</label></br>
	<label class='containerLabel'>Description: {{vehicle.description}}</label></br>
	<label class='containerLabel'>Status: {{vehicle.status}}</label></br>
	</div>
</div>
	    `,
    mounted () {
        axios.get("rest/rentACarObjects/" + this.$route.param.id).then(response => {
			this.rentACarObject = response.data;
		});
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
			axios.delete("rest/vehicles/delete/" + vehicle.id).then(router.go());
		},
		editVehicle: function(vehicle) {
			router.push('/manager/editVehicle/' + vehicle.id);
		},
		orders: function() {
			router.push('/manager/orders/');	
		}
    }
});