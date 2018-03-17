<template>
	<div v-if="inputValue">
		<!-- <H3>TEXT</H3> -->
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
			this.formInputName = this.formInputName
		},
		computed : {

		},

		methods : {
			grabUserInput: function($event) {
				console.log( 'event', $event)
				// update self
				
				
				console.log('grab is called')
				console.log(this.value)
				// this.formChild.value = data
				// this.$set(this.formChild['value'], 'value', data)

				// const value = data;
				// this.$emit('formInputName', {subtype : this.formInputName, value: this.internalInputValue})

				//update parent
				console.log( 'updating parent: ' + this.internalInputValue + '::' + this.formInputName )
				this.$parent.$options.parent.updateForm(this.formInputName, this.internalInputValue);
				
				// this.$forceUpdate();
			}
		}
	}
</script>