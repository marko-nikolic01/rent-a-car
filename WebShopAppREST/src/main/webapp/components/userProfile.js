Vue.component("userProfile", { 
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
	    }
	},
	    template: `
<div>
  
  <ul>
    <li style="float:right"><a>Sign out</a></li>
    <li style="float:right"><a class="selectedTab">Profile</a></li>
    <li style="float:left"><a>Home</a></li>
  </ul>
  
  <h4 class="headingCenter">Account info</h4>
			
  <table class="center">
    <tr>
      <td><label class="signUpLabel">Username:</label></td>
      <td><textarea v-model="signedInUser.username"></textarea></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">First name:</label></td>
      <td><textarea v-model="signedInUser.firstName"></textarea></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Last name:</label></td>
      <td><textarea v-model="signedInUser.lastName"></textarea></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Birthday:</label></td>
      <td><textarea v-model="signedInUser.birthday"></textarea></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Gender:</label></td>
      <td><textarea v-model="signedInUser.gender"></textarea></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Role:</label></td>
      <td><textarea v-model="signedInUser.role"></textarea></td>
    </tr>
  </table>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => (this.signedInUser = response.data));
    },
    methods: {
    	template : function() {
    	}
    }
});