<template>
    <div>
        <el-form ref="demandForm" :model="formData" :rules="rules" size="small" label-width="100px">
            <div class="base">
                <div class="base-header">基本信息</div>
                <div class="base-content">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="formData.name" placeholder="请输入名称" :maxlength="255" show-word-limit clearable></el-input>
                    </el-form-item>
                    <el-form-item label="模块位置" prop="location">
                        <el-input v-model="formData.location" placeholder="请输入模块位置" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="开发阶段" prop="devPhase">
                        <el-input v-model="formData.devPhase" placeholder="请输入开发阶段" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="等级" prop="level">
                        <el-radio-group v-model="formData.level" size="medium">
                            <el-radio v-for="(item, index) in levelOptions" :key="index" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="负责人" prop="master">
                        <el-input v-model="formData.master" placeholder="请输入负责人" clearable suffix-icon='el-icon-user'></el-input>
                    </el-form-item>
                    <el-form-item label="前端负责人" prop="webMaster">
                        <el-input v-model="formData.webMaster" placeholder="请输入前端负责人" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="后端负责人" prop="backMaster">
                        <el-input v-model="formData.backMaster" placeholder="请输入后端负责人" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="describe">
                        <el-input v-model="formData.describe" type="textarea" placeholder="请输入描述" show-word-limit :autosize="{minRows: 4, maxRows: 4}"></el-input>
                    </el-form-item>
                </div>
            </div>

            <div class="base-operate">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm" v-if="!$route.query.id">重置</el-button>
                <el-button @click="$router.go(-1)">返回</el-button>
            </div>

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
                name: undefined,
                location: undefined,
                level: "low",
                master: undefined,
                webMaster: undefined,
                backMaster: undefined,
                describe: "",
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入名称',
                    trigger: 'blur'
                }],
                location: [{
                    required: true,
                    message: '请输入模块位置',
                    trigger: 'blur'
                }],
                level: [{
                    required: true,
                    message: '等级不能为空',
                    trigger: 'change'
                }],
                master: [{
                    required: true,
                    message: '请输入负责人',
                    trigger: 'blur'
                }],
                webMaster: [{
                    required: true,
                    message: '请输入前端负责人',
                    trigger: 'blur'
                }],
                backMaster: [],
                describe: [{
                    required: true,
                    message: '请输入描述',
                    trigger: 'blur'
                }],
            },
            levelOptions: [{
                "label": "低",
                "value": "low"
            }, {
                "label": "中",
                "value": "middle"
            }, {
                "label": "高",
                "value": "high"
            }],
        }
    },
    computed: {},
    watch: {},
    created() {
        if (this.$route.query.id) {
            this.fetchInfo();
        }
    },
    mounted() { },
    methods: {
        fetchInfo() {
            this.$axios.post("/demand/info", { id: this.$route.query.id }).then(res => {
                if (res.status == 200) {
                    this.formData = res.data;
                }
            })
        },
        submitForm() {
            this.$refs['demandForm'].validate(valid => {
                if (!valid) return
                this.$axios.post("/demand/form", this.formData).then(res => {
                    if (res.status == 200) {
                        this.$message.success(res.msg || "操作成功")
                        this.$router.go(-1);
                    }
                    else {
                        this.$message.error(res.msg || "操作失败")
                    }
                })
            })
        },
        resetForm() {
            this.$refs['demandForm'].resetFields()
        },
    }
}
</script>



