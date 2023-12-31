Vue.component("customerRentCars", { 
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
			vehicles: [],
			filteredObjects: [],
			sortedObjects: [],
			dateRange: {
				startDate: '',
				endDate: ''
			}
	    }
	},
	template: `
<div>

	<ul>
		<li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
		<li v-on:click="profile" style="float:right"><a>Profile</a></li>
		<li v-on:click="home" style="float:left"><a>Home</a></li>
		<li style="float:left"><a class="selectedTab">Rent cars</a></li>
		<li v-on:click="cart" style="float:left"><a><img src="images/shopping-cartt.png" height="15" width="15"> Cart</a></li>
	</ul>

	<h4 class="headingCenter">Rent cars</h4>
	<table class="center">
	  	<tr>
	    	<td><label class="signUpLabel">Start date:</label></td>
	       	<td><input type="date" v-model="dateRange.startDate" class="signUpInput" id="startDatePicker"/></td>
	    </tr>
	    <tr>
	    	<td><label class="signUpLabel">End date:</label></td>
	       	<td><input type="date" v-model="dateRange.endDate" class="signUpInput" id="endDatePicker"/></td>
	    </tr>
	    <tr>
	    	<td><button v-on:click="filterObjects" class="button">Search</button></td>
	        <td><button v-on:click="cancelSearch" class="button">Cancel search</button></td>
	    </tr>
	</table>

	<div v-for="vehicle in sortedObjects" class='container' style="height: 180px;">
		<img v-bind:src="vehicle.photoURL" height="150" width="200" class="containerImage">
		<label class="containerLabel">Vehicle: {{vehicle.brand}} {{vehicle.model}}</label><br/>
		<label class="containerLabel">Price: {{vehicle.price}}</label><br/>
		<label class="containerLabel">Type: {{vehicle.type}}</label><br/>
		<label class="containerLabel">Transmission: {{vehicle.transmission}}</label><br/>
		<label class="containerLabel">Fuel: {{vehicle.fuel}} ({{vehicle.fuelConsumption}} l/km)</label><br/>
		<label class="containerLabel">No. doors: {{vehicle.doors}}</label><br/>
		<label class="containerLabel">No. passengers: {{vehicle.numberOfPassengers}}</label><br/>
		<label class="containerLabel">Description: {{vehicle.description}}</label><br/>
		<button v-on:click="addToCart(vehicle)" class="button">Add to cart</button>
	</div>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => {this.signedInUser = response.data;});
        now = new Date();
        var dd = now.getDate();
		var mm = now.getMonth() + 1;
		var yyyy = now.getFullYear();
		if (dd < 10) {
   			dd = '0' + dd;
		}
		if (mm < 10) {
  			mm = '0' + mm;
		} 
		minDate = yyyy + '-' + mm + '-' + dd;
        document.getElementById("startDatePicker").setAttribute("min", minDate);
        document.getElementById("endDatePicker").setAttribute("min", minDate);
    },
    methods: {
    	editProfile : function() {
			router.push("/customer/editProfile/");
    	},
    	signOut : function() {
			router.push('/');
    	},
    	profile: function() {
			router.push("/customer/userProfile/");
		},
    	home : function() {
			router.push('/customer/home/');
    	},
		cart: function() {
			router.push("/customer/cart/");
		},
    	cancelSearch: function() {
			this.filteredObjects = structuredClone(this.vehicles);
			this.sortedObjects = structuredClone(this.vehicles);
			
			this.dateRange = {
				startDate: '',
				endDate: ''
			}
		},
		addToCart: function(vehicle) {
			let newOrder = {
				vehicleId: vehicle.id,
				startDate: this.dateRange.startDate,
				endDate: this.dateRange.endDate,
				customerId: this.signedInUser.id
			}
			axios.post("rest/orders/addOrderToCart", newOrder).then(response => {
				this.filterByDateRange(this.dateRange.startDate, this.dateRange.endDate);
			});
		},
    	filterObjects: function() {			
			this.filterByDateRange(this.dateRange.startDate, this.dateRange.endDate);
			
			this.sortedObjects = structuredClone(this.filteredObjects);
		},
		filterByDateRange: function(minDate, maxDate) {			
			let range = {startDate: minDate, endDate: maxDate};
			
			if (!(minDate == '' || maxDate == '')) {
				axios.post("rest/vehicles/availableInDateRange", range).then(response => {
					this.filteredObjects = response.data;
					this.sortedObjects = structuredClone(this.filteredObjects);
				});
			}
			else {
				return [];
			}
		}
    }
});