Vue.component("customerUserProfile", { 
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
				orders: [],
				isDeleted: false
			},
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li style="float:right"><a class="selectedTab">Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
  </ul>
  
  <h4 class="headingCenter">Account info</h4>
  
  
			
  <table class="center">
    <tr>
      <td><label class="signUpLabel">Username:</label></td>
      <td><label>{{signedInUser.username}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">First name:</label></td>
      <td><label>{{signedInUser.firstName}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Last name:</label></td>
      <td><label>{{signedInUser.lastName}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Birthday:</label></td>
      <td><label>{{signedInUser.birthday}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Gender:</label></td>
      <td><label>{{signedInUser.gender}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Role:</label></td>
      <td><label>{{signedInUser.role}}</label></td>
    </tr>
    <tr>
      <button class="button" v-on:click="editProfile">Edit</button>
    </tr>
  </table>
  <h2 class="headingCenter">Orders</h2>
  	<div v-for="order in signedInUser.orders" class='container'>
		<img v-bind:src="order.vehicle.photoURL" height="100" width="100" class="containerImage">
		<label class="containerLabel">Vehicle: {{order.vehicle.brand}} {{order.vehicle.model}}</label><br/>
		<label class="containerLabel">Rent a car object: {{order.rentACarObject.name}}</label><br/>
		<label class="containerLabel">Order date and time: {{"order.orderDateTime"}}</label><br/>
		<label class="containerLabel">Order duration (days): {{"order.durationDays"}}</label><br/>
		<label class="containerLabel">Price: {{"order.price"}}</label><br/>
		<label class="containerLabel">Status: {{"order.status"}}</label><br/>
	</div>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => (this.signedInUser = response.data));
    },
    methods: {
    	editProfile : function() {
			router.push("/customer/editProfile/");
    	},
    	signOut : function() {
			router.push('/');
    	},
    	home : function() {
			router.push('/customer/home/');
    	}
    }
});