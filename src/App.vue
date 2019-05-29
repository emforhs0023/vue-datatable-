<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="isLogin === true"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template>
        <v-list-tile v-if="isLogin === true" router :to="{name:'home'}">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Main</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="isLogin === false" router :to="{name:'login'}">
            <v-list-tile-action>
              <v-icon>power_settings_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>로그인</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="isLogin === true" router :to="{name:'monitoring'}">
            <v-list-tile-action>
              <v-icon>airplay</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>monitoring</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="isLogin === true" router :to="{name:'test'}">
            <v-list-tile-action>
              <v-icon>airplay</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>test</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="isLogin === true" router :to="{name:'test1'}">
            <v-list-tile-action>
              <v-icon>airplay</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>test1</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <!-- <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-tile v-else :key="item.text" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">M-tag</span>
      </v-toolbar-title>
<!--       <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field> -->
      <v-spacer></v-spacer>
       <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">

       <v-menu offset-y v-if="isLogin">
        <template v-slot:activator="{ on }">
          <v-btn
            slot="activator"
            dark
            flat
            icon
            v-on="on"
          >
           <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
      <v-list>
        <v-list-tile route :to="{name: 'mypage'}">
          <v-list-tile-title>마이페이지</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$store.dispatch('logout')"> 
          <v-list-tile-title>로그아웃</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
     
    </v-toolbar-items>
     <!--  <v-btn icon
      @click="dialog = !dialog">
        <v-icon>apps</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-content>
       <router-view/> 
    </v-content>

    </v-btn>
    <!-- <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create contact
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Job title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-app>
</template>

<script>
  import { mapState, mapActions } from "vuex"
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'contacts', text: 'Contacts' },
        { icon: 'history', text: 'Frequently contacted' },
        { icon: 'content_copy', text: 'Duplicates' },
      ]
    }),
    computed: {
      ...mapState(["isLogin"])
    },
     methods:{
      ...mapActions(["logout"])
    },
    props: {
      source: String
    }
  }
</script>

