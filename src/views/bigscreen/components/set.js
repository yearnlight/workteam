export default {
    props: {
        isSet: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        isSet(n) {
            this.isOpen = n;
        }
    },
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
            isRefresh: true,
            isOpen: false,
            form: {
                title: undefined,
                align: "left",
                isInterface: 0,
                xData: undefined,
                yData: undefined,
                interface: undefined,
                interfaceType: "GET",
                interfaceBody: undefined
            },
            rules: {
                title: [{ required: true, message: "请输入模块标题", trigger: 'blur' }],
                xData: [{ required: true, message: "请输入xData", trigger: 'blur' }, { validator: validateArrayStr, trigger: 'blur' }],
                yData: [{ required: true, message: "请输入yData", trigger: 'blur' }, { validator: validateArrayStr, trigger: 'blur' }],
                interface: [{ required: true, message: "请输入接口", trigger: 'blur' }],
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
        save(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    try {

                        // 自定义颜色组
                        if (that.form.colors) {
                            that.config.color = that.form.colors.map(m => m.value);
                        }

                        // 接口配置
                        if (that.form.isInterface == 1) {
                            // 设置服务对应接口
                            that.config.interface = that.form.interface;
                            that.config.interfaceType = that.form.interfaceType;
                            that.config.interfaceBody = that.form.interfaceBody;
                            that.fetchBackendData(that.config);
                        }
                        else {
                            let temp = []
                            let xData = JSON.parse(that.form.xData)
                            let yData = JSON.parse(that.form.yData)
                            xData.forEach((x, xindex) => {
                                yData.forEach((y, yindex) => {
                                    if (xindex == yindex) {
                                        temp.push({ name: x, value: y })
                                    }
                                })
                            })
                            that.config.data = temp;
                            that.refreshModule();
                        }

                        that.config.title.text = that.form.title;
                        that.config.title.align = that.form.align;

                    }
                    catch {

                    }
                    that.isOpen = false;

                } else {
                    return false;
                }
            });
        },
        fetchBackendData(config) {
            let that = this;
            let apiConfigs = { url: config.interface, method: config.interfaceType || "get" };
            if (config.interfaceBody) {
                try {
                    let interfaceBody = JSON.parse(config.interfaceBody);
                    if (config.interfaceType == "get") {
                        apiConfigs = Object.assign(apiConfigs, { params: interfaceBody })
                    }
                    else {
                        apiConfigs = Object.assign(apiConfigs, { data: interfaceBody })
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
            that.form = {
                title: undefined,
                align: "left",
                xData: undefined,
                yData: undefined,
                isInterface: 0,
                interface: undefined,
                interfaceType: "GET",
                interfaceBody: undefined
            }
            that.$emit("cloudSet", false);
        }
    }
}