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
			orders: [],
			filteredObjects: [],
			sortedObjects: [],
			filter: {
				objectName: '',
				minPrice: 0,
				maxPrice: 99999999,
				minDate: '',
				maxDate: ''
			}
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
  
  <h4 class="headingCenter">Orders</h4>
  <label>Rent-A-Car object name:</label><input type="text" v-model="filter.objectName"/>
  <label>Min. price:</label><input type="number" v-model="filter.minPrice"/>
  <label>Max. price:</label><input type="number" v-model="filter.maxPrice"/>
  <label>Min. date:</label><input type="date" v-model="filter.minDate"/>
  <label>Max. date:</label><input type="date" v-model="filter.maxDate"/>
  <button v-on:click="filterObjects">Search</button>
  <button>Cancel search</button>
  
  	<div v-for="order in sortedObjects" class='container' style="height: 120px;">
		<img v-bind:src="order.vehicle.photoURL" height="120" width="150" class="containerImage">
		<label class="containerLabel">Vehicle: {{order.vehicle.brand}} {{order.vehicle.model}}</label><br/>
		<label class="containerLabel">Rent a car object: {{order.rentACarObject.name}}</label><br/>
		<label class="containerLabel">Order date and time: {{order.orderDateTime}}</label><br/>
		<label class="containerLabel">Order duration (days): {{order.durationDays}}</label><br/>
		<label class="containerLabel">Price: {{order.price}}</label><br/>
		<label class="containerLabel">Status: {{order.status}}</label><br/>
	</div>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => {this.signedInUser = response.data;
																  this.filteredObjects = structuredClone(this.signedInUser.orders);
																  this.sortedObjects = structuredClone(this.signedInUser.orders);});
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
    	},
    	filterObjects: function() {
			this.filteredObjects = structuredClone(this.signedInUser.orders);
			this.sortCriteria = "-";
			
			console.log("uspelo");
			
			this.filteredObjects = this.filterByObjectName(this.filteredObjects, this.filter.objectName);
			this.filteredObjects = this.filterByPriceRange(this.filteredObjects, this.filter.minPrice, this.filter.maxPrice);
			this.filteredObjects = this.filterByDateRange(this.filteredObjects, this.filter.minDate, this.filter.maxDate);
			
			this.sortedObjects = structuredClone(this.filteredObjects);
		},
		filterByObjectName: function(objects, objectName) {
			let filtered = [];
			for (let object of objects) {
				if (object.rentACarObject.name.toLowerCase().includes(objectName)) {
					filtered.push(object);
				}
			}
			return filtered;
		},
		filterByPriceRange: function(objects, minPrice, maxPrice) {
			let filtered = [];
			for (let object of objects) {
				if (object.price >= minPrice && object.price <= maxPrice) {
					filtered.push(object);
				}
			}
			return filtered;
		},
		filterByDateRange: function(objects, minDate, maxDate) {
			if (minDate == '') {
				minDate = '1900-01-01';
			}
			if (maxDate == '') {
				let date = new Date();
				maxDate = date.toISOString().split('T')[0];
			}
			
			let filtered = [];
			for (let object of objects) {
				let dateString = object.orderDateTime.substring(0, 10);
				let date = new Date(dateString);
				let lowerDate = new Date(minDate);
				let upperDate = new Date(maxDate);
				
				if (date >= lowerDate && date <= upperDate) {
					filtered.push(object);
				}
			}
			return filtered;
		}
    }
});