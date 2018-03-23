<template>
  <scroll ref="scroll" :data="data" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp" @click="clickItem">
    <slot>
      没有数据
    </slot>
  </scroll>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import Scroll from '@/components/Scroll'
export default {
  props: {
    data: {
      default: () => null
    },
    scrollbar: { // 滚动条
      type: Boolean,
      default: false
    },
    pullDownRefresh: { // 上部刷新数据
      type: Boolean,
      default: false
    },
    pullUpLoad: { // 下部刷新数据
      type: Boolean,
      default: true
    },
    pullUpMoreTxt: {
      type: String,
      default: '加载数据...'
    },
    pullUpNoMoreTxt: {
      type: String,
      default: '没有数据'
    }
  },
  data() {
    return {
      scrollbarFade: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoadThreshold: 0,
      startY: 0
    }
  },
  components: {
    Scroll
  },
  watch: {
    scrollbarObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullDownRefreshObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullUpLoadObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    startY() {
      this.rebuildScroll()
    }
  },
  computed: {
    scrollbarObj: function() {
      return this.scrollbar ? { fade: this.scrollbarFade } : false
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop)
      } : false
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: { more: this.pullUpMoreTxt, noMore: this.pullUpNoMoreTxt }
      } : false
    }
  },
  methods: {
    // 下拉刷新顶部数据
    onPullingDown() {
      if (this._isDestroyed) {
        return
      }
      this.$emit('pulling-down', this.$refs.scroll.forceUpdate)
      // 模拟更新数据
      // console.log('pulling down and load data')
      // setTimeout(() => {
      //   if (this._isDestroyed) {
      //     return
      //   }
      //   if (this.itemIndex < 20) {
      //     // 如果有新数据
      //     this.items.unshift('newDataTxt' + +new Date())
      //   } else {
      //     // 如果没有新数据
      //     this.$refs.scroll.forceUpdate()
      //   }
      // }, 2000)
    },
    // 上拉刷新底部数据
    onPullingUp() {
      this.$emit('pulling-up', this.$refs.scroll.forceUpdate)
      // 更新数据
      // console.log('pulling up and load data')
      // setTimeout(() => {
      //   if (this._isDestroyed) {
      //     return
      //   }
      //   if (this.itemIndex < 20) {
      //     // 如果有新数据
      //     let newPage = []
      //     for (let i = 0; i < 10; i++) {
      //       newPage.push('previousTxt' + ++this.itemIndex + 'followingTxt')
      //     }

      //     this.items = this.items.concat(newPage)
      //   } else {
      //     // 如果没有新数据
      //     this.$refs.scroll.forceUpdate()
      //   }
      // }, 1500)
    },
    clickItem() {
      console.log('click item')
    },
    rebuildScroll() {
      Vue.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  }
}

</script>
