<template>
	<q-layout
	ref="layout"
	view="lHh Lpr fff"
	:left-class="{'bg-grey-2': true}"
  >
		<div class="formwrap">
			
			<h2>Please log in</h2>
			<form @submit.prevent="login">
				<input v-model="email" type="email" placeholder="email" name="email">
				<input v-model="password" type="text" placeholder="password" name="password">
				<button type="submit">Log in</button>

			</form>	
		</div>
	</q-layout>
	

</template>


<script>
	import {
		// dom,
		// event,
		// QLayout,
		// QBtn
	} from 'quasar'
	// import 'quasar-extras/material-icons'
	// import axios from 'axios'
	




	export default {
		// components : {
			
		// 	QLayout
		// },
		name : "login",
		data() {
			return {
				email : '',
				password : '',
				error : true
			};
		},
		created(){
			this.checkCurrentLoginStatus()
		},
		updated(){
			this.checkCurrentLoginStatus()
		},
		methods : {
			checkCurrentLoginStatus(){
				if( this.$store.user_token ){
					this.$router.replace( this.$route.query.redirect || '/console');
				}
			},
			login(){
				console.log(  'email: ' + this.email );
				console.log( 'password: ' + this.password );
				console.log( process.env );


				var self = this;
				var postData = new FormData();
				postData.append( 'email', this.email );
				postData.append( 'password', this.password );
				postData.append( 'output_format', 'json');
					// const LOGIN_URL = process.env.BASE_URL + '/authentication/login'
					const LOGIN_URL = 'http://zeppelin.axl//authentication/login'
				this.$axios({
						method : 'post',
						headers: {"Content-Type": "multipart/form-data"},
						url : LOGIN_URL,
						data : postData
				})
				
					.then( resp => {
						console.log( 'resp', resp );
						this.loginSuccessful( resp );
					})
					.catch( error => {
						console.log( 'error: ' + error);
						this.loginFailed();
					})
				
			},
			loginSuccessful( resp ){
				if( !resp.data.auth.data.user_token ){
					this.loginFailed();
				}
				this.$store.user_token = resp.data.auth.data.user_token;
				this.$store.user_email = resp.data.auth.data.email;
				console.log( 'store token', this.$store.user_token);
				this.$router.replace( this.$route.query.redirect || '/console');

				//cookies
				// this.$cookies.set( 'user_email', resp.data.auth.data.email, 7)
				// this.$cookies.set( 'user_token', resp.data.auth.data.user_token, 7)
			},
			loginFailed(){
				this.error = 'Login failed!';
  				delete this.$store.token;
			}
		}
	}
</script>
