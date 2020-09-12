<template>
  <div class="map">
    <div id="mountNode"></div>
    <div class="map-info">
      <el-button type="primary" icon="el-icon-plus" @click="add">创建项目</el-button>
    </div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" :visible.sync="isAdd" @close="onClose" title="创建项目">
      <el-form ref="pageForm" :model="formData" :rules="rules" size="small" label-width="180px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
          <el-input v-model="formData.desc" type="textarea" placeholder="请输入项目描述" :autosize="{minRows: 4, maxRows: 4}"></el-input>
        </el-form-item>
        <el-form-item label="项目类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择项目类型" clearable>
            <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目地址" prop="url">
          <el-input v-model="formData.url" placeholder="请输入项目地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="田主" prop="hero">
          <el-select v-model="formData.hero" filterable placeholder="请选择田主" clearable>
            <el-option v-for="(item, index) in userList" :key="index" :label="item.name" :value="item.name" :disabled="item.disabled">
              <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: #409EFF`">{{item.name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评分" prop="star">
          <el-rate v-model="formData.star" :max="5"></el-rate>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isAdd = false;">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import G6 from "@antv/g6";

G6.registerNode(
  "ymxNode",
  (cfg) => `
<group>
  <rect>
    <rect style={{
      width: 150,
      height: 20,
      fill: ${cfg.color},
      radius: [6, 6, 0, 0],
      cursor: 'move'，
      stroke: ${cfg.color}
    }} draggable="true">
      <text style={{ 
        marginTop: 2, 
        marginLeft: 75, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fill: '#fff' }}>{{label}}</text>
    </rect>
    <rect style={{
      width: 150,
      height: 55,
      stroke: ${cfg.color},
      fill: #ffffff,
      radius: [0, 0, 6, 6],
    }}>
      <text style={{ marginTop: 5, marginLeft: 3, fill: '#333', marginLeft: 4 }}>描述: {{description}}</text>
      <text style={{ marginTop: 10, marginLeft: 3, fill: '#333', marginLeft: 4 }}>田主: {{meta.creatorName}}</text>
    </rect>
  </rect>
  <circle style={{
    stroke: ${cfg.color},
    r: 10,
    fill: '#fff',
    marginLeft: 75,
    cursor: 'pointer'
  }} name="circle">
    <image style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 12, height: 12,  marginLeft: 70,  marginTop: -5 }} />
  </circle>
</group>
`
);

export default {
  name: "start",
  created() {
    this.fetchUser();
  },
  mounted() {
    this.initG6();
  },
  data() {
    return {
      isAdd: false,
      userList: [],
      formData: {
        star: 0,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: true,
            message: "请输入项目描述",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择项目类型",
            trigger: "change",
          },
        ],
        url: [
          {
            required: true,
            message: "请输入项目地址",
            trigger: "blur",
          },
        ],
        hero: [
          {
            required: true,
            message: "请选择田主",
            trigger: "change",
          },
        ],
        star: [
          {
            required: true,
            message: "评分不能为空",
            trigger: "change",
          },
        ],
      },
      typeOptions: [
        {
          label: "Web",
          value: "web",
        },
        {
          label: "Java",
          value: "java",
        },
        {
          label: "Go",
          value: "go",
        },
        {
          label: "配置",
          value: "config",
        },
      ],
      heroOptions: [],
    };
  },
  methods: {
    fetchUser() {
      this.$axios.get("/task/user/list", {}).then((res) => {
        if (res.status == 200) {
          this.userList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    add() {
      this.isAdd = true;
    },
    onClose() {
      this.$refs["pageForm"].resetFields();
    },
    save() {
      this.$refs["pageForm"].validate((valid) => {
        if (!valid) return;
        this.$axios.post("/task/project/create", this.formData).then((res) => {
          if (res.status == 200) {
            this.$message.success("创建项目成功");
            this.isAdd = false;
          } else {
            this.$message.error("创建项目失败");
          }
        });
      });
    },
    constructData() {},
    initG6() {
      const data = {
        nodes: [
          {
            description: "航信云管主项目",
            label: "FitMgr-webframe",
            color: "#2196f3",
            meta: {
              creatorName: "杨明翔",
            },
            id: "node1",
            type: "ymxNode",
          },
          {
            description: "服务发放项目",
            label: "FitMgr-webapp",
            color: "#2196f3",
            meta: {
              creatorName: "杨明翔",
            },
            id: "node2",
            type: "ymxNode",
          },
          {
            description: "服务发放项目",
            label: "FitMgr-webservice",
            color: "#2196f3",
            meta: {
              creatorName: "杨明翔",
            },
            id: "node3",
            type: "ymxNode",
          },
          {
            description: "在线帮助文档",
            label: "FitMgr-doc",
            color: "#2196f3",
            meta: {
              creatorName: "杨明翔",
            },
            id: "node4",
            type: "ymxNode",
          },
          {
            description: "任务管理",
            label: "FitMgr-work",
            color: "#2196f3",
            meta: {
              creatorName: "杨明翔",
            },
            id: "node5",
            type: "ymxNode",
          },
        ],
        edges: [],
      };
      const graph = new G6.Graph({
        container: "mountNode",
        height: (window.innerHeight - 90) / 2,
        width: (window.innerWidth - 200) / 2,
        layout: {
          type: "grid",
          begin: [0, 0], // 可选，
          preventOverlap: true, // 可选，必须配合 nodeSize
          preventOverlapPdding: 20, // 可选
          nodeSize: [180, 90], // 可选
          condense: false, // 可选
          rows: 5, // 可选
          cols: 4, // 可选
          sortBy: "degree", // 可选
          workerEnabled: true, // 可选，开启 web-worker
        },
        nodeStyle: {
          default: {
            fill: "#40a9ff",
            stroke: "#096dd9",
            radius: [6, 6, 0, 0],
            cursor: "move",
            stroke: "#2196f3",
          },
        },
        defaultEdge: {
          type: "cubic-horizontal",
          style: {
            stroke: "#A3B1BF",
            endArrow: true,
          },
        },
        fitCenter: true,
        modes: {
          //   default: ["drag-node", "zoom-canvas"],
        },
      });
      graph.read(data);
    },
  },
};
</script>

<style lang="scss">
.map {
  display: flex;
  #mountNode {
    flex: 1;
    height: 100%;
  }
  &-info {
    flex: 1;
    padding: 10px;
    border-left: 1px solid #eee;
  }
}
</style>