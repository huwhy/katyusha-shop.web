<template>
  <div class="message-wrap" v-show="show">
    <div class="message">
      <div class="content">
        {{text}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  methods: {
    close () {
      this.$emit('on-close')
    }
  },
  watch: {
    show () {
      if (this.show && this.duration > 0) {
        let $message = this
        setTimeout(function () {
          $message.close()
        }, this.duration)
      }
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
  @import "../../assets/base.scss";
  .message-wrap {
    z-index: 1024;
    top: 0px;
    left: 0px;
    position: fixed;
    width: 100%;
    height: 100%;
    .message {
      @include flex;
      @include flex_direct(column);
      @include flex_justify_content;
      @include flex_align_items;
      width: 100%;
      height: 100%;
      .content {
        width: toRem(380);
        margin: auto;
        padding: toRem(28) toRem(22);
        border-radius: toRem(15);
        font-size: toRem(32);
        color: #ffd900;
        line-height: toRem(48);
        word-break: break-all;
        background-color: rgba(0,0,0,0.8);
        text-align: center;
      }
    }
  }
</style>
