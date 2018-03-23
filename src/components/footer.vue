<template>
  <div class="footer">
    <a class="nav-item" :class="{active: footer === 'index'}" href="/index.html">
      <div class="icon iconfont icon-home"></div>
      <div class="title">首页</div>
    </a>
    <!-- <a class="nav-item " href="/activity/report/list.html">
      <div class="icon iconfont icon-baogao"></div>
      <p class="title">试用报告</p>
    </a> -->
    <a class="nav-item " :class="{active: footer === 'cart'}" href="/shopping-cart.html">
      <div class="icon iconfont icon-cart"></div>
      <p class="title">购物车</p>
    </a>
    <a class="nav-item " :class="{active: footer === 'me'}" href="/me.html">
      <div class="icon iconfont icon-me"></div>
      <div class="title">我</div>
    </a>
  </div>
</template>

<script type="text/javascript">
export default {
  computed: {
    footer () {
      return this.$store.getters.footer
    }
  }
}
</script>

<style lang="scss">
@import '../assets/base.scss';
</style>

<style scoped lang="scss">
@import '../assets/base.scss';
@import '../assets/iconfont.css';
/*底部样式*/
.footer {
  background-color: white !important;
  // position: fixed;
  // left: 0;
  // bottom: 0;
  @include flex;
  width: toRem(750);
  height: 1.467rem;
  z-index: 9990;
  .nav-item {
    @include item_flex;
    width: 100%;
    height: 100%;
    @include flex;
    @include flex_direct(column);
    @include flex_justify_content;
    @include flex_align_items;
    text-decoration: none;
    color: #7c7c7c;
    font-size: 0.266rem;
    line-height: 1;
    .icon {
      font-size: 0.653rem;
      width: 0.653rem;
      height: 0.612rem;
      background-size: cover;
      background-image: none;
    }
    .title {
      margin-top: 0.148rem;
    }
  }
  .active {
    color: $mainColor;
  }
}
</style>
