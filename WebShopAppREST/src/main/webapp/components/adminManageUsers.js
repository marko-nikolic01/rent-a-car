Vue.component("adminManageUsers", { 
	data: function () {
	    return {
			users: [],
			filteredUsers: [],
			sortedUsers: [],
			sortCriteria: "-",
			filter: {
				firstName: '',
				lastName: '',
				username: '',
				role: '-'
			},
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
			
			<label>First name:</label><input type="text" v-model="filter.firstName"/>
			<label>Last name:</label><input type="text" v-model="filter.lastName"/>
			<label>Username:</label><input type="text" v-model="filter.username"/>
			<label>User role:</label>
				<select v-model="filter.role">
					<option value="-">-</option>
					<option value="CUSTOMER">Customer</option>
					<option value="MANAGER">Manager</option>
					<option value="ADMINISTRATOR">Administrator</option>
				</select>
			<button v-on:click="filterUsers">Search</button>
			<button v-on:click="cancelSearch">Cancel search</button>
			
			<table class="center">
				<tr>
					<td><label class="signUpLabel">Sort by:</label></td>
    				<td>
    					<select v-model="sortCriteria" v-on:change="sort" name="cars" id="cars" class="signUpInput">
							<option value="-">-</option>
							<option value="FirstNameAscending">First name (ascending)</option>
							<option value="FirstNameDescending">First name (descending)</option>
							<option value="LastNameAscending">Last name (ascending)</option>
							<option value="LastNameDescending">Last name (descending)</option>
							<option value="UsernameAscending">Username (ascending)</option>
							<option value="UsernameDescending">Username (descending)</option>
						</select>
					</td>
				</tr>
			</table>
			
			<div v-for="user in sortedUsers" class='container' style="height: 120px;">
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
        axios.get('rest/users/').then(response => {this.users = response.data;
        		this.filteredUsers = structuredClone(this.users);
        		this.sortedUsers = structuredClone(this.users);});
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
    	},
    	cancelSearch: function() {
			this.filteredUsers = structuredClone(this.users);
			this.sortedUsers = structuredClone(this.users);
			this.sortCriteria = "-";
			
			this.filter = {
				firstName: '',
				lastName: '',
				username: '',
				role: '-'
			}
		},
    	sort : function() {			
			switch (this.sortCriteria) {
			  case 'FirstNameAscending':
			    this.bubbleSort(this.compareByFirstName);
			    break;
			  case 'FirstNameDescending':
			    this.bubbleSort(this.compareByFirstName);
			    this.sortedUsers = structuredClone(this.sortedUsers.reverse());
			    break;
			  case 'LastNameAscending':
			    this.bubbleSort(this.compareByLastName);
			    break;
			  case 'LastNameDescending':
			    this.bubbleSort(this.compareByLastName);
			    this.sortedUsers = structuredClone(this.sortedUsers.reverse());
			    break;
			  case 'UsernameAscending':
			    this.bubbleSort(this.compareByUsername);
			    break;
			  case 'UsernameDescending':
			    this.bubbleSort(this.compareByUsername);
			    this.sortedUsers = structuredClone(this.sortedUsers.reverse());
			    break;
			  case '-':
				  this.sortedUsers = structuredClone(this.filteredUsers);
				  break;
			}
		},
		bubbleSort : function(comparissonFunction) {
	    	for (var i = 0; i < this.sortedUsers.length; i++) {
		        for (var j = 0; j < (this.sortedUsers.length - i - 1); j++) {
		            if (comparissonFunction(this.sortedUsers[j], this.sortedUsers[j + 1])) {
		                var temp = this.sortedUsers[j];
		                this.sortedUsers[j] = this.sortedUsers[j + 1];
		                this.sortedUsers[j + 1] = temp;
		            }
	        	}
	    	}
	    	this.sortedUsers = structuredClone(this.sortedUsers);
		},
		compareByFirstName : function(object1, object2){
			if(object1.firstName.toLowerCase() < object2.firstName.toLowerCase()){
				return false;
			}
			return true;
		},
		compareByLastName : function(object1, object2){
			if(object1.lastName.toLowerCase() < object2.lastName.toLowerCase()){
				return false;
			}
			return true;
		},
		compareByUsername: function(object1, object2){
			if(object1.username.toLowerCase() < object2.username.toLowerCase()){
				return false;
			}
			return true;
		},
    	filterUsers: function() {
			this.filteredUsers = structuredClone(this.users);
			this.sortCriteria = "-";
			
			this.filteredUsers = this.filterByFirstName(this.filteredUsers, this.filter.firstName);
			this.filteredUsers = this.filterByLastName(this.filteredUsers, this.filter.lastName);
			this.filteredUsers = this.filterByUsername(this.filteredUsers, this.filter.username);
			this.filteredUsers = this.filterByRole(this.filteredUsers, this.filter.role);
			
			this.sortedUsers = structuredClone(this.filteredUsers);
		},
		filterByFirstName: function(objects, firstName) {
			let filtered = []
			for (let object of objects) {
				if (object.firstName.toLowerCase().includes(firstName.toLowerCase())) {
					filtered.push(object);
				}
			}
			return filtered;
		},
		filterByLastName: function(objects, lastName) {
			let filtered = []
			for (let object of objects) {
				if (object.lastName.toLowerCase().includes(lastName.toLowerCase())) {
					filtered.push(object);
				}
			}
			return filtered;
		},
		filterByUsername: function(objects, username) {
			let filtered = []
			for (let object of objects) {
				if (object.username.toLowerCase().includes(username.toLowerCase())) {
					filtered.push(object);
				}
			}
			return filtered;
		},
		filterByRole: function(objects, role) {
			if (role == "-") {
				return objects;
			}
			let filtered = [];
			for (let object of objects) {
				if (object.role == role) {
					filtered.push(object);
				}
			}
			return filtered;
		}
    }
});