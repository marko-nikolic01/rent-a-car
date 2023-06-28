Vue.component("managerOrders", { 
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
				isDeleted: false,
				rentACarObject: {
					id: -1
				},
			},
			doesManagerHaveObject: false,
			sortCriteria: "-",
			managerOrders: []
	    }
	},
	    template: `
<div>
  
  <ul>
    <li v-on:click="signOut" style="float:right"><a>Sign out</a></li>
    <li style="float:right"><a class="selectedTab">Profile</a></li>
    <li v-on:click="home" style="float:left"><a>Home</a></li>
    <li v-on:click="myObject" style="float:left"><a>My object</a></li>
    <li style="float:left"><a>Orders</a></li>
  </ul>			
  
  <h4 class="headingCenter">Orders</h4>
  		<table class="center">
			<tr>
				<td><label class="signUpLabel">Sort by:</label></td>
    			<td>
    				<select v-model="sortCriteria" v-on:change="sort" name="cars" id="cars" class="signUpInput">
  						<option value="-">-</option>
  						<option value="RentACarObjectAscending">Rent a car object (ascending)</option>
  						<option value="RentACarObjectDescending">Rent a car object (descending)</option>
  						<option value="PriceAscending">Price (ascending)</option>
  						<option value="PriceDescending">Price (descending)</option>
  						<option value="DateAscending">Date (ascending)</option>
  						<option value="DateDescending">Date (descending)</option>
					</select>
				</td>
			</tr>
		</table>
  	<div v-for="order in managerOrders" class='container' style="height: 120px;">
		<img v-bind:src="order.vehicle.photoURL" height="120" width="150" class="containerImage">
		<label class="containerLabel">Vehicle: {{order.vehicle.brand}} {{order.vehicle.model}}</label><br/>
		<label class="containerLabel">Rent a car object: {{order.rentACarObject.name}}</label><br/>
		<label class="containerLabel">Order date and time: {{order.orderDateTime}}</label><br/>
		<label class="containerLabel">Order duration (days): {{order.durationDays}}</label><br/>
		<label class="containerLabel">Price: {{order.price}}</label><br/>
		<label class="containerLabel">Status: {{order.status}}</label><br/>
		<label class="containerLabel">Customer name: {{order.customerName}}</label><br/>
	</div>

</div>
	    `,
    mounted () {
        axios.get("rest/users/signedInUser").then(response => {
			this.signedInUser = response.data
			if(this.signedInUser.rentACarObject.id == -1) {
				this.doesManagerHaveObject = false;
			}
			else {
				this.doesManagerHaveObject = true;
			}
			axios.get('rest/orders/getByRentACarObject/' + this.signedInUser.rentACarObject.id).then(response => (this.managerOrders = response.data));
		});
		
    },
    methods: {
    	editProfile : function() {
			router.push("/manager/editProfile/");
    	},
    	signOut : function() {
			router.push('/');
    	},
    	myObject : function() {
			router.push('/manager/myObject/');
    	},
    	home : function() {
			router.push('/manager/home/');
    	},
		orders: function() {
			router.push('/manager/orders/');	
		},
		sort : function() {			
			switch (this.sortCriteria) {
			  case 'RentACarObjectAscending':
			    this.bubbleSort(this.compareRentACarObject);
			    console.log("1");
			    break;
			  case 'RentACarObjectDescending':
			    this.bubbleSort(this.compareRentACarObject);
			    this.managerOrders = structuredClone(this.managerOrders.reverse());
			    console.log("2");
			    break;
			  case 'PriceAscending':
			    this.bubbleSort(this.comparePrice);
			    console.log("3");
			    break;
			  case 'PriceDescending':
			    this.bubbleSort(this.comparePrice);
			    this.managerOrders = structuredClone(this.managerOrders.reverse());
			    console.log("4");
			    break;
			  case 'DateAscending':
			    this.bubbleSort(this.compareDateTime);
			    console.log("5");
			    break;
			  case 'DateDescending':
			    this.bubbleSort(this.compareDateTime);
			    this.managerOrders = structuredClone(this.managerOrders.reverse());
			    console.log("6");
			    break;
			  case '-':
				  this.managerOrders = structuredClone(this.managerOrders);
				  console.log("7");
				  break;
			}
		},
		bubbleSort : function(comparissonFunction) {
	    	for (var i = 0; i < this.managerOrders.length; i++) {
		        for (var j = 0; j < (this.managerOrders.length - i - 1); j++) {
		            if (comparissonFunction(this.managerOrders[j], this.managerOrders[j + 1])) {
		                var temp = this.managerOrders[j];
		                this.managerOrders[j] = this.managerOrders[j + 1];
		                this.managerOrders[j + 1] = temp;
		            }
	        	}
	    	}
	    	this.managerOrders = structuredClone(this.managerOrders);
		},
		compareByName : function(object1, object2){
			if(object1.name.toLowerCase() < object2.name.toLowerCase()){
				return false;
			}
			return true;
		},
		compareRentACarObject : function(order1, order2){
			if(order1.rentACarObject.name.toLowerCase() < order2.rentACarObject.name.toLowerCase()){
				return false;
			}
			return true;
		},
		comparePrice : function(order1, order2){
			if(order1.price < order2.price){
				console.log(order1.price + "<" + order2.price);
				return false;
			}
			console.log(order1.price + ">=" + order2.price);
			return true;
		},
		compareDateTime : function(order1, order2){
			let dateString1 = order1.orderDateTime.substring(0, 19);
			let date1 = new Date(dateString1);
			let dateString2 = order2.orderDateTime.substring(0, 19);
			let date2 = new Date(dateString2);
			if(date1 < date2){
				console.log(date1 + " < " + date2);
				return false;
			}
			console.log(date1 + " >= " + date2);
			return true;
		}
    }
});