<template>
  <div>
    <div style="margin-bottom: 40px; display: flex; align-items: baseline">
      <v-btn
        color="primary"
        elevation="2"
        @click="sortByDate"
      >Сначала новые</v-btn>

      <v-text-field
        label="Поиск"
        @input="search(val)"
        v-model="val"
        hide-details="auto"
        style="margin: 0 24px;"
      ></v-text-field>

      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Поиск по дате"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            clearable
            v-on="on"
            @input="activateSearch"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="activateSearch"
        ></v-date-picker>
      </v-menu>
    </div>
    <div v-if="news !== null">
      <v-card
        elevation="6"
        v-for="item in news.slice(page - 1, 5 + page - 1)"
        :key="item.title"
        style="margin-bottom: 24px;"
      >
        <v-card-title>
          <h3>
            <nuxt-link style="color: white" :to="'news/' + item.title">{{ item.title }}</nuxt-link>
          </h3>
        </v-card-title>
        <v-card-subtitle>{{ item.description }}</v-card-subtitle>
        <v-card-text>{{ (new Date(item.created)).toDateString() }}</v-card-text>
      </v-card>
    </div>

    <div class="text-center">
      <v-pagination
        v-model="page"
        v-if="news !== null"
        :length="Math.ceil(news.length / 5)"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data: () => {
    return {
      page: 1,
      val: null,
      date: null,
      menu2: false
    }
  },
  computed: {
    ...mapState({
      news: state => state.news
    })
  },
  methods: {
    ...mapMutations([
      'sortByDate',
      'search',
      'searchByDate'
    ]),
    activateSearch () {
      this.menu2 = false
      this.searchByDate(this.date)
    }
  },
  async mounted () {
    try {
      await this.$store.dispatch('getNews')
    } catch (e) {
    }
  }
}
</script>
