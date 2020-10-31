<template>
  <div class="addTask">
    <el-tabs v-model="activeName">
      <el-tab-pane label="任务详情" name="detail">
        <el-form ref="elForm" :model="formData" size="small" label-width="160px" label-suffix="：">
          <el-form-item label>
            <div class="reminder">
              按照业务需求针对任务规划，创建出合理任务项，
              <span class="high">不分配所有者</span>的任务会进任务池。
            </div>
          </el-form-item>
          <el-form-item label="任务名称" prop="name">
            <span>{{ formData.name }}</span>
          </el-form-item>
          <el-form-item label="所有者" prop="owner">
            <span>{{ formData.owner }}</span>
          </el-form-item>
          <el-form-item label="标签" prop="tag">
            <span v-if="formData.tag" class="action"><span class="label">{{ formData.tag }}</span></span>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${
                $util.displayEnum($enum.statusList, formData.status).color
              };`">{{
              $util.displayEnum($enum.statusList, formData.status).label
              }}</span>
          </el-form-item>
          <el-form-item label="优先级" prop="priority">
            <span>{{
              $util.displayEnum($enum.prioritys, formData.priority).label
              }}</span>
          </el-form-item>
          <el-form-item label="预估日期范围" prop="startEndTime">
            <span :class="{
                'line-through':
                  formData.status == 'shelve' ||
                  formData.status == 'waitAssign',
              }">{{ formData.startTime }} - {{ formData.endTime }}</span>
          </el-form-item>
          <el-form-item label="预估时间" prop="estimatedTime">
            <span :class="{
                'line-through':
                  formData.status == 'shelve' ||
                  formData.status == 'waitAssign',
              }">{{ formData.estimatedTime | formatDur }}</span>
          </el-form-item>
          <el-form-item :label="formData.overtime > 0 ? '超时时间' : '剩余时间'" prop="overtime">
            <span :class="[
                {
                  'line-through':
                    formData.status == 'shelve' ||
                    formData.status == 'waitAssign',
                },
                { red: formData.overtime > 0, warn: formData.overtime < 0 },
              ]" v-if="formData.overtime">{{ $util.formatTime(formData.overtime) }}</span>
          </el-form-item>
          <el-form-item label="预估说明" prop="estimatedInfo">
            <pre class="pre">
          <code>{{formData.estimatedInfo}}</code>
        </pre>
          </el-form-item>
          <el-form-item label="创建者" prop="creator">
            <span>{{ formData.creator }}</span>
          </el-form-item>
          <el-form-item label="已完成%" prop="finished" required>
            <div class="spans">
              <el-col :span="21">
                <el-slider :disabled="true" :max="100" :step="1" v-model="formData.finished"></el-slider>
              </el-col>
              <el-col :span="3">
                <span class="spans-sum">{{ formData.finished }} %</span>
              </el-col>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="任务跟踪" name="log">
        <el-timeline>
          <el-timeline-item :color="$util.displayEnum($enum.statusList, item.status).color" v-for="(item, index) in logs" :key="index" :timestamp="item.updatetime" placement="top">
            <el-card>
              <p>
                <label>操作者：</label>
                {{ item.updater }}
              </p>
              <p>
                <label>状态：</label>
                <span :style="`padding: 2px 6px !important;color: #fff !important;background-color: ${
                    $util.displayEnum($enum.statusList, item.status).color
                  };`">{{
                  $util.displayEnum($enum.statusList, item.status).label
                  }}</span>
              </p>
              <p>
                <label>进度：</label>
                {{ item.finished }}%
              </p>
              <div class="log">
                <label>更新说明：</label>
                <p class="log-info">{{ item.updateInfo }}</p>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      activeName: "detail",
      logs: [],
      formData: {
        startEndTime: [],
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.$route.query.id) {
      this.getTaskInfo(this.$route.query.id);
      this.getTaskLogs(this.$route.query.id);
    }
  },
  mounted() { },
  methods: {
    getTaskLogs(id) {
      this.$axios.post("/task/record", { taskId: id }).then((res) => {
        if (res.status == 200) {
          this.logs = res.data;
        }
      });
    },
    getTaskInfo(id) {
      this.$axios.post("/task/info", { id: id }).then((res) => {
        if (res.status == 200) {
          this.formData = res.data;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.addTask {
  padding: 20px;
  .el-timeline {
    width: 60%;
    label {
      width: 80px;
      display: inline-block;
    }
    .log {
      display: flex;
      &-info {
        color: #999;
        flex: 1;
        white-space: break-spaces;
        margin: 0;
      }
    }
  }
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
