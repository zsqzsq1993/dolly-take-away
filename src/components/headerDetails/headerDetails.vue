<template>
  <div v-show="detailShow" class="details">
    <div class="details-content-wrapper clear-fix">
      <div class="details-content">
        <h1>{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :score="seller.score" :size="48"/>
        </div>
        <div class="cut-off">
          <div class="line" />
          <div class="text">优惠信息</div>
          <div class="line" />
        </div>
        <div class="discount-wrapper">
          <div class="discount-item" v-for="(item,idx) in seller.supports" :key="idx">
            <span class="icon" :class="classMap[item.type]"/>
            <span class="text">{{item.description}}</span>
          </div>
        </div>
        <div class="cut-off">
          <div class="line" />
          <div class="text">商家公告</div>
          <div class="line" />
        </div>
        <p class="notice">
          {{seller.bulletin}}
        </p>
      </div>
    </div>
    <div class="details-close" @click="closeDetail">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
  import star from '../public/star'
  export default {
    name: 'header-details',
    components: {
      star
    },
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      },
      classMap: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      closeDetail() {
        this.detailShow = false
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/css/global/mixin.scss";
  .details {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 60;
    color: #fff;
    background: rgba(7,17,27,0.8);
    overflow: auto;
    backdrop-filter: blur(10px);
    .details-content-wrapper {
      min-height: 100%;
      margin-top: 0;
      .details-content {
        padding-top: 64px;
        padding-bottom: 64px;
        h1 {
          margin: 64px auto 16px auto;
          text-align: center;
          line-height: 16px;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper {
          margin: 16px auto 28px auto;
          text-align: center;
        }
        .cut-off {
          display: flex;
          margin: 28px auto 24px auto;
          width: 80%;
          .line {
            flex: 1;
            position: relative;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            top: -7px;
          }
          .text {
            padding: 0;
            margin: auto 24px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .discount-wrapper {
          margin: 24px auto 28px auto;
          width: 80%;
          font-size: 0;
          .discount-item {
            margin: 12px 12px;
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease {
                @include bg-img("decrease_1")
              }
              &.discount {
                @include bg-img("discount_1")
              }
              &.guarantee {
                @include bg-img("guarantee_1")
              }
              &.invoice {
                @include bg-img("invoice_1")
              }
              &.special {
                @include bg-img("special_1")
              }
            }
            .text {
              display: inline-block;
              vertical-align: top;
              margin-left: 6px;
              padding-top: 3px;
              line-height: 12px;
              font-size: 12px;
              font-weight: 200;
            }
          }
        }
        .notice {
          margin: 24px auto auto auto;
          width: 80%;
          font-size: 12px;
          font-weight: 200;
          line-height: 24px;
        }
      }
    }
    .details-close {
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      font-size: 32px;
    }
  }
</style>
