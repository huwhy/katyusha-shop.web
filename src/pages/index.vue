<template>
  <v-layout2>
    <div class="tabs" slot="top">
      <a href="/mall/search.html?id=1">
        <span class="search" data-id="0">&nbsp;</span>
      </a>
      <div class="tab_bar">
        <a :href="'/index.html?id=' + category.id" v-for="category in categories" :key="category.id">
          <span class="tab" :class="{active: categoryId === category.id}">{{category.name}}</span>
        </a>
      </div>
    </div>
    <div style="height: 100%;" slot="main">
      <v-scroll @pulling-up="loadItems" :data="items" pullUpNoMoreTxt="已拉到最后了">
        <!--轮播广告-->
        <v-slider :banners="banners"></v-slider>
        <ItemList :items="items"></ItemList>
      </v-scroll>
    </div>
  </v-layout2>
</template>
<script>
import { price } from '@/assets/common.js'
import ItemList from '@/components/ItemList'
export default {
  components: {
    ItemList
  },
  data() {
    return {
      loaded: true,
      categoryId: 0,
      banners: [
        {
          link: '',
          img: 'http://img.beeshop.vip/beeshop/img/RhE38dj2Qm1515374639860.png@420h_750w_1e_1c.src',
          summary: ''
        },
        {
          link: '',
          img: 'http://img.beeshop.vip/beeshop/img/RhE38dj2Qm1515374639860.png@420h_750w_1e_1c.src',
          summary: ''
        },
        {
          link: '',
          img: 'http://img.beeshop.vip/beeshop/img/RhE38dj2Qm1515374639860.png@420h_750w_1e_1c.src',
          summary: ''
        }
      ]
    }
  },
  methods: {
    loadItems(func) {
      this.$store.dispatch('ITEM_LIST').then((items) => {
        if (items.length === 0) {
          console.log('没有数据')
          func()
        }
      })
      // 没有数据的时候执行这个函数
      // func()
    },
    price(v) {
      return price(v)
    }
  },
  computed: {
    categories() {
      return this.$store.getters.categories
    },
    items() {
      return this.$store.getters.item.list
    },
    hasMore() {
      return this.$store.getters.item.hasMore
    }
  },
  created() {
    this.wxShare({
      link: '/index.html',
      title: '搜罗新鲜好货!',
      desc: '不做无趣的转发，只为热爱而分享'
    })
    if (this.$store.getters.categories.length === 0) {
      this.$store.dispatch('CATEGORY_LIST').then((res) => {})
    }
    if (this.$route.query.id) {
      this.categoryId = parseInt(this.$route.query.id)
      this.$store.dispatch('ITEM_PARAMS_SET_CID', this.categoryId).then(() => {
        if (this.$store.getters.item.list.length === 0) {
          this.$store.dispatch('ITEM_LIST').then((res) => {})
        }
      })
    } else if (this.$store.getters.item.list.length === 0) {
      this.$store.dispatch('ITEM_LIST').then((res) => {})
    }
    this.$store.dispatch('FOOTER_CHG', 'index')
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>
<style scoped lang="scss">
@import '../assets/base.scss';
.tabs {
  // position: fixed;
  // top: 0;
  // left: 0;
  width: toRem(750);
  height: toRem(82);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: white;
  z-index: 10;
  overflow: hidden;
  @include flex;
  @include flex_align_items;
  display: flex;
  .search {
    position: relative;
    display: inline-block;
    color: #FFF;
    margin-right: 0;
    @include size(92, 30);
    background-position: center;
    background-size: toRem(28.4) toRem(30);
    background-image: url(http://bee-img.ecrm.so/icons/search.png);
    background-repeat: no-repeat;
    border-right: solid toRem(1) rgb(204, 204, 204);
  }
  .tab_bar {
    width: 100%;
    height: 1.0933rem;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .tab {
    position: relative;
    display: inline-block;
    font-size: 0.36rem;
    line-height: toRem(82);
    color: #979797;
    margin-left: toRem(50);
    &.active {
      font-weight: bold;
      color: #2a2a2a;
    }
    &.active:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -0.2rem;
      width: 0.4rem;
      height: 0.0533rem;
      background: #2A2A2A;
    }
    &:last-child {
      margin-right: toRem(25);
    }
  }
}
</style>
