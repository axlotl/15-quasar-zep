<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
  	<div class="container">
		<router-view />
  	</div>
    
  </div>
</template>

<script>

/*
 * Root component
 */
export default {
	updated(){
		console.log( 'user token',  this.$store.user_token);
		if( !this.$store.user_token && this.$route.path !== '/'){
			console.log( 'rerouting to login' );

			//	for redirect after future successful login
			//	this doesn't work just now. -c
			// this.$router.push( '/redirect=' + this.$route.path );
			
			this.$router.push('/');
			
		}
	}
}
</script>

<style></style>