<template>
  <div class="item-list">
    <a v-for="item in items" :key="item.id" class="item" :href="'/item/' + item.id + '.html'">
      <img class="picture"  v-lazy="item.mainImg">
      <p class="title">{{item.title}}</p>
      <p>
        <span class="price">
        ￥{{price(item.lowPrice)}}
        <template v-if="item.lowPrice !== item.highPrice">
          ~{{price(item.highPrice)}}
        </template>
        </span>
        <span class="market-price" v-if="item.highMarketPrice > item.highPrice">￥{{price(item.highMarketPrice)}}</span>
      </p>
      <!-- <p class="amount-alert-message">
        积分最高可抵0.01元
        &nbsp;
      </p> -->
    </a>
  </div>
</template>
<script>
import { price } from '@/assets/common.js'
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    price(v) {
      return price(v)
    }
  }
}

</script>
<style scoped lang="scss">
@import '../../assets/base.scss';
.item-list {
  width: 10rem;
  padding: 0;
  font-size: 0;
  margin: toRem(14) 0 0;
  @include flex;
  @include flex_justify_content(space-between);
  flex-wrap: wrap;
  position: relative;
  .item {
    @include size(370, 522);
    background-color: #fff;
    margin-bottom: toRem(10);
    display: block;
    .picture {
      @include size(370, 370);
      display: block;
    }
    .title {
      margin-top: 0.1733rem;
      font-size: 0.3733rem;
      line-height: 0.56rem;
      color: #2A2A2A;
      font-weight: 300;
      padding: 0 0.2rem;
      @include ellipsis;
    }
    .amount-alert-message {
      font-size: 0.32rem;
      line-height: 0.44rem;
      color: #dc4a23;
      margin-top: 0.106rem;
      margin-bottom: 0.32rem;
      padding: 0 0.2rem
    }
    .price {
      font-size: 0.4rem;
      line-height: 1.2;
      color: #dc4a23;
      margin-right: 0.1466rem;
      padding-left: 0.2rem
    }
    .market-price {
      font-size: 0.2933rem;
      line-height: 1.2;
      color: #979797;
      margin-right: 0.1466rem;
      text-decoration: line-through
    }
  }
}

</style>
