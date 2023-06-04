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
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li style="float:right"><a class="selectedTab">Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
  </ul>
  
  <h4 class="headingCenter">Account info</h4>
  
  
			
  <table class="center">
    <tr>
      <td><label class="signUpLabel">Username:</label></td>
      <td><label>{{signedInUser.username}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">First name:</label></td>
      <td><label>{{signedInUser.firstName}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Last name:</label></td>
      <td><label>{{signedInUser.lastName}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Birthday:</label></td>
      <td><label>{{signedInUser.birthday}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Gender:</label></td>
      <td><label>{{signedInUser.gender}}</label></td>
    </tr>
     <tr>
      <td><label class="signUpLabel">Role:</label></td>
      <td><label>{{signedInUser.role}}</label></td>
    </tr>
    <tr>
      <button class="button" v-on:click="editProfile">Edit</button>
    </tr>
  </table>
</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => (this.signedInUser = response.data));
    },
    methods: {
    	editProfile : function() {
			router.push("/editProfile/");
    	},
    	signOut : function() {
			router.push('/');
    	},
    	home : function() {
			router.push('/home/');
    	}
    }
});