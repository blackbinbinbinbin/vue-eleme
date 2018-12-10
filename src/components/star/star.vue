<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :key="itemClass.id" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script type="text/ecmascript-6">
/* eslint-disable */
	const STARLEN = 5;
    export default {
        props: {
            size: {
				// 星星尺寸：24,36,48
                type: String,
                default: 24
            },
            score: {
                type: Number,   // 分数
                default: 0
            }
        },
        data () {
            return {
            }
		},
        computed: {
            starType () {
                return 'star-'+this.size;
			},
			itemClasses () {
				var on = 0;
				var off = 0;
				var half = 0;
				on = Math.floor(this.score);
				if (on > 0 && this.score-on > 0.5) {
					half = 1;
				}
				if ((5-on-half) > 0) {
					off = (5-on-half);
				}
				
				let classes_item_list = [];
				for (var i = 0; i < STARLEN; i++) {
					if (on > 0) {
						classes_item_list.push('on');
						on--;
						continue;
					}
					if (half > 0) {
						classes_item_list.push('half');
						half--;
						continue;
					}
					if (off > 0) {
						classes_item_list.push('off');
						off--;
						continue;
					}
				}
				return classes_item_list;
			}
		}
    }
</script>

<style lang="stylus" ref="stylesheet/stylus">
	/* eslint-disable */
	@import "../../common/stylus/mixin.styl";
	.star
		.star-item
			display inline-block
			backdrop-repeat no-repeat
		&.star-48
			.star-item
				width 20px
				height 20px
				margin-right 22px
				background-size 20px 20px
				&.last-child
					margin-right 0
				&.on
					bg-image('star48_on')
				&.half
					bg-image('star48_half')
				&.off
					bg-image('star48_off')
		&.star-36
			.star-item
				width 15px
				height 15px
				margin-right 16px
				background-size 15px 15px
				&.last-child
					margin-right 0
				&.on
					bg-image('star36_on')
				&.half
					bg-image('star36_half')
				&.off
					bg-image('star36_off')
		&.star-24
			.star-item
				width 10px
				height 10px
				margin-right 3px
				background-size 10px 10px
				&.last-child
					margin-right 0
				&.on
					bg-image('star24_on')
				&.half
					bg-image('star24_half')
				&.off
					bg-image('star24_off')
</style>