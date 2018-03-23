<template>
  <v-layout>
    <div class="trades" slot="main" v-if="trade !== null">
      <div class="trade-status">
        {{tradeName(trade.status)}}
      </div>
      <div class="line">
      </div>
      <div class="receive-info">
        <div class="receive-person">
          <div>
            {{trade.receivePerson}}
          </div>
          <div>
            {{trade.receivePhone}}
          </div>
        </div>
        <div class="receive-address">
          {{trade.receiveProvince}}{{trade.receiveCity}}{{trade.receiveDistrict}}{{trade.receiveAddress}}
        </div>
      </div>
      <div class="item-list">
        <div class="item-info" :key="order.id" v-for="order in trade.orders">
          <img :src="order.img" />
          <div class="item">
            <div class="title">
              {{order.title}}
            </div>
            <div class="spec">{{order.spec}}</div>
            <div class="price">
              ￥{{price(order.price)}} <span class="num">x&nbsp;{{order.num}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="buyer-remark">
        备注：{{trade.buyerMemo}}
      </div>
      <div class="total-cnt">
        <div class="apply-refund" v-show="trade.status === 'WAIT_DELIVER_GOODS' || trade.status === 'WAIT_CONFIRM_RECEIVE'">
          申请退款
        </div>
        <div class="apply-refund" v-show="trade.status === 'WAIT_PAY' || trade.status === 'CREATED'">
          取消订单
        </div>
        <div>
          合计：￥{{price(trade.totalPayment)}}
        </div>
        <div class="apply-refund pay" v-show="trade.status === 'WAIT_PAY' || trade.status === 'CREATED'">
          付款
        </div>
      </div>
      <div class="line2">
      </div>
      <div class="trade-info">
        <div class="info-item">
          <div class="circle">
          </div>
          订单编号: {{trade.id}}
        </div>
        <div class="info-item">
          <div class="circle">
          </div>
          下单时间: {{dateFmt(trade.created, 'yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div class="info-item" v-show="trade.payTime">
          <div class="circle">
          </div>
          付款时间: {{dateFmt(trade.payTime, 'yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div class="info-item" v-show="trade.consignTime">
          <div class="circle">
          </div>
          发货时间: {{dateFmt(trade.consignTime, 'yyyy-MM-dd hh:mm:ss')}}
        </div>
        <div class="info-item" v-show="trade.endTime">
          <div class="circle">
          </div>
          完成时间: {{dateFmt(trade.endTime, 'yyyy-MM-dd hh:mm:ss')}}
        </div>
      </div>
    </div>
  </v-layout>
</template>
<script type="text/ecmascript-6">
import { tradeStatus, price, dateFormat } from '@/assets/common.js'
export default {
  data() {
    return {
      trade: null
    }
  },
  methods: {
    tradeName(value) {
      return tradeStatus(value)
    },
    price(value) {
      return price(value)
    },
    dateFmt(value, fmt) {
      return dateFormat(value, fmt)
    }
  },
  created() {
    if (this.$route.params.id) {
      this.$store.dispatch('TRADE_GET', this.$route.params.id).then(res => {
        this.trade = res
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
.trades {
  background: #fff;
}
.trade-status {
  @include size(690, 148);
  color: #2a2a2a;
  font-size: toRem(48);
  line-height: toRem(148);
  background-color: #FFF;
  margin: 0 auto;
  font-weight: bold;
}
.line {
  margin: 0 0 0 toRem(30);
  width: toRem(80);
  height: 1px;
  background: #ccc;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.receive-info {
  width: toRem(690);
  margin: toRem(80) auto;
  font-size: toRem(30);
  line-height: toRem(30);
  color: #2a2a2a;
  .receive-person {
    @include flex;
    @include flex_justify_content(space-between);
    margin-bottom: toRem(20);
  }
  .receive-address {
    line-height: toRem(45);
  }
}
.item-list {
  width: toRem(690);
  margin: 0 auto;
  .item-info {
    @include item_flex;
    @include flex;
    &:first-child {
      border-top: solid toRem(1) rgb(204, 204, 204);
    }
    &:last-child {
      border-bottom: solid toRem(1) rgb(204, 204, 204);
    }
    padding: toRem(30) 0;
    img {
      @include size(100, 100);
    }
    .item {
      @include item_flex;
      margin: 0 0 0 toRem(20);
      font-size: toRem(26);
      color: rgb(80, 80, 80);
      line-height: toRem(26);
      .title, .sku {
        width: toRem(570);
        @include ellipsis;
      }
      .title {
        color: #2a2a2a;
      }
      .sku {
        font-size: toRem(24);
      }
      .price {
        margin: toRem(16) 0 0 0;
        color: #2a2a2a;
        font-size: toRem(30);
        .num {
          color: #2a2a2a;
          font-size: toRem(24);
          display: inline;
        }
      }
    }
  }
}
.buyer-remark {
  width: toRem(690);
  margin: 0 auto;
  height: toRem(106);
  font-size: toRem(26);
  color: #2a2a2a;
  line-height: toRem(106);
  border-bottom: solid toRem(1) rgb(204, 204, 204);
}
.total-cnt {
  @include flex;
  @include flex_justify_content(space-between);
  @include flex_align_items;
  width: toRem(690);
  margin: 0 auto;
  height: toRem(150);
  font-size: toRem(30);
  color: #2a2a2a;
  font-weight: bold;
  line-height: toRem(150); // border-bottom: solid toRem(1) rgb(204, 204, 204);
  .apply-refund {
    @include size(130, 50);
    font-size: toRem(24);
    line-height: toRem(50);
    text-align: center;
    border-radius: toRem(4);
    border: 1px solid rgb(101, 101, 101);
    &.pay {
      color: $mainColor;
      border: 1px solid $mainColor;
    }
  }
}
.line2 {
  @include size(750, 20);
  background: rgb(244, 244, 244);
}
.trade-info {
  width: toRem(690);
  margin: 0 auto;
  padding: toRem(50) 0;
  font-size: toRem(26);
  line-height: toRem(26);
  color: rgb(151, 151, 151);
  .info-item {
    padding: toRem(15) 0;
  }
  .circle {
    display: inline-block;
    width: 0.16rem;
    height: 0.16rem;
    background: white;
    border-radius: 50%;
    border: 1px solid #ffd900;
    margin-right: 0.186667rem;
    position: relative;
  }
}
</style>
