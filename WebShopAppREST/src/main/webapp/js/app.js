const Home = { template: '<home></home>' }
const SignUp = { template: '<signUp></signUp>' }
const SignIn = { template: '<signIn></signIn>' }
const CustomerUserProfile = { template: '<customerUserProfile></customerUserProfile>' }
const CustomerEditProfile = { template: '<customerEditProfile></customerEditProfile>' }
const CustomerHome = { template: '<customerHome></customerHome>' }
const CustomerComment = { template: '<customerComment></customerComment>' }
const CustomerRentACarObject = { template: '<customerRentACarObject></customerRentACarObject>' }
const CustomerRentCars = { template: '<customerRentCars></customerRentCars>' }
const CustomerCart = { template: '<customerCart></customerCart>' }
const AdminUserProfile = { template: '<adminUserProfile></adminUserProfile>' }
const AdminEditProfile = { template: '<adminEditProfile></adminEditProfile>' }
const AdminHome = { template: '<adminHome></adminHome>' }
const AdminRentACarObject = { template: '<adminRentACarObject></adminRentACarObject>' }
const AdminCreateManager = { template: '<adminCreateManager></adminCreateManager>' }
const AdminCreateRentACarObject = { template: '<adminCreateRentACarObject></adminCreateRentACarObject>' }
const AdminManageUsers = { template: '<adminManageUsers></adminManageUsers>' }
const ManagerUserProfile = { template: '<managerUserProfile></managerUserProfile>' }
const ManagerEditProfile = { template: '<managerEditProfile></managerEditProfile>' }
const ManagerHome = { template: '<managerHome></managerHome>' }
const ManagerMyObject = { template: '<managerMyObject></managerMyObject>' }
const ManagerAddVehicle = { template: '<managerAddVehicle></managerAddVehicle>' }
const ManagerEditVehicle = { template: '<managerEditVehicle></managerEditVehicle>' }
const ManagerOrders = { template: '<managerOrders></managerOrders>' }
const ManagerRejectOrder = { template: '<managerRejectOrder></managerRejectOrder>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/signUp/', component: SignUp},
		{ path: '/signIn/', component: SignIn},
		{ path: '/customer/userProfile/', component: CustomerUserProfile},
		{ path: '/customer/editProfile/', component: CustomerEditProfile},
		{ path: '/customer/home/', component: CustomerHome},
		{ path: '/customer/rentACarObject/:id', component: CustomerRentACarObject},
		{ path: '/customer/comment/:orderCode', component: CustomerComment},
		{ path: '/customer/rentCars/', component: CustomerRentCars},
		{ path: '/customer/cart/', component: CustomerCart},
		{ path: '/admin/userProfile/', component: AdminUserProfile},
		{ path: '/admin/editProfile/', component: AdminEditProfile},
		{ path: '/admin/home/', component: AdminHome},
		{ path: '/admin/rentACarObject/:id', component: AdminRentACarObject},
		{ path: '/admin/createManager/', component: AdminCreateManager},
		{ path: '/admin/createRentACarObject/', component: AdminCreateRentACarObject},
		{ path: '/admin/manageUsers/', component: AdminManageUsers},
		{ path: '/manager/userProfile/', component: ManagerUserProfile},
		{ path: '/manager/editProfile/', component: ManagerEditProfile},
		{ path: '/manager/home/', component: ManagerHome},
		{ path: '/manager/myObject/', component: ManagerMyObject},
		{ path: '/manager/addVehicle/', component: ManagerAddVehicle},
		{ path: '/manager/editVehicle/:id', component: ManagerEditVehicle},
		{ path: '/manager/orders/', component: ManagerOrders},
		{ path: '/manager/rejectOrder/:orderCode', component: ManagerRejectOrder}
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});
