<template>
	<div class="editor">
		<!-- <textarea name="editor" class="mk-ed"></textarea> -->
		<mavon-editor class="mk-ed" placeholder=" " v-model="value" :toolbars="toolbars" />
	</div>
</template>

<script>
export default {
	name: 'Editor',
	data() {
		return {
			value: '',
			toolbars: {
				imagelink: true, // 图片链接
				subfield: true, //单双栏模式
				help: true, //帮助
				htmlcode: true, // 展示html源码
				navigation: true // 导航目录
			}
		};
	}
};
</script>

<style lang="stylus" scoped>

.editor
    background-color #f8f9fa;
    border-right 1px solid #dddddd
    position fixed
    top 5.334rem
    left 0
    right 0
    bottom 0
    .mk-ed
        width 100%
        height 100%
</style>
