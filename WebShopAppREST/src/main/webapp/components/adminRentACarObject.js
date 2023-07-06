Vue.component("adminRentACarObject", { 
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
			},
			comments: []
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li v-on:click="userProfile" style="float:right"><a>Profile</a></li>
    <li v-on:click="home" style="float:left"><a class="selectedTab">Home</a></li>
    <li v-on:click="createManagers" style="float:left"><a>Create managers</a></li>
    <li v-on:click="createRentACarObject" style="float:left"><a>Create rent a car objects</a></li>
    <li v-on:click="manageUsers" style="float:left"><a>Manage users</a></li>
  </ul>
  
  <h4 class="headingCenter">Rent-A-Car object info</h4> 
			
  <table class="center">
    <tr>
      <td><label class="signUpLabel">Name:</label></td>
      <td><label>{{rentACarObject.name}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Working hours:</label></td>
      <td><label>{{rentACarObject.workingHours.startTime}} - {{rentACarObject.workingHours.endTime}}</label></td>
    </tr>
    <tr v-if="rentACarObject.working">
      <td><label class="signUpLabel">Status:</label></td>
      <td><label>Working</label></td>
    </tr>
    <tr v-if="!rentACarObject.working">
      <td><label class="signUpLabel">Status:</label></td>
      <td><label>Not working</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Location:</label></td>
      <td><label>{{rentACarObject.location.address.city}} ({{rentACarObject.location.address.zipCode}}), {{rentACarObject.location.address.street}} {{rentACarObject.location.address.streetNumber}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel"></label></td>
      <td><label>{{rentACarObject.location.longitude}}, {{rentACarObject.location.latitude}} <button class="button" v-on:click="openMap">Open in map</button></label></td>
      <td></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Logo:</label></td>
      <td><img v-bind:src="rentACarObject.logoURL" height="100" class="containerImage"></img></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Rating:</label></td>
      <td><label>{{rentACarObject.rating}}</label></td>
    </tr>
  </table>
  
  <h4 class="headingCenter">Vehicles</h4>
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
	
	<h4 class="headingCenter">Comments</h4>
  
  <div v-for="comment in comments" class='container' style="height: 120px; margin-left: 20%; margin-right: 20%">
	<img src="https://i.pinimg.com/originals/09/04/9a/09049aa9d6e8cb79674ab772702b8c9b.jpg" height="120" width="100" class="containerImage">
	<label class='containerLabel'>Text: {{comment.text}}</label></br>
	<label class='containerLabel'>Rating: {{comment.rating}}</label></br>
	<label class='containerLabel'>Customer: {{comment.order.customerName}}</label></br>
	<label class='containerLabel'>Status: {{comment.status}}</label></br>
  </div>
</div>
	    `,
    mounted () {
        axios.get("rest/rentACarObjects/" + this.$route.params.id).then(response => {
			this.rentACarObject = response.data;
			axios.get("rest/comments/" + this.rentACarObject.id).then(response => this.comments = response.data);	
		});
    },
    methods: {
    	signOut : function() {
			router.push('/');
    	},
    	userProfile : function() {
			router.push('/admin/userProfile/');
    	},
    	signOut : function() {
			router.push('/');
    	},
    	home : function() {
			router.push('/admin/home/');
    	},
    	createManagers : function() {
			router.push('/admin/createManager/');
    	},
    	createRentACarObject : function() {
			router.push('/admin/createRentACarObject/');
    	},
    	manageUsers : function() {
			router.push('/admin/manageUsers/');
    	},
    	openMap: function() {
			window.open(baseRoute + '/openmap/' + this.rentACarObject.id);
		}
    }
});