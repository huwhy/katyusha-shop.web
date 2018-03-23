import axios from '@/axios'
// import qs from 'qs'

const state = {
  trade: null
}

const getters = {
  trade: state => state.trade
}

const actions = {
  TRADE_POST ({ commit, state }, trade) {
    return new Promise((resolve, reject) => {
      axios.post('/api/trade', trade).then((res) => {
        resolve()
      })
    })
  },
  TRADE_GET ({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      axios.get('/api/trade/' + id).then(res => {
        resolve(res.data.data)
      })
    })
  }
}

const mutations = {
  // addCategorids (state, categories) {
  //   state.categories = categories
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}
