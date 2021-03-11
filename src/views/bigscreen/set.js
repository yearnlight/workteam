export default {
    data() {
        var validateArrayStr = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入数组数据'));
            } else {

                try {
                    let arr = JSON.parse(value)
                    if (Array.isArray(arr)) {
                        callback();
                    }
                    else {
                        callback(new Error('数据格式错误，正确例如：["a","b"]'));
                    }
                }
                catch {
                    callback(new Error('数据格式错误，正确例如：["a","b"]'));
                }
            }
        };
        return {
            isSet: false,
            isRefresh: true,
            moduleForm: {
                title: undefined,
                isApi: 1,
                xData: undefined,
                yData: undefined,
                apiUrl: undefined,
                apiType: "get",
                apiParams: undefined
            },
            rules: {
                title: [{ required: true, message: "请输入模块标题", trigger: 'blur' }],
                xData: [{ required: true, message: "请输入xData", trigger: 'blur' }, { validator: validateArrayStr, trigger: 'blur' }],
                yData: [{ required: true, message: "请输入yData", trigger: 'blur' }, { validator: validateArrayStr, trigger: 'blur' }],
                apiUrl: [{ required: true, message: "请输入接口Url", trigger: 'blur' }],
                apiType: [{ required: true, message: "请选择接口类型", trigger: 'change' }],
            },
            interfaceTypes: [
                { label: "GET", value: "get" },
                { label: "POST", value: "post" },
                { label: "PUT", value: "put" },
                { label: "DELETE", value: "delete" },
            ],
            colors: [
                { label: "绿色", value: "#67C23A" },
                { label: "红色", value: "#F56C6C" },
                { label: "黄色", value: "#E6A23C" },
            ],
        }
    },
    methods: {
        fetchBackendData(config) {
            let that = this;
            let apiConfigs = { url: config.apiUrl, method: config.apiType || "get" };
            if (config.apiParams) {
                try {
                    let apiParams = JSON.parse(config.apiParams);
                    if (config.apiType == "get") {
                        apiConfigs = Object.assign(apiConfigs, { params: apiParams })
                    }
                    else {
                        apiConfigs = Object.assign(apiConfigs, { data: apiParams })
                    }
                }
                catch {

                }
            }

            this.$axios(apiConfigs).then(res => {
                if (res.data) {
                    let { xData, yData } = res.data;
                    let temp = []
                    xData.forEach((x, xindex) => {
                        yData.forEach((y, yindex) => {
                            if (xindex == yindex) {
                                temp.push({ name: x, value: y })
                            }
                        })
                    })
                    that.config.data = temp;
                    that.refreshModule()
                }
                else {
                    this.$message.warning("配置接口无数据");
                }
            })
        },
        refreshModule() {
            let that = this;
            that.isRefresh = false;
            that.$nextTick(() => {
                that.isRefresh = true;
            })
        },
        onClosed() {
            let that = this;
            that.isSet = false;
            that.moduleForm = {
                title: undefined,
                isApi: 1,
                xData: undefined,
                yData: undefined,
                apiUrl: undefined,
                apiType: "get",
                apiParams: undefined
            }
        }
    }
}