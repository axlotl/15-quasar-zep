<template>
	<div>
		
		<input type="hidden" :name="inputName" :value="fileName">
		<div class="image" v-if="formChild['value']">
			<img :src="image" alt="altText">
		</div>
		<q-btn rounded color="amber" icon="file_upload"/>
		
	</div>
</template>


<script>
import {
		QBtn
	} from 'quasar'
	import 'quasar-extras/material-icons'
	export default {
		components : {
			QBtn
		},
		name: 'fileInput',
		props : ['formChild'],
		data() {
			return {
				image : 'http://' + this.formChild.value,
				inputName: '',
				fileName: '',
				x:'y'
			}
		},
		mounted(){
			this.inputName = this.formChild.subtype
			this.fileName = this.formChild.value
		}
	}

	
</script>

<style lang="scss">
	.stuff {
		img {
			max-width: 370px;
		}
		.image {
			float: left;
		}
		button {
			float: left;
			margin: 5px;
		}
	}
	
</style>