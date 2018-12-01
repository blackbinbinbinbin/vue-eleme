<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar"/>
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="supports">
                        <span class="icon" :class="getSupportsIconClass(seller.supports[0].type)"></span>
                        <span class="text">{{ seller.supports[0].description }}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail()">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div v-if="seller.bulletin" class="bulletin-wrapper" @click="showDetail()">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{getBulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <!-- 背景图片 -->
        <div class="background-img">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <!-- 弹窗 -->
        <div class="detail" v-show="isShowDetail">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                  <h1 class="name" >{{seller.name}}</h1>
                  <star size="48" score="3.6"></star>
                  <div class="title">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                  </div>
                  <ul class="support_items" v-if="seller.supports">
                    <li class="support_item" v-for="support in seller.supports" :key="support.id">
                      <span class="icon" :class="getSupportsIconClass(support.type)"></span>
                      {{ support.description }}
                    </li>
                  </ul>
                  <div class="title">
                    <div class="line"></div>
                    <div class="text">商家信息</div>
                    <div class="line"></div>
                  </div>
                  <div class="seller_bulletin">
                    <p class="content">
                      {{seller.bulletin}}
                    </p>
                  </div>
                </div>
            </div>
            <div class="detail-close" @click="closeDetail()">
                <i class="icon-close" ></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
		import star from 'components/star/star.vue';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                supports_icon_map: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
                isShowDetail: false
            }
        },
        computed: {
            getSupportsIconClass () {
              return function (type) {
                if (this.supports_icon_map[type]) {
                    return this.supports_icon_map[type];
                } else {
                    return '';
                }
              }
            },
            getBulletin () {
              if (this.seller != undefined) {
                var bulletin = this.seller.bulletin;
                return bulletin.substring(0,23) + '...';
              }
              return '';
            }
        },
        methods: {
            showDetail () {
              this.isShowDetail = true;
            },
            closeDetail () {
              this.isShowDetail = false;
            }
				},
				components: {
					star
				}
    };
</script>

<style lang="stylus" ref="stylesheet/stylus">
/* eslint-disable */
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/icon.styl";

    .header
        color #fff
        background rgba(7,17,27,0.5)
        position relative
        .content-wrapper
            position relative
            padding 24px 12px 18px 24px
            .avatar
                display inline-block
                vertical-align top
                img
                    border-radius 2px
            .content
                margin-left 16px
                display inline-block
                .title
                    margin 2px 0 8px 0
                    font-size 16px
                    .name
                        margin-left 6px
                        font-weight bold
                        line-height 18px
                    .brand
                        display inline-block    //spand 是靠内容撑起来的大小，没有东西的时候就不占任何位置，所以设置的时候需要变成 inline-block 并且设置宽高 width,height
                        width 30px
                        height 18px
                        bg-image('brand')   //传入的 brand 参数会自动查找和 header.vue 组件下的相关图片
                        background-size 30px 18px   //将背景图片的大小设置为和 spand .brand 一致
                        vertical-align top  //对齐方式，以顶部为基准
                .description
                    font-size 14px
                    font-weight 200
                    line-height 12px
                    margin-bottom 10px
                .supports
                    font-size 10px
                    .icon
                        display inline-block
                        width 12px
                        height 12px
                        margin-left 2px
                        margin-right 8px
                        vertical-align top
                        &.decrease
                            bg-image('decrease_1')
                        &.discount
                            bg-image('discount_1')
                        &.guarantee
                            bg-image('guarantee_1')
                        &.invoice
                            bg-image('invoice_1')
                        &.special
                            bg-image('special_1')
                        background-size 12px
                    .text
                        line-height 12px
            .support-count
                position absolute
                right 12px
                bottom 18px
                padding 0 8px
                height 24px
                line-height 24px
                border-radius 14px
                background-color rgba(0,0,0,0.2)
                text-align center
                .count
                    vertical-align top
                    font-size 10px
                    margin-left 2px
                .icon-keyboard_arrow_right
                    line-height 24px
                    margin-left 2px
                    font-size 10px
        .bulletin-wrapper
            height 28px
            line-height 28px
            padding 0 22px 0 12px
            background-color rgba(7,17,27,0.2)
            position relative
            .bulletin-title
                width 22px
                height 12px
                display inline-block
                margin-left 12px
                margin-right 4px
                bg-image('bulletin')
                background-size 22px 12px
                vertical-align baseline
            .bulletin-text
                font-size 10px
                vertical-align top
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
            .icon-keyboard_arrow_right
                margin-left 4px
                margin-right 12px
                font-size 12px
                position absolute
                right 12px
                top 8px
        .background-img
            position absolute
            top 0
            left 0
            width 100%  // 这里会铺满 .head 的父元素
            height 100%
            z-index -1  // z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面
            filter blur(10px)   // 设置滤镜，blur给图像设置高斯模糊。传入值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊
        .detail
            position fixed
            top 0
            left 0
            z-index 100
            width 100%
            height 100%
            overflow auto
            background rgba(7, 17, 27, 0.8)
            .detail-wrapper
                min-height 100%
                width 100%
                .detail-main
                    margin-top 64px
                    padding-bottom 64px     // 这里内容有个 padding-bottom 后可以将下面的关闭按钮撑开，而不会覆盖上去
                    .name
                      line-height 16px
                      text-align center
                      font-size 16px
                      font-weight 700
                    .star
                      text-align center
                      margin-top 16px
                    .title
                      display flex
                      margin 28px auto 24px auto
                      width 80%
                      .line
                        flex: 1
                        position: relative
                        top: -6px
                        border-bottom: 1px solid rgba(255, 255, 255, 0.2)
                      .text
                        padding 0 12px
                        font-size 14px
                        font-weight 700 
                    .support_items
                      width 70%
                      text-align left
                      margin 24px auto 28px auto
                      .support_item
                        margin-bottom 12px
                        font-size 12px
                        font-weight 400
                        line-height 16px
                        color rgb(255, 255, 255, 255)
                        .icon
                          vertical-align top
                          display inline-block
                          width 16px
                          height 16px
                          margin-right 2px
                          margin-left 12px
                          &.decrease
                              bg-image('decrease_1')
                          &.discount
                              bg-image('discount_1')
                          &.guarantee
                              bg-image('guarantee_1')
                          &.invoice
                              bg-image('invoice_1')
                          &.special
                              bg-image('special_1')
                          background-size 16px
                    .seller_bulletin
                      width 80%
                      margin 0 auto
                      .content
                        padding 0 12px
                        text-align left
                        font-size 12px
                        font-weight 200
                        line-height 24px
                        color rgb(255, 255, 255, 255)
            .detail-close
                position relative
                width 32px
                height 32px
                margin -64px auto 0 auto
                clear: both
                font-size 32px
                z-index 200
</style>
