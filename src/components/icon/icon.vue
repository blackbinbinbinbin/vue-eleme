<template>
  <span class="icon" :class="iconClass"></span>
</template>

<script>
  export default {
    props: {
      type: {
        type: Number
      },
      size: {
        type: String,
        default: '12'
      }
    },
    data () {
      return {
        supports_icon_map: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      }
    },
    methods: {
      getSupportsIconClass (type) {
        if (this.supports_icon_map[type]) {
          return this.supports_icon_map[type];
        } else {
          return '';
        }
      }
    },
    computed: {
      iconClass () {
        let iconClass = this.getSupportsIconClass(this.type);
        return iconClass + ' icon-' + this.size;
      }
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  @import "../../common/stylus/icon.styl";
  .icon
    display inline-block
    &.icon-12
      width 12px
      height 12px
      background-size 12px
    &.icon-16
      width 16px
      height 16px
      background-size 16px
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
</style>
