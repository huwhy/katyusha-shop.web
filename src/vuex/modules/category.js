import axios from './../../axios'
// import qs from 'qs'

const state = {
  categories: []
}

const getters = {
  categories: state => state.categories
}

const actions = {
  CATEGORY_LIST ({commit, state}) {
    return new Promise((resolve, reject) => {
      axios.get('/api/category').then((res) => {
        let json = res.data
        commit('addCategorids', json.data)
        resolve(json.data)
      })
    })
  }
}

const mutations = {
  addCategorids (state, categories) {
    state.categories = categories
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
