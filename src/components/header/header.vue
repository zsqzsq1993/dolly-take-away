<template>
  <div class="m-header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" :alt="seller.name" width="64" height="64">
      </div>
      <dl class="content">
        <dt class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </dt>
        <dd class="description">{{seller.description}}/38分钟送达</dd>
        <dd class="supports">
          <span class="icon" v-if="seller.supports" :class="classMap[seller.supports[0].type]"/>
          <span class="detail" v-if="seller.supports">{{seller.supports[0].description}}</span>
        </dd>
        <dd class="counts" @click="showDetail">
          <span class="counts-detail" v-if="seller.supports">{{seller.supports.length}}个</span>
          <span class="icon-keyboard_arrow_right" />
        </dd>
      </dl>
    </div>
    <div class="notice-wrapper" @click="showDetail">
      <span class="notice-icon" />
      <span class="notice-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right" />
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="seller.name">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      }
    },
    methods: {
      showDetail() {
        this.headerDetails = this.headerDetails || this.$createHeaderDetails({
          $props: {
            seller: 'seller',
            classMap: 'classMap'
          }
        })
        this.headerDetails.showDetail()
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/css/global/mixin.scss";
  .m-header {
    position: relative;
    color: #fff;
    background: rgba(7,17,27,0.5);
    overflow: hidden;
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar {
        display: inline-block;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        vertical-align: top;
        margin-left: 16px;
        .title {
          margin-bottom: 8px;
        }
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          @include bg-img("brand");
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          vertical-align: top;
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
        }
        .description {
          margin-bottom: 10px;
          font-size: 12px;
          line-height: 12px;
          font-weight: 200;
        }
        .supports {
          .detail {
            vertical-align: top;
            font-size: 10px;
            font-weight: 200;
            line-height: 12px;
          }
          .icon {
            display: inline-block;
            margin-right: 4px;
            width: 12px;
            height: 12px;
            background-size: 12px 12px;
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
        }
        .counts {
          position: absolute;
          bottom: 18px;
          right: 12px;
          padding: 7px 8px;
          line-height: 12px;
          font-size: 10px;
          font-weight: 200;
          background: rgba(0,0,0,0.2);
          border-radius: 14px;
          .icon-keyboard_arrow_right {
            line-height: 12px;
          }
        }
      }
    }
    .notice-wrapper {
      position: relative;
      padding: 0px 22px 0px 12px;
      height: 28px;
      line-height: 28px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7,17,27,0.2);
      .notice-icon {
        display: inline-block;
        vertical-align: top;
        margin-top: 7px;
        margin-right: 5px;
        width: 22px;
        height: 12px;
        @include bg-img("bulletin");
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .notice-text {
        font-size: 10px;
        font-weight: 300;
        vertical-align: top;
        margin-top: 1px;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        right: 10px;
        bottom: 6px;
      }
    }
    .background {
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 150%;
        z-index: -1;
        filter: blur(10px)
      }
    }
  }
</style>
