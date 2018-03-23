import Vue from 'vue'
import Vuex from 'vuex'
import Common from './modules/common'
import Category from './modules/category'
import Item from './modules/item'
import Cart from './modules/cart'
import Me from './modules/me'
import Trade from './modules/trade'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Common,
    Category,
    Item,
    Cart,
    Me,
    Trade
  }
})
