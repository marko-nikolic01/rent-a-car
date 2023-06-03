Vue.component("editProfile", { 
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
			}
	    }
	},
	    template: `
<div>
	<ul>
		<li style="float: right;"><a>Sign out</a></li>
		<li style="float: right;"><a class="selectedTab">Profile</a></li>
		<li style="float: left;"><a>Home</a></li>
	</ul>
	<table class="center">
		<tr>
			<td><label class="signUpLabel">Username:</label></td>
			<td><textarea>{{signedInUser.username}}</textarea></td>
		</tr>
		<tr>
			<td><label class="signUpLabel">First name:</label></td>
			<td><textarea>{{signedInUser.firstName}}</textarea></td>
		</tr>
		<tr>
			<td><label class="signUpLabel">Last name:</label></td>
			<td><textarea>{{signedInUser.lastName}}</textarea></td>
		</tr>
		<tr>
			<td><label class="signUpLabel">Birthday:</label></td>
			<td><textarea>{{signedInUser.birthday}}</textarea></td>
		</tr>
		<tr>
			<td><label class="signUpLabel">Gender:</label></td>
			<td><textarea>{{signedInUser.gender}}</textarea></td>
		</tr>
		<tr>
			<td><label class="signUpLabel">Role:</label></td>
			<td><textarea>{{signedInUser.role}}</textarea></td>
		</tr>
	    <tr>
	    	<td><button class="signUpInput">Apply</button></td>
	    	<td><button v-on:click="discardChanges" class="signUpInput">Discard</button></td>
	    </tr>
	</table>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => {
			this.signedInUser = response.data;
			this.userCopy = structuredClone(this.signedInUser)});
    },
    methods: {
    	discardChanges : function() {
			router.push("/userProfile/");
    	},
    	editProfile : function() {
			event.preventDefault()
			if(JSON.stringify(this.signedInUser) === JSON.stringify(this.userCopy)) {
				 return;
			} 
			else {
				axios.put("rest/editProfile/", this.signedInUser).then(response => (router.push("/userProfile/")))
			}
    	}
    }
});
