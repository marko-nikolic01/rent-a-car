Vue.component("home", { 
	data: function () {
	    return {
			rentACarObjects: []
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
    },
    methods: {
    	signUp : function() {
			router.push('/signUp/');
    	},
    	signIn : function() {
			router.push('/signIn/');
    	}
    }
});