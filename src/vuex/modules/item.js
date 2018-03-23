import axios from './../../axios'
// import qs from 'qs'

const state = {
  item: {
    list: [],
    hasMore: true,
    params: {
      categoryId: 0,
      title: '',
      page: 0,
      size: 10
    }
  }
}

const getters = {
  item: state => state.item
}

const actions = {
  ITEM_PARAMS_SET_CID({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      commit('setItemParamCid', id)
      resolve()
    })
  },
  ITEM_PARAMS_RESIT({ commit, state }, args) {
    return new Promise((resolve, reject) => {
      commit('resetItemParams', { categoryId: args.categoryId, title: args.title })
      resolve()
    })
  },
  ITEM_LIST({ commit, state }) {
    return new Promise((resolve, reject) => {
      state.item.params.page = state.item.params.page + 1
      axios.get('/api/item', { params: state.item.params }).then((res) => {
        let json = res.data
        commit('addItems', json.data)
        resolve(json.data)
      })
    })
  },
  ITEM_GET({ commit, state }, id) {
    return new Promise((resolve, reject) => {
      axios.get('/api/item/' + id).then((res) => {
        let json = res.data
        resolve(json.data)
      })
    })
  }
}

const mutations = {
  addItems(state, items) {
    state.item.list = state.item.list.concat(items)
  },
  setItemParamCid(state, id) {
    state.item.params.categoryId = id
  },
  resetItemParams(state, args) {
    state.item.params.categoryId = args.categoryId
    state.item.params.title = args.title
    state.item.params.page = 0
    state.item.params.size = 10
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
