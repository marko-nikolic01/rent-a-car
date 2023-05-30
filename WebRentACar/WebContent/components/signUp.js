Vue.component("signUp", { 
	data: function () {
	    return {
			user: {
				username: '',
				password: '',
				firstName: '',
				lastName: '',
				birthday: '',
				gender: ''
			},
			repeatPassword: '',
			valid: true,
			now: ''
	    }
	},
	    template: `
	    <div>
			<ul>
  				<li v-on:click="signUp" style="float:right"><a class="selectedTab">Sign up</a></li>
  				<li style="float:right"><a>Sign in</a></li>
			</ul>
			<form class="center">
			<h4 class="headingCenter">Account info</h4>
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
				</table>
				<h4 class="headingCenter">User info</h4>
        		<table class="center">
    				<tr>
    					<td><label class="signUpLabel">First name:</label></td>
        				<td><input v-model="user.firstName" type="text" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td><label class="signUpLabel">Last name:</label></td>
        				<td><input v-model="user.lastName" type="text" class="signUpInput"/></td>
    				</tr>
            		<tr>
    					<td><label class="signUpLabel">Gender:</label></td>
        				<td>
                			<input v-model="user.gender" type="radio" id="male" name="gender" value="MALE"/>Male
                    		<input v-model="user.gender" type="radio" id="gender" name="gender" value="FEMALE"/>Female
                		</td>
    				</tr>
            		<tr>
    					<td><label class="signUpLabel">Birthdate:</label></td>
        				<td><input v-model="user.birthday" type="date" class="signUpInput"/></td>
    				</tr>
    				<br/>
    				<tr>
    					<td></td>
        				<td><input v-on:click="signUp" type="submit" class="button"/></td>
    				</tr>
        		</table>
        		<table class="center">
    				<tr><td><label v-if="!valid" class="labelError">You didn't fill the form correctly!</label></td></tr>
        		</table>
    		</form>
    	</div>
		`,
    mounted () {
        now = new Date();
    },
    methods: {
    	signUp : function() {
			event.preventDefault();
			this.validate();
    	},
    	validate : function() {
			if(this.user.username === ''
			|| this.user.password === ''
			|| !(this.user.password === this.repeatPassword)
			|| this.user.firstName === ''
			|| this.user.lastName === ''
			|| this.user.birthday === ''
			|| !(this.user.gender === 'MALE' || this.user.gender === 'FEMALE')) {
				this.valid = false;
				return;
			}
			this.valid = true;
    	}
    }
});