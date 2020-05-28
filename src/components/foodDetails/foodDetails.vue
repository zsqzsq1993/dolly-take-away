<template>
  <transition name="slide">
    <div class="m-food-details-wrapper" v-show="show" ref="food">
      <div class="m-food-details">
        <div class="image-header">
          <img :src="food.image">
          <div class="back-wrapper" @click="hidePage">
            <i class="back icon-arrow_lift" />
          </div>
        </div>
        <div class="food-content">
          <h1 class="title">{{food.name}}</h1>
          <div class="info">
            <span class="sells">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="current-price">¥{{food.price}}</span>
            <span class="old-price" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cart">
            <transition name="fade">
              <div class="cart-mask" @click="addFirst($event)" v-show="addCartShow">加入购物车</div>
            </transition>
            <div class="cart-wrapper">
              <cartControl :food="food" @cart-add="addOne($event)" ref="cartControl"/>
            </div>
          </div>
        </div>
        <gap />
        <div class="food-description">
          <h1 class="title">商品介绍</h1>
          <p class="content">{{food.info}}</p>
        </div>
        <gap />
        <div class="comments">
          <div class="comments-header">
            <h1 class="title">商品评价</h1>
            <div class="rating-selector-wrapper">
              <ratingSelector :ratings="food.ratings"
                              :rateType="rateType"
                              :onlyContent="onlyContent"
                              @changeRateType="changeRateType($event)"
                              @changeOnlyContent="changeOnlyContent($event)"/>
            </div>
          </div>
          <div class="comments-content">
            <ul>
              <li class="comment"
                  v-for="(comment, idx) in food.ratings"
                  :key="idx"
                  v-show="showComment(comment)">
                <div class="comment-header">
                  <span class="date">{{comment.rateTime | toLocalTime}}</span>
                  <span class="avatar">
                    <img :src="comment.avatar" alt="用户头像" width="12" height="12">
                  </span>
                  <span class="user">{{comment.username}}</span>
                </div>
                <div class="comment-content">
                  <span class="comment-icon-up comment-icon" v-if="comment.rateType === 0">
                    <i class="icon-thumb_up" />
                  </span>
                  <span class="comment-icon-down comment-icon" v-else>
                    <i class="icon-thumb_down" />
                  </span>
                  <span class="comment-text">{{comment.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import cartControl from '../cartControl/cartControl'
  import gap from '../public/gap'
  import ratingSelector from '../ratingSelector/ratingSelector'
  import BScroll from 'better-scroll'
  const ALL = 2
  export default {
    props: {
      food: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      cartControl,
      gap,
      ratingSelector
    },
    data() {
      return {
        show: false,
        rateType: ALL,
        onlyContent: true
      }
    },
    computed: {
      addCartShow() {
        return !this.food.count
      }
    },
    methods: {
      showPage() {
        this.show = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
            }
          })
      },
      hidePage() {
        this.show = false
      },
      addOne(target) {
        this.$emit('addOne', target)
      },
      addFirst(event) {
        if (!event._constructed) {
          return
        }
        this.$refs.cartControl.increase(event)
      },
      showComment(comment) {
        if (this.onlyContent && !comment.text) {
          return false
        } else {
          if (this.rateType === 2) {
            return true
          } else {
            return this.rateType === comment.rateType
          }
        }
      },
      changeRateType(type) {
        this.rateType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      changeOnlyContent(bool) {
        this.onlyContent = bool
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    filters: {
      toLocalTime(value) {
        const date = new Date(value)
        return date.toLocaleString('chinese', { hour12: false })
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/css/global/mixin";
  .m-food-details-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    .m-food-details {
      width: 100%;
      .image-header {
        position: relative;
        width: 100%;
        padding-top: 95%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .back-wrapper {
          position: absolute;
          top: 10px;
          left: 0;
          padding: 10px;
          font-size: 20px;
          font-weight: 400;
          color: #fff;
        }
      }
      .food-content {
        position: relative;
        padding: 18px;
        .title {
          margin-bottom: 8px;
          line-height: 14px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }
        .info {
          margin-bottom: 18px;
          line-height: 10px;
          font-size: 10px;
          font-weight: 400;
          color: rgb(147, 153, 159);
          .sells {
            margin-right: 12px;
          }
        }
        .price {
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
          .old-price {
            margin-left: 12px;
            font-size: 10px;
            font-weight: normal;
            color: rgb(147, 153, 159);
          }
        }
        .cart {
          .cart-wrapper {
            position: absolute;
            right: 18px;
            bottom: 18px;
          }
          .cart-mask {
            position: absolute;
            bottom: 18px;
            right: 18px;
            z-index: 1;
            width: 74px;
            padding: 6px 0;
            text-align: center;
            font-size: 10px;
            line-height: 12px;
            border-radius: 12px;
            background-color: rgb(0, 160, 220);
            color: #fff;
          }
          .fade-enter-active, .fade-leave-active {
            transition: all .2s;
          }
          .fade-enter, .fade-leave-to {
            opacity: 0;
          }
          .fade-enter-to, .fade-leave {
            opacity: 1;
          }
        }
      }
      .food-description {
        padding: 18px;
        .title {
          line-height: 14px;
          font-size: 14px;
          font-weight: 400;
          color: rgb(7, 17, 27);
        }
        .content {
          padding: 6px 8px 0 8px;
          line-height: 24px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(77, 85, 93);
        }
      }
      .comments {
        padding: 18px;
        .comments-header {
          @include border-1px(rgba(7, 17, 27, 0.1));
          .title {
            margin-bottom: 12px;
            padding: 0 0 6px 0;
            line-height: 14px;
            font-size: 14px;
            font-weight: 400;
            color: rgb(7, 17, 27);
          }
          .rating-selector-wrapper {
            margin: 0;
            padding: 0;
          }
        }
        .comments-content {
          .comment {
            padding: 16px 0;
            width: 100%;
            @include border-1px(rgba(7, 17, 27, 0.1));
            .comment-header {
              margin-bottom: 6px;
              height: 12px;
              .date {
                float: left;
                font-size: 10px;
                line-height: 12px;
                vertical-align: top;
                color: rgb(147, 153, 159);
              }
              .user {
                float: right;
                margin-right: 6px;
                font-size: 10px;
                line-height: 12px;
                vertical-align: top;
                color: rgb(147, 153, 159);
              }
              .avatar {
                float: right;
                vertical-align: top;
                height: 12px;
                img {
                  vertical-align: top;
                }
              }
            }
            .comment-content {
              .comment-icon {
                display: inline-block;
                vertical-align: top;
                margin-right: 4px;
                line-height: 24px;
                font-size: 12px;
                color: rgb(147, 153, 159);
                &.comment-icon-up {
                  color: rgb(0, 160, 220);
                }
              }
              .comment-text {
                vertical-align: top;
                line-height: 24px;
                font-size: 12px;
                color: rgb(7, 17, 27);
              }
            }
          }
        }
      }
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .5s linear;
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  .slide-enter-to, .slide-leave {
    transform: translate3d(0, 0, 0);
  }
</style>
