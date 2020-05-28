<template>
  <div class="page-seller" ref="seller">
    <div class="m-seller">
      <div class="header">
        <div class="header-top">
          <div class="title">{{seller.name}}</div>
          <div class="basic-info">
            <span class="star-wrapper">
              <star :size="36" :score="seller.score"/>
            </span>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collect-wrapper" @click="toggleFavorite($event)">
            <div class="icon-wrapper">
              <i class="icon-favorite" :class="{collected:collected}"/>
            </div>
            <div class="text" :class="{collected:collected}">
              <template v-if="!collected">收藏</template>
              <template v-else>已收藏</template>
            </div>
          </div>
        </div>
        <div class="header-bottom">
          <div class="flex-block">
            <div class="title">起送价</div>
            <div class="value"><strong>{{seller.minPrice}}</strong>元</div>
          </div>
          <div class="flex-block">
            <div class="title">商家配送</div>
            <div class="value"><strong>{{seller.deliveryPrice}}</strong>元</div>
          </div>
          <div class="flex-block">
            <div class="title">平均配送时间</div>
            <div class="value"><strong>{{seller.deliveryTime}}</strong>分钟</div>
          </div>
        </div>
      </div>
      <gap />
      <div class="bulletin-and-supports">
        <div class="bulletin">
          <h1 class="bulletin-header">公告与活动</h1>
          <div class="bulletin-content">{{seller.bulletin}}</div>
        </div>
        <ul class="supports">
          <li class="support"
              v-for="support in seller.supports"
              :key="support.description">
            <span class="icon-wrapper">
              <icon :type="support.type" :series="4" />
            </span>
            <span class="description">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <gap />
      <div class="seller-pics">
        <h1 class="pics-header">商家实景</h1>
        <div class="pics-wrapper" ref="picsWrapper">
          <ul class="pics" ref="picsList">
            <li class="pic-wrapper"
                v-for="pic in seller.pics"
                :key="pic">
              <img :src="pic" alt="商家图片" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <gap />
      <div class="seller-info">
        <div class="info-header">商家信息</div>
        <ul class="info-list">
          <li class="info-item"
              v-for="item in seller.infos"
              :key="item">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../components/public/star'
  import gap from '../components/public/gap'
  import icon from '../components/public/icon'
  import BScroll from 'better-scroll'
  export default {
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      star,
      gap,
      icon
    },
    data() {
      return {
        collected: false
      }
    },
    methods: {
      toggleFavorite(event) {
        if (event._constructed) {
          this.collected = !this.collected
        }
      },
      _initialPageScroll() {
        if (!this.page_scroll) {
          this.page_scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.page_scroll.refresh()
        }
      },
      _initialPicScroll() {
        if (this.seller.pics) {
          const picWidth = 120
          const margin = 6
          const totalWidth = this.seller.pics.length * (picWidth + margin) - margin
          this.$refs.picsList.style.width = `${totalWidth}px`
          if (!this.pic_scroll) {
            this.pic_scroll = new BScroll(this.$refs.picsWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.pic_scroll.refresh()
          }
        }
      }
    },
    mounted() {
      this._initialPageScroll()
      this._initialPicScroll()
    },
    watch: {
      seller() {
        this.$nextTick(() => {
          this._initialPageScroll()
          this._initialPicScroll()
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/css/global/mixin";
  .page-seller {
    position: absolute;
    top: 174px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .header {
      padding: 18px;
      .header-top {
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .title {
          margin-bottom: 8px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .basic-info {
          .star-wrapper {
            display: inline-block;
            margin-right: 8px;
            height: 18px;
          }
          .rating-count, .sell-count {
            margin-right: 12px;
            vertical-align: top;
            line-height: 18px;
            font-size: 10px;
            color: rgb(77, 85, 93);
          }
        }
        .collect-wrapper {
          position: absolute;
          right: 0;
          bottom: 18px;
          width: 50px;
          .icon-wrapper {
            margin-bottom: 4px;
            text-align: center;
            font-size: 24px;
            line-height: 24px;
            i {
              color: #d4d6d9;
              &.collected {
                color: rgb(240, 20, 20);
              }
            }
          }
          .text {
            text-align: center;
            font-size: 10px;
            line-height: 10px;
            color: rgb(77, 85, 93);
          }
        }
      }
      .header-bottom {
        padding-top: 18px;
        display: flex;
        .flex-block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border-right: none;
          }
          .title {
            margin-bottom: 6px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .value {
            line-height: 24px;
            font-size: 10px;
            font-weight: 200;
            color: rgb(7, 17, 27);
            strong {
              font-weight: 300;
              font-size: 24px;
            }
          }
        }
      }
    }
    .bulletin-and-supports {
      padding: 18px 18px 0 18px;
      .bulletin {
        .bulletin-header {
          margin-bottom: 8px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .bulletin-content {
          margin-bottom: 16px;
          padding: 0 12px;
          line-height: 24px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(240, 20, 20);
        }
      }
      .supports {
        .support {
          padding: 16px 12px;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          .icon-wrapper {
            display: inline-block;
            margin-right: 6px;
            span {
              width: 16px;
              height: 16px;
              background-size: 16px;
            }
          }
          .description {
            vertical-align: top;
            line-height: 16px;
            font-size: 12px;
            font-weight: 200;
            color: rgb(7, 17, 27);
          }
        }
      }
    }
    .seller-pics {
      padding: 18px;
      .pics-header {
        margin-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .pics-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pics {
          font-size: 0;
          .pic-wrapper {
            display: inline-block;
            margin-right: 6px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
    .seller-info {
      padding: 18px 18px 0 18px;
      .info-header {
        margin-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .info-item {
        padding: 16px 12px;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        line-height: 16px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(7, 17, 27);
      }
    }
  }
</style>
