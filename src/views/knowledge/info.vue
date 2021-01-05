<template>
  <div class="docxs">
    <div class="docx">
      <el-scrollbar style="height: 100%">
        <div class="docx-title">{{ info.title }}</div>
        <div class="helpDoc markdown-container markdown-body">
          <div class="helpDocPrettier" v-html="prettierList"></div>
          <!-- 放大图片 -->
          <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
        </div>
      </el-scrollbar>
    </div>
    <div class="docxs-item">
      <img class="docxs-item-img" :src="imgItemSrc" />
      <div class="docxs-item-operate">
        <el-button type="text" icon="el-icon-document" @click="downloadWord">下载Word</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import "github-markdown-css/github-markdown.css";
import BigImg from "@/components/bigimg.vue";
const tocObj = {
  add: function (text, level) {
    var anchor = `toc${level}${++this.index}`;
    this.toc.push({ anchor: anchor, level: level, text: text });
    return anchor;
  },
  toHTML: function () {
    let levelStack = [];
    let result = "";
    const addStartUL = () => {
      result += "<ul class='toc'>";
    };
    const addEndUL = () => {
      result += "</ul>\n";
    };
    const addLI = (anchor, text) => {
      if (anchor) {
        result +=
          '<li class="toc-li"><a href="#' + anchor + '">' + text + "<a></li>\n";
      }
    };

    this.toc.forEach(function (item) {
      let levelIndex = levelStack.indexOf(item.level);
      // 没有找到相应level的ul标签，则将li放入新增的ul中
      if (levelIndex === -1) {
        levelStack.unshift(item.level);
        addStartUL();
        addLI(item.anchor, item.text);
      } // 找到了相应level的ul标签，并且在栈顶的位置则直接将li放在此ul下
      else if (levelIndex === 0) {
        addLI(item.anchor, item.text);
      } // 找到了相应level的ul标签，但是不在栈顶位置，需要将之前的所有level出栈并且打上闭合标签，最后新增li
      else {
        while (levelIndex--) {
          levelStack.shift();
          addEndUL();
        }
        addLI(item.anchor, item.text);
      }
    });
    // 如果栈中还有level，全部出栈打上闭合标签
    while (levelStack.length) {
      levelStack.shift();
      addEndUL();
    }
    // 清理先前数据供下次使用
    this.toc = [];
    this.index = 0;
    return result;
  },
  toc: [],
  index: 0,
};
export default {
  components: {
    "big-img": BigImg,
  },
  data() {
    return {
      prettierList: null,
      showImg: false,
      imgSrc: "",
      info: {},
      imgItemSrc: require("@/assets/xietong.png"),
    };
  },
  created() {
    this.init();
  },
  methods: {
    downloadWord() {
      this.$axios
        .post("/doc/download", { id: this.$route.query.id })
        .then((res) => {
          if (res.status == 200) {
            this.download(res.data);
          } else {
          }
        });
    },
    download(item) {
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = item.url;
      link.setAttribute("download", item.title);
      document.body.appendChild(link);
      link.click();
    },
    viewImg() {
      this.showImg = false;
    },
    clickImg(target) {
      this.showImg = true;
      // 获取当前图片地址
      this.imgSrc = target.src;
    },
    init() {
      let that = this;
      this.prettierList = null;
      this.fetchData().then(() => {
        let container = document.getElementsByClassName("helpDocPrettier")[0];
        container.onclick = function (e) {
          //e指event,事件对象
          let target = e.target || e.srcElement; //target获取触发事件的目标(li)
          if (target.nodeName.toLowerCase() == "img") {
            that.clickImg(target);
          }
        };
      });
    },
    fetchData() {
      return this.$axios
        .post("/doc/info", { id: this.$route.query.id })
        .then((res) => {
          this.info = res.data;
          this.prettierList = this.parsing(res.data.context);
        }).then(() => {
          this.doRead();
        })
    },
    doRead() {
      this.$axios.post("/doc/read", { id: this.$route.query.id });
    },
    parsing(context) {
      let post = {};
      let renderer = new marked.Renderer();
      renderer.heading = (text, level, raw) => {
        let anchor = tocObj.add(text, level);
        return `<a id=${anchor} class="anchor-fix"></a><h${level}>${text}</h${level}>\n`;
      };
      if (context) {
        post.content = marked(context || "", {
          renderer: renderer,
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        });
        post.toc = tocObj.toHTML();
      }
      return post.toc + post.content;
    },
  },
};
</script>

<style lang="scss">
.docxs {
  display: flex;
  background: #f0f2f5 !important;
  justify-content: center;
  &-item {
    background: #fff;
    margin-left: 20px;
    width: 200px;
    height: 200px;
    &-img {
      width: 100%;
    }
    &-operate {
      display: flex;
      justify-content: center;
    }
  }
  .docx {
    width: 780px;
    background: #fff;
    &-title {
      text-align: center;
      margin: 10px 0;
      font-size: 22px;
      font-weight: 700;
      line-height: 1.5;
    }
    .helpDoc {
      padding: 20px;

      .helpDocPrettier {
        img {
          cursor: pointer;
        }
      }
      .toc {
        &-li {
          font-size: 12px;
          color: #a1a6ab;
          a {
            color: #409eff;
            text-decoration: none;
            font-size: 14px;
            cursor: pointer;
            &:hover {
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>