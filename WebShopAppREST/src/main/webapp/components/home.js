Vue.component("home", { 
	data: function () {
	    return {
			rentACarObjects: [],
			filteredObjects: [],
			filter: {
				name: 'jeste',
				vehicleType: 'CAR',
				location: 'Novi Sad',
				rating: 0,
				transmission: 'MANUAL',
				fuel: 'PETROL',
				open: true
			}
	    }
	},
	    template: `
	    <div>
	    	<ul>
	    		<li style="float:left"><a class="selectedTab">Home</a></li>
  				<li v-on:click="signUp" style="float:right"><a>Sign up</a></li>
  				<li v-on:click="signIn" style="float:right"><a>Sign in</a></li>
			</ul>
			<h4 class="headingCenter">Rent a car objects</h4>
			<label>Name:</label><input type="text" v-model="filter.name"/>
			<div v-for="object in rentACarObjects" class='container'>
				<img v-bind:src="object.logoURL" height="100" width="100" class="containerImage">
				<label class="containerLabel">Name: {{object.name}}</label><br/>
				<label class="containerLabel">Location: {{object.location.address.street}} {{object.location.address.streetNumber}}, {{object.location.address.city}}</label><br/>
				<label class="containerLabel">Rating: {{object.rating}}</label><br/>
				<label v-bind:class="{'containerConditionalLabelTrue': object.workingHours.open,  'containerConditionalLabelFalse': !object.workingHours.open}">Working time: {{object.workingHours.startTime}}   -   {{object.workingHours.endTime}}</label><br/>
			</div>
		</div>
	    `,
    mounted () {
        axios.get('rest/rentACarObjects/sortedByWorkingStatus').then(response => {this.rentACarObjects = response.data;});
    },
    methods: {
    	signUp : function() {
			router.push('/signUp/');
    	},
    	signIn : function() {
			router.push('/signIn/');
    	},
    	filterObjects: function() {
			this.filteredObjects = structuredClone(this.rentACarObjects);
			
			this.filteredObjects = this.filterByName(this.filteredObjects, filter.name);
			this.filteredObjects = this.filterbyfilterByVehicleType(this.filteredObjects, this.filter.vehicleType);
			this.filteredObjects = this.filterByLocationName(this.filteredObjects, this.filter.location);
			this.filteredObjects = this.filterByRating(this.filteredObjects, this.filter.rating);
			this.filteredObjects = this.filterByTransmissionType(this.filteredObjects, this.filter.transmission);
			this.filteredObjects = this.filterByFuelType(this.filteredObjects, this.filter.fuel);
			this.filteredObjects = this.filterByOpenStatus(this.filteredObjects);
		},
		filterByName: function(objects, name) {
			let filtered = []
			for (let object of objects) {
				if (object.name == name) {
					filtered.push(object);
				}
			}
			return filtered;
		},
		filterByVehicleType: function(objects, vehicleType) {
			let filtered = [];
			for (let object of objects) {
				for (vehicle of object.vehicles) {
					if (vehicle.type == vehicleType) {
						filtered.push(object);
						break;
					}
				}
			}
			return filtered;
		},
		filterByLocationName: function(objects, locationName) {
			let filtered = [];
			for (let object of objects) {
				if (object.location.city == locationName) {
					filtered.push(object);
				}
			}
			return filtered;
		},
		filterByRating: function(objects, rating) {
			let filtered = [];
			for (let object of objects) {
				if (object.rating >= rating) {
					filtered.push(object);
				}
			}
			return filtered;
		},
		filterByTransmissionType: function(objects, transmission) {
			let filtered = [];
			for (let object of objects) {
				for (vehicle of object.vehicles) {
					if (vehicle.transmission == transmission) {
						filtered.push(object);
						break;
					}
				}
			}
			return filtered;
		},
		filterByTransmissionType: function(objects, transmission) {
			let filtered = [];
			for (let object of objects) {
				for (vehicle of object.vehicles) {
					if (vehicle.transmission == transmission) {
						filtered.push(object);
						break;
					}
				}
			}
			return filtered;
		},
		filterByFuelType: function(objects, fuel) {
			let filtered = [];
			for (let object of objects) {
				for (vehicle of object.vehicles) {
					if (vehicle.fuel == fuel) {
						filtered.push(object);
						break;
					}
				}
			}
			return filtered;
		},
		filterByOpenStatus: function(objects) {
			let filtered = [];
			for (let object of objects) {
				if (object.open == true) {
					filtered.push(object);
				}
			}
			return filtered;
		} 
    }
});