<template>
  <v-layout>
    <div slot="main">
      <div class="shopping-cart-list">
        <div class="cart" v-for="cart in carts" :key="cart.id">
          <div class="icon-sel iconfont icon-gouxuan" @click="selCart(cart)" :class="{'sel': hasId(cart.id)}"></div>
          <div class="item-info">
            <img :src="cart.item.mainImg" />
            <div class="item">
              <div class="title">
                {{cart.item.title}}
              </div>
              <div class="spec">{{cart.sku.spec}}</div>
              <div class="price">
                ￥{{price(cart.sku.price)}}
                <s>￥{{price(cart.sku.marketPrice)}}</s>
              </div>
            </div>
            <div class="num">
              <div class="iconfont icon-pull-up" @click="chgNum(cart, 1)">
              </div>
              {{cart.num}}
              <div class="iconfont icon-pull-down" @click="chgNum(cart, -1)">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-tool">
        <div class="icon-sel iconfont icon-gouxuan" @click="selAll" :class="{'sel': hasAll()}">全选</div>
        <div class="total">总计: <span class="amt">￥{{totalAmt}}</span></div>
        <div href="/pay.html" class="buy" @click="toPay">结算</div>
        <message :show="tip !== ''" @on-close="tip = ''" :text="tip" :duration="2000"> </message>
      </div>
    </div>
  </v-layout>
</template>
<script type="text/ecmascript-6">
import { price } from '@/assets/common.js'
export default {
  data() {
    return {
      tip: ''
    }
  },
  computed: {
    selCarts() {
      return this.$store.getters.selectedCartList
    },
    carts() {
      let list = []
      this.$store.getters.carts.forEach((cart) => {
        cart.sel = false
        list.push(cart)
      })
      return list
    },
    totalAmt () {
      let amt = 0
      this.selCarts.forEach((cart) => {
        amt += cart.sku.price * cart.num
      })
      return price(amt)
    }
  },
  methods: {
    toPay() {
      if (this.selCarts.length === 0) {
        this.tip = '您还没有选中商品哦'
      } else {
        let ids = []
        this.selCarts.forEach((cart) => {
          ids.push(cart.id)
        })
        window.location.href = '/pay.html?ids=' + ids.join(',')
      }
    },
    chgNum(cart, v) {
      cart.num = cart.num + v
      if (cart.num <= 0) {
        cart.num = 1
      } else {
        this.$store.dispatch('CART_CHG_NUM', {id: cart.id, num: cart.num})
      }
    },
    hasId(id) {
      return this.selCarts.some(cart => id === cart.id)
    },
    hasAll() {
      return this.selCarts.length > 0 && this.selCarts.length === this.carts.length
    },
    selAll() {
      this.selCarts.splice(0, this.selCarts.length)
      this.carts.forEach(cart => {
        this.selCarts.push(cart)
      })
    },
    selCart(cart) {
      if (this.hasId(cart.id)) {
        for (const [i, v] of this.selCarts.entries()) {
          if (cart.id === v.id) {
            this.selCarts.splice(i, 1)
            break
          }
        }
      } else {
        this.selCarts.push(cart)
      }
    },
    price(v) {
      return price(v)
    }
  },
  created() {
    if (this.$store.getters.carts.length === 0) {
      this.$store.dispatch('CART_LIST').then((res) => {})
    }
    this.$store.dispatch('FOOTER_CHG', 'cart')
  }
}

</script>
<style lang="scss">
@import '../assets/base.scss';

</style>
<style scoped lang="scss">
@import '../assets/base.scss';
@import '../assets/iconfont.css';
.shopping-cart-list {
  width: toRem(750);
  .cart {
    width: toRem(750);
    height: toRem(180);
    background: #FFF;
    @include flex;
    @include flex_align_items;
    margin-bottom: 1px;
    &:last-child {
      margin-bottom: 0;
    }
    .icon-sel {
      width: toRem(48);
      height: toRem(48);
      font-size: toRem(48);
      margin: 0 toRem(25);
      color: rgb(204, 204, 204);
    }
    .num {
      @include flex;
      @include flex_direct(column);
      @include flex_align_items;
      @include flex_justify_content;
      margin-right: toRem(25);
      font-size: toRem(36);
      line-height: toRem(36);
      .iconfont {
        font-size: toRem(48);
        width: toRem(48);
        color: rgb(204, 204, 204);
      }
      .icon-plus {
        margin-bottom: toRem(12);
      }
    }
    .item-info {
      @include item_flex;
      @include flex;
      img {
        @include size(150, 150);
      }
      .item {
        @include item_flex;
        margin: 0 0 0 toRem(24);
        font-size: toRem(26);
        color: rgb(80, 80, 80);
        .title,
        .sku {
          width: toRem(343);
          @include ellipsis;
        }
        .title {
          color: #2a2a2a;
        }
        .sku {
          font-size: toRem(24);
        }
        .price {
          margin: toRem(24) 0 0 0;
          color: rgb(255, 90, 90);
          font-size: toRem(30);
          s {
            color: rgb(204, 204, 204);
            font-size: toRem(24);
          }
        }
      }
    }
  }
}

.icon-sel.sel,.icon-sel.before {
  color: #FFD900 !important;
}

.cart-tool {
  @include size(750, 109);
  @include flex;
  @include flex_align_items;
  @include flex_justify_content(space-between);
  background: #FFF;
  position: absolute;
  bottom: toRem(5);
  .icon-sel {
    color: rgb(204, 204, 204);
    &:before {
      font-size: toRem(36);
    }
    width: toRem(110);
    height: toRem(48);
    font-size: toRem(30);
    margin: 0 toRem(25);
  }
  .total {
    font-size: toRem(30);
    color: rgb(80, 80, 80);
    .amt {
      color: rgb(255, 90, 90);
    }
  }
  .buy {
    @include size(204, 109);
    background-color: $mainColor;
    font-size: toRem(30);
    line-height: toRem(109);
    text-align: center;
    color: #000;
    font-weight: bold;
  }
}

</style>
