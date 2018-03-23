import axios from './../../axios'
import qs from 'qs'

const state = {
  carts: [],
  selectedCartList: []
}

const getters = {
  carts: state => state.carts,
  selectedCartList: state => state.selectedCartList
}

const actions = {
  CART_LIST ({commit, state}, ids) {
    return new Promise((resolve, reject) => {
      axios.get('/api/cart', {ids: ids}).then((res) => {
        let json = res.data
        if (!ids) {
          commit('addCarts', json.data)
        }
        resolve(json.data)
      })
    })
  },
  CART_ADD ({commit, state}, params) {
    return new Promise((resolve, reject) => {
      axios.post('/api/cart', qs.stringify(params)).then((res) => {
        let json = res.data
        commit('addCart', json.data)
        resolve(json.data)
      })
    })
  },
  CART_CHG_NUM ({commit, state}, params) {
    return new Promise((resolve, reject) => {
      axios.post('/api/cart/chgNum', qs.stringify(params)).then((res) => {
        let json = res.data
        if (json.ok) {
          commit('chgCartNum', params)
        }
        resolve(json.data)
      })
    })
  }
}

const mutations = {
  addCarts (state, carts) {
    state.carts = carts
  },
  addCart (state, cart) {
    state.carts.push(cart)
  },
  chgCartNum (state, params) {
    for (const [v] of state.carts.entries()) {
      if (v.id === params.id) {
        v.num = params.num
        break
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
