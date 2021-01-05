<template>
  <div class="webssh">
    <div class="webssh-hosts">
      <el-button size="mini" class="webssh-hosts-add" icon="el-icon-plus" @click="add">添加机器</el-button>
      <div ref="xshellNode">
        <div @click="Login(item,index + 1)" @contextmenu="rightClick(item)" :class="['webssh-hosts-item']" v-for="(item,index) in hosts" :key="index">
          <span :class="['el-icon-monitor','console-icon']"></span><span :class="[{'active':seletedItem.ip == item.ip},'console-text']">{{item.alias}}({{item.ip}})</span>
        </div>
      </div>
      <VueContextMenu class="right-menu" ref="contextMenu" :target="contextMenuTarget" :show.sync="contextMenuVisible">
        <p @click="deleteNode">删除节点</p>
      </VueContextMenu>
    </div>
    <div class="console">
      <div id="terminal" class="console-terminal" v-if="!seletedItem.ip"></div>
      <div v-show="seletedItem.ip == item.ip" v-for="(item,index) in hosts" :id="`terminal${index + 1}`" class="console-terminal" :key="index"></div>
    </div>
    <el-dialog :visible.sync="isAdd" @close="onClose" title="添加机器">
      <el-form ref="pageForm" :model="formData" :rules="rules" size="small" label-width="160px">
        <el-form-item label="主机IP(H)" prop="ip">
          <el-input v-model="formData.ip" placeholder="请输入主机IP(H)" clearable prefix-icon='el-icon-s-platform' :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="协议(P)" prop="protocol">
          <el-input v-model="formData.protocol" placeholder="请输入协议(P)" :disabled='true' clearable :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="端口号(O)" prop="port">
          <el-input v-model="formData.port" placeholder="请输入端口号(O)" readonly :disabled='true' :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="别名(A)" prop="alias">
          <el-input v-model="formData.alias" placeholder="请输入别名(A)" clearable :style="{width: '90%'}" maxlength="5" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="用户名(U)" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名(U)" clearable prefix-icon='el-icon-user' :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="密码(P)" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码(P)" clearable prefix-icon='el-icon-key' show-password :style="{width: '90%'}"></el-input>
        </el-form-item>
        <el-form-item label="说明(D)" prop="desc">
          <el-input v-model="formData.desc" type="textarea" placeholder="请输入说明(D)" :maxlength="100" show-word-limit :autosize="{minRows: 3, maxRows: 3}" :style="{width: '90%'}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isAdd = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";
import openSocket from "socket.io-client";
// 右击组件
import { component as VueContextMenu } from '@xunlei/vue-context-menu'
const NET_LINK = "net_";

