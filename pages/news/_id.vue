<template>
  <div v-if="news !== null">
    <v-overlay
      :absolute="true"
      :value="overlay"
      :opacity="0.9"
      z-index="2"
    >
      <v-img @click="overlay = false" width="100vw" height="100vh" :src="zoomImg"/>
    </v-overlay>
    <v-card
      elevation="6"
      style="margin-bottom: 24px;"
    >
      <v-card-title>
        <h1 style="margin-bottom: 40px">
          {{ news.title }}
        </h1>
      </v-card-title>
      <v-card-subtitle>{{ news.description }}</v-card-subtitle>
      <v-card-text>{{ (new Date(news.created)).toDateString() }}</v-card-text>
    </v-card>

    <v-btn
      :href="news.link"
      style="margin-bottom: 24px"
      target="_blank"
      color="primary"
      block
    >
      Читать в источнике
    </v-btn>

    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(item,i) in news.enclosures"
        :key="i"
        :src="item.url"
        @click="zoom(item.url)"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      news: null,
      overlay: false,
      zoomImg: null
    }
  },
  methods: {
    zoom (url) {
      this.zoomImg = url
      this.overlay = true
    }
  },
  async mounted () {
    if (this.$store.state.news === null) {
      try {
        await this.$store.dispatch('getNews')
      } catch (e) {
      }
    }
    this.news = this.$store.getters.getNewsByTitle(this.$route.params.id)
    console.log(this.news)
  }
}
</script>
