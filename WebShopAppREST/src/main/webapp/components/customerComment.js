Vue.component("customerComment", { 
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
			comment: {
				orderCode: "",
				text: "",
				rating: 1
			},
			valid: true
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li v-on:click="profile" style="float:right"><a class="selectedTab">Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
	<li v-on:click="rentCars" style="float:left"><a>Rent cars</a></li>
  </ul>
  
  <h4 class="headingCenter">Comment</h4>
  
  <table class="center">
    <tr>
      <td><label class="signUpLabel">Comment:</label></td>
      <td><input type="text" v-model="comment.text"/></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Rating:</label></td>
      <td><input type="range" v-model="comment.rating" min=1 max=5 step=1/></td>
      <td><label>{{comment.rating}}</label></td>
    </tr>
    <tr>
      <button class="button" v-on:click="executeComment">Comment</button>
    </tr>
  </table>
	<table class="center">
		<tr><td><label v-if="!valid" class="labelError">Comment cannot be empty!</label></td></tr>
	</table>
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