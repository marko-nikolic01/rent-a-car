const Home = { template: '<home></home>' }
const SignUp = { template: '<signUp></signUp>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/signUp/', component: SignUp},
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});