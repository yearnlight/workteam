<template>
  <div class="addTask">
    <el-form ref="elForm" :model="formData" size="small" label-width="160px" label-suffix="：">
      <el-form-item label="">
        <div class="reminder">
          按照业务需求针对任务规划，创建出合理任务项，
          <span class="high">不分配所有者</span>的任务会进任务池。
        </div>
      </el-form-item>
      <el-form-item label="任务名称" prop="name">
        <span>{{formData.name}}</span>
      </el-form-item>
      <el-form-item label="所有者" prop="owner">
        <span>{{formData.owner}}</span>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <span
          :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${$util.displayEnum($enum.statusList,formData.status).color};`"
        >{{$util.displayEnum($enum.statusList,formData.status).label}}</span>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <span>{{$util.displayEnum($enum.prioritys,formData.priority).label}}</span>
      </el-form-item>
      <el-form-item label="预估日期范围" prop="startEndTime">
        <span
          :class="{'line-through':formData.status == 'shelve' || formData.status == 'waitAssign'}"
        >{{formData.startTime}} - {{formData.endTime}}</span>
      </el-form-item>
      <el-form-item label="预估时间" prop="estimatedTime">
        <span
          :class="{'line-through':formData.status == 'shelve' || formData.status == 'waitAssign'}"
        >{{formData.estimatedTime | formatDur}}</span>
      </el-form-item>
      <el-form-item :label="formData.overtime>0?'超时时间':'剩余时间'" prop="overtime">
        <span
          :class="[{'line-through':formData.status == 'shelve' || formData.status == 'waitAssign'},{'red':formData.overtime>0,'warn':formData.overtime<0}]"
          v-if="formData.overtime"
        >{{$util.formatTime(formData.overtime)}}</span>
      </el-form-item>
      <el-form-item label="预估说明" prop="estimatedInfo">
        <pre>
          <code>{{formData.estimatedInfo}}</code>
        </pre>
      </el-form-item>
      <el-form-item label="创建者" prop="creator">
        <span>{{formData.creator}}</span>
      </el-form-item>
      <el-form-item label="已完成%" prop="finished" required>
        <div class="spans">
          <el-col :span="21">
            <el-slider :disabled="true" :max="100" :step="1" v-model="formData.finished"></el-slider>
          </el-col>
          <el-col :span="3">
            <span class="spans-sum">{{formData.finished}} %</span>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        startEndTime: []
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.$route.query.id) {
      this.getTaskInfo(this.$route.query.id);
    }
  },
  mounted() {},
  methods: {
    getTaskInfo(id) {
      this.$axios.post("/task/info", { id: id }).then(res => {
        if (res.status == 200) {
          this.formData = res.data;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.addTask {
  padding: 20px;
  .el-form {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
    padding: 20px;
    &-item {
      .el-select,
      .el-input,
      .el-date-editor,
      .el-textarea,
      .el-radio-group {
        width: 50% !important;
        .el-input {
          width: 100% !important;
        }
      }
    }
  }
  .spans {
    display: flex;
    padding: 0 10px;
    width: 50%;
    align-items: center;
    &-sum {
      padding: 0 10px;
    }
  }
}
</style>
