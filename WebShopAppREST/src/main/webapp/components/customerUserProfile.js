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
				type: '',
				orders: [],
				isDeleted: false
			},
			orders: [],
			filteredObjects: [],
			sortedObjects: [],
			filter: {
				objectName: '',
				minPrice: 0,
				maxPrice: 0,
				minDate: '',
				maxDate: ''
			},
			sortCriteria: "-"
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li style="float:right"><a class="selectedTab">Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
	<li v-on:click="rentCars" style="float:left"><a>Rent cars</a></li>
	<li v-on:click="cart" style="float:left"><a><img src="images/shopping-cartt.png" height="15" width="15"> Cart</a></li>
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
      <td><label class="signUpLabel">Points:</label></td>
      <td><label>{{signedInUser.points}}</label></td>
    </tr>
    <tr>
      <td><label class="signUpLabel">Type:</label></td>
      <td><label>{{signedInUser.type.name}}</label></td>
    </tr>
    <tr>
      <button class="button" v-on:click="editProfile">Edit</button>
    </tr>
  </table>
  
  <h4 class="headingCenter">Orders</h4>
  	<table class="center">
  		<tr>
	    	<td><label class="signUpLabel">Object name:</label></td>
	        <td><input type="text" v-model="filter.objectName" class="signUpInput"/></td>
	    </tr>
	  	<tr>
	    	<td><label class="signUpLabel">Min. price:</label></td>
	        <td><input type="number" v-model="filter.minPrice" class="signUpInput"/></td>
	    </tr>
	    <tr>
	    	<td><label class="signUpLabel">Max. price:</label></td>
	       	<td><input type="number" v-model="filter.maxPrice" class="signUpInput"/></td>
	    </tr>
	    <tr>
	    	<td><label class="signUpLabel">Min. date:</label></td>
	       	<td><input type="date" v-model="filter.minDate" class="signUpInput"/></td>
	    </tr>
	    <tr>
	    	<td><label class="signUpLabel">Max. date:</label></td>
	       	<td><input type="date" v-model="filter.maxDate" class="signUpInput"/></td>
	    </tr>
	    <tr>
	    	<td><button v-on:click="filterObjects" class="button">Search</button></td>
	        <td><button v-on:click="cancelSearch" class="button">Cancel search</button></td>
	    </tr>
	</table>
  
  <table class="center">
		<tr>
			<td><label class="signUpLabel">Sort by:</label></td>
			<td>
				<select v-model="sortCriteria" v-on:change="sort" name="cars" id="cars" class="signUpInput">
					<option value="-">-</option>
					<option value="RentACarObjectAscending">Rent a car object (ascending)</option>
					<option value="RentACarObjectDescending">Rent a car object (descending)</option>
					<option value="PriceAscending">Price (ascending)</option>
					<option value="PriceDescending">Price (descending)</option>
					<option value="DateAscending">Date (ascending)</option>
					<option value="DateDescending">Date (descending)</option>
				</select>
			</td>
		</tr>
	</table>
  
  	<div v-for="order in sortedObjects" class='container' style="height: 150px;">
		<img v-bind:src="order.vehicle.photoURL" height="120" width="150" class="containerImage">
		<label class="containerLabel">Vehicle: {{order.vehicle.brand}} {{order.vehicle.model}}</label><br/>
		<label class="containerLabel">Rent a car object: {{order.rentACarObject.name}}</label><br/>
		<label class="containerLabel">Order date and time: {{order.orderDateTime}}</label><br/>
		<label class="containerLabel">Order duration (days): {{order.durationDays}}</label><br/>
		<label class="containerLabel">Price: {{order.price}}</label><br/>
		<label class="containerLabel">Status: {{order.status}}</label><br/>
		<label v-if="order.status == 'REJECTED'" class="containerLabel">Rejection explanation: {{order.rejectionExplanation}}</label>
		<button v-if="!order.rated && order.status == 'RETURNED'" class="button" v-on:click="comment(order)">Comment</button><br/>
		<button v-if="order.status == 'PROCESSING'" class="button" v-on:click="cancel(order)">Cancel</button>
	</div>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => {this.signedInUser = response.data;
																  this.filteredObjects = structuredClone(this.signedInUser.orders);
																  this.sortedObjects = structuredClone(this.signedInUser.orders);
																  this.updateMaxPrice();});
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
    	comment: function(order) {
			router.push('/customer/comment/' + order.orderCode);
		},
		rentCars: function() {
			router.push("/customer/rentCars/");			
		},
		cart: function() {
			router.push("/customer/cart/");
		},
		cancel: function(order) {
			axios.put("rest/orders/cancel/" + order.orderCode);
			order.status = 'CANCELLED';
			axios.get("rest/users/signedInUser").then(response => {this.signedInUser = response.data;
																  this.filteredObjects = structuredClone(this.signedInUser.orders);
																  this.sortedObjects = structuredClone(this.signedInUser.orders);
																  this.updateMaxPrice();});
		},
    	cancelSearch: function() {
			this.filteredObjects = structuredClone(this.signedInUser.orders);
			this.sortedObjects = structuredClone(this.signedInUser.orders);
			this.sortCriteria = "-";
			
			this.filter = {
				objectName: '',
				minPrice: 0,
				maxPrice: 99999999,
				minDate: '',
				maxDate: ''
			}
			this.updateMaxPrice();
		},
		sort : function() {			
			switch (this.sortCriteria) {
			  case 'RentACarObjectAscending':
			    this.bubbleSort(this.compareRentACarObject);
			    break;
			  case 'RentACarObjectDescending':
			    this.bubbleSort(this.compareRentACarObject);
			    this.sortedObjects = structuredClone(this.sortedObjects.reverse());
			    break;
			  case 'PriceAscending':
			    this.bubbleSort(this.comparePrice);
			    break;
			  case 'PriceDescending':
			    this.bubbleSort(this.comparePrice);
			    this.sortedObjects = structuredClone(this.sortedObjects.reverse());
			    break;
			  case 'DateAscending':
			    this.bubbleSort(this.compareDateTime);
			    break;
			  case 'DateDescending':
			    this.bubbleSort(this.compareDateTime);
			    this.sortedObjects = structuredClone(this.sortedObjects.reverse());
			    break;
			  case '-':
				  this.sortedObjects = structuredClone(this.filteredObjects);
				  break;
			}
		},
		bubbleSort : function(comparissonFunction) {
	    	for (var i = 0; i < this.sortedObjects.length; i++) {
		        for (var j = 0; j < (this.sortedObjects.length - i - 1); j++) {
		            if (comparissonFunction(this.sortedObjects[j], this.sortedObjects[j + 1])) {
		                var temp = this.sortedObjects[j];
		                this.sortedObjects[j] = this.sortedObjects[j + 1];
		                this.sortedObjects[j + 1] = temp;
		            }
	        	}
	    	}
	    	this.sortedObjects = structuredClone(this.sortedObjects);
		},
		compareByName : function(object1, object2){
			if(object1.name.toLowerCase() < object2.name.toLowerCase()){
				return false;
			}
			return true;
		},
		compareRentACarObject : function(order1, order2){
			if(order1.rentACarObject.name.toLowerCase() < order2.rentACarObject.name.toLowerCase()){
				return false;
			}
			return true;
		},
		comparePrice : function(order1, order2){
			if(order1.price < order2.price){
				return false;
			}
			return true;
		},
		compareDateTime : function(order1, order2){
			let dateString1 = order1.orderDateTime.substring(0, 19);
			let date1 = new Date(dateString1);
			let dateString2 = order2.orderDateTime.substring(0, 19);
			let date2 = new Date(dateString2);
			if(date1 < date2){
				return false;
			}
			return true;
		},
    	filterObjects: function() {
			this.filteredObjects = structuredClone(this.signedInUser.orders);
			this.sortCriteria = "-";
			
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
				maxDate = '9999-12-12';
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
		},
		updateMaxPrice: function() {
			if (this.orders.length == 0) {
				this.filter.maxPrice = 0;
			}
			else {
				this.filter.maxPrice = this.signedInUser.orders[0].price;			
			}
			for (let order of this.signedInUser.orders) {
				if (order.price > this.filter.maxPrice) {
					this.filter.maxPrice = order.price;
				}
			}
		}
    }
});