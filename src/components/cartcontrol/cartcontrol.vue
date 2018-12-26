<template>
  <div class="cartcontrol">
    <transition name="move">
    <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script ype="text/ecmascript-6">
  const EVENT_ADD = 'add';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        // 这里有个 vue 的特性，当检测的数据某个属性增加或者移除时，并不能让template内绑定监听的节点，监听到变化
        // 这里的 food.count 是数据data.json内没有的，所以当赋值的时候，template内的v-show="food.count>0"并不能检测到变化
        // 所以这里需要用 this.$set(this.food, 'count', 1) 强制发生改变属性的事件
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++;
        }
        // 不知道是啥bug，一定要这样子改变这个food的原来的属性，才能使得外层的 selectFoods 计算属性被检查到变化
        this.food.sellCount++;
        this.$emit(EVENT_ADD, event.target);
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .cartcontrol
    .cart-decrease
      display inline-block
      padding: 6px
      opacity: 1
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.2s linear // 针对其所有元素 变化时间0.2s 线性的速度变化
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)  // 这里会开启硬件加速，让动画更流畅一些，24px表示从这个元素右边x轴方向24px的地方挪过来，(x, y, z)
        .inner
          transform: rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
</style>
