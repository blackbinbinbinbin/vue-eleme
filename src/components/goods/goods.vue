<template>
  <div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="(item,index) in goods" :key="item.id" class="menu-item" :class="{'current':currentIndex==index}" @click="selectMenu(index, $event)">
        <span class="text boder-1px">
          <icon v-show="item.type>0" :type="item.type" size="16"></icon>
          {{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul>
      <li v-show="item.name" v-for="item in goods" :key="item.id" :index="item.name" class="food-list" ref="foodList">
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
        },
        // 数组装有滑动时每个food-list的高度
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex () {
        for (var i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];
          let nextItemHeight = this.listHeight[i + 1];
          if ((this.scrollY >= height && this.scrollY < nextItemHeight) || !nextItemHeight) {
            return i;
          }
        }

        // 如果没有滑动,返回0
        return 0;
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
          this.goods = Object.assign({}, this.goods, goods);
          // nextTick 保证dom已经渲染，dom真正渲染是在 nextTick 函数之后
          this.$nextTick(() => {
            // 实例化 better-scroll
            this._initScroll();
            // 定义滚动区间
            this._calculateHeight();
          });
        })
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          // better-scroll 在初始化之后就能监听点击事件了额
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      // 选择菜单
      selectMenu (index, event) {
        // 在传入的 event 中，如果是移动页面 better-scroll 会禁止掉原生的click点击，而派发自己的点击事件
        // _constructed=false 标识是原生的点击事件
        if (!event._constructed) {
          return;
        }
        // 右侧滚动到相应位置
        let foodlist = this.$refs.foodList;
        let el = foodlist[index];
        this.foodsScroll.scrollToElement(el, 300);
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
        &.current
          position relative
          margin-top -1px
          z-index 10
          background #fff
          .text
            font-weight 700
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
          padding-left 14px
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
              line-height 12px
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
