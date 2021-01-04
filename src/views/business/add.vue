<template>
    <div class="generate">
        <el-form ref="setForm" :model="setData" :rules="rules" size="small" label-width="160px">
            <el-form-item label="服务名称" prop="name">
                <el-input v-model="setData.name" placeholder="请输入服务名称" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="服务Code" prop="code">
                <el-input v-model="setData.code" placeholder="请输入服务Code" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="服务描述" prop="desc">
                <el-input v-model="setData.desc" type="textarea" placeholder="请输入服务描述" :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="服务图标" prop="icon">
                <el-input v-model="setData.icon" placeholder="请输入服务图标（在云计算图标库中寻找/选择）" clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label="服务展现类型" prop="type">
                <el-radio-group v-model="setData.type" size="small">
                    <el-radio v-for="(item, index) in typeOptions" :key="index" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
                <el-button @click="$router.go(-1)">返回</el-button>
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
            setData: {
                name: undefined,
                code: undefined,
                desc: undefined,
                icon: undefined,
                type: "list",
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入服务名称',
                    trigger: 'blur'
                }],
                code: [{
                    required: true,
                    message: '请输入服务Code',
                    trigger: 'blur'
                }],
                desc: [{
                    required: true,
                    message: '请输入服务描述',
                    trigger: 'blur'
                }],
                icon: [{
                    required: true,
                    message: '请输入服务图标（在云计算图标库中寻找/选择）',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '服务展现类型不能为空',
                    trigger: 'change'
                }],
            },
            typeOptions: [{
                "label": "表格",
                "value": "list"
            }, {
                "label": "详情",
                "value": "info"
            }, {
                "label": "关于",
                "value": "about"
            }],
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        submitForm() {
            this.$refs['setForm'].validate(valid => {
                if (!valid) return
                // TODO 提交表单
            })
        },
        resetForm() {
            this.$refs['setForm'].resetFields()
        },
    }
}
</script>

<style lang="scss">
.generate {
}
</style>


