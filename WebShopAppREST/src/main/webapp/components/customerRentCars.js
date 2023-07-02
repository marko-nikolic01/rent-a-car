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
			filter: {
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
	
	<label>Start date:</label><input type="date" v-model="filter.startDate"/>
	<label>End date:</label><input type="date" v-model="filter.endDate"/>
	<button v-on:click="filterObjects">Search</button>
	<button v-on:click="cancelSearch">Cancel search</button>

	<div v-for="vehicle in sortedObjects" class='container' style="height: 150px;">
		<img v-bind:src="vehicle.photoURL" height="150" width="200" class="containerImage">
		<label class="containerLabel">Vehicle: {{vehicle.brand}} {{vehicle.model}}</label><br/>
		<label class="containerLabel">Price: {{vehicle.price}}</label><br/>
		<label class="containerLabel">Type: {{vehicle.type}}</label><br/>
		<label class="containerLabel">Transmission: {{vehicle.transmission}}</label><br/>
		<label class="containerLabel">Fuel: {{vehicle.fuel}} ({{vehicle.fuelConsumption}} l/km)</label><br/>
		<label class="containerLabel">No. doors: {{vehicle.doors}}</label><br/>
		<label class="containerLabel">No. passengers: {{vehicle.numberOfPassengers}}</label><br/>
		<label class="containerLabel">Description: {{vehicle.description}}</label><br/>
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
		rentCars: function() {
			router.push('/customer/comment/' + order.orderCode);
		},
    	cancelSearch: function() {
			this.filteredObjects = structuredClone(this.vehicles);
			this.sortedObjects = structuredClone(this.vehicles);
			
			this.filter = {
				startDate: '',
				endDate: ''
			}
		},
    	filterObjects: function() {
			this.filteredObjects = structuredClone(this.signedInUser.orders);
			
			this.filteredObjects = this.filterByDateRange(this.filteredObjects, this.filter.minDate, this.filter.maxDate);
			
			this.sortedObjects = structuredClone(this.filteredObjects);
		},
		filterByDateRange: function(objects, minDate, maxDate) {
			if (minDate == '' || maxDate == '') {
				return objects;
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