export default {
  name: "Xterm",
  props: {
    socketURI: {
      type: String,
      default: "",
    },
  },
  components: { VueContextMenu },
  created() {
    let hostname = location.hostname;
    if (hostname.includes("location")) {
      hostname = "81.68.200.164"
    }
    this.socket = openSocket(`http://${hostname}:4002/`, {
      autoConnect: true,
    });
    this.fetchHost();
  },
  data() {
    return {
      contextMenuTarget: this.$refs["xshellNode"], // 可右键区域，这里也可以绑定$refs
      contextMenuVisible: false,
      isAdd: false,
      socket: null,
      hosts: [],
      ips: [],
      terms: [],
      term: null,
      rows: 40,
      // cols: 10,
      SetOut: false,
      isKey: false,
      seletedItem: {},
      operateItem: {},
      formData: {
        ip: undefined,
        protocol: "SSH",
        port: 22,
        alias: undefined,
        username: undefined,
        password: "",
        desc: undefined,
      },
      rules: {
        ip: [
          {
            required: true,
            message: "请输入主机IP(H)",
            trigger: "blur",
          },
        ],
        protocol: [
          {
            required: true,
            message: "请输入协议(P)",
            trigger: "blur",
          },
        ],
        port: [
          {
            required: true,
            message: "请输入端口号(O)",
            trigger: "blur",
          },
        ],
        alias: [
          {
            required: true,
            message: "请输入别名(A)",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请输入用户名(U)",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码(P)",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // this.Login();
    this.initTerm();
  },
  beforeDestroy() {
    this.socket.close();
    this.terms.forEach((item) => {
      item.dispose();
    });
  },
  methods: {
    rightClick(item) {
      this.contextMenuVisible = true;
      this.operateItem = item;
      //调用右击组件回调
      this.$refs.contextMenu.contextMenuHandler(event);
    },
    deleteNode() {
      this.$axios.post("/host/delete", { uuid: this.operateItem.uuid }).then((res) => {
        if (res.status == 200) {
          this.$message.success(`移除节点${this.operateItem.ip}成功`)
          this.fetchHost();
          this.contextMenuVisible = false;
        }
        else {
          this.$message.error(`移除节点${this.operateItem.ip}失败`)
        }
      });
    },
    fetchHost() {
      this.$axios.post("/host/list").then((res) => {
        if (res.status == 200) {
          this.hosts = res.data;
        }
      });
    },
    //Xterm主题
    initTerm(index) {
      const term = new Terminal({
        rendererType: "canvas", //渲染类型
        rows: this.rows, //行数
        // cols: this.cols,// 设置之后会输入多行之后覆盖现象
        convertEol: true, //启用时，光标将设置为下一行的开头
        // scrollback: 10,//终端中的回滚量
        fontSize: 14, //字体大小
        disableStdin: false, //是否应禁用输入。
        cursorStyle: "block", //光标样式
        // cursorBlink: true, //光标闪烁
        scrollback: 30,
        tabStopWidth: 4,
        theme: {
          foreground: "#ffffff", //字体
          background: "#060101", //背景色
          cursor: "help", //设置光标
        },
      });
      const attachAddon = new AttachAddon(this.socket);
      const fitAddon = new FitAddon();
      term.loadAddon(attachAddon);
      term.loadAddon(fitAddon);
      term.open(
        document.getElementById(index ? `terminal${index}` : "terminal")
      );
      fitAddon.fit();
      term.focus();
      let _this = this;
      //限制和后端交互，只有输入回车键才显示结果
      term.prompt = () => {
        term.write("\r\n$ ");
      };
      function runFakeTerminal(_this) {
        if (term._initialized) {
          return;
        }
        // 初始化
        term._initialized = true;
        // term.writeln(); //控制台初始化报错处
        term.prompt();
        // / **
        //     *添加事件监听器，用于按下键时的事件。事件值包含
        //     *将在data事件以及DOM事件中发送的字符串
        //     *触发了它。
        //     * @返回一个IDisposable停止监听。
        //  * /
        //   / ** 更新：xterm 4.x（新增）
        //  *为数据事件触发时添加事件侦听器。发生这种情况
        //  *用户输入或粘贴到终端时的示例。事件值
        //  *是`string`结果的结果，在典型的设置中，应该通过
        //  *到支持pty。
        //  * @返回一个IDisposable停止监听。
        //  * /
        // 支持输入与粘贴方法
        // term.onData(function (key) {
        //   let order = {
        //     Data: key,
        //     Op: "stdin",
        //   };
        //   _this.onSend(order);
        // });
        _this.terms[index || 0] = term;
      }
      runFakeTerminal(_this);
    },
    Login({ ip, username, password }, index) {
      let that = this;
      this.seletedItem = { ip, username, password };
      if (that.ips.includes(ip)) {
        return;
      }
      this.$nextTick(() => {
        that.initTerm(index);
        that.socket.emit("createSSHServer", {
          msgId: `NET_LINK${index}`,
          ip: ip,
          username: username,
          password: password,
        });
        that.terms[index].onData(function (data) {
          that.socket.emit(`NET_LINK${index}`, data);
        });
        that.socket.on(`NET_LINK${index}`, (data) => {
          that.terms[index].write(data);
        });
        that.terms[index].write("init...");
        that.ips.push(ip);
      });
    },
    disConnectSocket() {
      this.socket.emit("disConnectSocket", {});
    },
    onClose() {
      this.$refs["pageForm"].resetFields();
    },
    close() {
      this.isAdd = false;
    },
    save() {
      this.$refs["pageForm"].validate((valid) => {
        if (!valid) return;
        this.$axios.post("/host/create", this.formData).then((res) => {
          if (res.status == 200) {
            this.$message.success(res.msg);
            this.close();
            this.fetchHost();
          } else {
            this.$message.error("添加机器失败");
          }
        });
      });
    },
    add() {
      this.isAdd = true;
    },
  },
};
</script>

<style lang="scss">
.webssh {
  display: flex;
  /deep/ td.table_td_h {
    padding: 17px 0;
  }
  /deep/ .right-menu {
    display: none;
    position: fixed;
    background: #fff;
    border: 1px solid #bababa;
    border-radius: 3px;
    z-index: 999;
    box-shadow: 2px 2px 3px 0px rgba(51, 42, 40, 0.7);
    border-radius: 1px;
    p {
      margin: 0;
      display: block;
      padding: 5px;
      text-align: center;
      min-width: 100px;
      color: #333;
      cursor: pointer;
      font-size: 12px;
      border-bottom: 1px solid #e8eaed;
      &:hover {
        background: #e8eaed;
      }
    }
    .menu-disable {
      cursor: no-drop;
      color: #80868b;
    }
  }
  &-hosts {
    width: 180px;
    padding: 10px;
    &-add {
      margin-bottom: 20px;
    }
    &-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      cursor: pointer;

      .console-icon {
        margin-right: 10px;
      }

      .console-text {
        padding: 5px;
        &.active {
          background: #409eff;
          border: 1px dotted #80868b;
          color: #fff;
        }
      }
    }
  }
  .console {
    flex: 1;
    height: 100%;
    &-terminal {
      height: 100%;
      background-color: #000;
    }
  }
}
</style>