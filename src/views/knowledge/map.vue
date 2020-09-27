<template>
  <div class="map">
    <div class="map-project">
      <el-button type="primary" icon="el-icon-plus" @click="add">创建项目</el-button>
      <div id="mountNode"></div>
    </div>

    <div class="map-info">
      <div class="map-info-operate">
        <span class="map-info-title">文档</span>
        <el-button type="primary" icon="el-icon-plus" @click="publicD">发布文档</el-button>
      </div>

      <div class="docs">
        <div class="docs-item" v-for="(item,index) in docs" :key="index">
          <div class="docs-item-content">
            <div class="docs-item-meta">{{item.creator}} · {{item.createtime}}</div>
            <div class="docs-item-title" @click="toInfo(item.id)">{{item.title}}</div>
            <div class="action">
              <span class="label" :style="`border: 1px solid ${item.color};color:${item.color}`" v-if="item.label">{{item.label}}</span>
            </div>
          </div>
          <div class="docs-item-operate">
            <span class="el-icon-edit blue" @click="update(item.id)"></span>
            <el-popover placement="top" width="160" v-model="isDel">
              <p>你确定删除此文档吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="isDel = false">取消</el-button>
                <el-button type="primary" @click="del(item.id)" size="mini">确定</el-button>
              </div>
              <span class="el-icon-delete red" slot="reference"></span>
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="isAdd" @close="onClose" title="创建项目">
      <el-form ref="pageForm" :model="formData" :rules="rules" size="small" label-width="180px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="desc">
          <el-input v-model="formData.desc" type="textarea" placeholder="请输入项目描述" :autosize="{minRows: 4, maxRows: 4}"></el-input>
        </el-form-item>
        <el-form-item label="项目类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择项目类型" clearable>
            <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled">
              <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${$util.displayEnum($enum.projectTypeList,item.value).color};`">{{item.label}}</span>
            </el-option>
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
    this.fetchDoc();
  },
  mounted() {
    this.fetchProject();
  },
  data() {
    return {
      isDel: false,
      isAdd: false,
      userList: [],
      docs: [],
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
        {
          label: "公共",
          value: "common",
        },
      ],
      heroOptions: [],
      projectList: [],
      graph: null,
    };
  },
  methods: {
    toInfo(id) {
      this.$router.push({
        path: "/work/knowledgeMap_infomd",
        query: { id: id },
      });
    },
    update(id) {
      this.$router.push({
        path: "/work/knowledgeMap_addmd",
        query: { id: id },
      });
    },
    del(id) {
      this.isDel = false;
      this.$axios.post("/task/md/delete", { id: id }).then((res) => {
        if (res.status == 200) {
          this.$message.success("删除成功");
          this.fetchDoc();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    publicD() {
      this.$router.push("/work/knowledgeMap_addmd");
    },
    fetchDoc() {
      this.$axios.post("/task/md/list", {}).then((res) => {
        if (res.status == 200) {
          this.docs = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    fetchUser() {
      this.$axios.get("/task/user/list", {}).then((res) => {
        if (res.status == 200) {
          this.userList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    fetchProject() {
      this.$axios.post("/task/project/list", {}).then((res) => {
        if (res.status == 200) {
          this.projectList = res.data;
          this.initG6();
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
        this.formData.color = this.$util.displayEnum(
          this.$enum.projectTypeList,
          this.formData.type
        ).color;
        this.$axios.post("/task/project/create", this.formData).then((res) => {
          if (res.status == 200) {
            this.$message.success("创建项目成功");
            this.fetchProject();
            this.isAdd = false;
          } else {
            this.$message.error("创建项目失败");
          }
        });
      });
    },
    constructData() {},
    initG6() {
      let nodes = this.projectList;
      nodes.forEach((n) => {
        n.description = n.desc;
        n.label = n.name;
        n.meta = {
          creatorName: n.creator,
        };
        n.color = n.color;
        n.type = "ymxNode";
      });
      const data = {
        nodes: nodes,
        edges: [],
      };
      if (this.graph) {
        this.graph.changeData(data);
        this.graph.layout();
        return;
      }
      this.graph = new G6.Graph({
        container: "mountNode",
        height: window.innerHeight - 122,
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
      this.graph.read(data);
    },
  },
};
</script>

<style lang="scss">
.map {
  display: flex;
  &-project {
    flex: 1;
    height: 100%;
    #mountNode {
      height: calc(100% - 32px);
    }
  }

  &-info {
    flex: 1;
    border-left: 1px solid #eee;
    &-operate {
      padding: 10px;
      border-bottom: 1px solid rgba(178, 186, 194, 0.15);
      display: flex;
      justify-content: space-between;
    }
    &-title {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 1.2;
      color: #2e3135;
    }
    .docs {
      height: calc(100% -52px);
      overflow-y: auto;
      &-item {
        border-bottom: 1px solid rgba(178, 186, 194, 0.15);
        &:hover {
          background-color: rgba(0, 0, 0, 0.01);
        }
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1.5rem 2rem;
        &-content {
          display: flex;
          flex-direction: column;
        }
        &-operate {
          display: flex;
          align-items: center;
          span {
            padding: 0 5px;
            cursor: pointer;
          }
        }
        &-meta {
          font-size: 12px;
          color: #b2bac2;
        }
        &-title {
          margin: 0.5rem 0 1rem;
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 1.2;
          color: #2e3135;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>