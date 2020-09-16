<template>
  <div class="md">
    <pub-header :user-info="userInfo"></pub-header>
    <editor></editor>
  </div>
</template>

<script>
import PubHeader from "./Header";
import Editor from "./Editor";
import "mavon-editor/dist/css/index.css";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  components: {
    PubHeader,
    Editor,
  },
};
</script>

<style lang="scss">
.md {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, Helvetica Neue,
    PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  color: #333;
  font-size: 12px;
  line-height: 1.5;
}
</style>