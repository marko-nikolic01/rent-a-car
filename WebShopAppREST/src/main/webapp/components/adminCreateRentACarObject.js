Vue.component("adminCreateRentACarObject", { 
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
				role: 'MANAGER',
				isDeleted: false
			},
			repeatPassword: '',
			valid: true,
			unemployedManagersExist: true,
			now: ''
	    }
	},
	    template: `
	    <div>
			<ul>
  				<li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    			<li v-on:click="userProfile" style="float:right"><a>Profile</a></li>
    			<li v-on:click="home" style="float:left"><a>Home</a></li>
    			<li v-on:click="createManagers" style="float:left"><a>Create managers</a></li>
    			<li style="float:left"><a class="selectedTab">Create rent a car objects</a></li>
			</ul>
			<form class="center">
			<h2 class="headingCenter">Create a rent a car object</h2>
			<h4 class="headingCenter">Object info</h4>
				<table class="center">
					<tr>
    					<td><label class="signUpLabel">Name:</label></td>
        				<td><input type="text" class="signUpInput"/></td>
    				</tr>
    				
    				<tr>
    					<td><label class="signUpLabel">Logo (image URL):</label></td>
        				<td><input type="text" class="signUpInput"/></td>
    				</tr>
				</table>
			<h4 class="headingCenter">Working time</h4>
				<table class="center">
					<tr>
    					<td><label class="signUpLabel">Start:</label></td>
        				<td><input type="time" class="signUpInput"/></td>
    				</tr>
    				
    				<tr>
    					<td><label class="signUpLabel">End:</label></td>
        				<td><input type="time" class="signUpInput"/></td>
    				</tr>
				</table>
			<h4 class="headingCenter">Location info</h4>
				<table class="center">
					<tr>
    					<td><label class="signUpLabel">Longitude:</label></td>
        				<td><input type="number" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td><label class="signUpLabel">Latitude:</label></td>
        				<td><input type="number" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td><label class="signUpLabel">City:</label></td>
        				<td><input type="text" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td><label class="signUpLabel">Street:</label></td>
        				<td><input type="text" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td><label class="signUpLabel">Street number:</label></td>
        				<td><input type="number" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td><label class="signUpLabel">ZIP Code:</label></td>
        				<td><input type="number" class="signUpInput"/></td>
    				</tr>
				</table>
			<h4 class="headingCenter">Manager</h4>
				<table class="center" v-if="unemployedManagersExist">
					<tr>
    					<td><label class="signUpLabel">Manager:</label></td>
        				<td>
        					<select name="cars" id="cars" class="signUpInput">
  								<option>Boss</option>
  								<option>Pera</option>
  								<option>Bruh</option>
							</select>
						</td>
    				</tr>
				</table>
    			<table class="center" v-if="!unemployedManagersExist">
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
				axios.post("rest/users/", this.user).then(response => (this.userProfile()));
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
		signOut : function() {
			router.push('/');
    	},
    	userProfile : function() {
    		router.push("/admin/userProfile/");
    	},
    	home : function() {
			router.push('/admin/home/');
    	},
    	createManagers : function() {
			router.push('/admin/createManager/');
    	}
    }
});
