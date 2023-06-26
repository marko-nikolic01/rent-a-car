Vue.component("adminHome", { 
	data: function () {
	    return {
			rentACarObjects: [],
			filteredObjects: [],
			sortCriteria: "-"
	    }
	},
	    template: `
	    <div>
	    	<ul>
    			<li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    			<li v-on:click="userProfile" style="float:right"><a>Profile</a></li>
    			<li style="float:left"><a class="selectedTab">Home</a></li>
    			<li v-on:click="createManagers" style="float:left"><a>Create managers</a></li>
    			<li v-on:click="createRentACarObject" style="float:left"><a>Create rent a car objects</a></li>
  				<li v-on:click="manageUsers" style="float:left"><a>Manage users</a></li>
  			</ul>
			<h4 class="headingCenter">Rent a car objects</h4>
			<table class="center">
					<tr>
    					<td><label class="signUpLabel">Sort by:</label></td>
        				<td>
        					<select v-model="sortCriteria" v-on:change="sort" name="cars" id="cars" class="signUpInput">
  								<option value="-">-</option>
  								<option value="NameAscending">NameAscending</option>
  								<option value="NameDescending">NameDescending</option>
  								<option value="LocationAscending">LocationAscending</option>
  								<option value="LocationDescending">LocationDescending</option>
  								<option value="RatingAscending">RatingAscending</option>
  								<option value="RatingDescending">RatingDescending</option>
							</select>
						</td>
    				</tr>
				</table>
			<div v-for="object in filteredObjects" class='container'>
				<img v-bind:src="object.logoURL" height="100" width="100" class="containerImage">
				<label class="containerLabel">Name: {{object.name}}</label><br/>
				<label class="containerLabel">Location: {{object.location.address.street}} {{object.location.address.streetNumber}}, {{object.location.address.city}}</label><br/>
				<label class="containerLabel">Rating: {{object.rating}}</label><br/>
				<label v-bind:class="{'containerConditionalLabelTrue': object.workingHours.open,  'containerConditionalLabelFalse': !object.workingHours.open}">Working time: {{object.workingHours.startTime}}   -   {{object.workingHours.endTime}}</label><br/>
			</div>
		</div>
	    `,
    mounted () {
        axios.get('rest/rentACarObjects/sortedByWorkingStatus').then(response => {
			this.filteredObjects = response.data;
		});
    },
    methods: {
    	signOut : function() {
			router.push('/');
    	},
    	userProfile : function() {
    		router.push("/admin/userProfile/");
    	},
    	createManagers : function() {
			router.push('/admin/createManager/');
    	},
    	createRentACarObject : function() {
			router.push('/admin/createRentACarObject/');
    	},
    	manageUsers : function() {
			router.push('/admin/manageUsers/');
    	},
    	sort : function() {
			switch (this.sortCriteria) {
			  case 'NameAscending':
			    this.bubbleSort(this.compareByName);
			    break;
			  case 'NameDescending':
			    this.bubbleSort(this.compareByName);
			    this.filteredObjects = structuredClone(this.filteredObjects.reverse());
			    break;
			  case 'LocationAscending':
			    this.bubbleSort(this.compareByLocation);
			    break;
			  case 'LocationDescending':
			    this.bubbleSort(this.compareByLocation);
			    this.filteredObjects = structuredClone(this.filteredObjects.reverse());
			    break;
			  case 'RatingAscending':
			    this.bubbleSort(this.compareByRating);
			    break;
			  case 'RatingDescending':
			    this.bubbleSort(this.compareByRating);
			    this.filteredObjects = structuredClone(this.filteredObjects.reverse());
			    break;
			}
			console.log("ok");
			for (var i = 0; i < this.filteredObjects.length; i++) {
		        console.log(this.filteredObjects[i].name + "   " +  this.filteredObjects[i].location.address.city + "   " + this.filteredObjects[i].rating);
	    	}
		},
		bubbleSort : function(comparissonFunction) {
	    	for (var i = 0; i < this.filteredObjects.length; i++) {
		        for (var j = 0; j < (this.filteredObjects.length - i - 1); j++) {
		            if (comparissonFunction(this.filteredObjects[j], this.filteredObjects[j + 1])) {
		                var temp = this.filteredObjects[j];
		                this.filteredObjects[j] = this.filteredObjects[j + 1];
		                this.filteredObjects[j + 1] = temp;
		            }
	        	}
	    	}
	    	this.filteredObjects = structuredClone(this.filteredObjects);
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
		}
    }
});