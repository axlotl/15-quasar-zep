<template>
	<div>
		<!-- <H3>TEXT</H3> -->
<!-- 		<p>value: {{internalInputValue}}</p>
		
		<p>name: {{formInputName}}</p> -->
		<q-input 
		ref="input"
		v-model="internalInputValue" 
		inverted 
		@input="grabUserInput($event)" 
		:name="formInputName" 
		placeholder="placeholder text"
		lazy />
	</div>
	
</template>



<script>
	

	import {
		QInput
	} from 'quasar'
	export default {
		name : 'textInput',
		components : {
			QInput
		},
		props: ['inputValue', 'formInputName'],

		data() {
			return {
				// inputName : '',
				

				internalInputValue  : this.inputValue


				// inputValue: ''
				// value: ''
				// formChild: {}
			}
		},
		mounted() {
			// this.formInputName = this.formInputName
		},
		computed : {

		},

		methods : {
			grabUserInput: function($event) {
				console.log( 'event', $event)


				//update parent
				console.log( 'updating parent: ' + this.internalInputValue + '::' + this.formInputName )
				this.$parent.$options.parent.updateForm(this.formInputName, this.internalInputValue);
				
				// this.$forceUpdate();
			}
		}
	}
</script>