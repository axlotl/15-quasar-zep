<template>
  <q-layout
	ref="layout"
	view="lHh Lpr fff"
	:left-class="{'bg-grey-2': true}"
  >
	

	<div class="index">
		
	  <div class="row justify-center">
	  		<h5>Recent Updates</h5>
			<table style="margin-top: 30px;" class="q-table striped-even bordered recent_updates" :class="">
				<thead>
					<tr>
						<th class="text-left">Image</th>
						<th class="text-left">Type</th>
						<th class="text-left">Name</th>
						<th class="text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(cell, index) in tableCells">

						<td v-model="cell.image"><img :src="cell.image" width="50px" height="50px"></td>
						<td v-model="cell.type">{{ cell.subtype }}</td>
						<td v-model="cell.name" v-html="cell.name"></td>
						<td class="buttons" v-model="cell.action"><q-btn rounded color="amber" icon="mode_edit" @click="editObject(cell.action, cell.subtype)"/></td>

					        
					</tr>
	  	
				</tbody>
			</table>
			
		</div>
	</div>
  </q-layout>
</template>

<script>

	


import {
  dom,
  event,
  QLayout,
  QBtn
} from 'quasar'
import 'quasar-extras/material-icons'
// import axios from 'axios'



export default {
  name: 'index',
  components: {
	QLayout,
	QBtn

  },

	data() {
		return { 
			
			tableCells : [],
			templates : []
		};
	},
	computed : {
		count() {
			// return this.store.state.count;
		}
	},

	mounted () {
		this.populateObjectTable();
	},
	
	methods: {
		changeContentSelect($ev){
			console.log($ev);
		},
	  addRow(image, subtype, name,  objectId) {
	  	console.log( '_id', objectId);
	    this.tableCells.push({
	      image: image,
	      subtype: subtype,
	      name : name,
	      action : objectId
	    });
	  },
	 
	  editObject(objectId, subtype){
	  		//this is for the action buttons
			
			console.log( 'arguments', arguments)
			this.$router.push('/editForm/' + subtype + '/' + objectId );
	  },
	  deleteRow(index) {
	    this.inputs.splice(index,1);
	  },
		clearObjectTable(){
			this.tableCells = [];
		},
	  populateObjectTable(){

	  	  	
	  	  	var self = this;
	  	  	console.log( 'ROUTE: ', this.$route.name);
	  	  	if(this.$route.name === 'console'){

	  			//get recently updated items
	  	  		// axios.get( process.env.BASE_URL +  '/console?output_format=json&user_token=' + this.$store.user_token + '&user_email=' + this.$store.user_email )
	  	  		this.$axios.get( 'http://zeppelin.axl/console?output_format=json&user_token=' + this.$store.user_token + '&user_email=' + this.$store.user_email )
	  	  		  .then( resp => {
	  	  		  		

	  	  		  		//recently updated items
	  	  				resp.data.result.data.updated.forEach( item => {
	  	  					// console.log( 'item', item );
	  	  					// console.log( 'item._id.$id', item._id.$id)
	  	  					var img = (item.featured_image !== undefined && item.featured_image !== '') ? 'http://' + item.featured_image  : 'http://zeppelin.axl/img/logo-whiteback.png';
	  	  					var name = (item.displaytitle !== undefined ) ? item.displaytitle : item.slug;
	  	  					self.addRow( img, item.subtype, name, item._id.$id );
	  	  			});
	  	  		  })
	  	  		  .catch( err =>{
	  	  				console.log( 'axios error: ', err);
	  	  		  });
	  	  	}
	  },


	  /*
	  *	vuex methods
	  */
		increment () {
			this.store.commit('increment')
		},
		decrement () {
			this.store.commit('decrement')
		}
	}
}
</script>



<style lang="scss">
.index {
	h5 {
		color: red;
		
		width: 100vw;
		text-align:center;
	}
	.recent_updates {
		clear: left;
		.buttons {
			button {
				width: 50px;
			}
		}
	}
	.counter {
		button {
			color: #000;
		}
	}
	
}
.content_picker {
	min-width: 200px;
}


</style>

