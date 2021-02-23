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
                xData: undefined,
                yData: undefined
            },
            rules: {
                title: [{ required: true, message: "请输入模块标题", trigger: 'blur' }],
                xData: [{ validator: validateArrayStr, trigger: 'blur' }],
                yData: [{ validator: validateArrayStr, trigger: 'blur' }],
            },
        }
    },
    methods: {
        save(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    try {
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
                        that.config.title.text = that.form.title;
                        that.config.title.align = that.form.align;
                        that.isRefresh = false;
                        that.$nextTick(() => {
                            that.isRefresh = true;
                        })
                    }
                    catch {

                    }
                    that.isOpen = false;


                } else {
                    return false;
                }
            });
        },
        onClosed() {
            let that = this;
            that.isSet = false;
            that.form = {
                title: undefined,
                align: "left",
                xData: undefined,
                yData: undefined
            }
            that.$emit("cloudSet", false);
        }
    }
}