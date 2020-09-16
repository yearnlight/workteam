<template>
	<div class="header">
		<input type="text" placeholder="输入文章标题..." v-model="title" />
		<div class="right-box">
			<i class="iconfont icon-tupian"></i>
			<div class="toggle-btn">
				<span class="title">发布</span>
				<i class="iconfont icon-triangledownfill"></i>
			</div>
			<div class="avatar toggle-btn" :style="{ 'background-image': 'url(' + this.userInfo.avatar + ')' }"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Header',
	props: { userInfo: Object },
	data() {
		return { title: '' };
	},
	watch: {
		title: (n, o) => {
			if (!n) return (document.title = `写文章 - 掘金`);
			document.title = `写文章-${n}-掘金`;
		}
	}
};
</script>

<style lang="stylus" scoped>
.header
    display flex
    align-items center
    width 100%
    height 5.334rem
    position fixed
    top 0
    left 0
    right 0
    padding 0 1.4rem
    background-color #fff
    border-bottom 1px solid #ddd
    z-index 100
    input
        flex 1 1 auto
        height 100%
        margin 0
        padding 0
        font-size 2rem
        font-weight 700
        color #000
        border none
        outline none
    .right-box
        display flex
        align-items center
        flex-direction row
        margin-left 2rem
        .icon-tupian
            font-size 1.55rem
            color #999
            position relative
            top .15rem
            cursor pointer
        .toggle-btn
            margin-left .5rem
            cursor pointer
            color #007fff;
            font-size 1.334rem
            &:hover
                opacity .8
            &>.iconfont
                padding 0 .2rem
                font-size .8rem
                position: relative;
                top: -0.1rem;
        .avatar
            width 2.667rem
            height 2.667rem
            margin-left 1.5rem
            border-radius 50%
            background-color #eee
            background-size cover
            background-repeat no-repeat
            cursor pointer
</style>
