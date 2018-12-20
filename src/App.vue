<template>
  <div id="v-app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <v-header :seller="seller"></v-header>
  <div class="tab border-1px">
    <div class="tab-item"><router-link to="/goods">商品</router-link></div>
    <div class="tab-item"><router-link to="/rating">评论</router-link></div>
    <div class="tab-item"><router-link to="/seller">商家</router-link></div>
  </div>
  <router-view :seller="seller"></router-view>
  <!-- <div class="content">this is content</div> -->
  </div>
</template>

<script>
  import header from 'components/header/header.vue';
  import { getSeller } from 'api/index.js';
  export default {
    data () {
      return {
        seller: {
          id: 1
        }
      }
    },
    created () {
      this._getSeller()
    },
    methods: {
      _getSeller () {
        getSeller({
          id: this.seller.id
        }).then((seller) => {
          this.seller = Object.assign({}, this.seller, seller)
        })
      }
    },
    components: {
      'v-header': header
    }
  };
</script>
<style lang="stylus">
@import "common/stylus/mixin.styl";
@import "common/stylus/base.styl";

#v-app
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rgb(77, 85, 93)
      .router-link-active
        color rgb(240, 20, 20)
</style>
