const Home = { template: '<home></home>' }
const SignUp = { template: '<signUp></signUp>' }
const SignIn = { template: '<signIn></signIn>' }
const UserProfile = { template: '<userProfile></userProfile>' }
const EditProfile = { template: '<editProfile></editProfile>' }
const HomeSignedIn = { template: '<homeSignedIn></hHomeSignedInome>' }


const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/signUp/', component: SignUp},
		{ path: '/signIn/', component: SignIn},
		{ path: '/userProfile/', component: UserProfile},
		{ path: '/editProfile/', component: EditProfile},
		{ path: '/home/', component: HomeSignedIn}
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});
