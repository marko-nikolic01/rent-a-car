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
			comments: []
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li v-on:click="profile" style="float:right"><a>Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
    <li style="float:left"><a class="selectedTab">My object</a></li>
    <li v-on:click="orders" style="float:left"><a>Orders</a></li>
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
	<button class="button" v-on:click="editVehicle(vehicle)">Edit</button>
  </div>
  
  
  <h4 class="headingCenter">Comments</h4>
  
  <div v-for="comment in comments" class='container' style="height: 120px; margin-left: 20%; margin-right: 20%">
	<img src="https://i.pinimg.com/originals/09/04/9a/09049aa9d6e8cb79674ab772702b8c9b.jpg" height="120" width="100" class="containerImage">
	<label class='containerLabel'>Text: {{comment.text}}</label></br>
	<label class='containerLabel'>Rating: {{comment.rating}}</label></br>
	<label class='containerLabel'>Customer: {{comment.order.customerName}}</label></br>
	<label class='containerLabel'>Status: {{comment.status}}</label></br>
	<button v-on:click="reject(comment)" class="button" v-if="comment.status=='PROCESSING'">Reject</button>
	<button v-on:click="approve(comment)" class="button" v-if="comment.status=='PROCESSING'">Approve</button>
  </div>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => {
			this.signedInUser = response.data;
			
			axios.get("rest/comments/" + this.signedInUser.rentACarObject.id).then(response => this.comments = response.data);	
		});
    },
    methods: {
    	profile : function() {
			router.push('/manager/userProfile/');
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
		},
		approve: function(comment) {
			axios.put("rest/comments/approve/" + comment.id);
			comment.status = "APPROVED";
			axios.get("rest/users/signedInUser").then(response => {
				this.signedInUser = response.data;
				
				axios.get("rest/comments/" + this.signedInUser.rentACarObject.id).then(response => this.comments = response.data);	
			});
		},
		reject: function(comment) {
			axios.put("rest/comments/reject/" + comment.id);
			comment.status = "REJECTED";
		}
    }
});