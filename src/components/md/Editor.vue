<template>
  <div class="editor">
    <!-- <textarea name="editor" class="mk-ed"></textarea> -->
    <mavon-editor @imglst2Url="imglst2Url" ref="mavon" @imgAdd="handleEditorImgAdd" @imgDel="handleEditorImgDel" class="mk-ed" placeholder=" " v-model="value" :toolbars="toolbars" />
  </div>
</template>

<script>
export default {
  name: "Editor",
  props: {
    docInfo: Object,
  },
  data() {
    return {
      value: "",
      toolbars: {
        imagelink: true, // 图片链接
        subfield: true, //单双栏模式
        help: true, //帮助
        htmlcode: true, // 展示html源码
        navigation: true, // 导航目录
      },
      imgFile: [],
    };
  },
  created() {
    if (this.$route.query && this.$route.query.id) {
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      return this.$axios
        .post("/doc/info", { id: this.$route.query.id })
        .then((res) => {
          this.docInfo = res.data;
          this.value = this.docInfo.context;
           console.log(this.$refs["mavon"])
        });
    },
    handleEditorImgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append("file", $file);
      this.imgFile[pos] = $file;
      this.$axios.post("/doc/files/upload", formdata).then((res) => {
        if (res.status === 200) {
          this.$message.success("上传成功");
          let url = res.data;
          let name = $file.name;
          if (name.includes("-")) {
            name = name.replace(/-/g, "");
          }
          let content = this.value;
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
          if (content.includes(name)) {
            let oStr = `(${pos})`;
            let nStr = `(${url})`;
            let index = content.indexOf(oStr);
            let str = content.replace(oStr, "");
            let insertStr = (soure, start, newStr) => {
              return soure.slice(0, start) + newStr + soure.slice(start);
            };
            this.value = insertStr(str, index, nStr);
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleEditorImgDel(pos) {
      delete this.imgFile[pos];
    }
  },
};
</script>

<style lang="stylus" scoped>
.editor {
  background-color: #f8f9fa;
  border-right: 1px solid #dddddd;
  height: calc(100% - 5.385rem);

  .mk-ed {
    width: 100%;
    height: 100%;
  }
}
</style>
