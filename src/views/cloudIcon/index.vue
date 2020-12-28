<template>
    <div class="icons">
        <div class="icons-content">
            <div class="icons-content-list">
                <div
                    :class="['li']"
                    v-for="(item,index) in icons"
                    :key="index"
                >
                    <svg-icon
                        v-if="item.useType == 'svg-icon'"
                        class="icon-svg"
                        :icon-class="item.name"
                    />
                    <img
                        v-else
                        src=""
                    />
                    <span class="icon-name">{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const req = require.context('@/icons/svg', false, /\.svg$/);

const requireAll = requireContext => requireContext.keys();

const re = /\.\/(.*)\.svg/;

const Icons = requireAll(req).map(i => {
    return i.match(re)[1]
});
export default {
    data() {
        return {
            iconItem: null,
            icons: []
        }
    },
    created() {
        this.icons = Icons.map(m => {
            return { name: m, suffix: ".svg", useType: "svg-icon" }
        })
    },
}
</script>

<style lang="scss" scoped>
.icons {
  &-content {
    overflow-y: auto;
    &-list {
      overflow: hidden;
      padding: 0 !important;
      border: 1px solid #eaeefb;
      border-radius: 4px;
      display: flex;
      flex-wrap: wrap;
      .li {
        &.active {
          color: #5cb6ff;
        }
        display: flex;
        width: calc(25% - 20px);
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #666;
        font-size: 13px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-right: -1px;
        margin-bottom: -1px;
        padding: 10px;
        .icon-name {
          display: inline-block;
          padding: 3px;
        }
        .icon-svg {
          width: 60px !important;
          height: 60px !important;
        }
        &:hover {
          color: #5cb6ff;
        }
      }
    }
  }
}
</style>

