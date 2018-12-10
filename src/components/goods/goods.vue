<template>
  <div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="item in goods" :key="item.id" class="menu-item">
        <span class="text boder-1px">
          <icon v-show="item.type>0" :type="item.type" size="16"></icon>
          {{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" v-el:foods-wrapper>
    <ul>
      <li v-for="item in goods" :key="item.id" class="food-list">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" :key="food.id" class="food-item boder-1px">
            <div class="food-img">
              <img width="57" height="57" :src="food.icon" :alt="food.name">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
  import { getGoods } from 'api/index.js';
  import icon from 'components/icon/icon.vue';
  import BScroll from 'better-scroll';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: {
          id: 1
        }
      }
    },
    created () {
      this._getGoods();
    },
    methods: {
      _getGoods () {
        getGoods({
          id: this.goods.id
        }).then((goods) => {
          this.goods = Object.assign({}, this.goods, goods)
          // 实例化 better-scroll
          this.$nextTick(() => {
            this._initScroll();
          });
        })
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
        // this.foodsScroll = new BScroll(this.$els.foodsWrapper, {});
      }
    },
    components: {
      icon
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .goods
    display flex
    position absolute
    top 174px
    width 100%
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        text-align center
        .icon
          vertical-align top
          margin-right 2px
        .text
          font-size 12px
          font-weight 200
          display table-cell
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex 1
      .food-list
        .title
          paddding-left 14px
          height 26px
          line-height 26px
          border-left 2px solid #d9dde1
          font-size 12px
          color rgb(144, 153, 159)
          background-color #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          margin-bottom 0
        .food-img
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc,.extra
            line-height 10px
            font-size 10px
            color rgb(174, 153, 159)
          .desc
            margin-bottom 8px
          .extra
            .sell-count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              font-size 14px
              color rgb(240, 20, 20)
              margin-right 8px
            .old
              text-decoration line-through
              font-size 10px
              color rgb(174, 153, 159)
</style>
