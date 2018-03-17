<template>
	<div>
		<!-- <H3>TEXTAREA</H3>
		<p>{{formChild}}</p> -->
		<q-editor
		  v-model="internalInputValue"
			type="textarea"
			@input="grabUserInput($event)"
			:name="formInputName"
		/>
		
	</div>
</template>
<script>
	
	import {
		QEditor,
		// QInput
	} from 'quasar'

	export default {
		name: 'RTE',
		props: ['inputValue', 'formInputName'],
		components : {
			QEditor,
			// QInput
		},
		data(){
			return {
				internalInputValue  : this.inputValue
			}
		},
		mounted() {
			this.formInputName = this.formInputName
		},
		methods : {
			grabUserInput: function($event){
				console.log( 'updating parent: ' + this.internalInputValue + '::' + this.formInputName )
				this.$parent.$options.parent.updateForm(this.formInputName, this.internalInputValue);
			}
		}

	}
</script>
<!--

<style lang="scss">
textarea {
	outline: 1px solid #000 !important;
	height: 200px;
	width: 80% !important;
}
</style>

-->