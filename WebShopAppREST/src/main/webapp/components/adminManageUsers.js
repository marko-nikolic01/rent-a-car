Vue.component("adminManageUsers", { 
	data: function () {
	    return {
			users: [],
			userPfp: "https://i.pinimg.com/originals/09/04/9a/09049aa9d6e8cb79674ab772702b8c9b.jpg"
	    }
	},
	    template: `
	    <div>
	    	<ul>
    			<li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    			<li v-on:click="userProfile" style="float:right"><a>Profile</a></li>
    			<li v-on:click="home" style="float:left"><a>Home</a></li>
    			<li v-on:click="createManagers" style="float:left"><a>Create managers</a></li>
    			<li v-on:click="createRentACarObject" style="float:left"><a>Create rent a car objects</a></li>
    			<li style="float:left"><a class="selectedTab">Manage users</a></li>
  			</ul>
			<h2 class="headingCenter">Manage users</h2>
			<div v-for="user in users" class='container' style="height: 120px;">
				<img src="https://i.pinimg.com/originals/09/04/9a/09049aa9d6e8cb79674ab772702b8c9b.jpg" height="120" width="100" class="containerImage">
				<label class="containerLabel">Username: {{user.username}}</label><br/>
				<label class="containerLabel">Name: {{user.firstName}} {{user.lastName}}</label><br/>
				<label class="containerLabel">Date of birth: {{user.birthday}}</label><br/>
				<label class="containerLabel">Gender: {{user.gender}}</label><br/>
				<label class="containerLabel">Role: {{user.role}}</label><br/>
				<label v-if="user.deleted" class="containerConditionalLabelFalse">This user is deleted</label><br/>
				<label v-if="!user.deleted" class="containerConditionalLabelTrue"></label><br/>
			</div>
		</div>
	    `,
    mounted () {
        axios.get('rest/users/').then(response => (this.users = response.data));
    },
    methods: {
    	signOut : function() {
			router.push('/');
    	},
    	userProfile : function() {
    		router.push("/admin/userProfile/");
    	},
    	createManagers : function() {
			router.push('/admin/createManager/');
    	},
    	createRentACarObject : function() {
			router.push('/admin/createRentACarObject/');
    	},
    	home : function() {
			router.push('/admin/home/');
    	}
    }
});