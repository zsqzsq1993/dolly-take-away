<template>
  <div class="m-rating-selector">
    <div class="select-atitude">
      <div class="positive block" @click="changeRateType($event, 2)" :class="{active: rateType === 2 }">
        <span class="txt">全部</span>
        <span class="count">{{allLength}}</span>
      </div>
      <div class="positive block" @click="changeRateType($event, 0)" :class="{active: rateType === 0 }">
        <span class="txt">推荐</span>
        <span class="count">{{positiveLength}}</span>
      </div>
      <div class="negative block" @click="changeRateType($event, 1)" :class="{active: rateType === 1 }">
        <span class="txt">吐槽</span>
        <span class="count">{{negativeLength}}</span>
      </div>
    </div>
    <div class="select-content" @click="changeOnlyContent($event)">
      <div class="icon-wrapper">
        <i class="icon-check_circle" :class="{lived: onlyContent}" />
      </div>
      <span class="txt">
        只看有内容的评价
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      rateType: {
        type: Number,
        default: 2
      }
    },
    computed: {
      allLength() {
        return this.ratings.length
      },
      positiveLength() {
        return this.ratings.filter(item => {
          return item.rateType === 0
        }).length
      },
      negativeLength() {
        return this.ratings.filter(item => {
          return item.rateType === 1
        }).length
      }
    },
    methods: {
      changeRateType(event, type) {
        if (!event._constructed) {
          return
        }
        this.$emit('changeRateType', type)
      },
      changeOnlyContent(event) {
        if (!event._constructed) {
          return
        }
        this.$emit('changeOnlyContent', !this.onlyContent)
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/css/global/mixin";
  .m-rating-selector {
    .select-atitude {
      padding-bottom: 18px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .block {
        display: inline-block;
        margin-right: 8px;
        padding: 8px 12px;
        border-radius: 2px;
        .txt {
          font-size: 12px;
          line-height: 16px;
        }
        .count {
          font-size: 8px;
          line-height: 16px;
        }
      }
      .positive {
        background-color: rgba(0, 160, 200, 0.2);
        color: rgb(77, 85, 93);
        &.active{
          background-color: rgb(0, 160, 220);
          color: #fff;
        }
      }
      .negative {
        background-color: rgba(77, 85, 93, 0.2);
        color: rgb(77, 85, 93);
        &.active {
          background-color: rgb(77, 85, 93);
          color: #fff;
        }
      }
    }
    .select-content {
      padding: 12px 0;
      .icon-wrapper {
        display: inline-block;
        margin-right: 4px;
        .icon-check_circle {
          line-height: 24px;
          font-size: 24px;
          color: rgba(147, 153,159);
          &.lived {
            color: #00c850;
          }
        }
      }
      .txt {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        font-size: 12px;
        color: rgb(147, 153, 159);
      }
    }
  }
</style>
