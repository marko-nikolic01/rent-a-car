Vue.component("customerHome", { 
	data: function () {
	    return {
			rentACarObjects: [],
			filteredObjects: [],
			sortedObjects: [],
			sortCriteria: "-",
			filter: {
				name: '',
				vehicleType: '-',
				location: '',
				rating: 1,
				transmission: '-',
				fuel: '-',
				open: true
			},
	    }
	},
	    template: `
	    <div>
	    	<ul>
    			<li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    			<li v-on:click="userProfile" style="float:right"><a>Profile</a></li>
    			<li style="float:left"><a class="selectedTab">Home</a></li>
  			</ul>
			<h4 class="headingCenter">Rent a car objects</h4><label>Name:</label><input type="text" v-model="filter.name"/>
			
			<label>Name:</label><input type="text" v-model="filter.name"/>
			<label>Vehicle type:</label>
				<select v-model="filter.vehicleType">
					<option value="-">-</option>
					<option value="CAR">Car</option>
					<option value="VAN">Van</option>
					<option value="MOBILE_HOME">Mobile home</option>
				</select>
			<label>Location:</label><input type="text" v-model="filter.location"/>
			<label>Rating (1 to 5):</label><input type="range" v-model="filter.rating" min="1" max="5"/>
			<label>Transmission type:</label>
				<select v-model="filter.transmission">
					<option value="-">-</option>
					<option value="MANUAL">Manual</option>
					<option value="AUTOMATIC">Automatic</option>
				</select>
			<label>Fuel type:</label>
				<select v-model="filter.fuel">
					<option value="-">-</option>
					<option value="PETROL">Petrol</option>
					<option value="DIESEL">Diesel</option>
					<option value="HYBRID">Hybrid</option>
					<option value="ELECTRIC">Electric</option>
				</select>
			<label>Is open now:</label><input type="checkbox" value="Bike" v-model="filter.open"/>
			<button v-on:click="filterObjects">Search</button>
			<button v-on:click="cancelSearch">Cancel search</button>
			
			</br>
			
			<table class="center">
					<tr>
    					<td><label class="signUpLabel">Sort by:</label></td>
        				<td>
        					<select v-model="sortCriteria" v-on:change="sort" name="cars" id="cars" class="signUpInput">
  								<option value="-">-</option>
  								<option value="NameAscending">Name (ascending)</option>
  								<option value="NameDescending">Name (descending)</option>
  								<option value="LocationAscending">Location (ascending)</option>
  								<option value="LocationDescending">Location (descending)</option>
  								<option value="RatingAscending">Rating (ascending)</option>
  								<option value="RatingDescending">Rating (descending)</option>
							</select>
						</td>
    				</tr>
			</table>
				
			<div v-for="object in sortedObjects" class='container'>
				<img v-bind:src="object.logoURL" height="100" width="100" class="containerImage">
				<label class="containerLabel">Name: {{object.name}}</label><br/>
				<label class="containerLabel">Location: {{object.location.address.street}} {{object.location.address.streetNumber}}, {{object.location.address.city}}</label><br/>
				<label class="containerLabel">Rating: {{object.rating}}</label><br/>
				<label v-bind:class="{'containerConditionalLabelTrue': object.workingHours.open,  'containerConditionalLabelFalse': !object.workingHours.open}">Working time: {{object.workingHours.startTime}}   -   {{object.workingHours.endTime}}</label><br/>
				<button class="button" v-on:click="info(object)">Info</button>
			</div>
		</div>
	    `,
    mounted () {
        axios.get('rest/rentACarObjects/sortedByWorkingStatus').then(response => {
			this.rentACarObjects = response.data;
			this.filteredObjects = structuredClone(this.rentACarObjects);
			this.sortedObjects = structuredClone(this.rentACarObjects);
		});
    },
    methods: {
    	signOut : function() {
			router.push('/');
    	},
    	userProfile : function() {
    		router.push("/customer/userProfile/");
    	},
    	info : function(object) {
    		router.push("/customer/rentACarObject/" + object.id);
    	},
    	cancelSearch: function() {
			this.filteredObjects = structuredClone(this.rentACarObjects);
			this.sortedObjects = structuredClone(this.rentACarObjects);
			this.sortCriteria = "-";
			
			this.filter = {
				name: '',
				vehicleType: '-',
				location: '',
				rating: 1,
				transmission: '-',
				fuel: '-',
				open: true
			}
		},
    	sort : function() {			
			switch (this.sortCriteria) {
			  case 'NameAscending':
			    this.bubbleSort(this.compareByName);
			    break;
			  case 'NameDescending':
			    this.bubbleSort(this.compareByName);
			    this.sortedObjects = structuredClone(this.sortedObjects.reverse());
			    break;
			  case 'LocationAscending':
			    this.bubbleSort(this.compareByLocation);
			    break;
			  case 'LocationDescending':
			    this.bubbleSort(this.compareByLocation);
			    this.sortedObjects = structuredClone(this.sortedObjects.reverse());
			    break;
			  case 'RatingAscending':
			    this.bubbleSort(this.compareByRating);
			    break;
			  case 'RatingDescending':
			    this.bubbleSort(this.compareByRating);
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
		compareByLocation : function(object1, object2){
			if(object1.location.address.city.toLowerCase() < object2.location.address.city.toLowerCase()){
				return false;
			}
			return true;
		},
		compareByRating : function(object1, object2){
			if(object1.rating < object2.rating){
				return false;
			}
			return true;
		},
    	filterObjects: function() {
			this.filteredObjects = structuredClone(this.rentACarObjects);
			this.sortCriteria = "-";
			
			this.filteredObjects = this.filterByName(this.filteredObjects, this.filter.name);
			this.filteredObjects = this.filterByVehicleType(this.filteredObjects, this.filter.vehicleType);
			this.filteredObjects = this.filterByLocationName(this.filteredObjects, this.filter.location);
			this.filteredObjects = this.filterByRating(this.filteredObjects, this.filter.rating);
			this.filteredObjects = this.filterByTransmissionType(this.filteredObjects, this.filter.transmission);
			this.filteredObjects = this.filterByFuelType(this.filteredObjects, this.filter.fuel);
			this.filteredObjects = this.filterByOpenStatus(this.filteredObjects, this.filter.open);
			
			this.sortedObjects = structuredClone(this.filteredObjects);
		},
		filterByName: function(objects, name) {
			let filtered = []
			for (let object of objects) {
				if (object.name.toLowerCase().includes(name.toLowerCase())) {
					filtered.push(object);
				}
			}
			return filtered;
		},
		filterByVehicleType: function(objects, vehicleType) {
			if (vehicleType == "-") {
				return objects;
			}
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
				if (object.location.address.city.toLowerCase().includes(locationName.toLowerCase())) {
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
			if (transmission == "-") {
				return objects;
			}
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
			if (fuel == "-") {
				return objects;
			}
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
		filterByOpenStatus: function(objects, openStatus) {
			if (openStatus === true) {
				let filtered = [];
				for (let object of objects) {
				if (object.open === true) {
					filtered.push(object);
				}
				return filtered
				}
			}
			return objects;
		}
    }
});