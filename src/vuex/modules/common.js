// import axios from './../../axios'
// import qs from 'qs'

const state = {
  footer: 'index',
  mid: 0
}

const getters = {
  footer: state => state.footer,
  mid: state => state.mid
}

const actions = {
  FOOTER_CHG ({commit, state}, tab) {
    return new Promise((resolve, reject) => {
      commit('chgFooter', tab)
      resolve()
    })
  },
  SET_MID ({commit, state}, mid) {
    return new Promise((resolve, reject) => {
      commit('setMid', mid)
      resolve()
    })
  }
}

const mutations = {
  chgFooter (state, tab) {
    state.footer = tab
  },
  setMid (state, mid) {
    state.mid = mid
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
