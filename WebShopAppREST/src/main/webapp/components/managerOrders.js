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
			sortCriteria: "-",
			managerOrders: [],
			filteredOrders: [],
			sortedOrders: [],
			filter: {
				minPrice: 0,
				maxPrice: 0,
				minDate: '',
				maxDate: ''
			},
			users: [],
			now: ''
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li v-on:click="userProfile" style="float:right"><a>Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
    <li v-on:click="myObject" style="float:left"><a>My object</a></li>
    <li style="float:left"><a class="selectedTab">Orders</a></li>
  </ul>			
  
  <h4 class="headingCenter">Orders</h4>
	  <table class="center">
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
  						<option value="PriceAscending">Price (ascending)</option>
  						<option value="PriceDescending">Price (descending)</option>
  						<option value="DateAscending">Date (ascending)</option>
  						<option value="DateDescending">Date (descending)</option>
					</select>
				</td>
			</tr>
		</table>
  	<div v-for="order in sortedOrders" class='container' style="height: 150px;">
		<img v-bind:src="order.vehicle.photoURL" height="130" width="160" class="containerImage">
		<label class="containerLabel">Vehicle: {{order.vehicle.brand}} {{order.vehicle.model}}</label><br/>
		<label class="containerLabel">Rent a car object: {{order.rentACarObject.name}}</label><br/>
		<label class="containerLabel">Customer name: {{order.customerName}}</label><br/>
		<label class="containerLabel">Order date and time: {{order.orderDateTime}}</label><br/>
		<label class="containerLabel">Order duration (days): {{order.durationDays}}</label><br/>
		<label class="containerLabel">Price: {{order.price}}</label><br/>
		<label class="containerLabel">Status: {{order.status}}</label><br/>
		<label v-if="order.status == 'REJECTED'" class="containerLabel">Rejection explanation: {{order.rejectionExplanation}}</label>
		<button class="button" v-if="order.status == 'ACCEPTED' && !isFutureDate(order.orderDateTime)" v-on:click="markAsTaken(order)">Mark as taken</button>
		<button class="button" v-if="order.status == 'TAKEN'" v-on:click="markAsReturned(order)">Mark as returned</button>
		<button class="button" v-if="order.status == 'PROCESSING'" v-on:click="accept(order)">Accept</button>
		<button class="button" v-if="order.status == 'PROCESSING'" v-on:click="reject(order)">Reject</button>
	</div>
	
	
    <h4 class="headingCenter">Customers</h4>
	<div v-for="user in users" class='container' style="height: 120px;">
		<img src="https://i.pinimg.com/originals/09/04/9a/09049aa9d6e8cb79674ab772702b8c9b.jpg" height="120" width="100" class="containerImage">
		<label class="containerLabel">Username: {{user.username}}</label><br/>
		<label class="containerLabel">Name: {{user.firstName}} {{user.lastName}}</label><br/>
		<label class="containerLabel">Date of birth: {{user.birthday}}</label><br/>
		<label class="containerLabel">Gender: {{user.gender}}</label><br/>
		<label class="containerLabel">Role: {{user.role}}</label><br/>
		<label class="containerLabel" v-if="user.role=='CUSTOMER'">Points: {{user.points}} ({{user.type.name}})</label><br/>
		<label v-if="user.deleted" class="containerConditionalLabelFalse">This user is deleted</label><br/>
		<label v-if="!user.deleted" class="containerConditionalLabelTrue"></label><br/>
	</div>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => {
			this.signedInUser = response.data
			this.now = Date.now();
			if(this.signedInUser.rentACarObject.id == -1) {
				this.doesManagerHaveObject = false;
			}
			else {
				this.doesManagerHaveObject = true;
			}
			axios.get('rest/orders/getByRentACarObject/' + this.signedInUser.rentACarObject.id).then(response => {
				this.managerOrders = response.data;
				this.filteredOrders = structuredClone(this.managerOrders);
				this.sortedOrders = structuredClone(this.managerOrders);
				this.updateMaxPrice();
			});
			
			axios.get('rest/orders/usersWhoOrderedFromObject/' + this.signedInUser.rentACarObject.id).then(response => {
				this.users = response.data;
			});
		});
		
    },
    methods: {
    	userProfile : function() {
			router.push("/manager/userProfile/");
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
		},
		sort : function() {			
			switch (this.sortCriteria) {
			  case 'PriceAscending':
			    this.bubbleSort(this.comparePrice);
			    break;
			  case 'PriceDescending':
			    this.bubbleSort(this.comparePrice);
			    this.sortedOrders = structuredClone(this.sortedOrders.reverse());
			    break;
			  case 'DateAscending':
			    this.bubbleSort(this.compareDateTime);
			    break;
			  case 'DateDescending':
			    this.bubbleSort(this.compareDateTime);
			    this.sortedOrders = structuredClone(this.sortedOrders.reverse());
			    break;
			  case '-':
				  this.sortedOrders = structuredClone(this.filteredOrders);
				  break;
			}
		},
		bubbleSort : function(comparissonFunction) {
	    	for (var i = 0; i < this.sortedOrders.length; i++) {
		        for (var j = 0; j < (this.sortedOrders.length - i - 1); j++) {
		            if (comparissonFunction(this.sortedOrders[j], this.sortedOrders[j + 1])) {
		                var temp = this.sortedOrders[j];
		                this.sortedOrders[j] = this.sortedOrders[j + 1];
		                this.sortedOrders[j + 1] = temp;
		            }
	        	}
	    	}
	    	this.sortedOrders = structuredClone(this.sortedOrders);
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
			this.filteredOrders = structuredClone(this.managerOrders);
			this.sortCriteria = "-";
			
			this.filteredOrders = this.filterByPriceRange(this.filteredOrders, this.filter.minPrice, this.filter.maxPrice);
			this.filteredOrders = this.filterByDateRange(this.filteredOrders, this.filter.minDate, this.filter.maxDate);
			
			this.sortedOrders = structuredClone(this.filteredOrders);
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
		cancelSearch: function() {
			this.filteredOrders = structuredClone(this.managerOrders);
			this.sortedOrders = structuredClone(this.managerOrders);
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
		updateMaxPrice: function() {
			this.filter.maxPrice = this.managerOrders[0].price;
			for (let order of this.managerOrders) {
				if (order.price > this.filter.maxPrice) {
					this.filter.maxPrice = order.price;
				}
			}
		},
		markAsReturned: function(order) {
			if(order.status == 'TAKEN') {
				axios.put('rest/orders/return/' + order.orderCode).then(response => {
					order.status = 'RETURNED';
				});
			}
		},
		markAsTaken: function(order) {
			if(order.status == 'ACCEPTED' && !this.isFutureDate(order.orderDateTime)) {
				axios.put('rest/orders/take/' + order.orderCode).then(response => {
					order.status = 'TAKEN';
				});
			}
		},
		isFutureDate : function(date){
			let dateString = date.substring(0, 19);
			let orderDate = new Date(dateString);
			if(orderDate > this.now){
				return true;
			}
			return false;
		},
		accept: function(order) {
			if(order.status == 'PROCESSING') {
				axios.put('rest/orders/accept/' + order.orderCode).then(response => {
					order.status = 'ACCEPTED';
				});
			}
		},
		reject: function(order) {
			router.push("/manager/rejectOrder/" + order.orderCode);
		}
    }
});