const Home = { template: '<home></home>' }
const SignUp = { template: '<signUp></signUp>' }
const SignIn = { template: '<signIn></signIn>' }
const CustomerUserProfile = { template: '<customerUserProfile></customerUserProfile>' }
const CustomerEditProfile = { template: '<customerEditProfile></customerEditProfile>' }
const CustomerHome = { template: '<customerHome></customerHome>' }
const AdminUserProfile = { template: '<adminUserProfile></adminUserProfile>' }
const AdminEditProfile = { template: '<adminEditProfile></adminEditProfile>' }
const AdminHome = { template: '<adminHome></adminHome>' }
const ManagerUserProfile = { template: '<managerUserProfile></managerUserProfile>' }
const ManagerEditProfile = { template: '<managerEditProfile></managerEditProfile>' }
const ManagerHome = { template: '<managerHome></managerHome>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/signUp/', component: SignUp},
		{ path: '/signIn/', component: SignIn},
		{ path: '/customerUserProfile/', component: CustomerUserProfile},
		{ path: '/customerEditProfile/', component: CustomerEditProfile},
		{ path: '/customerHome/', component: CustomerHome},
		{ path: '/adminUserProfile/', component: AdminUserProfile},
		{ path: '/adminEditProfile/', component: AdminEditProfile},
		{ path: '/adminHome/', component: AdminHome},
		{ path: '/managerUserProfile/', component: ManagerUserProfile},
		{ path: '/managerEditProfile/', component: ManagerEditProfile},
		{ path: '/managerHome/', component: ManagerHome}
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});
