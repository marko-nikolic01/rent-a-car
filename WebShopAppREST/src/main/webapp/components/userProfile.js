Vue.component("userProfile", { 
	data: function () {
	    return {
	    }
	},
	    template: `
	    <div>
			<ul>
				<li v-on:click="home" style="float:left"><a>Home</a></li>
  				<li v-on:click="signUp" style="float:right"><a class="selectedTab">Sign up</a></li>
  				<li style="float:right"><a>Sign in</a></li>
  				<li style="float:right"><a>loooooooooool</a></li>
			</ul>
    	</div>
	    `,
    mounted () {
        
    },
    methods: {
    	template : function() {
    	}
    }
});