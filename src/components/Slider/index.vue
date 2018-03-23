<template>
  <swiper class="slider" :options="swiperOption" ref="mySwiper" :style="size">
    <swiper-slide v-for="(banner, index) in banners" :key="index">
      <a :href="banner.link" class="banner-wrap white" :style="size">
        <img :src="banner.img" :style="size"/>
        <div class="banner-desc" v-if="banner.title != null && banner.title !==''" :style="bannerStyle">
          <div class="title">{{banner.title}}</div>
          <div class="summary">{{banner.summary}}</div>
        </div>
      </a>
    </swiper-slide>
    <div class="swiper-pagination" :style="paginationPos" slot="pagination"></div>
  </swiper>
</template>
<script>
export default {
  props: {
    banners: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 366
    },
    radius: {
      type: Number,
      default: 0
    },
    pagePos: {
      type: Number,
      default: 0
    }
  },
  computed: {
    size () {
      return {
        'width': (this.width / 75) + 'rem',
        'height': (this.height / 75) + 'rem',
        'overflow': this.pagePos === 0 ? 'hidden' : 'visible',
        'border-radius': (this.radius / 75) + 'rem'
      }
    },
    paginationPos () {
      return {
        'margin-bottom': (this.pagePos / 75) + 'rem'
      }
    },
    bannerStyle () {
      return {
        'border-bottom-left-radius': (this.radius / 75) + 'rem',
        'border-bottom-right-radius': (this.radius / 75) + 'rem'
      }
    }
  },
  watch: {
    banners() {
      this.$refs.mySwiper.swiper.updateSize()
      this.$refs.mySwiper.swiper.slideTo(1, 1000, false)
    }
  },
  data () {
    return {
      swiperOption: {
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/base.scss';
  .slider {
    background-color: #FFFFFF;
    margin: 0 auto;
    .banner-wrap {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      .banner-desc {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        color: #FFF;
        .title {
          height: toRem(32);
          font-size: toRem(32);
          line-height: toRem(32);
          padding: toRem(10) toRem(20);
        }
        .summary {
          height: toRem(24);
          font-size: toRem(22);
          line-height: toRem(24);
          padding: 0 toRem(20) toRem(14);
          @include ellipsis;
        }
      }
    }
    .banner-wrap.white{
      border: 1px solid #E6E6E6;
      .banner-desc {
        background-color: #FFF;
        color: #4D4D4D;
        .summary {
          color: #8C8C8C;
        }
      }
    }
  }
</style>
