export const state = () => ({
  news: null,
  allNews: null
})

export const mutations = {
  setNews (state, news) {
    state.news = news
    state.allNews = news
  },
  sortByDate (state) {
    state.news.sort((a, b) => {
      return b.created - a.created
    })
  },
  search (state, str) {
    state.news = state.allNews.filter(item => item.title.toLowerCase().includes(str.toLowerCase()))
  },
  searchByDate (state, date) {
    if (date === null) {
      state.news = state.allNews
      return
    }
    state.news = state.allNews.filter(item => new Date(item.created).toDateString() === new Date(date).toDateString())
  }
}

export const actions = {
  async getNews ({ commit }) {
    try {
      const res = await this.$axios.$get('https://morning-earth-19323.herokuapp.com/?feedURL=http://static.feed.rbc.ru/rbc/logical/footer/news.rss')
      commit('setNews', res.items)
    } catch (e) {
      throw e
    }
  }
}

export const getters = {
  getNewsByTitle: state => (title) => {
    return state.allNews.find(x => x.title === title)
  }
}
