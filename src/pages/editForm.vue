<template>
  <q-layout
	ref="layout"
	view="lHh Lpr fff"
	:left-class="{'bg-grey-2': true}"
  >
		
		<div id="index" v-if="ObjectLoaded">
			<q-btn glossy round  icon="save" class="submitButton" :loading="submitting" color="amber" @click="simulateSubmit" label="Save">
      		<!-- <q-spinner slot="loading" /> -->
    		</q-btn>
			<span id="itemTitle" v-if="formChildren['displaytitle']" v-html="formChildren['displaytitle'].value"></span>
			<div class="title">
				
				<!-- <h4>Object Type: {{$route.params.subtype}}</h4>
				<h5>Object Id: {{$route.params.objectId}}</h5>	 -->
			</div>
			
			 
		<form action="" name="editForm" id="editForm">
			<div class="sectionContainer" v-for="(elements, section) in formDefinition" :key="section">
			
				<h2>{{section}}</h2>
				<ul class="stuff">

					<li v-if="typeof formChildren[subtypeIndex] === 'object'" v-for="(subtypeObj, subtypeIndex) in elements" :key="subtypeIndex">
						<!-- <p class="red">{{subtypeIndex}}::{{formChildren[subtypeIndex].value}}</p> -->

						
						<hr>
						
						<div>
							<p class="label">{{subtypeObj.label}}</p>

								<div  v-if="subtypeObj.datatype === 'string'">
									
									<RTE v-if="subtypeObj['allow_html']" 
										v-bind:inputValue="formChildren[subtypeIndex]['value']" 
										v-bind:formInputName="formChildren[subtypeIndex]['subtype']"></RTE>
									<textInput v-else  
										v-bind:inputValue="formChildren[subtypeIndex]['value']" 
										v-bind:formInputName="formChildren[subtypeIndex]['subtype']"
										@user-input-changed="updateForm"></textInput>

								</div>
								<div v-if="formChildren[subtypeIndex].datatype === 'file'">
									<fileInput  v-bind:formChild="formChildren[subtypeIndex]"></fileInput>						
								</div>

								<!--

									BREAK OUT THE STRING VALS HERE AND ABOVE
								-->
								<div v-if="subtypeObj.datatype === 'select'">
									<p>formChild: {{formChildren[subtypeIndex]['options']}}</p>
									<selectInput 
									v-bind:inputValue="formChildren[subtypeIndex]['value']"
									v-bind:selectOptions="formChildren[subtypeIndex]['options']"
									v-bind:formInputName="formChildren[subtypeIndex]['subtype']"></selectInput>
								</div>

								<!--
								<div v-if="subtypeObj.datatype === 'select'">
									<p>{{formChildren[subtypeIndex]['value']}}::{{formChildren[subtypeIndex]['options']}}</p>
									<selectInput v-bind:inputValue="formChildren[subtypeIndex]['value']" v-bind:selectOptions="formChildren[subtypeIndex]['options']" v-bind:formInputName="formChildren[subtypeIndex]['subtype']"></selectInput>
								</div>





								<div v-if="subtypeObj.datatype === 'datetime'">
									
									<dateTimeInput 
										v-bind:inputValue="formChildren[subtypeIndex]['value']"
										v-bind:formInputName="formChildren[subtypeIndex]['subtype']"></dateTimeInput>
								
								</div> -->
								
							<!--
							<div v-if="formChildren[subtype].datatype === 'relationselector'">
								<h3>relationselector</h3>
								
								<relationselector v-bind:formChild="formChildren[subtype]"></relationselector>
							</div>
	
							 -->
							
						
						</div>
						
					</li>
				</ul>	
			</div>
		</form>
	</div> 
		
			
	</q-layout>
</template>

