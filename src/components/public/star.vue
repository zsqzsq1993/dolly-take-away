<template>
  <div class="stars" :class="itemSize">
    <span class="star-item" v-for="(itemType,idx) in itemList" :key="idx" :class="itemType" />
  </div>
</template>

<script>
  const L = 5
  const CLS_ON = 'on'
  const CLS_HF = 'half'
  const CLS_OFF = 'off'
  export default {
    props: {
      size: {
        type: Number,
        default() {
          return 36
        }
      },
      score: {
        type: Number,
        default() {
          return 4
        }
      }
    },
    computed: {
      itemSize() {
        return `star-${this.size}`
      },
      itemList() {
        const list = []
        const around = Math.floor(this.score * 2) / 2
        const hashalf = around % 1 !== 0
        for (let i = 0; i < Math.floor(around); i++) {
          list.push(CLS_ON)
        }
        if (hashalf) {
          list.push(CLS_HF)
        }
        while (list.length < L) {
          list.push(CLS_OFF)
        }
        return list
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/css/global/mixin.scss";
  .stars {
    font-size: 0;
    .star-item {
      display: inline-block;
    }
    &.star-24 {
      &:last-child {
        margin-right: 0;
      }
      .star-item {
        height: 10px;
        width: 10px;
        margin-right: 4px;
        background-size: 10px 10px;
        &.on {
          @include bg-img("star24_on")
        }
        &.half {
          @include bg-img("star24_half")
        }
        &.off {
          @include bg-img("star24_off")
        }
      }
    }
    &.star-36 {
      &:last-child {
        margin-right: 0;
      }
      .star-item {
        height: 15px;
        width: 15px;
        margin-right: 7px;
        background-size: 15px 15px;
        &.on {
          @include bg-img("star36_on")
        }
        &.half {
          @include bg-img("star36_half")
        }
        &.off {
          @include bg-img("star36_off")
        }
      }
    }
    &.star-48 {
      &:last-child {
        margin-right: 0;
      }
      .star-item {
        height: 20px;
        width: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &.on {
          @include bg-img("star48_on")
        }
        &.half {
          @include bg-img("star48_half")
        }
        &.off {
          @include bg-img("star48_off")
        }
      }
    }
  }
</style>
