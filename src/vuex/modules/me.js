import axios from './../../axios'
// import qs from 'qs'

const state = {
  me: null,
  account: null
}

const getters = {
  me: state => state.me,
  account: state => state.account
}

const actions = {
  MEMBER_GET ({commit, state}) {
    return new Promise((resolve, reject) => {
      axios.get('/api/member').then((res) => {
        let json = res.data
        commit('addMember', json.data)
        resolve(json.data)
      })
    })
  },
  ACCOUNT_GET ({commit, state}) {
    return new Promise((resolve, reject) => {
      axios.get('/api/account').then((res) => {
        let json = res.data
        commit('addAccount', json.data)
        resolve(json.data)
      })
    })
  }
}

const mutations = {
  addMember (state, me) {
    state.me = me
  },
  addAccount (state, account) {
    state.account = account
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
