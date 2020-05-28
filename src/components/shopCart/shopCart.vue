<template>
  <div>
    <div class="m-shop-cart" @click="toggleShopList">
      <div class="content-left">
        <div class="icon-wrapper">
          <div class="count" v-show="totalCount > 0">{{totalCount}}</div>
          <div class="icon" :class="{'high-light':totalCount > 0}">
            <i class="icon-shopping_cart"/>
          </div>
        </div>
        <div class="price" :class="{'high-light':totalCount > 0}">¥{{totalPrice}}</div>
        <div class="deliver">另需配送费¥{{seller.deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="payClass" @click.stop="submit">{{payment}}</div>
      <div class="balls-container">
        <div class="ball-wrapper" v-for="(ball, idx) in balls"
             :key="idx">
          <transition v-on:before-enter="beforeEnter"
                      v-on:enter="enter"
                      v-on:after-enter="afterEnter">
            <div class="ball-outer" v-show="ball.show">
              <div class="ball-inner icon-add_circle icon" />
            </div>
          </transition>
        </div>
      </div>
      <div class="cart-list-wrapper">
        <transition name="slide-up">
          <div class="cart-list" v-show="opened">
            <div class="cart-header">
              <div class="header-left">购物车</div>
              <div class="header-right" @click="clearAll">清空</div>
            </div>
            <div class="cart-content" ref="cartContent">
              <ul>
                <li class="food-wrapper" v-for="food in list"
                    :key="food.name">
                  <span class="name">{{food.name}}</span>
                  <span class="control">
                  <cartControl :food="food" @cart-add="drop($event)"/>
                </span>
                  <span class="price">¥{{food.count * food.price}}</span>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="mask-wrapper">
      <transition name="mask-fade">
        <div class="mask" v-show="opened" @click="opened=!opened"/>
      </transition>
    </div>
  </div>
</template>

<script>
  import cartControl from '../cartControl/cartControl'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        balls: [
          { show: false },
          { show: false },
          { show: false },
          { show: false },
          { show: false }
        ],
        dropBalls: [],
        opened: false
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      cartControl
    },
    computed: {
      canOpen() {
        this.$nextTick(() => {
          if (!this.cartScroll) {
            this.cartScroll = new BScroll(this.$refs.cartContent, {
              click: true
            })
          } else {
            this.cartScroll.refresh()
          }
        })
        return this.list.length
      },
      totalCount() {
        let total = 0
        if (!this.list) {
          return 0
        } else {
          this.list.forEach(item => {
            total += item.count
          })
          return total
        }
      },
      totalPrice() {
        let total = 0
        if (!this.list) {
          return 0
        } else {
          this.list.forEach(item => {
            total += item.count * item.price
          })
          return total
        }
      },
      payment() {
        if (this.totalPrice === 0) {
          return `¥${this.seller.minPrice}起送`
        } else if (this.totalPrice < this.seller.minPrice) {
          const diff = this.seller.minPrice - this.totalPrice
          return `还差¥${diff}起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice >= this.seller.minPrice) {
          return 'activated'
        } else {
          return ''
        }
      }
    },
    methods: {
      submit() {
        alert(`已支付¥${this.totalPrice}`)
        this.clearAll()
      },
      drop(el) {
        for (const ball of this.balls) {
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      clearAll() {
        this.list.forEach(food => {
          food.count = 0
        })
      },
      beforeEnter(el) {
        const ball = this.dropBalls[this.dropBalls.length - 1]
        if (ball) {
          const react = ball.el.getBoundingClientRect()
          const dx = react.left - 32
          // const dy = -(react.bottom - 22) react.bottom是元素下边到视窗上边的距离！
          const dy = -(window.innerHeight - react.top - 22)
          const inner = el.getElementsByClassName('ball-inner')[0]
          el.style.display = ''
          el.style.transform = el.style.webkitTransform = `translate3d(0, ${dy}px, 0)`
          inner.style.transform = inner.style.webkitTransform = `translate3d(${dx}px, 0, 0)`
        }
      },
      enter(el, done) {
        // eslint-disable-next-line no-unused-vars
        const rf = el.offsetHeight
        const inner = el.getElementsByClassName('ball-inner')[0]
        el.style.transform = el.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = inner.style.webkitTransform = 'translate3d(0, 0, 0) rotate(360deg)'
        el.addEventListener('transitionend', done)
      },
      afterEnter(el) {
        const ball = this.dropBalls.shift()
        if (ball.show) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleShopList() {
        if (this.canOpen) {
          this.opened = !this.opened
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/css/global/mixin";
  .m-shop-cart {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 46px;
    font-size: 0;
    z-index: 50;
    .content-left {
      flex: 1;
      font-size: 0;
      background-color: #141d27;
      .icon-wrapper {
        position: relative;
        bottom: 8px;
        display: inline-block;
        box-sizing: border-box;
        z-index: 50;
        width: 56px;
        height: 56px;
        margin: 0 12px;
        padding: 6px;
        border-radius: 50%;
        background-color: #141d27;
        .icon {
          width: 100%;
          height: 100%;
          text-align: center;
          border-radius: 50%;
          background-color: #2b343c;
          i {
            font-size: 24px;
            text-align: center;
            color: rgba(255, 255, 255, 0.4);
            line-height: 44px;
          }
          &.high-light {
            background-color: rgb(0, 160, 220);
            i {
              color: #fff;
            }
          }
        }
        .count {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          border-radius: 6px;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          text-align: center;
          vertical-align: top;
          font-size: 10px;
          font-weight: 700;
          line-height: 16px;
          color: #fff;
        }
      }
      .price {
        display: inline-block;
        margin: 0;
        margin: 11px 0 12px 0;
        padding: 0 12px 0 0;
        text-align: left;
        vertical-align: top;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        &.high-light {
          font-weight: 700;
          color: #fff;
        }
      }
      .deliver {
        vertical-align: top;
        display: inline-block;
        padding: 11px 12px;
        text-align: center;
        font-size: 12px;
        font-weight: 300;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      padding: 11px 8px;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.4);
      background-color: #2b343c;
      &.activated {
        background-color: #00b43c;
        color: #fff;
        font-weight: 700;
      }
    }
    .balls-container {
      .ball-wrapper {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        .ball-outer {
          transition: all .8s cubic-bezier(0.49, -0.29, 0.75, 0.41);
          .ball-inner {
            transition: all .8s linear;
          }
        }
      }
    }
    .cart-list-wrapper {
      .cart-list {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        transform: translate3d(0, -100%, 0);
        .cart-header {
          box-sizing: border-box;
          width: 100%;
          height: 40px;
          padding: 0 18px;
          background-color: #f3f5f7;
          .header-left {
            float: left;
            line-height: 40px;
            font-size: 14px;
            font-weight: 200;
            color: rgb(7, 17, 27);
          }
          .header-right {
            float: right;
            line-height: 40px;
            font-size: 14px;
            font-weight: 300;
            color: rgb(0, 160, 220);
          }
        }
        .cart-content {
          width: 100%;
          max-height: 200px;
          background-color: #fff;
          overflow: hidden;
          .food-wrapper {
            padding: 12px 18px;
            @include border-1px(rgba(7, 17, 27, 0.1));
            &>span {
              display: inline-block;
            }
            .name {
              vertical-align: top;
              font-size: 14px;
              line-height: 24px;
              color: rgb(7, 17, 27);
            }
            .control {
              float: right;
            }
            .price {
              float: right;
              line-height: 24px;
              width: 18px;
              vertical-align: top;
              text-align: center;
              margin: 0 12px 0 18px;
              font-size: 14px;
              font-weight: 700;
              color: rgb(240, 20, 20);
            }
          }
        }
      }
      .slide-up-enter-active, .slide-up-leave-active {
        transition: all .5s linear;
      }
      .slide-up-enter, .slide-up-leave-to {
        opacity: 0;
        transform: translate3d(0, 0, 0);
        -webkit-transform: translate3d(0, 0, 0);
      }
      .slide-up-etner-to, slide-up-leave {
        opacity: 1;
      }
    }
  }
  .mask-wrapper {
    .mask {
      z-index: 40;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(7,17,27,0.6);
      transition: all .5s linear;
      backdrop-filter: blur(10px);
    }
  }
</style>
