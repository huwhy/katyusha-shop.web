<template>
  <v-layout>
    <div v-if="me !== null" slot="main">
      <div class="member-info">
        <img :src="me.headImg">
        <div class="info">
          <p>{{me.nick}}</p>
          <p>ID：{{me.id}}</p>
          <p>手机号：{{me.phone}}</p>
        </div>
      </div>
      <div class="f-box">
        <div class="title">
          <span>我的订单</span>
          <span>全部订单 ></span>
        </div>
        <div class="grid">
          <a class="grid-item">
            <div class="icon iconfont icon-pay"></div>
            <span>待付款</span>
          </a>
          <div class="grid-item">
            <div class="icon iconfont icon-consign"></div>
            <span>待收货</span>
          </div>
          <div class="grid-item">
            <div class="icon iconfont icon-refund"></div>
            <span>退款</span>
          </div>
        </div>
      </div>

      <div class="f-box my-account" v-if="account !== null">
        <div class="title">
          <span>我的帐户</span>
        </div>
        <div class="list">
          <div class="list-item">
            <div class="icon iconfont icon-amt icon-money2"></div>
            <div class="list-item-content">
              <span>余额</span>
              <span>{{price(account.amount)}} ></span>
            </div>
          </div>
          <div class="list-item">
            <div class="icon iconfont icon-amt icon-score"></div>
            <div class="list-item-content">
              <span>积分</span>
              <span>100 ></span>
            </div>
          </div>
        </div>
      </div>

      <div class="f-box my-account">
        <div class="title">
          <span>我的信息</span>
          <span>修改 ></span>
        </div>
        <div class="list">
          <div class="list-item">
            <div class="list-item-content">
              <span>姓名</span>
              <span>胡道君</span>
            </div>
          </div>
          <div class="list-item">
            <div class="list-item-content">
              <span>身份证</span>
              <span>{{1234123241412321}}</span>
            </div>
          </div>
          <div class="list-item">
            <div class="list-item-content">
              <span>生日</span>
              <span>{{me.birthday}}</span>
            </div>
          </div>
          <div class="list-item">
            <div class="list-item-content">
              <span>手机号</span>
              <span>{{me.phone}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-layout>
</template>
<script type="text/ecmascript-6">
import { price } from '@/assets/common.js'
export default {
  methods: {
    price(v) {
      return price(v)
    }
  },
  computed: {
    me() {
      return this.$store.getters.me
    },
    account() {
      return this.$store.getters.account
    }
  },
  created() {
    console.log(this.$store.getters.me)
    if (this.$store.getters.me === null) {
      this.$store.dispatch('MEMBER_GET')
      this.$store.dispatch('ACCOUNT_GET')
    }
    this.$store.dispatch('FOOTER_CHG', 'me')
  }
}
</script>
<style lang="scss">
@import '../assets/base.scss';
@import '../assets/iconfont.css';
</style>
<style scoped lang="scss">
@import '../assets/base.scss';
.member-info {
  width: toRem(750);
  height: toRem(210);
  background-color: $mainColor;
  padding: 0 toRem(25);
  @include flex;
  @include flex_align_items;
  @include flex_justify_content(flex_start);
  img {
    @include size(100, 100);
    border-radius: toRem(100);
    border: toRem(2) outside rgba(255, 255, 255, 0.6);
    margin-right: toRem(30);
  }
  .info {
    font-size: toRem(24);
    line-height: toRem(28);
    font-weight: bold;
    color: white;
  }
}
.f-box {
  width: toRem(700);
  padding: 0 toRem(25) toRem(25);
  background-color: #FFF;
  >.title {
    height: toRem(80);
    font-size: toRem(32);
    color: #4a4a4a;
    @include flex;
    @include flex_align_items;
    @include flex_justify_content(space-between);
    border-bottom: 1px solid rgba(0, 0, 0, .15);
  }
  >.grid {
    @include flex;
    @include flex_align_items;
    @include flex_justify_content(space-around);
    >.grid-item {
      padding: toRem(15) 0;
      .icon {
        font-size: toRem(60);
        width: toRem(60);
        height: toRem(60);
        margin: 0 auto;
        color: #a4a4a4;
      }
      span {
        color: rgb(124, 124, 124);
        display: block;
        margin-top: toRem(18);
      }
    }
  }
  >.list {
    .list-item {
      @include flex;
      @include flex_align_items;
      padding: toRem(15) 0;
      .icon {
        font-size: toRem(60);
        line-height: toRem(80);
        width: toRem(80);
        height: toRem(80);
        margin: 0 auto;
        color: #a4a4a4;
      }
      .list-item-content {
        @include item_flex;
        @include flex;
        @include flex_justify_content(space-between);
        font-size: toRem(24);
        line-height: toRem(80);
        font-style: normal;
        color: rgb(124, 124, 124);
        border-bottom: 1px solid rgba(0, 0, 0, .15);
      }
    }
  }
}
.my-account {
  margin-top: toRem(15);
  .icon-amt {
    color: rgb(255, 179, 2) !important;
  }
}
</style>