<script>
	import {
		dom,
		event,
		QLayout,
		QBtn,
		QInput,
		// QEditor,
		QSelect,
		QSpinner
	} from 'quasar'
	import 'quasar-extras/material-icons'
	import axios from 'axios'
	import serialize from 'form-serialize'
	import moment from 'moment'

	import textInput from './formElements/textInput.vue'
	import RTE from './formElements/rte.vue'
	import fileInput from './formElements/fileInput.vue'
	import selectInput from './formElements/selectInput.vue'

	// import dateTimeInput from './formElements/dateTimeInput.vue'
	
	// import relationselector from './formElements/relationselector.vue'
	
	// const today = new Date()

	export default {
		name: 'editForm',
		components: {
	  // 		dom,
		 //  	event,
			// QLayout,
			// QBtn,
			// QInput,
			// QEditor,
			// QSelect,
			// QSpinner,
			moment,

			textInput,
			fileInput,
			selectInput,
			// dateTimeInput,
			
			// relationselector,
			RTE

		},
		data() {
			return {
				TESTOS: { },
				ObjectLoaded: false,
				formChildren : {},
				datatypes: {},
				objectProperties : {},
				formDefinition : {},
				text: '',
				select: '',
				submitting:false,

				//form stuff
				testText: '',
				userInput : [],
				entireForm : []
			}
		},
		mounted() {
			
			const self = this
			
			self.getTemplate()
			
		},
		filters : {
			collapseSubtypeObject : function( subtype ){
				return this.formData[subtype]
			},
		},
		methods : {
			simulateSubmit () {
				const self = this;
					this.submitting = true
					const form = document.querySelector('#editForm')

					console.log( serialize( form, { hash : true } ) )
					setTimeout(() => {
					// delay simulated, we are done,
					// now restoring submit to its initial state
					self.submitting = false
				}, 3000)
			},


			collapseSubtypeObject( subtype ){
				// console.log( 'subtype: ' + subtype)
				console.log( this.formChildren[subtype] )
				const obj = this.formChildren[subtype]
				

				//	getting string then object. must figure out to 
				//	avoind this kludge.
				if( typeof obj === 'object'){
					return { subtype, obj }	
				}
				
			},

			updateForm(subtype, value) {
				// console.log('data: ' +data, subtype);
				
				this.formChildren[subtype].value = value
			},

			getTemplate(){
				let renameMe = {};
				const vm = this;
				const subtype = this.$route.params.subtype
				
				// let TEMPLATE_URL = process.env.BASE_URL + '/console/get_template/' + subtype;
				let TEMPLATE_URL = 'http://zeppelin.axl/console/get_template/' + subtype;

				var postData = new FormData();
				postData.append( 'user_email', this.$store.user_email );
				postData.append( 'user_token', this.$store.user_token );
				postData.append( 'output_format', 'json')
				axios.post( TEMPLATE_URL, postData )
					.then( resp => {
						console.log('template resp:', resp)

						// populate the list of assets
						const templateDefinition = resp.data.result.data.properties;
						for( var definition in templateDefinition ){
							if( templateDefinition.hasOwnProperty( definition ) ){
								vm.datatypes[definition] = templateDefinition[definition];	
							}
						}

						// populate the form definition

						
						const formDefinition = resp.data.result.data.form_definition


						let definitionObj = {}
						for( var section in  formDefinition.sections ){
							// console.log( 'section: '+ section)
							definitionObj[section] = {};
							
							for ( var item  in formDefinition['sections'][section].elements ){
								// console.log( item );
								definitionObj[section][item] = {subtype: item};
							}
						}
						// console.log( 'defObj: ' + definitionObj)

						vm.formDefinition = definitionObj;

						vm.getObject()

					})
					.catch( error => {
						console.log( 'error: ', error)
					})

				
				
			},
			getObject(){
				const objectId = this.$route.params.objectId;
				// let OBJECT_URL = process.env.BASE_URL + '/console/get_content/' + this.$route.params.subtype + '/' + this.$route.params.objectId;
				let OBJECT_URL = 'http://zeppelin.axl/console/get_content/' + this.$route.params.subtype + '/' + this.$route.params.objectId;
				var postData = new FormData();
				postData.append( 'user_email', this.$store.user_email );
				postData.append( 'user_token', this.$store.user_token );
				postData.append( 'output_format', 'json');
				const vm = this;
				axios.post(OBJECT_URL, postData)
					.then( resp => {
						console.log( 'get_Object response:', resp)
						const data = resp.data.result.data; 
						let key,  item, formChild
						// _.toPairs(data)
						// .sort()
						// _.fromPairs()
						console.log(data)
						for( item in data ){
							// console.log( 'item:', item + '::' +  data[item])

							formChild = {
								value : data[item]
							}

							// so accessable from inside passed object ref:
							// film.subtype === film
							formChild.subtype = item;


							if( typeof vm.datatypes[item] === "object"){
								// formChild.config = self.datatypes[item]
								for( var configItem in  vm.datatypes[item]){
									formChild[configItem] = vm.datatypes[item][configItem]
								}
							}
							// console.log('datatype: ',formChild)
							if( ! formChild.label ){
								formChild.label = item;
							}

							//	FIX ME
							//	gonna need to convert back on save
							if( formChild.datatype === "datetime"){
								
								//empty dataes - set to today
								if( formChild.value === ""){
									formChild.stringTime = {
										sec : moment()._d,
										usec : moment()._d
									}
								} else {
									formChild.stringTime = {
										sec : moment.unix( formChild.value.sec )._d,
										usec : moment.unix( formChild.value.usec )._d
									}	
								}

								
							}


							//	FIXME
							//	empty strings aren't rendering the input?
							//	(doesn't even appear to load the component)
							//	figure out how not to use this kludge
							if( formChild.datatype === "string"){
								if( formChild.value === ""){
									formChild.value=" "  
								}	
							}
							

							
							
							/*
							*	put things without datatypes in a different place
							*/
							if( !formChild.datatype ){
								vm.objectProperties[item] = formChild;
							} else {
								// vm.objectProperties[item] = formChild;
								vm.formChildren[item] = formChild;	
							}


							

						}
						// console.log('formChildren:',vm.formChildren)
						// now load all the formChildren
						// into the unified formDefinition
						for( var section in vm.formDefinition ){
							// console.log( '***' + section + '***', section)
							for( var subtype in vm.formDefinition[section] ){
								// console.log( subtype +'::' + section)
								// console.log( 'and...' + vm.formDefinition[section][subtype])
								vm.formDefinition[section][subtype] = vm.formChildren[subtype]
							}
						}


						vm.TESTOS = { "FOO": { "VALUE": "bar" } };
						vm.ObjectLoaded = true;


					})
					.catch( error => {
						console.log( 'error: ', error)
					})
			}
		}
	}
</script>




<style lang="scss">
	.title {
		width: 50%;
		float:left;
	}
	#itemTitle {
			* {
					text-align: center;
					padding: 30px 0 0;
					font-size: 24px;
				}
		} 
	input[type="text"] {
		text-align: left;
	}
	.red {
		color: red;
	}
	.label {
		font-weight: 700;
		font-size: 24px;
	}
	.q-datetime-input {
		outline: 1px solid black;
		background-color: #BCBCEC;
	}
	.stuff {
		padding: 0;
		li {
			width: 100%;
			padding: 10px 20px;
			overflow: auto;
			clear:left;
		}
	}
	.submitButton {
		float: right;
		margin: 30px;
		width: 120px;
	}
	#index {
		background-color:#C0EEDE;
	}
	.sectionContainer {
		margin: 30px;
		background-color: #fff;
		clear: left;
		clear:right;
		padding: 10px;
		border-radius: 6px;
	}
</style>

