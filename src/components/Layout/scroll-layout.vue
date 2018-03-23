<template>
  <div class="layout">
    <div class="top-wrap">
      <slot name="top">
      </slot>
    </div>
    <div class="main-content">
      <slot name="main"></slot>
    </div>
    <div class="footer-wrap">
      <v-footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/base.scss';
.layout {
  width: toRem(750);
  height: 100vh;
  margin: 0 auto;
  @include flex;
  @include flex_direct(column);
  @include flex;
  .top-wrap {
    height: toRem(82);
  }
  .main-content {
    flex: 1;
    position: relative;
    overflow: auto;
  }
  .footer-wrap {
    height: toRem(110);
  }
}
</style>
