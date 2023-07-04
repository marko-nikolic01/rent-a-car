Vue.component("managerRejectOrder", { 
	data: function () {
	    return {
			rejection: {
				orderCode: '',
				explanation: ''
			},
			valid: true
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li v-on:click="userProfile" style="float:right"><a>Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
	<li v-on:click="myObject" style="float:left"><a>My object</a></li>
	<li v-on:click="orders" style="float:left"><a class="selectedTab">Orders</a></li>
  </ul>
  
  <h4 class="headingCenter">Comment</h4>
  
  <table class="center">
    <tr>
      <td><label class="signUpLabel">Explanation:</label></td>
      <td><input type="text" v-model="rejection.explanation"/></td>
    </tr>
    <tr>
      <button class="button" v-on:click="reject">Reject</button>
    </tr>
  </table>
	<table class="center">
		<tr><td><label v-if="!valid" class="labelError">Explanation cannot be empty!</label></td></tr>
	</table>
</div>
	    `,
    mounted () {
        this.rejection.orderCode =  this.$route.params.orderCode;
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
    	},
		orders: function() {
			router.push('/manager/orders/');	
		},
		home : function() {
			router.push('/manager/home/');
    	},
    	reject : function() {
			this.validate();
			if (!this.valid) {
				console.log("not valid");
				return;
			}
			axios.post('rest/comments/', this.comment).then(response => (this.profile()));
    	},
    	validate: function() {
			if (this.rejection.explanation === "") {
				this.valid = false;
				return;
			}
			this.valid = true;
		}
    }
});