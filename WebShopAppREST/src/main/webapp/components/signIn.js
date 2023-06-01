Vue.component("signIn", { 
	data: function () {
	    return {
			credentials: {
				username: '',
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
        				<td><input v-on:click="signIn" type="submit" class="button"/></td>
    				</tr>
				</table>
        		<table class="center">
    				<tr><td><label v-if="!valid" class="labelError">You didn't fill the form correctly!</label></td></tr>
        		</table>
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
					if(response.status === 200) {
						router.push("/userProfile/");
					}
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
			router.push('/signUp/');
    	}
    }
});