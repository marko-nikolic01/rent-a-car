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
    <li v-on:click="signOut" style="float:left"><a class="selectedTab">My object</a></li>
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
      <td><label class="signUpLabel">Rating:</label></td>
    </tr>
     <tr>
		<div v-for="vehicle in signedInUser.rentACarObject.vehicles" class='container'>
			<table>
				<tr>
					<td><img v-bind:src="vehicle.photoURL" width=100 heigth=100 class="containerImage"></td>
					<td>
						<table class="center">
							<tr>
								<td>Name:</td>
								<td>{{vehicle.brand}} {{vehicle.model}}</td>
							</tr>
							<tr>
								<td>Price:</td>
								<td>{{vehicle.price}}</td>
							</tr>
							<tr>
								<td>Type:</td>
								<td>{{vehicle.type}}</td>
							</tr>
							<tr>
								<td>Fuel:</td>
								<td>{{vehicle.fuel}} ({{vehicle.fuelConsumption}}</td>
							</tr>
							<tr>
								<td>No. doors:</td>
								<td>{{vehicle.doors}}</td>
							</tr>
							<tr>
								<td>No. passengers:</td>
								<td>{{vehicle.doors}}</td>
							</tr>
							<tr>
								<td>Description:</td>
								<td>{{vehicle.description}}</td>
							</tr>
							<tr>
								<td>Status:</td>
								<td>{{vehicle.status}}</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>			
		
			<img v-bind:src="object.logoURL" height="100" width="100" class="containerImage">
			<label class="containerLabel">Name: {{object.name}}</label><br/>
			<label class="containerLabel">Location: {{object.location.address.street}} {{object.location.address.streetNumber}}, {{object.location.address.city}}</label><br/>
			<label class="containerLabel">Rating: {{object.rating}}</label><br/>
			<label v-bind:class="{'containerConditionalLabelTrue': object.workingHours.open,  'containerConditionalLabelFalse': !object.workingHours.open}">Working time: {{object.workingHours.startTime}}   -   {{object.workingHours.endTime}}</label><br/>
		</div>
    </tr>
    
    <tr>
      <button class="button" v-on:click="editProfile">Edit</button>
    </tr>
  </table>
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
    	}
    }
});