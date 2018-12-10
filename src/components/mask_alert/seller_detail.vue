<template>
  <!-- 弹窗 -->
  <div class="detail" v-show="isShowDetail">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="name" >{{detail.name}}</h1>
        <star size="48" score="3.6"></star>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul class="support_items" v-if="detail.supports">
          <li class="support_item" v-for="support in detail.supports" :key="support.id">
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
            {{detail.bulletin}}
          </p>
        </div>
      </div>
    </div>
    <div class="detail-close" @click="closeDetail()">
        <i class="icon-close" ></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star.vue';
  export default {
    props: {
      detail: {
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
        if (this.detail !== undefined) {
          var bulletin = this.detail.bulletin;
          return bulletin.substring(0, 23) + '...';
        }
        return '';
      }
    },
    methods: {
        closeDetail () {
          this.isShowDetail = false;
        }
    },
    components: {
      star
    }
  }
</script>

<style ang="stylus" ref="stylesheet/stylus">
</style>
