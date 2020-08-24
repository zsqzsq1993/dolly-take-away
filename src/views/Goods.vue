<template>
  <div class="page-goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <div>
        <ul class="side-bar">
          <li v-for="(item,idx) in menuList"
              :key="item.name"
              class="menu-item border-1px"
              :class="{current : idx===currentIndex}"
              @click="selectMenu($event, idx)">
          <span class="content">
            <span class="icon-wrapper" v-if="item.type > -1 && item.type < 5">
              <icon :type="item.type" :series="3"/>
            </span>
            {{item.name}}
          </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul class="food-list">
        <li v-for="foodsItem in foodList" :key="foodsItem.name" class="foods-item-hook">
          <dl class="foods-item">
            <dt class="foods-title">{{foodsItem.name}}</dt>
            <dd class="food-wrapper" v-for="(food,idx) in foodsItem.foods" :key="idx" @click.stop="showFoodDetails(food, $event)">
              <div class="food-avator">
                <img :src="food.icon" alt="food-image" width="57" height="57">
              </div>
              <div class="food-content">
                <h2 class="food-content-title">{{food.name}}</h2>
                <div class="food-content-description" v-if="food.description">{{food.description}}</div>
                <div class="food-content-comments">
                  <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="food-content-price">
                  <span class="price-now">¥{{food.price}}</span>
                  <span class="price-old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cart-controller-wrapper">
                  <cartController :food="food" v-on:cart-add="_drop($event)" />
                </div>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <shopCart ref="shopCart" :list="shopList" :seller="seller"/>
    <foodDetails ref="foodDetails" :food="selectedFood" @addOne="_drop($event)"/>
  </div>
</template>

<script>
  import shopCart from '../../src/components/shopCart/shopCart'
  import icon from '../components/public/icon'
  import cartController from '../components/cartControl/cartControl'
  import foodDetails from '../components/foodDetails/foodDetails'
  import BScroll from 'better-scroll'
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        menuList: [],
        foodList: [],
        scrollY: 0,
        heightsList: [],
        hookList: [],
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
        const self = this
        for (let i = 0; i < self.heightsList.length; i++) {
          if ((i + 1) === self.heightsList.length) {
            return i
          }
          const height1 = self.heightsList[i]
          const height2 = self.heightsList[i + 1]
          if (self.scrollY >= height1 && self.scrollY < height2) {
            return i
          }
        }
        return 0
      },
      shopList() {
        const tempt = []
        this.foodList.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              /* 这里不能重写？ */
              // tempt.push({
              //   name: food.name,
              //   price: food.price,
              //   count: food.count
              // })
              tempt.push(food)
            }
          })
        })
        return tempt
      }
    },
    components: {
      icon,
      shopCart,
      cartController,
      foodDetails
    },
    methods: {
      _initialScroll() {
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3
        })
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _initialHeight() {
        let height = 0
        this.heightsList.push(height)
        this.hookList = this.$refs.foodWrapper.getElementsByClassName('foods-item-hook')
        this.hookList.forEach((item) => {
          height += item.clientHeight
          this.heightsList.push(height)
        })
      },
      selectMenu(event, idx) {
        if (event._constructed) {
          const el = this.hookList[idx]
          this.foodScroll.scrollToElement(el, 100)
        }
      },
      _drop(target) {
        this.$refs.shopCart.drop(target)
      },
      showFoodDetails(food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.foodDetails.showPage()
      }
    },
    async created() {
      const { status, data: { errno, data } } = await this.$axios.get('/goods')
      if (status === 200 && errno === ERR_OK) {
        this.foodList = data
        this.menuList = data.map(item => {
          return {
            name: item.name,
            type: item.type
          }
        })
        // 必须要放在给data赋值后面，赋值后，dom渲染完成后，回调初始函数
        this.$nextTick(() => {
          this._initialHeight()
          this._initialScroll()
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "src/assets/css/global/mixin";
  .page-goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .side-bar {
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      .menu-item {
        display: table;
        width: 56px;
        height: 54px;
        margin: 0 auto;
        @include border-1px(rgba(7,17,27,0.1));
        font-size: 0;
        &:hover {
          cursor: pointer;
        }
        .content {
          display: table-cell;
          vertical-align: middle;
          font-size: 12px;
          font-weight: 200;
          line-height: 14px;
          color: black;
          .icon-wrapper {
            padding: 0;
            margin-right: 2px;
            vertical-align: bottom;
          }
        }
        &.current {
          position: relative;
          margin-top: -1px;
          padding: 0 12px;
          @include border-none();
          background-color: #fff;
          z-index: 10;
          .content {
            font-weight: 400;
          }
        }
      }
    }
    .food-list {
        flex: 1;
        .foods-item {
          width: 100%;
          margin: 0;
          .foods-title {
            width: 100%;
            height: 26px;
            line-height: 26px;
            padding-left: 14px;
            border-left: 2px solid #d9dde1;
            background-color: #f3f5f7;
            text-align: left;
            font-size: 12px;
            color: rgb(147,153,159)
          }
          .food-wrapper {
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            @include border-1px(rgba(7,17,27,0.1));
            &:last-child {
              margin-bottom: 0;
              @include border-none();
            }
            .food-avator {
              flex: 0 0 57px;
              margin-right: 10px;
            }
            .food-content {
              flex: 1;
              padding-top: 2px;
              .food-content-title {
                margin-bottom: 8px;
                font-size: 14px;
                line-height: 14px;
                color: rgb(7,17,27);
              }
              .food-content-description,.food-content-comments{
                margin-bottom: 8px;
                font-size: 10px;
                line-height: 10px;
                color: rgb(147,153,159);
              }
              .food-content-description {
                line-height: 16px;
              }
              .food-content-comments {
                .sell-count {
                  margin-right: 12px;
                }
              }
              .food-content-price {
                vertical-align: top;
                .price-now {
                  margin-right: 8px;
                  font-size: 14px;
                  font-weight: 700;
                  line-height: 24px;
                  color: rgb(240,20,20);
                }
                .price-old {
                  text-decoration: line-through;
                  font-size: 10px;
                  font-weight: normal;
                  line-height: 24px;
                  color: rgb(147,153,159);
                }
              }
              .cart-controller-wrapper {
                position: absolute;
                right: 0;
                bottom: 12px;
              }
            }
          }
        }
      }
    }
</style>
