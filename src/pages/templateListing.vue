<template>
  <q-layout
	ref="layout"
	view="lHh Lpr fff"
	:left-class="{'bg-grey-2': true}"
  >
	
	
	<div class="index">
		
	  <div class="row justify-center">
	  		<h5>{{ $route.params.template }}</h5>
			<table style="margin-top: 30px;" class="q-table striped-even bordered recent_updates" :class="">
				<thead>
					<tr>
						<th class="text-left">Publishing Status</th>
						<th class="text-left">Ttitle (for Display)</th>
						<th class="text-left">Featured Image</th>
						<th class="text-right">Updated</th>
						<th class="text-right">Updated By</th>
						<th class="text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(cell, index) in tableCells">
						<td v-model="cell.status">{{ cell.status }}</td>
						<td v-model="cell.name" v-html="cell.name"></td>
						<td v-model="cell.image"><img :src="cell.image" width="50px" height="50px"></td>
						<td v-model="cell.updated">{{ cell.updated }}</td>
						<td v-model="cell.updated_by">{{ cell.updated_by }}</td>
						
						<td class="buttons" v-model="cell.actions"><q-btn rounded color="amber" icon="mode_edit" @click="openItem"/></td>

					        
					</tr>
	  	
				</tbody>
			</table>
			<div class="pagination">
				<q-pagination
				  v-model="page"
				  color="teal-2"
				  :max="maxPages"
				  
				  boundary-links
				  direction-links
				/>	
				<p>page {{page}}</p>
			</div>
			
		</div>
	</div>

	</q-layout>
</template>
	

<script>
	
	import {
		// dom,
		// event,
		// QLayout,
		// QBtn,
		// QPagination
	} from 'quasar'
	import 'quasar-extras/material-icons'
	import axios from 'axios'

	import moment from 'moment'

	export default {
		name : 'index',

		components : {
			// dom,
			// event,
			// QLayout,
			// QBtn,
			// QPagination
		},
		data() {
			return {
				tableCells : [],
				page : 1,
				maxPages : 1

			}
		}, 
		watch : {
			'$route' (to, from){
				console.log( to + '::' + from)
				this.clearObjectTable();
				this.populateObjectTable();
			},
			page(val){
				this.navigateTo( val )
			}
			
		},
		mounted(){
			this.populateObjectTable();
		},
		
		methods : {
			navigateTo( page ){
				this.clearObjectTable()
				this.populateObjectTable( page )
			},
			addRow(status, title, img, updated, updated_by, actions, key, slug ) {
				// console.log( 'key: ' + key);
				// this.clearObjectTable();
				this.tableCells.push({
					slug : slug,
					status : status,
					name : title,
					image: img,
					updated : updated,
					updated_by : updated_by,
					actions : actions
				});
	  		},
	  		deleteRow(index) {
				this.tableCells.splice(index,1);
			},
	  		clearObjectTable(){
	  			this.tableCells = [];
	  		},
	  		populateObjectTable(current = 1){

				//get the first 10 objects of this subtype
				var self = this;
				let LIST_URL = process.env.BASE_URL + '/api/content';
				LIST_URL += '?user_token=' + this.$store.user_token + '&user_email=' + this.$store.user_email;
				const postData = new FormData();
				postData.append( 'current', current );
				postData.append( 'rowCount', 10 );
				postData.append( 'sort[updated]', 'desc' );
				postData.append( 'searchPhrase', '' )
				postData.append( 'output_format', 'bootgrid' );
				postData.append( 'criteria[subtype]', this.$route.params.template );
				
				axios.post( LIST_URL, postData)
				.then( resp => {
					console.log('template list resp', resp.data)

					//set pagination maxPages
					var pages = Math.floor(resp.data.total / 10);
					if( resp.data.total % 10 > 0 ){
						pages ++;
					}
					self.maxPages = pages;



					resp.data.rows.forEach( function( item, key ){
						console.log( 'key before: ' + key);
						var img = (item.featured_image !== undefined && item.featured_image !== '') ? 'http://' + item.featured_image  : 'http://zeppelin.axl/img/logo-whiteback.png';
						var itemName = (item.displaytitle !== undefined ) ? item.displaytitle : item.slug;
						

						
						var user_api = process.env.BASE_URL + '/api/user/' + item.updateuser.$id.$id + '?output_format=json';
						user_api += '&user_token=' + self.$store.user_token + '&user_email=' + self.$store.user_email;
						
						let listItems = []
						//this is just for getting the updated_by's name
						axios.get( user_api )
							.then( user_response => {

								//now that we have the user,
								//stick the whole row in the table
								var updated_by = user_response.data.result.data.first_name + ' ';
								updated_by += user_response.data.result.data.last_name

								//time formatting
								var timeString = moment.unix(item.updated.sec).fromNow()

								


								/*

								// stub for an attempt to 
								//	handle the async 
								// (it mis-orders the table)
								listItems[key] = {
									status : item.status,
									itemName : itemName,
									img : img,
									timeString : timeString,
									updated_by : updated_by
								}
								
								listItems.sort().forEach( item => {
									self.addRow( item.status, itemName, img, timeString, updated_by, '', key, item.slug)
								})
								*/
							})
							.catch( error => {
								console.log( 'user api error:', error)
							})
						
						
						var timeString = moment.unix(item.updated.sec).fromNow()

						// self.addRow( item.status, itemName, img, timeString, updated_by, '', key, item.slug)
						self.addRow( item.status, itemName, img, timeString, '', '', key, item.slug)
						
					})
				})
				.catch( error => {
					console.log( 'error', error)
				})
		
	  		},
	  		openItem(){

	  		}
		}
	}

</script>

<!--
	
<style lang="scss">
	.pagination {
		clear:left;
		width: 100%;
		text-align:center;
	}
</style>

-->