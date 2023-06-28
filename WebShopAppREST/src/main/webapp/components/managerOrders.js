Vue.component("managerOrders", { 
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
				isDeleted: false,
				rentACarObject: {
					id: -1
				},
			},
			doesManagerHaveObject: false,
			managerOrders: []
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li style="float:right"><a class="selectedTab">Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
    <li v-on:click="myObject" style="float:left"><a>My object</a></li>
    <li style="float:left"><a>Orders</a></li>
  </ul>			
  
  <h4 class="headingCenter">Orders</h4>
  	<div v-for="order in managerOrders" class='container' style="height: 120px;">
		<img v-bind:src="order.vehicle.photoURL" height="120" width="150" class="containerImage">
		<label class="containerLabel">Vehicle: {{order.vehicle.brand}} {{order.vehicle.model}}</label><br/>
		<label class="containerLabel">Rent a car object: {{order.rentACarObject.name}}</label><br/>
		<label class="containerLabel">Order date and time: {{order.orderDateTime}}</label><br/>
		<label class="containerLabel">Order duration (days): {{order.durationDays}}</label><br/>
		<label class="containerLabel">Price: {{order.price}}</label><br/>
		<label class="containerLabel">Status: {{order.status}}</label><br/>
		<label class="containerLabel">Customer name: {{order.customerName}}</label><br/>
	</div>

</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => {
			this.signedInUser = response.data
			if(this.signedInUser.rentACarObject.id == -1) {
				this.doesManagerHaveObject = false;
			}
			else {
				this.doesManagerHaveObject = true;
			}
			axios.get('rest/orders/getByRentACarObject/' + this.signedInUser.rentACarObject.id).then(response => (this.managerOrders = response.data));
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
		orders: function() {
			router.push('/manager/orders/');	
		}
    }
});