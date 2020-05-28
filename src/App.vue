<template>
  <div class="app">
    <div class="header">
      <myHeader :seller="seller" />
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/" >商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import myHeader from './components/header/header'
  const ERR_OK = 0
  export default {
    components: {
      myHeader
    },
    data() {
      return {
        seller: {}
      }
    },
    async created() {
      const { status, data: { errno, data } } = await this.$axios.get('seller')
      if (status === 200 && errno === ERR_OK) {
        this.seller = data
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/css/global/mixin";
  .tab {
    height: 40px;
    line-height: 40px;
    width: 100%;
    display: flex;
    @include border-1px(rgba(7, 17, 27, 0.1));

    .tab-item {
      flex: 1;
      text-align: center;

      a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);

        &.active {
          color: rgb(240, 20, 20)
        }
      }
    }
  }
</style>
