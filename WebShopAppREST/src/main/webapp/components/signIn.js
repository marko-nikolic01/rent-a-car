Vue.component("signIn", { 
	data: function () {
	    return {
			credentials: {
				username:'',
				password: ''
			},
			valid: true
	    }
	},
	    template: `
	    <div>
			<ul>
				<li v-on:click="home" style="float:left"><a>Home</a></li>
  				<li v-on:click="signUp" style="float:right"><a class="selectedTab">Sign up</a></li>
  				<li style="float:right"><a>Sign in</a></li>
			</ul>
			<form class="center">
			<h4 class="headingCenter">Sign in</h4>
    			<table class="center">
					<tr>
    					<td><label class="signUpLabel">Username:</label></td>
        				<td><input v-model="user.username" type="text" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td><label class="signUpLabel">Password:</label></td>
        				<td><input v-model="user.password" type="password" class="signUpInput"/></td>
   						</tr>
    				<tr>
    					<td><label class="signUpLabel">Repeat password:</label></td>
        				<td><input v-model="repeatPassword" type="password" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td></td>
        				<td><input v-on:click="signIn" type="submit" class="button"/></td>
    				</tr>
				</table>
        		<table class="center">
    				<tr><td><label v-if="!valid" class="labelError">You didn't fill the form correctly!</label></td></tr>
        		</table>
    		</form>
    	</div>
		`,
    mounted () {
    },
    methods: {
    	signIn : function() {
			event.preventDefault();
			this.validate();
			if (this.valid) {
				axios.post("rest/users/", this.user).then(response => {
					if(response.data != null) {
						router.push("/userProfile/");
					}
				});
			}
    	},
    	validate : function() {
			if(this.user.username === ''
			|| this.user.password === ''
			|| !(this.user.password === this.repeatPassword)) {
				this.valid = false;
				return;
			}
			this.valid = true;
    	},
    	home : function() {
			router.push('/');
    	},
    	signUp : function() {
			router.push('/signUp/');
    	}
    }
});