<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <router-link to="/console">
          <q-btn
      flat
      
      >
            <q-icon name="menu" />
          </q-btn>
         </router-link>

        <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar! v{{ $q.version }}</div>
        </q-toolbar-title>

        <q-select
          stack-label="Content"
          inverted
          color="green-6"
          separator
          v-model="select"
          :options="templates"
          class="content_picker"
          @change="changeContentSelect($event)"
      />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Essential Links</q-list-header>
        <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">
          <q-item-side icon="code" />
          <q-item-main label="GitHub" sublabel="github.com/quasarframework" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { 
  openURL,
  QSelect,
  QField
   } from 'quasar'

export default {
  name: 'LayoutDefault',
  components: {
    QSelect,
    QField
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      select: '',
      tableCells : [],
      templates : []
    }
  },
  mounted() {
    this.getTemplateList()
  },
  methods: {
    openURL,
      goToHomeConsole(){
        this.$router.push('/console');
      },
      changeContentSelect($ev){
        console.log('loading ' + $ev);
        this.$router.push('/templateListing/' + $ev);
      },
      
      getTemplateList(){
        var self = this;
        console.log( 'ROUTE: ', this.$route.name);
        if(this.$route.name === 'console' ){
          // axios.get( process.env.BASE_URL + '/console?output_format=json&user_token=' + this.$store.user_token + '&user_email=' + this.$store.user_email )
          this.$axios.get(  'http://zeppelin.axl/console?output_format=json&user_token=' + this.$store.user_token + '&user_email=' + this.$store.user_email )
            .then( resp => {
              console.log('templates:')
              console.log(typeof resp, resp);
                
              // sort and insert available templates
              var templates = resp.data.result.data.templates;
              // console.log( 'templates after: ', templates);
            
              Object.keys(templates)
              .sort()
              .forEach( function( key, template ) {
                  
              self.templates.push({
                label : templates[key].name,
                value : templates[key].name
              }
            );
          });

                
          })
          .catch( err =>{
            console.log( 'axios error: ', err);
          });
        }
      }
      
    }
  }

</script>

<style>
</style>
