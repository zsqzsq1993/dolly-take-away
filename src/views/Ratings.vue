<template>
  <div class="page-ratings-wrapper" ref="pageRatings">
    <div class="page-ratings">
      <div class="header">
        <div class="header-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank-rate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="header-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <span class="star-wrapper">
              <star :size="36" :score="seller.serviceScore"/>
            </span>
            <span class="value">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <span class="star-wrapper">
              <star :size="36" :score="seller.foodScore"/>
            </span>
            <span class="value">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-time">
            <span class="title">送达时间</span>
            <span class="value">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="gap-wrapper">
        <gap />
      </div>
      <div class="rating-selector-wrapper">
        <ratingSelector :ratings="ratings"
                        :only-content="onlyContent"
                        :rate-type="rateType"
                        @changeRateType="changeRateType($event)"
                        @changeOnlyContent="changeOnlyContent($event)" />
      </div>
      <div class="ratings-content">
        <ul>
          <li v-for="(rating, idx) in ratings"
              :key="idx"
              v-show="showRating(rating)"
              class="rating">
            <div class="avatar-wrapper">
              <img :src="rating.avatar" alt="用户头像" width="28" height="28">
            </div>
            <div class="rating-content">
              <div class="name-and-time">
                <span class="username">{{rating.username}}</span>
                <span class="time">{{rating.rateTime | toLocalTime}}</span>
              </div>
              <div class="star-and-delivery">
                <span class="star-wrapper">
                  <star :size="24" :score="rating.score" />
                </span>
                <span class="delivery-time" v-if="rating.deliveryTime">
                  {{rating.deliveryTime}}分钟送达
                </span>
              </div>
              <div class="text">
                {{rating.text}}
              </div>
              <div class="recommend">
                <div class="icon-wrapper">
                  <i class="icon-thumb_up" v-if="rating.rateType === 0"/>
                  <i class="icon-thumb_down" v-if="rating.rateType === 1"/>
                </div>
                <template v-if="rating.recommend">
                  <span class="recommend-item"
                      v-for="item in rating.recommend"
                      :key="item">
                    {{item}}
                  </span>
                </template>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import gap from '../components/public/gap'
  import star from '../components/public/star'
  import ratingSelector from '../components/ratingSelector/ratingSelector'
  import BScroll from 'better-scroll'
  const ERR_OK = 0
  const ALL = 2
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
      gap,
      ratingSelector,
      star
    },
    data() {
      return {
        ratings: [],
        rateType: ALL,
        onlyContent: true
      }
    },
    methods: {
      changeOnlyContent(bool) {
        this.onlyContent = bool
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      changeRateType(value) {
        this.rateType = value
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      showRating(rating) {
        if (this.onlyContent && !rating.text) {
          return false
        } else {
          if (this.rateType === 2) {
            return true
          } else {
            return this.rateType === rating.rateType
          }
        }
      }
    },
    async created() {
      const { status, data: { data, errno } } = await this.$axios.get('/ratings')
      if (status === 200 && errno === ERR_OK) {
        this.ratings = data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.pageRatings, {
            click: true
          })
        })
      }
    },
    filters: {
      toLocalTime(value) {
        return new Date(value).toLocaleString('chinese', { hour12: false })
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/css/global/mixin";
  .page-ratings-wrapper {
    position: absolute;
    width: 100%;
    top: 174px;
    left: 0;
    bottom: 0;
    overflow: hidden;
    .page-ratings {
      .header {
        display: flex;
        padding: 18px 0;
        .header-left {
          flex: 0 0 138px;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          .score {
            margin-bottom: 6px;
            text-align: center;
            line-height: 28px;
            font-size: 24px;
            color: rgb(255, 153, 0);
          }
          .title {
            margin-bottom: 8px;
            text-align: center;
            line-height: 12px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .rank-rate {
            margin-bottom: 6px;
            text-align: center;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .header-right {
          flex: 1;
          padding-left: 20px;
          .score-wrapper {
            margin-bottom: 8px;
            .title {
              margin-right: 12px;
              line-height: 18px;
              vertical-align: top;
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .star-wrapper {
              padding-top: 1px;
              display: inline-block;
              height: 17px;
            }
            .value {
              margin-left: 12px;
              line-height: 18px;
              vertical-align: top;
              font-size: 12px;
              color: rgb(255, 153, 0);
            }
          }
          .delivery-time {
            .title {
              margin-right: 12px;
              line-height: 18px;
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .value {
              line-height: 18px;
              font-size: 12px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
      .rating-selector-wrapper {
        padding: 18px 18px 0 18px;
        @include border-1px(rgba(7, 17, 27, 0.1))
      }
      .ratings-content {
        padding: 0 18px;
        .rating {
          display: flex;
          padding: 18px 0;
          @include border-1px(rgba(7, 17, 27, 0.1));
          .avatar-wrapper {
            flex: 0 0 28px;
            margin-right: 12px;
            img {
              border-radius: 50%;
            }
          }
          .rating-content {
            flex: 1;
            .name-and-time {
              margin-bottom: 4px;
              height: 12px;
              .username {
                float: left;
                line-height: 12px;
                font-size: 10px;
                color: rgb(7, 17, 27);
              }
              .time {
                float: right;
                line-height: 12px;
                font-size: 10px;
                font-weight: 200;
                color: rgb(147, 153, 159);
              }
            }
            .star-and-delivery {
              margin-bottom: 6px;
              .star-wrapper {
                display: inline-block;
              }
              .delivery-time {
                display: inline-block;
                margin-left: 6px;
                line-height: 12px;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
            }
            .text {
              font-size: 12px;
              line-height: 18px;
              color: rgb(7, 17, 27);
            }
            .recommend {
              .icon-wrapper {
                display: inline-block;
                margin: 8px 8px 0 0;
                font-size: 12px;
                line-height: 16px;
                .icon-thumb_down {
                  color: rgb(183, 187, 191);
                }
                .icon-thumb_up {
                  color: rgb(0, 160, 220);
                }
              }
              .recommend-item {
                margin: 8px 8px 0 0;
                display: inline-block;
                padding: 0 6px;
                border: 1px solid rgba(7, 17, 27, 0.1);
                border-radius: 2px;
                line-height: 16px;
                font-size: 9px;
                color: rgb(147, 153, 159);
              }
            }
          }
        }

      }
    }
  }
</style>
