<template>
  <div class="m-cart-controller">
    <transition name="slide-fade">
      <span class="icon-wrapper" v-show="food.count > 0" @click.stop="decrease">
        <i class="icon-remove_circle_outline"></i>
      </span>
    </transition>
    <span class="count" v-show="food.count">{{food.count}}</span>
    <span class="icon-wrapper" @click.stop="increase">
      <i class="icon-add_circle icon"></i>
    </span>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      increase(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('cart-add', event.target)
      },
      decrease(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="scss">
  .m-cart-controller {
    .icon-wrapper {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      width: 24px;
      color: rgb(0, 160, 220);
    }
    .count {
      display: inline-block;
      text-align: center;
      vertical-align: top;
      width: 24px;
      font-size: 10px;
      line-height: 24px;
      color: rgb(147, 153, 159);
    }
    .slide-fade-enter-active {
      transition: all .4s linear;
    }
    .slide-fade-leave-active {
      transition: all .8s linear;
    }
    .slide-fade-enter, .slide-fade-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0) rotate(180deg);
    }
    .slide-fade-enter-to, .slide-fade-leave {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
</style>
