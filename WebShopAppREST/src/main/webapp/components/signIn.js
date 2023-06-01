Vue.component("signIn", { 
	data: function () {
	    return {
			credentials: {
				username:'',
				password: ''
			},
			valid: true
	    }
	},
	    template: `
	    <div>
			<h1>PUSIGA</h1>
    	</div>
		`,
    mounted () {
    },
    methods: {
    	signIn : function() {
			event.preventDefault()
			this.validate();
			if (this.valid) {
				axios.post("rest/users/signin", this.credentials).then(response => {
					if(response.data != null) {
						router.push("/userProfile/");
					}
				});
			}
    	},
    	validate : function() {
			if(this.credentials.username === ''
			|| this.credentials.password === '') {
				this.valid = false;
				return;
			}
			this.valid = true;
    	},
    	home : function() {
			router.push('/');
    	},
    	signUp : function() {
			router.push('/signUp/');
    	}
    }
});