Vue.component("managerEditProfile", { 
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
				isDeleted: false
			},
			userCopy: {
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
			valid: true,
			now: ''
	    }
	},
	    template: `
<div>
	<ul>
		<li v-on:click="signOut" style="float: right;"><a>Sign out</a></li>
		<li style="float: right;"><a class="selectedTab">Profile</a></li>
		<li v-on:click="home" style="float:left"><a>Home</a></li>
	</ul>
	<form class="center">
			<h4 class="headingCenter">Account info</h4>
    			<table class="center">
					<tr>
    					<td><label class="signUpLabel">Username:</label></td>
        				<td><input v-model="signedInUser.username" type="text" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td><label class="signUpLabel">Password:</label></td>
        				<td><input v-model="signedInUser.password" type="password" class="signUpInput"/></td>
   						</tr>
				</table>
				<h4 class="headingCenter">User info</h4>
        		<table class="center">
    				<tr>
    					<td><label class="signUpLabel">First name:</label></td>
        				<td><input v-model="signedInUser.firstName" type="text" class="signUpInput"/></td>
    				</tr>
    				<tr>
    					<td><label class="signUpLabel">Last name:</label></td>
        				<td><input v-model="signedInUser.lastName" type="text" class="signUpInput"/></td>
    				</tr>
            		<tr>
    					<td><label class="signUpLabel">Gender:</label></td>
        				<td>
                			<input v-model="signedInUser.gender" type="radio" id="male" name="gender" value="MALE"/>Male
                    		<input v-model="signedInUser.gender" type="radio" id="gender" name="gender" value="FEMALE"/>Female
                		</td>
    				</tr>
            		<tr>
    					<td><label class="signUpLabel">Birthdate:</label></td>
        				<td><input v-model="signedInUser.birthday" type="date" id="birthdayDatePicker" class="signUpInput"/></td>
    				</tr>
    				<br/>
    				<tr>
    					<td><button class="button" v-on:click="discardChanges">Back</button></td>
        				<td><input v-on:click="editProfile" type="submit" class="button"/></td>
    				</tr>
        		</table>
        		<table class="center">
    				<tr><td><label v-if="!valid" class="labelError">You didn't change anything or invalid input.</label></td></tr>
        		</table>
    		</form>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => {
			this.signedInUser = response.data;
			this.userCopy = structuredClone(this.signedInUser)});
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
    	discardChanges : function() {
			event.preventDefault();
			router.push("/managerUserProfile/");
    	},
    	editProfile : function() {
			event.preventDefault();
			let tmp = this.validate();
			if(this.signedInUser.username === this.userCopy.username
			&& this.signedInUser.password === this.userCopy.password
			&& this.signedInUser.firstName === this.userCopy.firstName
			&& this.signedInUser.lastName === this.userCopy.lastName
			&& this.signedInUser.birthday === this.userCopy.birthday
			&& this.signedInUser.username === this.userCopy.username
			&& this.signedInUser.gender === this.userCopy.gender
			|| !tmp) {
				this.valid = false;
				return;
			} 
			else {
				this.valid = true;
				axios.put("rest/users/editProfile", this.signedInUser).then(response => (router.push("/managerUserProfile/")))
			}
    	},
    	validate : function() {
			if (this.signedInUser.username == "") {
				console.log("prazan");
			}
			console.log(this.signedInUser.username);
			if(this.signedInUser.username === ''
			|| this.signedInUser.password === ''
			|| this.signedInUser.firstName === ''
			|| this.signedInUser.lastName === ''
			|| this.signedInUser.birthday === ''
			|| !(this.signedInUser.gender === 'MALE' || this.signedInUser.gender === 'FEMALE')) {
				this.valid = false;
				return false;
			}
			this.valid = true;
			return true;
    	},
    	signOut : function() {
			router.push('/');
    	},
    	home : function() {
			router.push('/managerHome/');
    	}
    }
});
