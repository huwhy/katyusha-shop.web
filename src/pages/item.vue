<template>
  <v-layout>
    <div v-if="item !== null" slot="main">
      <div class="slider">
        <v-slider :banners="images" :height="750"></v-slider>
      </div>
      <div class="item-info">
        <div class="title">
          {{item.title}}
        </div>
        <div class="line"></div>
        <div class="info">
          <div class="l">
            <div class="price">
              ￥{{price(item.lowPrice)}}
              <template v-if="item.lowPrice !== item.highPrice">
                ~{{price(item.highPrice)}}
              </template>
            </div>
            <div class="market-price">市场价 <s>￥{{price(item.highMarketPrice)}}</s></div>
          </div>
          <div class="r">
            售出{{item.saleNum}}笔
          </div>
        </div>
        <div class="line"></div>
        <div class="sku-list">
          <div class="lb">
            规格：
          </div>
          <div class="sku" :class="{active: (selectSku !== null && sku.id === selectSku.id)}" v-for="sku in item.skuList" :key="sku.id" @click="selSku(sku)">
            规格-
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="content" v-html="item.content">
      </div>
    </div>
    <div class="detail-footer" slot="footer">
      <a class="home icon iconfont icon-home" href="/">
      </a>
      <a class="home icon iconfont icon-cart" href="/shopping-cart.html">
      </a>
      <div class="btn-buy cart" @click="addCart">
        加入购物车
      </div>
      <div class="btn-buy">
        立即购买
      </div>
      <message :show="tip !== ''" @on-close="tip = ''" :text="tip" :duration="2000"> </message>
    </div>
  </v-layout>
</template>
<script type="text/ecmascript-6">
import { price } from '@/assets/common.js'
export default {
  data () {
    return {
      item: null,
      selectSku: null,
      tip: ''
    }
  },
  computed: {
    images () {
      let images = []
      if (this.item !== null) {
        if (this.selectSku) {
          images.push({img: this.selectSku.img})
        } else {
          images.push({img: this.item.mainImg})
        }
        this.item.images.forEach((img) => {
          images.push({img: img})
        })
      }
      return images
    }
  },
  methods: {
    selSku(sku) {
      this.selectSku = sku
    },
    addCart() {
      console.log('add cart')
      if (!this.selectSku) {
        this.tip = '请选择规格'
      } else {
        this.$store.dispatch('CART_ADD', {itemId: this.item.id, skuId: this.selectSku.id}).then((res) => {
          this.tip = '添加购物车成功'
        })
      }
    },
    price(v) {
      return price(v)
    }
  },
  created () {
    if (this.$route.params.id) {
      this.$store.dispatch('ITEM_GET', this.$route.params.id).then((res) => {
        this.item = res
        this.mainImg = res.mainImg
      })
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
.line {
  width: 100%;
  height: 1px;
  display: block;
  background-color: rgb(242, 242, 242);
}
.slider {
  @include size(750, 750);
  img {
    width: 100%;
    height: 100%;
  }
}
.item-info {
  width: toRem(700);
  padding: toRem(20) toRem(25);
  background-color: white;
  margin: 0 auto;
}
.title {
  @include size(700, 90);
  font-size: toRem(30);
  line-height: toRem(45);
  margin: 0 0 toRem(20) 0;
  color: #2a2a2a;
  font-weight: bold;
  @include ellipsis2;
}
.info {
  @include size(700, 120);
  @include flex;
  @include flex_justify_content(space-between);
  .price {
    height: toRem(60);
    margin: toRem(14) 0 0;
    font-size: toRem(40);
    line-height: toRem(60);
    color: rgb(220, 74, 35);
  }
  .market-price {
    height: toRem(33);
    // margin: toRem(10) 0 0;
    font-size: toRem(22);
    line-height: toRem(33);
    color: rgb(101, 101, 101);
  }
  .r {
    height: 100%;
    font-size: toRem(24);
    line-height: toRem(120);
    color: #2a2a2a;
    font-weight: bolder;
  }
}
.sku-list {
  width: toRem(700);
  margin: toRem(20) auto;
  @include flex;
  flex-wrap: wrap;
  .lb {
    height: toRem(52);
    font-size: toRem(24);
    color: #2a2a2a;
    line-height: toRem(52);
  }
  .sku {
    &.active {
      background-color: #ffd900;
      color: #2a2a2a;
    }
    height: toRem(52);
    background-color: #FFF;
    font-size: toRem(24);
    color: #2a2a2a;
    line-height: toRem(52);
    @include radius(90);
    padding: 0 toRem(20);
    margin: 0 0 toRem(15) toRem(30);
  }
}
.content {
  width: toRem(700);
  padding: toRem(25);
  background-color: white;
  margin: toRem(10) auto 0;
  p {
  }
  img {
    max-width: toRem(700);
    display: block;
  }
}
.detail-footer {
  @include size(750, 110);
  @include flex;
  background-color: white;
  .home {
    @include size(120, 109);
    text-align: center;
    line-height: toRem(109);
    font-size: toRem(50);
    border-top: 1px solid rgb(204, 204, 204);
    border-right: 1px solid rgb(204, 204, 204);
  }
  .btn-buy {
    height: 100%;
    flex: 1;
    text-align: center;
    line-height: toRem(110);
    font-size: toRem(40);
    font-weight: bold;
    color: #2a2a2a;
    background-color: $mainColor;
    &.cart {
      background-color: white;
      line-height: toRem(109);
      border-top: 1px solid rgb(204, 204, 204);
    }
  }
}
</style>
