<template>
	<div>
		<!-- <h3>SELECT</h3> -->
		<p>value: {{internalInputValue}}</p>
		<p>options: {{internalSelectOptions}}</p>
		<p>name: {{formInputName}}</p>
		<div v-if="internalInputValue">
			<q-select
			      v-model="internalInputValue"
			      
			      
			     :options="selectOptions"
					:name="formInputName"
					@input="grabUserInput($event)" 
					inverted
			    />	
		</div>
		
	</div>
</template>

<script>
	const vw = this;
	
	import {
		QSelect
	} from 'quasar'
	export default {
		name : 'selectInput',
		components : {
			QSelect
		},
		props : ['inputValue', 'selectOptions', 'formInputName'],
		data() {
			return {
				
				internalSelectOptions : this.selectOptions,
				internalInputValue: this.inputValue,
				// internalFormInputName : this.formInputName,
				
			}
		},
		mounted(){
			
			// this.formInputName = this.formInputName
			// this.internalSelectOptions = this.selectOptions
			// this.internalInputValue = this.inputValue


			console.log( 'this is formChild', this.inputValue)
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