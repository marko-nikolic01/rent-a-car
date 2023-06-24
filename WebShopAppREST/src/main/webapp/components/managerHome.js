Vue.component("managerHome", { 
	data: function () {
	    return {
			rentACarObjects: [],
			manager: {
				rentACarObject: {
					id: -1
				}
			},
			doesManagerHaveObject: false
	    }
	},
	    template: `
	    <div>
	    	<ul>
    			<li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    			<li v-on:click="userProfile" style="float:right"><a>Profile</a></li>
    			<li style="float:left"><a class="selectedTab">Home</a></li>
    			<li v-on:click="myObject" v-if="doesManagerHaveObject" style="float:left"><a>My object</a></li>
  			</ul>
			<h4 class="headingCenter">Rent a car objects</h4>
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
        axios.get('rest/rentACarObjects/sortedByWorkingStatus').then(response => (this.rentACarObjects = response.data));
        axios.get("rest/users/signedInUser").then(response => {
			this.manager = response.data;
			if(this.manager.rentACarObject.id == -1) {
				this.doesManagerHaveObject = false;
				console.log("why");
			}
			else {
				this.doesManagerHaveObject = true;
			}
		});
    },
    methods: {
    	signOut : function() {
			router.push('/');
    	},
    	myObject : function() {
			router.push('/manager/myObject');
    	},
    	userProfile : function() {
    		router.push("/manager/userProfile/");
    	}
    }
});