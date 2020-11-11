<template>
    <div class="publicCom">
        <el-form ref="comForm" :model="formData" :rules="rules" size="small" label-width="120px">
            <el-form-item label="组件名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入组件名称" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="别名" prop="alias">
                <el-input v-model="formData.alias" placeholder="请输入别名" clearable :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="组件Code" prop="code">
                <el-input v-model="formData.code" placeholder="请输入组件Code(例如：master)" clearable :style="{width: '100%'}">
                </el-input>
            </el-form-item>
            <el-form-item label="框架语言" prop="field110">
                <el-radio-group v-model="formData.field110" size="medium">
                    <el-radio v-for="(item, index) in lans" :key="index" :label="item.value" :disabled="item.disabled">{{item.label}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="组件代码块" prop="codeSpan">
                <el-input v-model="formData.codeSpan" type="textarea" placeholder="请输入组件代码块" :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item label="组件Demo" prop="demoSpan">
                <el-input v-model="formData.demoSpan" type="textarea" placeholder="请输入组件Demo" :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="publicCom">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
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
            formData: {},
            rules: {
                name: [{
                    required: true,
                    message: '请输入组件名称',
                    trigger: 'blur'
                }],
                alias: [{
                    required: true,
                    message: '请输入别名',
                    trigger: 'blur'
                }],
                code: [{
                    required: true,
                    message: '请输入组件Code(例如：master)',
                    trigger: 'blur'
                }],
                field110: [{
                    required: true,
                    message: '框架语言不能为空',
                    trigger: 'change'
                }],
                codeSpan: [{
                    required: true,
                    message: '请输入组件代码块',
                    trigger: 'blur'
                }],
                demoSpan: [{
                    required: true,
                    message: '请输入组件Demo',
                    trigger: 'blur'
                }],
            },
            lans: [{
                "label": "Vue",
                "value": "vue"
            }],
        }
    },
    computed: {},
    watch: {},
    created() { },
    mounted() { },
    methods: {
        publicCom() {
            this.$refs['comForm'].validate(valid => {
                if (!valid) return
                // TODO 提交表单
            })
        },
        resetForm() {
            this.$refs['comForm'].resetFields()
        },
    }
}

</script>

