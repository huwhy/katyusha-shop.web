<template>
  <div class="mf-loading-container">
    <img src="./loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = 'loading'
export default {
  name: COMPONENT_NAME
}

</script>
<style lang="scss" scoped>
@import '../../assets/base.scss';
.mf-loading-container {
  img {
    width: toRem(20);
    height: toRem(20);
    display: block;
  }
}

</style>
