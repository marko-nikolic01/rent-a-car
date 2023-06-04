Vue.component("homeSignedIn", { 
	data: function () {
	    return {
			rentACarObjects: [
				{
        			name:'Rent a car',
        			location: {
						street: 'Street',
						number: '123',
						city: 'NYC'
					},
					averageRating: 4.7,
					logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg'
    			}
			]
	    }
	},
	    template: `
	    <div>
	    	<ul>
    			<li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    			<li v-on:click="userProfile" style="float:right"><a>Profile</a></li>
    			<li style="float:left"><a class="selectedTab">Home</a></li>
  			</ul>
			<h4 class="headingCenter">Rent a car objects</h4>
			<div v-for="object in rentACarObjects" class='container'>
				<img v-bind:src="object.logo" src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" height="100" width="100" class="containerImage">
				<label class="containerLabel">Name: {{object.name}}</label><br/>
				<label class="containerLabel">Lokacija: {{object.location.street}} {{object.location.number}}, {{object.location.city}}</label><br/>
				<label class="containerLabel">Rating: {{object.averageRating}}</label><br/>
			</div>
		</div>
	    `,
    mounted () {
        axios.get('rest/renACarObjects/').then(response => (this.rentACarObjects = response.data));
    },
    methods: {
    	signOut : function() {
			router.push('/');
    	},
    	userProfile : function() {
    		router.push("/userProfile/");
    	}
    }
});