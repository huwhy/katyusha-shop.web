<template>
  <div class="layout">
    <div class="main-content">
      <slot name="main">
      </slot>
    </div>
    <div class="footer-wrap">
      <slot name="footer">
        <v-footer></v-footer>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/base.scss';
.layout {
  width: toRem(750);
  margin: 0 auto;
  height: 100vh;
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
