Vue.component("signUp", { 
	data: function () {
	    return {
			user: {
				id: -1,
				username: '',
				password: '',
				firstName: '',
				lastName: '',
				birthday: '',
				gender: '',
				role: 'CUSTOMER',
				isDeleted: false
			},
			repeatPassword: '',
			valid: true,
			now: ''
	    }
	},
	    template: `
	    <div>
			<ul>
				<li v-on:click="home" style="float:left"><a>Home</a></li>
  				<li v-on:click="signUp" style="float:right"><a class="selectedTab">Sign up</a></li>
  				<li v-on:click="signIn" style="float:right"><a>Sign in</a></li>
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
        				<td><input v-model="user.birthday" type="date" id="birthdayDatePicker" class="signUpInput"/></td>
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
        var dd = now.getDate();
		var mm = now.getMonth() + 1;
		var yyyy = now.getFullYear();
		if (dd < 10) {
   			dd = '0' + dd;
		}
		if (mm < 10) {
  			mm = '0' + mm;
		} 
		maxDate = yyyy + '-' + mm + '-' + dd;
        document.getElementById("birthdayDatePicker").setAttribute("max", maxDate);
        
        minDate = new Date(1900, 0, 1);
        var dd = minDate.getDate();
		var mm = minDate.getMonth() + 1;
		var yyyy = minDate.getFullYear();
		if (dd < 10) {
   			dd = '0' + dd;
		}
		if (mm < 10) {
  			mm = '0' + mm;
		} 
		minDate = yyyy + '-' + mm + '-' + dd;
        document.getElementById("birthdayDatePicker").setAttribute("min", minDate);
    },
    methods: {
    	signUp : function() {
			event.preventDefault();
			this.validate();
			if (this.valid) {
				axios.post("rest/users/", this.user).then(response => (this.signIn()));
			}
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
    	},
    	home : function() {
			router.push('/');
    	},
    	signIn : function() {
			router.push('/signIn/');
    	}
    }
});