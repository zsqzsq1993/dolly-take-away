<template>
  <span class="icon" :class="className"/>
</template>

<script>
  export default {
    props: {
      type: {
        type: Number,
        default() {
          return ''
        }
      },
      series: {
        type: Number,
        default() {
          return 1
        }
      }
    },
    data() {
      return {
        classMap: [`decrease_${this.series}`, `discount_${this.series}`,
                   `guarantee_${this.series}`, `invoice_${this.series}`,
                   `special_${this.series}`]
      }
    },
    computed: {
      className() {
        if (this.type > -1 && this.type < 5) {
          return this.classMap[this.type]
        } else {
          return ''
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/css/global/mixin";
  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    @include bg-icon();
  }
</style>
