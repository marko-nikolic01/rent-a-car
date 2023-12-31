Vue.component("signIn", { 
	data: function () {
	    return {
			credentials: {
				username: '',
				password: ''
			},
			valid: true,
			signedInUser: {
				id: -1,
				username: '',
				password: '',
				firstName: '',
				lastName: '',
				birthday: '',
				gender: '',
				role: '',
				isDeleted: ''
			}
	    }
	},
	    template: `
	    <div>
			<ul>
				<li v-on:click="home" style="float:left"><a>Home</a></li>
  				<li v-on:click="signUp" style="float:right"><a>Sign up</a></li>
  				<li style="float:right"><a class="selectedTab">Sign in</a></li>
			</ul>
			<form class="center">
				<h4 class="headingCenter">Account info</h4>
    			<table class="center">
					<tr>
    					<td><label class="signUpLabel">Username:</label></td>
        				<td><input v-model="credentials.username" type="text" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td><label class="signUpLabel">Password:</label></td>
        				<td><input v-model="credentials.password" type="password" class="signUpInput"/></td>
   						</tr>
    				<br/>
    				<tr>
    					<td></td>
        				<td><input v-on:click="signIn" type="submit" class="button" value="Sign in"/></td>
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
				axios.post("rest/users/signIn", this.credentials).then(response => {
					if(response.status != 200) {
						return;
					}
					axios.get("rest/users/signedInUser").then(response => {
							this.signedInUser = response.data;
							if(this.signedInUser.role === 'CUSTOMER') {
								router.push("/customer/userProfile/");
							}
							else if(this.signedInUser.role === 'ADMINISTRATOR') {
								router.push("/admin/userProfile/");
							}
							else if(this.signedInUser.role === 'MANAGER') {
								router.push("/manager/userProfile/");
							}
					});
				});
			}
    	},
    	validate : function() {
			if(this.credentials.username === ''
			|| this.credentials.password === '') {
				this.valid = false;
				return;
			}
			this.valid = true;
    	},
    	home : function() {
			router.push('/');
    	},
    	signUp : function() {
			router.push("/signUp/");
    	}
    }
});