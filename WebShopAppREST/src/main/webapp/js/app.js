const Home = { template: '<home></home>' }
const SignUp = { template: '<signUp></signUp>' }
const SignIn = { template: '<signIn></signIn>' }
const CustomerUserProfile = { template: '<customerUserProfile></customerUserProfile>' }
const CustomerEditProfile = { template: '<customerEditProfile></customerEditProfile>' }
const CustomerHome = { template: '<customerHome></customerHome>' }
const AdminUserProfile = { template: '<adminUserProfile></adminUserProfile>' }
const AdminEditProfile = { template: '<adminEditProfile></adminEditProfile>' }
const AdminHome = { template: '<adminHome></adminHome>' }
const AdminCreateManager = { template: '<adminCreateManager></adminCreateManager>' }
const AdminCreateRentACarObject = { template: '<adminCreateRentACarObject></adminCreateRentACarObject>' }
const ManagerUserProfile = { template: '<managerUserProfile></managerUserProfile>' }
const ManagerEditProfile = { template: '<managerEditProfile></managerEditProfile>' }
const ManagerHome = { template: '<managerHome></managerHome>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/signUp/', component: SignUp},
		{ path: '/signIn/', component: SignIn},
		{ path: '/customer/userProfile/', component: CustomerUserProfile},
		{ path: '/customer/editProfile/', component: CustomerEditProfile},
		{ path: '/customer/home/', component: CustomerHome},
		{ path: '/admin/userProfile/', component: AdminUserProfile},
		{ path: '/admin/editProfile/', component: AdminEditProfile},
		{ path: '/admin/home/', component: AdminHome},
		{ path: '/admin/createManager/', component: AdminCreateManager},
		{ path: '/admin/createRentACarObject/', component: AdminCreateRentACarObject},
		{ path: '/manager/userProfile/', component: ManagerUserProfile},
		{ path: '/manager/editProfile/', component: ManagerEditProfile},
		{ path: '/manager/home/', component: ManagerHome}
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});
