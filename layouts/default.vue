<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2021</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      fixed: false,
      title: 'My superior Vuetify.js application'
    }
  }
}
</script>
