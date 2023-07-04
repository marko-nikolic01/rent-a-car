Vue.component("home", { 
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
	    		<li style="float:left"><a class="selectedTab">Home</a></li>
  				<li v-on:click="signUp" style="float:right"><a>Sign up</a></li>
  				<li v-on:click="signIn" style="float:right"><a>Sign in</a></li>
			</ul>
			
			<h4 class="headingCenter">Rent a car objects</h4>
			
			<table class="center">
				<tr>
    				<td><label class="signUpLabel">Name:</label></td>
        			<td><input v-model="filter.name" type="text" class="signUpInput"/></td>
    			</tr>
    			<tr>
    				<td><label class="signUpLabel">Vehicle type:</label></td>
        			<td>
						<select v-model="filter.vehicleType" class="signUpInput">
  							<option value="-">-</option>
							<option value="CAR">Car</option>
							<option value="VAN">Van</option>
							<option value="MOBILE_HOME">Mobile home</option>
						</select>
					</td>
   				</tr>
    			<tr>
    				<td><label class="signUpLabel">Location:</label></td>
        			<td><input v-model="filter.location" type="password" class="signUpInput"/></td>
    			</tr>
    			<tr>
    				<td><label class="signUpLabel">Rating (1 to 5):</label></td>
        			<td><input type="range" v-model="filter.rating" min="1" max="5" class="signUpInput"/></td>
    			</tr>
    			<tr>
    				<td><label class="signUpLabel">Transmission type:</label></td>
        			<td>
						<select v-model="filter.transmission" class="signUpInput">
  							<option value="-">-</option>
							<option value="MANUAL">Manual</option>
							<option value="AUTOMATIC">Automatic</option>
						</select>
					</td>
   				</tr>
   				<tr>
    				<td><label class="signUpLabel">Fuel type:</label></td>
        			<td>
						<select v-model="filter.fuel" class="signUpInput">
  							<option value="-">-</option>
							<option value="PETROL">Petrol</option>
							<option value="DIESEL">Diesel</option>
							<option value="HYBRID">Hybrid</option>
							<option value="ELECTRIC">Electric</option>
						</select>
					</td>
   				</tr>
   				<tr>
    				<td><label class="signUpLabel">Is open now:</label></td>
        			<td><input type="checkbox" v-model="filter.open" class="signUpInput"/></td>
    			</tr>
    			<tr>
    				<td><button v-on:click="filterObjects" class="button">Search</button></td>
        			<td><button v-on:click="cancelSearch" class="button">Cancel search</button></td>
    			</tr>
			</table>
			
			
			
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
			</div>
		</div>
	    `,
    mounted () {
        axios.get('rest/rentACarObjects/sortedByWorkingStatus').then(response => {this.rentACarObjects = response.data;
        																		  this.filteredObjects = structuredClone(this.rentACarObjects);
        																		  this.sortedObjects = structuredClone(this.rentACarObjects);});
    },
    methods: {
    	signUp : function() {
			router.push('/signUp/');
    	},
    	signIn : function() {
			router.push('/signIn/');
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
				for (let vehicle of object.vehicles) {
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
				for (let vehicle of object.vehicles) {
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
				for (let vehicle of object.vehicles) {
					if (vehicle.fuel == fuel) {
						filtered.push(object);
						break;
					}
				}
			}
			return filtered;
		},
		filterByOpenStatus: function(objects, openStatus) {
			if (openStatus == true) {
				let filtered = [];
				for (let object of objects) {
					console.log(object.open + ' ' + openStatus);
					if (object.open == true) {
						filtered.push(object);
					}
				}
				return filtered;
			}
			return objects;
		}
    }
});