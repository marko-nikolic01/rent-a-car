Vue.component("customerCart", { 
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
			}
	    }
	},
	    template: `
<div>
	<ul>
	    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
	    <li v-on:click="profile" style="float:right"><a>Profile</a></li>
	    <li v-on:click="home" style="float:left"><a>Home</a></li>
		<li v-on:click="rentCars" style="float:left"><a>Rent cars</a></li>
		<li style="float:left"><a class="selectedTab"><img src="images/shopping-cartt.png" height="15" width="15"> Cart</a></li>
	</ul>
  
	<h4 class="headingCenter">Cart</h4>
	
	<table class="center">
		<tr>
			<td><label class="signUpLabel">Total price: {{signedInUser.cart.price}}</label></td>
		</tr>
	</table>

	<div v-for="order in signedInUser.cart.orders" class='container' style="height: 150px;">
		<img v-bind:src="order.vehicle.photoURL" height="150" width="200" class="containerImage">
		<label class="containerLabel">Vehicle: {{order.vehicle.brand}} {{order.vehicle.model}}</label><br/>
		<label class="containerLabel">Price: {{order.vehicle.price}}</label><br/>
		<label class="containerLabel">Date range: {{order.startDate}} - {{order.endDate}} ({{order.durationDays}} days)</label><br/>
		<button class="button">Remove</button>
	</div>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => {this.signedInUser = response.data;});
        this.comment.orderCode =  this.$route.params.orderCode;
    },
    methods: {
    	editProfile : function() {
			router.push("/customer/editProfile/");
    	},
    	signOut : function() {
			router.push('/');
    	},
    	home : function() {
			router.push('/customer/home/');
    	},
    	profile: function() {
			router.push("/customer/userProfile/");
		},
		rentCars: function() {
			router.push("/customer/rentCars/");			
		},
    	executeComment : function() {
			this.validate();
			if (!this.valid) {
				console.log("not valid");
				return;
			}
			axios.post('rest/comments/', this.comment).then(response => (this.profile()));
    	},
    	validate: function() {
			if (this.comment.text === "") {
				this.valid = false;
				return;
			}
			this.valid = true;
		}
    }
});