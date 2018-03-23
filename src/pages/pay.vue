<template>
  <v-layout>
    <div slot="main">
      <div class="receive-info" @click="addAddress">
        <div class="address-info" v-if="address !== null">
          <div class="receiver">
            <div class="name">{{address.receivePerson}}</div>
            <div class="tel">{{address.receivePhone}}</div>
          </div>
          <div class="detail-address">
            {{address.receiveProvince}}{{address.receiveCity}}{{address.receiveDistrict}}{{address.receiveAddress}}
          </div>
        </div>
        <div class="sel-address" v-show="address === null">
          选择收货地址
        </div>
        <div class="icon-arraw">
        </div>
      </div>
      <div class="shopping-cart-list" v-if="carts !== null">
        <div class="cart" v-for="cart in carts" :key="cart.id">
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
      <div class="buyer-info">
        <div class="input-cmt">
          <div class="label">留言 </div>
          <input class="input" v-model="trade.buyerMemo" type="text" placeholder="选填">
        </div>
        <!-- <div class="input-cmt">
          <div class="label">积分 </div>
          <input class="input" type="text" placeholder="选填">
        </div> -->
      </div>
    </div>
    <div class="cart-tool" slot="footer">
      <div class="total">总计: <span class="amt">￥{{totalAmt}}</span></div>
      <div class="buy" @click="confirmTrade">确认订单</div>
      <message :show="tip !== ''" @on-close="tip = ''" :text="tip" :duration="2000"> </message>
    </div>
  </v-layout>
</template>
<script type="text/ecmascript-6">
import { price } from '@/assets/common.js'
export default {
  data() {
    return {
      tip: '',
      carts: null,
      address: null,
      trade: {
        receivePerson: '胡道君',
        receiveProvince: '江西省',
        receiveCity: '上饶市',
        receiveDistrict: '鄱阳县',
        receiveAddress: '双港胡家',
        receivePhone: '15869018124',
        receiveZip: '111123',
        buyerMemo: '',
        score: 0,
        cartIds: []
      }
    }
  },
  computed: {
    totalAmt () {
      let amt = 0
      if (this.carts != null) {
        this.carts.forEach((cart) => {
          amt += cart.sku.price * cart.num
        })
      }
      return price(amt)
    }
  },
  methods: {
    confirmTrade() {
      if (this.carts.length === 0) {
        this.tip = '没有商品'
        return
      } else {
        let ids = []
        this.carts.forEach(cart => ids.push(cart.id))
        this.trade.cartIds = ids
      }
      if (this.address === null) {
        this.tip = '请选择收货地址'
        return
      }
      this.$store.dispatch('TRADE_POST', this.trade).then(res => {
        console.log(res)
      })
    },
    addAddress() {
      this.address = {
        receivePerson: '胡道君',
        receiveProvince: '江西省',
        receiveCity: '上饶市',
        receiveDistrict: '鄱阳县',
        receiveAddress: '双港胡家',
        receivePhone: '15869018124',
        receiveZip: '111123'
      }
      this.trade.receivePerson = this.address.receivePerson
      this.trade.receiveProvince = this.address.receiveProvince
      this.trade.receiveCity = this.address.receiveCity
      this.trade.receiveDistrict = this.address.receiveDistrict
      this.trade.receiveAddress = this.address.receiveAddress
      this.trade.receivePhone = this.address.receivePhone
      this.trade.receiveZip = this.address.receiveZip
    },
    price(v) {
      return price(v)
    }
  },
  created() {
    if (this.$route.query.ids) {
      this.$store.dispatch('CART_LIST', this.$route.query.ids).then(res => {
        this.carts = res
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
.receive-info {
  width: toRem(650);
  // @include size(650, 148);
  background-color: #FFF;
  @include flex;
  @include flex_align_items;
  @include flex_justify_content(space-between); // border-bottom: 1px solid #ccc;
  padding: toRem(50);
  .sel-address, .address-info {
    font-size: toRem(48);
    line-height: toRem(48);
    color: #2a2a2a;
    font-weight: bold;
  }
  .address-info {
    font-size: toRem(30);
    .receiver {
      @include flex;
      @include flex_align_items;
      @include flex_justify_content(space-between);
      .name {}
      .tel {}
    }
    .detail-address {}
  }
  .icon-arraw {
    background: url(http://bee-img.ecrm.so/mifengyouhuo/enter.png);
    width: .16rem;
    height: .36rem;
    background-size: contain;
    margin-left: toRem(50);
  }
}

.shopping-cart-list {
  width: toRem(750);
  margin-top: toRem(15);
  .cart {
    width: toRem(750);
    height: toRem(180);
    background: #FFF;
    @include flex;
    @include flex_align_items;
    border-bottom: solid toRem(1) rgb(204, 204, 204);
    &:last-child {
      border-bottom: none;
    }
    .num {
      @include flex;
      @include flex_direct(column);
      @include flex_align_items;
      @include flex_justify_content;
      margin-right: toRem(50);
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
      margin-left: toRem(50);
      img {
        @include size(150, 150);
      }
      .item {
        @include item_flex;
        margin: 0 0 0 toRem(24);
        font-size: toRem(26);
        color: rgb(80, 80, 80);
        .title, .sku {
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
.buyer-info {
  margin-top: toRem(15);
  padding: toRem(15) toRem(50) toRem(50);
  background: #fff;
  .input-cmt {
    width: 100%;
    height: toRem(110);
    line-height: toRem(110);
    border-bottom: 1px solid #ccc;
    font-size: toRem(30);
    color: #2a2a2a;
    .label {
      display: inline-block;
      width: toRem(120);
      margin-right: toRem(5);
    }
    .input {
      width: toRem(500);
      height: toRem(60);
      border: none;
    }
  }
}
.cart-tool {
  @include size(750, 109);
  @include flex;
  @include flex_align_items;
  @include flex_justify_content(space-between);
  background: #FFF;
  position: absolute;
  bottom: 0;
  .total {
    margin-left: toRem(50);
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
