Vue.component("home", { 
	data: function () {
	    return {
	    }
	},
	    template: `
	    <ul>
  			<li v-on:click="signUp" style="float:right"><a>Sign up</a></li>
  			<li style="float:right"><a>Sign in</a></li>
		</ul>
	    `,
    mounted () {
        
    },
    methods: {
    	signUp : function() {
			router.push('/signUp/');
    	}
    }
});