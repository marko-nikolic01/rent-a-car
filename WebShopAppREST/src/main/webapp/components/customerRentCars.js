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
	</ul>

	<h4 class="headingCenter">Rent cars</h4>
	
	<label>Start date:</label><input type="date" v-model="dateRange.startDate"/>
	<label>End date:</label><input type="date" v-model="dateRange.endDate"/>
	<button v-on:click="filterObjects">Search</button>
	<button v-on:click="cancelSearch">Cancel search</button>

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