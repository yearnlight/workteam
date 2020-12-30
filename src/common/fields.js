export default {
  region: {
    name: "Region",
    searchForm: {
      labels: [
        {
          name: "名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  az: {
    name: "AZ",
    searchForm: {
      labels: [
        {
          name: "Region",
          type: "select",
          placeholder: "",
          data: [
            { value: "houshayu", label: "后沙峪" },
            { value: "jiaxin", label: "嘉兴" }
          ],
          url: "",
          field: "region_id",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  rz: {
    name: "资源区",
    searchForm: {
      labels: [
        {
          name: "Region",
          type: "select",
          placeholder: "",
          data: [
            { value: "houshayu", label: "后沙峪" },
            { value: "jiaxin", label: "嘉兴" }
          ],
          url: "",
          field: "region_id",
          value: ""
        },
        {
          name: "名称",
          placeholder: "请输入资源区名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "英文名称", key: "region_id", value: "" },
          { name: "状态", key: "cloud_platform_type", value: "" },
          { name: "Region", key: "resource_zone_id", value: "" },
          { name: "AZ", key: "create_by", value: "" },
          { name: "虚拟化类型", key: "created_at", value: "" },
          { name: "创建时间", key: "created_at", value: "" },
          { name: "描述", key: "created_at", value: "" }
        ]
      }
    ]
  },
  resource_pool: {
    name: "资源池",
    searchForm: {
      labels: [
        {
          name: "资源区",
          type: "select",
          placeholder: "",
          data: [
            { value: "rz1", label: "资源区1" },
            { value: "rz2", label: "资源区2" },
            { value: "rz3", label: "资源区3" }
          ],
          url: "",
          field: "region_id",
          value: ""
        },
        {
          name: "用途",
          type: "select",
          placeholder: "",
          data: [
            { value: "houshayu", label: "生产" },
            { value: "jiaxin", label: "非生产" }
          ],
          url: "",
          field: "region_id",
          value: ""
        },
        {
          name: "名称",
          placeholder: "请输入资源池名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "资源池名称", key: "name", value: "" },
          { name: "英文名称", key: "name", value: "" },
          { name: "资源用途", key: "form", value: "" },
          { name: "虚拟化环境", key: "region_id", value: "" },
          { name: "Region", key: "", value: "" },
          { name: "资源区", key: "use", value: "" },
          { name: "共享类型", key: "type", value: "" },
          { name: "用途", key: "created_at", value: "" },
          { name: "内存分配预警阈值", key: "alarm_threshold", value: "" },
          { name: "内存分配限制阈值", key: "utilization_threshold", value: "" },
          { name: "创建时间", key: "utilization_threshold", value: "" },
          { name: "描述", key: "utilization_threshold", value: "" }
        ]
      }
    ]
  },
  cluster_pool: {
    name: "集群池",
    searchForm: {
      labels: [
        {
          name: "资源池",
          type: "select",
          placeholder: "",
          data: [
            { value: "rp1", label: "资源池1" },
            { value: "rp2", label: "资源池2" },
            { value: "rp3", label: "资源池3" }
          ],
          url: "",
          field: "region_id",
          value: ""
        },
        {
          name: "名称",
          placeholder: "请输入集群池名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "集群池名称", key: "name", value: "" },
          { name: "资源池名称", key: "form", value: "" },
          { name: "Region", key: "region_id", value: "" },
          { name: "微模块", key: "", value: "" },
          { name: "虚拟化类型", key: "use", value: "" }
        ]
      }
    ]
  },
  cluster_manage: {
    name: "集群管理",
    searchForm: {
      labels: [
        {
          name: "Region",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "regionList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "region_id",
          value: ""
        },
        {
          name: "资源区",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: ""
        },
        {
          name: "虚拟化类型",
          type: "select",
          placeholder: "",
          data: [
            { value: "openstack", label: "openstack" },
            { value: "vmware", label: "vmware" }
          ],
          url: "",
          field: "cloud_platform_type",
          value: ""
        },
        {
          name: "虚拟化环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "cloudPlatformList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "cloud_platform_id",
          value: ""
        },
        {
          name: "资源池",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourcePoolList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_pool_id",
          value: ""
        },
        {
          name: "集群池",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "clusterPoolList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "cluster_pool_id",
          value: ""
        },
        {
          name: "用途",
          type: "select",
          placeholder: "",
          data: [
            { value: "1", label: "生产" },
            { value: "2", label: "非生产" },
            { value: "3", label: "预投放" }
          ],
          url: "",
          field: "purpose",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "存储形式", key: "form", value: "" },
          { name: "Region", key: "region_id", value: "" },
          { name: "设备标准化", key: "version", value: "" },
          { name: "资源池用途", key: "use", value: "" },
          { name: "资源池类型", key: "type", value: "" },
          { name: "创建时间", key: "created_at", value: "" },
          { name: "分配预警阈值", key: "alarm_threshold", value: "" },
          { name: "分配限制阈值", key: "utilization_threshold", value: "" }
        ]
      }
    ]
  },
  storage_resource_pool: {
    name: "存储资源池",
    searchForm: {
      labels: [
        {
          name: "Region",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "regionList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "region_id",
          value: ""
        },
        {
          name: "用途",
          type: "select",
          placeholder: "",
          data: [
            { value: '{"prod": 1}', label: "生产" },
            { value: '{"pre": 1}', label: "非生产" }
          ],
          url: "",
          field: "tags",
          value: ""
        },
        {
          name: "存储形式",
          type: "select",
          placeholder: "",
          data: [
            { value: "file", label: "文件存储" },
            { value: "object", label: "对象存储" }
          ],
          url: "",
          field: "form",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          {
            name: "存储形式",
            key: "form",
            value: "",
            renderType: "DOT",
            enums: {
              file: { label: "文件存储", type: "info" },
              object: { label: "对象存储", type: "primary" }
            }
          },
          { name: "Region", key: "region_idName", value: "" },
          {
            name: "资源池用途", key: "tags", value: "", renderPage: "resouceType"
          },
          {
            name: "资源池类型",
            key: "type",
            value: "",
            enums: {
              centralized: "分布式",
              distributed: "集中式"
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "分配预警阈值", key: "alarm_threshold", value: "" },
          { name: "分配限制阈值", key: "utilization_threshold", value: "" }
        ]
      }
    ]
  },
  storage_pool: {
    name: "存储池",
    searchForm: {
      labels: [
        {
          name: "存储环境",
          type: "select",
          placeholder: "",
          data: [
            { value: "a", label: "北京" },
            { value: "b", label: "上海" }
          ],
          url: "",
          field: "region_id",
          value: ""
        },
        {
          name: "存储池用途",
          type: "select",
          placeholder: "",
          data: [
            { value: "file", label: "文件存储" },
            { value: "obj", label: "对象存储" }
          ],
          url: "",
          field: "region_id",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "镜像名称", key: "image_name", value: "" },
          { name: "用户名称", key: "", value: "" },
          { name: "资源区", key: "", value: "" },
          { name: "创建大小", key: "", value: "" },
          { name: "租户", key: "", value: "" },
          { name: "Project", key: "", value: "" },
          { name: "操作系统", key: "operating_system", value: "" },
          { name: "操作系统版本", key: "os_version", value: "" },
          { name: "启用状态", key: "state", value: "" },
          { name: "镜像大小", key: "image_size", value: "" },
          { name: "虚拟化类型", key: "cloud_platform_type", value: "" },
          { name: "创建时间", key: "create_time", value: "" }
        ]
      }
    ]
  },
  storage_resource_pool_detail: {
    name: "存储资源池详情",
    searchForm: {
      labels: [
        {
          name: "存储环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "storageEnvList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "storage_environment_id",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  cloud_platform: {
    name: "虚拟化环境",
    searchForm: {
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "Region", key: "region_id", value: "" },
          { name: "虚拟化类型", key: "cloud_platform_type", value: "" },
          { name: "资源区", key: "resource_zone_id", value: "" },
          { name: "创建人", key: "create_by", value: "" },
          { name: "接入时间", key: "created_at", value: "" }
        ]
      },
      {
        name: "虚拟化环境",
        fields: [
          { name: "地址", key: "ip", value: "" },
          { name: "Portal地址", key: "url", value: "" },
          { name: "协议", key: "schema", value: "" },
          { name: "默认域", key: "", value: "" },
          { name: "用户名", key: "username", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      },
      {
        name: "宿主机信息",
        fields: [
          { name: "标准化类型", key: "", value: "" },
          { name: "操作系统和版本", key: "", value: "" },
          { name: "备注信息", key: "", value: "" }
        ]
      }
    ]
  },
  sys_images: {
    name: "系统镜像",
    searchForm: {
      labels: [
        {
          name: "虚拟化类型",
          type: "select",
          placeholder: "",
          data: [
            { value: "a", label: "Openstack" },
            { value: "b", label: "VMware" }
          ],
          url: "",
          field: "region_id",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "镜像名称", key: "image_name", value: "" },
          { name: "同步状态", key: "synchronization_status", value: "" },
          { name: "启用状态", key: "state", value: "" },
          { name: "镜像大小", key: "image_size", value: "" },
          { name: "虚拟化类型", key: "cloud_platform_type", value: "" },
          { name: "操作系统", key: "operating_system", value: "" },
          { name: "操作系统版本", key: "os_version", value: "" },
          { name: "磁盘类型", key: "image_type", value: "" },
          {
            name: "主环境",
            key: "master_virtualized_environment_id",
            value: ""
          },
          { name: "校验和", key: "checksum", value: "" },
          { name: "创建时间", key: "create_time", value: "" }
        ]
      }
    ]
  },
  user_images: {
    name: "用户镜像",
    searchForm: {
      labels: [
        {
          name: "资源区",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: ""
        },
        {
          name: "镜像名称",
          placeholder: "搜索名称",
          field: "image_name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "镜像名称", key: "image_name", value: "" },
          { name: "用户名称", key: "cmpUserName", value: "" },
          { name: "资源区", key: "resource_zone_idName", value: "" },
          { name: "创建大小", key: "total_min_disk", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          { name: "操作系统", key: "operating_system", value: "", renderPage: "tagOS" },
          { name: "操作系统版本", key: "os_version", value: "" },
          { name: "镜像大小(G)", key: "image_size", value: "" },
          {
            name: "启用状态",
            key: "cmpStatus",
            value: "",
            renderType: "DOT",
            enums: {
              0: { label: "启用", type: "success" },
              1: { label: "禁用", type: "info" }
            }
          },
          { name: "虚拟化类型", key: "cloud_platform_type", value: "", renderPage: "tagCloudType" },
          { name: "校验和", key: "checksum", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ]
  },
  ali_image: {
    name: "阿里云系统镜像",
    searchForm: {
      labels: [
        {
          name: "可见性",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "imageVisibleList",
            labelName: "label",
            valueName: "value"
          },
          url: "",
          field: "fhcmp_enabled",
          value: "",
          role: 1,
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "image_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "image_id", value: "" },
          { name: "镜像名称", key: "image_name", value: "" },
          { name: "操作系统", key: "platform", value: "" },
          {
            name: "状态",
            key: "status",
            value: "",
            renderType: "EL-TAG",
            enums: {
              UnAvailable: { label: "不可用", type: "danger" },
              Available: { label: "可用", type: "success" },
              Creating: { label: "创建中", type: "warning" },
              CreateFailed: { label: "创建失败", type: "danger" }
            }
          },
          { name: "大小(GiB)", key: "size", value: "" },
          {
            name: "可见性", key: "fhcmp_enabled", value: "",
            enums: {
              true: "可见",
              false: "不可见",
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  ali_user_image: {
    name: "阿里云用户镜像",
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "image_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "image_id", value: "" },
          { name: "镜像名称", key: "image_name", value: "" },
          { name: "操作系统", key: "platform", value: "" },
          {
            name: "状态",
            key: "status",
            value: "",
            renderType: "EL-TAG",
            enums: {
              UnAvailable: { label: "不可用", type: "danger" },
              Available: { label: "可用", type: "success" },
              Creating: { label: "创建中", type: "warning" },
              CreateFailed: { label: "创建失败", type: "danger" }
            }
          },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  vm_image: {
    name: "阿里云主机选择镜像",
    searchForm: {
      labels: [
        {
          name: "镜像分类",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "imageTypeList",
            labelName: "label",
            valueName: "value"
          },
          url: "",
          field: "image_owner_alias",
          value: ""
        },
        {
          name: "操作系统",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "imagePlatformList",
            labelName: "label",
            valueName: "value"
          },
          url: "",
          field: "platform",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "image_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {
        image_owner_alias: "system"
      }
    },
  },
  fire_wall_ingress: {
    name: "防火墙规则",
    searchForm: {
      labels: [
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
  },
  fire_wall_egress: {
    name: "防火墙规则",
    searchForm: {
      labels: [
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
  },
  fire_wall: {
    name: "东西防火墙",
    icon: "firewall",
    explain:
      "防火墙（Firewall）用于管理互联网到业务的访问控制策略和业务与业务之间的隔离策略。不同VPC间的访问策略，在源地址与目的地址所属的东西向防火墙上分别配置策略（VPC间的受限联通需要经过两道墙）。",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          { name: "入方向策略", key: "ingress_firewall_policy_id", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "出方向策略", key: "egress_firewall_policy_id", value: "" },
          { name: "路由器", key: "routers", value: "", renderPage: "tag" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  fire_policy: {
    name: "防火墙策略",
    icon: "firewall",
    explain:
      "对服务器申请新建防火墙策略，包括访问外部和被外部访问，并提供防火墙策略查看入口，需要对防火墙策略进行记录管理",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          { name: "入方向策略", key: "ingress_firewall_policy_id", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "出方向策略", key: "egress_firewall_policy_id", value: "" },
          { name: "路由器", key: "routers", value: "", renderPage: "tag" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  com_region_zone: {
    name: "公有云地域和可用区",
    searchForm: {
      labels: [
        /*
    {
          name: "公有云类型",
          placeholder: "请选择",
          field: "publiccloud_type",
          type: "select",
          data: [
            { value: "aliyun", label: "阿里云" },
            { value: "huaweicloud", label: "华为云" },
            { value: "tencentcloud", label: "腾讯云" },
            { value: "qingyun", label: "青云" }
          ],
          value: ""
        },
    */
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "地域",
          field: "region_local_name",
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "region_id", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          {
            name: "公有云类型",
            key: "publiccloud_type",
            value: "",
            enums: {
              aliyun: "阿里云",
              huaweicloud: "华为云",
              tencentcloud: "腾讯云",
            }
          },
          {
            name: "是否独享",
            key: "shared",
            value: "",
            enums: {
              false: "是",
              true: "否"
            }
          }
        ]
      }
    ]
  },
  vm: {
    name: "虚拟机",
    searchForm: {
      labels: [
        {
          name: "用途",
          placeholder: "请输入用途，支持模糊搜索",
          field: "resourcegategory",
          value: "",
          connector: 6,
          width: 200
        },
        {
          name: "IP",
          placeholder: "请输入IP地址，支持模糊搜索",
          field: "ip_addr",
          value: "",
          connector: 6,
          width: 200
        },
        {
          placeholder: "请输入主机名称，支持模糊搜索",
          field: "name",
          value: "",
          connector: 6,
          width: 160
        },
        {
          field: "status",
          value: "error",
          connector: 1,
          hide: true
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  user: {
    name: "用户",
    searchForm: {
      labels: [
        {
          placeholder: "请输入用户名称，支持模糊搜索",
          field: "name",
          value: "",
          width: 240
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {},
      noPackage: true
    }
  },
  volume: {
    name: "云硬盘",
    icon: "volume",
    explain:
      "云硬盘为您提供用于虚拟机的持久性数据块级存储服务。云硬盘提供多种类型及规格的磁盘实例，满足稳定低延迟的存储性能要求。云硬盘支持在同可用区的实例上挂载/卸载，并且可以在几分钟内调整存储容量，满足弹性的数据需求。您只需为配置的资源量支付低廉的价格就能享受到以上的功能特性。",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "volume_name", value: "" },
          { name: "Region", key: "region_idName", value: "" },
          { name: "资源区", key: "resource_zone_idName", value: "" },
          {
            name: "状态",
            key: "state",
            value: "",
            renderType: "DOT",
            enums: {
              "0": { label: "可用", type: "info" },
              "1": { label: "已挂载", type: "success" },
              "2": { label: "错误", type: "danger" },
              "3": { label: "创建中", type: "warning" },
              "4": { label: "删除中", type: "warning" }
            }
          },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          {
            name: "性能等级",
            key: "volume_type",
            value: "",
            enums: {
              "0": "标准盘",
              "1": "高速盘"
            }
          },
          {
            name: "虚拟化类型",
            key: "cloud_platform_type",
            value: "",
            enums: {
              openstack: "openstack",
              vmware: "vmware"
            }
          },
          {
            name: "用途",
            key: "usage_type",
            value: "",
            renderPage: "usage_type"
          },
          { name: "挂载点", key: "device", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "大小（GB）", key: "volume_size", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "虚拟化类型",
          type: "select",
          placeholder: "",
          data: [
            { value: "openstack", label: "openstack" },
            { value: "vmware", label: "vmware" }
          ],
          url: "",
          field: "cloud_platform_type",
          value: ""
        },
        {
          name: "状态",
          type: "select",
          placeholder: "",
          // data: [
          //   { value: "0", label: "可用" },
          //   { value: "1", label: "已挂载" },
          //   { value: "2", label: "错误" },
          //   { value: "3", label: "创建中" },
          //   { value: "4", label: "删除中" }
          // ],
          data: "map",
          url: "",
          field: "state",
          value: ""
        },
        {
          name: "用途",
          type: "select",
          placeholder: "",
          data: [
            { value: "0", label: "数据盘" },
            { value: "1", label: "系统盘" },
          ],
          url: "",
          field: "usage_type",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "volume_name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  volume_vm: {
    name: "虚拟机",
    searchForm: {
      labels: [],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  volume_task: {
    name: "任务",
    searchForm: {
      labels: [],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  volume_attach_vm: {
    name: "虚拟机",
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "请输入",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  aliVolume_attach_aliVm: {
    name: "阿里云主机",
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "请输入",
          field: "instance_name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  bucket: {
    name: "对象存储",
    icon: "storage",
    explain:
      "对象存储（Object Storage Service，简称 OSS）是海量、安全、低成本、高可靠的云存储服务，具有与平台无关RESTful API，能从互联网任何位置访问。OSS提供标准、低频、归档等类型选择，全面优化存储成本。",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "存储桶名称", key: "bucket_name", value: "" },
          { name: "Region", key: "region_idName", value: "" },
          {
            name: "状态",
            key: "state",
            value: "",
            renderType: "DOT",
            enums: {
              active: { label: "可用", type: "success" },
              error: { label: "错误", type: "danger" },
              creating: { label: "创建中", type: "warning" },
              deleting: { label: "删除中", type: "warning" }
            }
          },
          { name: "单桶最大容量", key: "bucket_capacity", value: "" },
          { name: "单桶最大对象数", key: "object_count", value: "" },
          { name: "访问权限", key: "permissions", value: "" },
          { name: "所在存储环境", key: "store_env_name", value: "" },
          { name: "用户", key: "storage_owner", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "存储环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "storageEnvList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "store_env_id",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "bucket_name",
          value: "",
          connector: 6
        }
      ],
      inputParams: {}
    }
  },
  nas: {
    name: "文件存储",
    explain:
      "文件存储为您提供安全可靠、可扩展的共享文件存储服务。文件存储可以为多个计算节点提供容量和性能可弹性扩展的高性能共享存储。 FitMgr文件存储管理界面简单、易使用，可实现对现有应用的无缝集成。",
    searchForm: {
      labels: [
        // {
        //     name: "存储环境",
        //     type: "select",
        //     placeholder: "",
        //     data: [
        //         { uuid: "NFS", name: "文件存储" },
        //         { uuid: "CIFS", name: "对象存储" }
        //     ],
        //     url: "",
        //     field: "protocol",
        //     value: ""
        // },
        {
          name: "名称",
          placeholder: "请输入文件存储名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "Region", key: "region_idName", value: "" },
          { name: "状态", key: "status", value: "" },
          { name: "存储环境名称", key: "storage_environment_name", value: "" },
          { name: "存储环境IP", key: "storage_environment_ip", value: "" },
          { name: "大小", key: "size", value: "" },
          { name: "协议", key: "protocol", value: "" },
          { name: "挂载IP", key: "mount_ip", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ]
  },
  vm_flavors: {
    name: "虚拟云主机规格",
    searchForm: {
      labels: [
        {
          name: "时间",
          type: "datetime",
          placeholder: "开始时间",
          field: "start_time",
          value: ""
        },
        {
          type: "datetime",
          placeholder: "结束时间",
          field: "end_time",
          value: ""
        },
        {
          type: "select",
          data: [
            { value: "cpu", label: "CPU" },
            { value: "memory", label: "内存" }
          ],
          field: "flavor",
          value: ""
        },
        {
          field: "flavor_zone",
          value: ""
        },
        {
          name: "规格名称",
          field: "name",
          value: ""
        },
        {
          name: "发布状态",
          type: "select",
          data: [
            { value: "0", label: "未发布" },
            { value: "1", label: "已发布" }
          ],
          field: "state",
          value: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: []
      }
    ]
  },
  ali_vm_flavors: {
    name: "阿里云规格",
    searchForm: {
      labels: [
        {
          name: "可见性",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "imageVisibleList",
            labelName: "label",
            valueName: "value"
          },
          url: "",
          field: "enabled",
          value: "",
          role: 1
        },
        {
          name: "规格族",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "instanceFamilyList",
            labelName: "label",
            valueName: "value"
          },
          url: "",
          field: "instance_type_family",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索规格族",
          field: "instance_type_id",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: []
  },
  lb: {
    name: "负载均衡",
    icon: "balancing",
    explain:
      "对多台云服务器进行流量分发的负载均衡服务，可以通过流量分发扩展应用系统对外的服务能力，通过消除单点故障提升应用系统的可用性。",
    searchForm: {
      labels: [
        {
          name: "名称",
          placeholder: "请输入负载均衡名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          { name: "资源区", key: "resource_zone_idName", value: "" },
          { name: "服务类型", key: "type", value: "" },
          { name: "VPC", key: "vpc_idName", value: "" },
          { name: "VIP", key: "vip_address", value: "" },
          {
            name: "使能状态",
            key: "admin_state_up",
            value: "",
            renderType: "EL-TAG",
            enums: {
              "1": { label: "是", type: "info" },
              "0": { label: "否", type: "info" }
            }
          },
          { name: "运行状态", key: "operating_status", value: "" },
          { name: "路由器", key: "router_idName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  vpc: {
    name: "VPC",
    explain:
      "允许VPC内的主机与租户的外部网络通信。备注：航信的不同外包租户之间可以基于这样的方式通过公网进行互相访问；航信用户可以基于这样的方式与Trill网络的网络互访。特别的当租户VPC没有购买专门的防火墙设备时，也可以少量使用南北防火墙实现同一租户的不同VPC的网络互访。",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "英文名称", key: "alias", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          {
            name: "管理状态",
            key: "admin_state_up",
            value: "",
            renderType: "EL-TAG",
            enums: {
              "1": { label: "启用", type: "success" },
              "0": { label: "禁用", type: "danger" }
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  subnet: {
    name: "子网",
    icon: "network",
    explain: " 提供子网创建能力，子网就是将主机地址的几位用来做网络地址来将网络划分为若干个子网,便于管理还能减少IP的浪费。",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "英文名称", key: "alias", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" },
          { name: "网络类型", key: "network_type", value: "", renderPage: "level" },
          { name: "路由器", key: "router_idName", value: "" },
          { name: "子网池", key: "ip_subnetpool_idName", value: "" },
          { name: "网关", key: "gateway", value: "" },
          { name: "资源区", key: "resource_zone_idName", value: "" },
          { name: "IP段", key: "cidr", value: "" },
          { name: "前缀长度", key: "prefixlen", value: "" },
          { name: "vlan", key: "segment_id", value: "" },
          { name: "剩余可用IP数", key: "available_ip_num", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "名称",
          placeholder: "请输入子网名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  subnet_ip_pool: {
    name: "子网IP地址池",
    searchForm: {
      labels: [
        {
          name: "资源区",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: "",
          connector: 0
        },
        {
          name: "名称",
          placeholder: "请输入资源区名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "资源区", key: "resource_zone_idName", value: "" },
          {
            name: "租户类型",
            key: "scope",
            value: "",
            renderType: "EL-TAG",
            enums: {
              hangxin: { label: "航信", type: "info" },
              other: { label: "非航信", type: "info" }
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  ip_pool: {
    name: "IP地址池",
    searchForm: {
      labels: [
        {
          name: "资源区",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: "",
          connector: 0
        },
        {
          name: "名称",
          placeholder: "请输入资源区名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "资源区", key: "resource_zone_idName", value: "" },
          { name: "类型", key: "type", value: "" },
          {
            name: "网络类型/方向",
            key: "role",
            value: "",
            renderType: "EL-TAG",
            enums: {
              Internal: { label: "内网", type: "info" },
              External: { label: "外网", type: "success" },
              "EAST-WEST": { label: "东西向", type: "info" },
              "NORTH-SOUTH": { label: "南北向", type: "success" }
            }
          },
          {
            name: "租户类型",
            key: "scope",
            value: "",
            renderType: "EL-TAG",
            enums: {
              hangxin: { label: "航信", type: "info" },
              other: { label: "非航信", type: "info" }
            }
          },
          { name: "剩余可用IP数", key: "available_ip_number", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  float_ip: {
    name: "浮动IP",
    explain:
      "浮动IP是在某个地域下固定不变的公网IP地址，可以与系统云资源虚拟IP进行绑定，提供访问公网和被公网访问能力；还可与云资源的生命周期解耦合，单独进行操作。",
    icon: "floatIP",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "资源区", key: "resource_zone_idName", value: "" },
          {
            name: "浮动IP类型",
            key: "floating_ip_type",
            value: "",
            renderType: "EL-TAG",
            enums: {
              Internal: { label: "内网", type: "info" },
              External: { label: "外网", type: "success" }
            }
          },
          {
            name: "浮动IP地址",
            key: "floating_ip_address",
            value: "",
            renderPage: "tagfip"
          },
          {
            name: "状态",
            key: "status",
            value: "",
            renderType: "EL-TAG",
            enums: {
              ALLOCATED: { label: "已分配", type: "success" },
              ASSOCIATED: { label: "已关联", type: "info" },
              ACTIVE: { label: "ACTIVE", type: "info" },
              ERROR: { label: "错误", type: "danger" }
            }
          },
          { name: "浮动IP池", key: "fippool_id", value: "" },
          { name: "绑定资源ID", key: "resource_id", value: "" },
          {
            name: "内网IP地址",
            key: "fixed_ip_address",
            value: "",
            renderPage: "tag"
          },
          {
            name: "绑定资源类型",
            key: "resource_type",
            value: "",
            enums: {
              lb: "负载均衡",
              vm: "虚拟机",
              baremetal: "baremetal"
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "资源区",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "floating_ip_address",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  vpc_connect: {
    name: "VPC互联",
    icon: "VPN",
    explain:
      "私有网络（Virtual Private Cloud，VPC）是基于航信云构建的专属云上网络空间，为您在云上的资源提供网络服务，不同私有网络间完全逻辑隔离。为了打通VPC之间的互联访问，提供VPC互联功能，轻松实现跨VPC网络访问。",
    searchForm: {
      labels: [
        {
          name: "名称",
          placeholder: "请输入VPC互联名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          {
            name: "状态", key: "status", value: "", renderType: "DOT", enums: {
              ACTIVE: { label: "正常", type: "success" },
              ERROR: { label: "失败", type: "danger" },
              PENDING_CREATE: { label: "创建中", type: "warning" },
              PENDING_UPDATE: { label: "修改中", type: "warning" },
              PENDING_DELETE: { label: "删除中", type: "warning" }
            },
          },
          { name: "对端VPC", key: "peer_vpc_idName", value: "" },
          { name: "VPC", key: "vpc_idName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" },
          { name: "失败原因", key: "errmsg", value: "", renderPage: "errmsg" }
        ]
      }
    ]
  },
  ali_vpc: {
    name: "阿里云VPC",
    explain:
      "专有网络（VPC）是您自己独有的云上私有网络。您可以完全掌控自己的专有网络，例如选择IP地址范围、配置路由表和网关等，您可以在自己定义的专有网络中使用阿里云资源。",
    searchForm: {
      labels: [
        // {
        //   name: "公有云类型",
        //   type: "select",
        //   placeholder: "请选择",
        //   data: [
        //     { value: "aliyun", label: "阿里云" },
        //     { value: "huaweiyun", label: "华为云" },
        //     { value: "tengxunyun", label: "腾讯云" },
        //     { value: "qingyun", label: "青云" }
        //   ],
        //   url: "",
        //   field: "publiccloud_type",
        //   value: ""
        // },
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "vpc_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "vpc_id", value: "" },
          { name: "名称", key: "vpc_name", value: "" },
          { name: "网段", key: "cidr_block", value: "", renderPage: "tag" },
          { name: "环境", key: "environment_uuid", value: "" },
          { name: "地域", key: "region_id", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  ali_subnet: {
    name: "阿里云子网",
    explain:
      "交换机或子网（VSwitch）是组成专有网络的基础网络设备，用来连接不同的云资源实例。专有网络是地域级别的资源，专有网络不可以跨地域，但包含所属地域的所有可用区。您可以在每个可用区内创建一个或多个交换机来划分子网。",
    searchForm: {
      labels: [
        // {
        //   name: "公有云类型",
        //   type: "select",
        //   placeholder: "请选择",
        //   data: [
        //     { value: "aliyun", label: "阿里云" },
        //     { value: "huaweiyun", label: "华为云" },
        //     { value: "tengxunyun", label: "腾讯云" },
        //     { value: "qingyun", label: "青云" }
        //   ],
        //   url: "",
        //   field: "publiccloud_type",
        //   value: ""
        // },
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "subnet_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "subnet_id", value: "" },
          { name: "名称", key: "subnet_name", value: "" },
          { name: "VPC", key: "vpc_name", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "可用区", key: "zone_local_name", value: "" },
          { name: "网段", key: "cidr_block", value: "", renderPage: "tag" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  domain: {
    name: "域名",
    explain:
      "域名系统（服务）协议（DNS）是一种分布式网络目录服务，主要用于域名与 IP 地址的相互转换。域名服务提供独立的DNS能力。",
    icon: "network02",
    searchForm: {
      labels: [
        {
          name: "类型",
          type: "select",
          placeholder: "",
          data: [
            { value: "internal", label: "内网" },
            { value: "public", label: "外网" }
          ],
          url: "",
          field: "zone",
          value: ""
        },
        {
          placeholder: "搜索域名",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "记录类型", key: "", value: "" },
          { name: "域名", key: "name", value: "" },
          { name: "租户", key: "tenant_id", value: "" },
          { name: "Project", key: "project_id", value: "" },
          { name: "用户", key: "user_id", value: "" },
          { name: "区域类型", key: "type", value: "" },
          { name: "创建时间", key: "created_at", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      },
      {
        name: "默认策略",
        fields: [
          { name: "解析方式", key: "algorithm", value: "" },
          { name: "IP地址", key: "", value: "" }
        ]
      }
    ]
  },
  vlan: {
    name: "Vlan",
    searchForm: {
      labels: [
        {
          name: "类型",
          type: "select",
          placeholder: "",
          data: [{ value: "vlan", label: "vlan" }],
          url: "",
          field: "type",
          value: ""
        },
        {
          name: "资源区",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "资源区", key: "resource_zone_idName", value: "" },
          { name: "类型", key: "type", value: "" },
          { name: "剩余可用VLAN个数", key: "available_number", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  vlan_range: {
    name: "Vlan段",
    searchForm: {},
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "所属vlan", key: "provider_network_idName", value: "" },
          { name: "起始vlan", key: "range_start", value: "" },
          { name: "终止vlan", key: "range_end", value: "" },
          { name: "可用Vlan个数", key: "available_number", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  network_layout: {
    name: "网络编排",
    searchForm: {
      labels: [
        {
          name: "类型",
          type: "select",
          placeholder: "",
          data: [{ value: "NSP", label: "NSP" }, { value: "AC", label: "AC" }],
          url: "",
          field: "type",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "URL", key: "url", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "密码", key: "password", value: "" },
          { name: "类型", key: "type", value: "" },
          { name: "Project", key: "project_id", value: "" },
          { name: "创建时间", key: "create_at", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  storage_env: {
    name: "存储环境",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "名称", key: "name", value: "" },
          { name: "Region", key: "region_id", value: "" },
          { name: "存储形式", key: "form", value: "" },
          { name: "设备厂商", key: "vendor", value: "" },
          { name: "设备版本", key: "model", value: "" },
          { name: "管理地址", key: "manage_ip", value: "" },
          { name: "用户名", key: "user_id", value: "" }
        ]
      }
    ]
  },
  ali_vm: {
    name: "阿里云云主机",
    explain:
      "云服务器（ECS）是阿里云提供的性能卓越、稳定可靠、弹性扩展的IaaS级别云计算服务，实现计算资源的即开即用和弹性伸缩。",
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "状态",
          placeholder: "请选择",
          field: "status",
          type: "select",
          data: [
            { value: "Running", label: "运行中" },
            { value: "Starting", label: "启动中" },
            { value: "Pending", label: "创建中" },
            { value: "Stopping", label: "停止中" },
            { value: "Stopped", label: "已停止" }
          ],
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "instance_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "云主机名称", key: "instance_name", value: "" },
          {
            name: "状态",
            key: "status",
            value: "",
            renderType: "EL-TAG",
            enums: {
              Running: { label: "运行中", type: "success" },
              Starting: { label: "启动中", type: "warning" },
              Pending: { label: "创建中", type: "warning" },
              Stopping: { label: "停止中", type: "warning" },
              Stopped: { label: "已停止", type: "info" }
            }
          },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "可用区", key: "zone_id", value: "" },
          { name: "镜像", key: "image_id", value: "" },
          { name: "规格", key: "instance_type", value: "" },
          {
            name: "IP地址(私网)", key: "listjson_private_ip_address", value: "",
            render: (v) => {
              return v[0];
            }
          },
          { name: "IP地址(公网)", key: "eip_ip_address", value: "" },
          {
            name: "安全组", key: "listjson_security_group_ids", value: "",
            render: (v) => {
              return v[0];
            }
          },
          { name: "子网", key: "v_switch_id", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          {
            name: "付费方式", key: "instance_charge_type", value: "",
            enums: {
              PostPaid: "按量付费",
              PrePaid: "预付费",
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" },
          {
            name: "到期时间", key: "expired_time", value: "",
            showFalse(arr) {
              return arr.filter(item => item.key == "instance_charge_type")[0].value === "预付费"
            }
          },
        ]
      }
    ]
  },
  ali_volume: {
    name: "阿里云块存储",
    explain:
      "块存储是为云服务器ECS提供的低时延、持久性、高可靠的数据块级随机存储。就像对待硬盘一样，您可以对挂载到ECS实例上的块存储做分区、创建文件系统等操作，并对数据持久化存储。",
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "disk_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "disk_id", value: "" },
          { name: "名称", key: "disk_name", value: "" },
          {
            name: "类型",
            key: "category",
            value: "",
            enums: {
              cloud_efficiency: "高效云盘",
              cloud_ssd: "SSD云盘",
              cloud_essd: "ESSD云盘",
              cloud: "普通云盘"
            }
          },
          {
            name: "用途",
            key: "type",
            value: "",
            enums: {
              data: "数据盘",
              system: "系统盘",
            }
          },
          { name: "绑定的虚拟机", key: "instance_id", value: "" },
          {
            name: "状态",
            key: "status",
            value: "",
            rederType: "EL-TAG",
            // enums: {
            //   In_use: { label: "使用中", type: "success" },
            //   Available: { label: "待挂载", type: "info" },
            //   Attaching: { label: "挂载中", type: "danger" },
            //   Detaching: { label: "卸载中", type: "danger" },
            //   Creating: { label: "创建中", type: "danger" },
            //   ReIniting: { label: "初始化中", type: "danger" }
            // },
            tagEnums: true
          },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ]
  },
  region_project_add: {
    name: "关联project",
    searchForm: {
      labels: [
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
  },
  ali_environment: {
    name: "公有云环境",
    searchForm: {
      labels: [
        // {
        //   name: "公有云类型",
        //   placeholder: "请选择",
        //   field: "type",
        //   type: "select",
        //   data: [
        //     { value: "aliyun", label: "阿里云" },
        //     { value: "huaweiyun", label: "华为云" },
        //     { value: "tengxunyun", label: "腾讯云" },
        //     { value: "qingyun", label: "青云" }
        //   ],
        //   value: ""
        // },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "environment_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "名称", key: "environment_name", value: "" },
          {
            name: "公有云类型",
            key: "publiccloud_type",
            value: "",
            enums: {
              aliyun: "阿里云",
              huaweicloud: "华为云",
              tencentcloud: "腾讯云",
              qingyun: "青云"
            }
          },
          {
            name: "租户",
            key: "tenantName",
            value: ""
          },
          // {
          //   name: "是否独享",
          //   key: "shared",
          //   value: "",
          //   enums: {
          //     false: "是",
          //     true: "否"
          //   }
          // },
          { name: "accesskey", key: "access_key", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ]
  },
  glsb: {
    name: "GSLB预配置策略"
  },
  backup: {
    name: "灾备域名预配置策略"
  },
  environment_tenant: {
    name: "关联租户",
    searchForm: {}
  },
  virtual_serve: {
    name: "关联租户",
    searchForm: {
      labels: [
        {
          placeholder: "请输入名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  nas_attach_server: {
    name: "虚拟机",
    searchForm: {
      labels: [
        {
          placeholder: "请输入名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  cidr: {
    name: "cidr",
    componentCode: "resourcecenter_cidr"
  },
  floatip_bind_vm: {
    name: "虚拟机",
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "请输入主机名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  floatip_bind_lb: {
    name: "负载均衡",
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "请输入",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  lb_member: {
    name: "负载均衡Member",
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "请输入",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  lb_pool: {
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "使能状态", key: "admin_state_up", value: "" },
          { name: "负载均衡算法", key: "lb_algorithm", value: "" },
          { name: "后端协议类型", key: "protocol", value: "" },
          { name: "会话保持", key: "session_persistence", value: "" },
          { name: "配置下发状态", key: "provisioning_status", value: "" },
          { name: "运行状态", key: "operating_status", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  lb_listener: {
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "最大连接数", key: "connection_limit", value: "" },
          { name: "监听的协议端口号", key: "protocol_port", value: "" },
          { name: "使能状态", key: "admin_state_up", value: "" },
          { name: "配置下发状态", key: "provisioning_status", value: "" },
          { name: "运行状态", key: "operating_status", value: "" },
          { name: "是否启用SSL", key: "enable_ssl", value: "" },
          { name: "证书路径", key: "client_crl_container_ref", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  router: {
    name: "路由器",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          {
            name: "状态",
            key: "status",
            value: "",
            renderType: "EL-TAG",
            enums: {
              ACTIVE: { label: "可用", type: "success" },
              ERROR: { label: "异常", type: "danger" }
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  resourc_lans_Statistics: {
    name: "资源计划",
    searchForm: {
      // labels: [
      //   {
      //     name: "环境",
      //     type: "select",
      //     placeholder: "",
      //     data: {
      //       type: 'store',//  store 存储;request 请求；数据字典 enums
      //       dataKey: 'publicEnvList',
      //       labelName: 'environment_name',
      //       valueName: 'uuid'
      //     },
      //     url: "",
      //     field: "environment_uuid",
      //     value: ""
      //   },
      //   {
      //     name: "状态",
      //     placeholder: "请选择",
      //     field: "status",
      //     type: "select",
      //     data: [
      //       { value: "Running", label: "运行中" },
      //       { value: "Starting", label: "启动中" },
      //       { value: "Pending", label: "创建中" },
      //       { value: "Stopping", label: "停止中" },
      //       { value: "Stopped", label: "已停止" },
      //     ],
      //     value: ""
      //   },
      //   {
      //     placeholder: "请输入名称",
      //     field: "name",
      //     value: "",
      //     connector: 6,
      //   },
      // ],
      labels: [
        {
          name: "租户",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "project",
          placeholder: "请选择",
          field: "status",
          type: "select",
          data: [
            { value: "first", label: "项目1" },
            { value: "Starting", label: "项目二" }
          ],
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "instance_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  serverLogPolicy: {
    name: "服务日志策略",
    explain:
      "用户可在此申请进行服务器日志策略的新建、修改或删除。服务要求：支持批量、新建日志策略自动化实现，修改、删除日志策略手工执行，不涉及配额，不涉及CMDB配置。"
  },
  addMonitorPolicy: {
    name: "新建监控策略",
    explain:
      "用户可在此申请新建监控策略。服务要求：不支持批量，需要记录用户添加的监控策略，不可重复添加同一策略，新建监控策略自动化实现，不涉及配额，不涉及CMDB配置。"
  },
  fileSysAdjust: {
    name: "文件系统调整",
    explain:
      "用户可对服务器申请特定文件系统扩容。服务要求：仅支持虚机，LINUX系统，建议非生产自动化实现、生产类审批后定时执行。"
  },
  policy_des_compute: {
    searchForm: {
      labels: [
        {
          name: "IP地址",
          placeholder: "请输入IP地址查询",
          field: "ip_address",
          value: "",
          connector: 0
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  policy_source_compute: {
    searchForm: {
      labels: [
        {
          name: "IP地址",
          placeholder: "请输入IP地址查询",
          field: "ip_address",
          value: "",
          connector: 0
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  policy_source_lb: {
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "请输入",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  policy_des_lb: {
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "请输入",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  policy_source_subnet: {
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "请输入",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  policy_des_subnet: {
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "请输入",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  border_gateway: {
    name: "边界网关",
    explain: "各资源区通往不同外部网络域的网关",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "nsp_border_gateway_id", value: "" },
          { name: "名称", key: "name", value: "" },
          // { name: "资源区", key: "resource_zone_idName", value: "" },
          { name: "资源区", key: "resource_zone_id", value: "" },
          {
            name: "状态",
            key: "status",
            value: "",
            renderType: "DOT",
            enums: {
              PENDING_CREATE: { label: "创建中", type: "warning" },
              ACTIVE: { label: "正常", type: "success" },
              ERROR: { label: "错误", type: "danger" }
            }
          },
          { name: "下行链路", key: "down_link", value: "", renderPage: "tag" },

          { name: "创建时间", key: "created_at", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "资源区",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  container_cluster: {
    name: "容器集群",
    explain:
      "使用多个容器来部署应用，这样达到提高并发访问能力和避免单点故障的目的。",
    icon: "contain_cluster",
    searchForm: {
      labels: [
        {
          name: "名称",
          placeholder: "请输入集群名称",
          field: "name",
          value: "",
          connector: 6
        },
        {
          name: "用途",
          type: "select",
          placeholder: "",
          data: [
            { label: "生产", value: "生产" },
            { label: "测试", value: "测试" },
            { label: "UAT", value: "UAT" },
          ],
          url: "",
          field: "useCategery",
          value: ""
        },
        {
          name: "容器业务群组",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "businessGroupList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "businessGroupId",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "资源号(ID)", key: "uuid", value: "" },
          { name: "集群名称", key: "name", value: "" },
          { name: "集群类型", key: "clusterType", value: "" },
          { name: "集群URL", key: "clusterUrl", value: "" },
          { name: "集群partition名称", key: "clusterPartitionName", value: "" },
          { name: "用途", key: "useCategery", value: "", renderPage: "use_categery" },
          { name: "Region", key: "regionIdName", value: "" },
          { name: "版本", key: "clusterVersion", value: "" },
          { name: "所在容器业务群组", key: "businessGroupIdName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ]
  },
  container_tap_user: {
    name: "TAP 用户",
    explain: "创建TAP集群账号",
    icon: "user-o",
    searchForm: {
      labels: [
        {
          name: "用户名称",
          placeholder: "请输入用户名称",
          field: "accountName",
          value: "",
          connector: 6
        },
        {
          name: "角色",
          type: "select",
          placeholder: "",
          data: [
            { label: "管理员", value: "admin" },
            { label: "用户", value: "guest" }
          ],
          url: "",
          field: "role",
          value: ""
        },
        {
          name: "所属Project",
          type: "select",
          placeholder: "请选择Project",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "projectList",
            labelName: "name",
            valueName: "id"
          },
          url: "",
          field: "cmpProjectId",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: []
      }
    ]
  },
  container_real_pv_storage: {
    name: "底层PV存储",
    explain: "",
    searchForm: {
      labels: [
        {
          name: "PV名称",
          placeholder: "请输入PV名称",
          field: "pvName",
          value: "",
          connector: 6
        },
        {
          name: "存储类型",
          type: "select",
          placeholder: "存储类型",
          data: [
            { label: "Block", value: "Block" },
            { label: "NFS", value: "NFS" },
            { label: "S3", value: "S3" }
          ],
          url: "",
          field: "storageType",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: []
      }
    ]
  },
  container_pv_storage: {
    name: "PV 存储",
    explain: "PV的全称是Persistent Volume（持久化卷），是对底层数据存储的抽象，PV由管理员创建、维护以及配置，它和底层的数据存储实现方法有关，比如Ceph，NFS，ClusterFS等，都是通过插件机制完成和共享存储对接",
    icon: "chasis",
    searchForm: {
      labels: [
        {
          name: "存储名称",
          placeholder: "请输入存储名称",
          field: "name",
          value: "",
          connector: 6
        },
        {
          name: "地点(Region)",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "regionList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "regionId",
          value: ""
        },
        {
          name: "存储类型",
          type: "select",
          placeholder: "存储类型",
          data: [
            { label: "Block", value: "Block" },
            { label: "NFS", value: "NFS" },
            { label: "S3", value: "S3" }
          ],
          url: "",
          field: "storageType",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: []
      }
    ]
  },
  container_tenant_image: {
    name: "租户镜像仓库",
    explain: "租户Harbor镜像仓库",
    icon: "resourcecenter_image",
    searchForm: {
      labels: [
        {
          name: "名称",
          placeholder: "请输入名称",
          field: "name",
          value: "",
          connector: 6
        },
        {
          name: "用途",
          type: "select",
          placeholder: "",
          data: [
            { label: "生产", value: "生产" },
            { label: "测试", value: "测试" },
            { label: "UAT", value: "UAT" }
          ],
          url: "",
          field: "useCategery",
          value: ""
        },
        {
          name: "所属Project",
          type: "select",
          placeholder: "请选择Project",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "projectList",
            labelName: "name",
            valueName: "id"
          },
          url: "",
          field: "cmpProjectId",
          value: ""
        },
        {
          name: "用户类型",
          type: "select",
          placeholder: "请选择用户类型",
          data: [
            { label: "TAP", value: "TAP" },
            { label: "外包", value: "外包" },
            { label: "其它", value: "其它" }
          ],
          url: "",
          field: "userType",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: []
      }
    ]
  },
  external_network_domain: {
    name: "外部网络域",
    explain:
      "通过配置外部网络域的网段和边界网关，定义了各资源区通往该网段需要经过的边界网关",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "UUID", key: "uuid", value: "" },
          { name: "名称", key: "name", value: "" },
          {
            name: "边界网关",
            key: "border_gateways",
            value: "",
            renderPage: "tagBg"
          },
          { name: "网段", key: "addresses", value: "", renderPage: "tag" },
          { name: "描述", key: "description", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "名称",
          placeholder: "请输入",
          field: "name",
          value: ""
        },
        {
          name: "网段",
          placeholder: "请输入网段查询",
          field: "addresses",
          value: ""
          //connector: 0
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  external_net_domain_bg: {
    name: "外部网络域边界网关",
    explain: "外部网络域边界网关描述",
    detail: [],
    searchForm: {
      labels: [
        {
          name: "资源区",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  business_chain: {
    name: "业务链",
    explain:
      "VPC内网段和外部网络域的逻辑链路，可指定整个VPC、VPC内某个资源区、某个子网和外部网络域打通",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "UUID", key: "uuid", value: "" },
          { name: "名称", key: "name", value: "" },
          {
            name: "状态",
            key: "status",
            value: "",
            renderType: "EL-TAG",
            enums: {
              ACTIVE: { label: "正常", type: "success" },
              ERROR: { label: "异常", type: "danger" },
              PENDING_CREATE: { label: "创建中", type: "warning" },
              PENDING_UPDATE: { label: "更新中", type: "warning" },
              PENDING_DELETE: { label: "删除中", type: "warning" }
            }
          },
          { name: "错误信息", key: "errmsg", value: "" },
          { name: "VPC", key: "vpc_idName", value: "" },
          { name: "外部网络域", key: "dstName", value: "" },
          { name: "资源类型", key: "src", value: "", renderPage: "tag" },
          { name: "描述", key: "description", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        // {
        //   name: "资源区",
        //   type: "select",
        //   placeholder: "请选择",
        //   data: {
        //     type: 'store',//  store 存储;request 请求；数据字典 enums
        //     dataKey: 'resourceList',
        //     labelName: 'name',
        //     valueName: 'uuid'
        //   },
        //   url: "",
        //   field: "resource_zone_id",
        //   value: ""
        // },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  container_group: {
    name: "容器资源分组",
    icon: "frame",
    explain: "",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "容器业务群组名称", key: "businessGroupIdName", value: "" },
          { name: "容器集群名称", key: "containerClusterIdName", value: "" },
          { name: "节点标签", key: "nodeLabel", value: "" },
          { name: "实例数", key: "instanceNum", value: "" },
          { name: "业务分组名称", key: "resourceGroupId", value: "" },
          { name: "CPU配额上限（G）", key: "cpuLimit", value: "" },
          { name: "Pod数量上限（个）", key: "podLimit", value: "" },
          { name: "内存配额上限（G）", key: "memLimit", value: "" },
          { name: "routeWebApp", key: "routeWebApp", value: "" },
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  container_busines_group: {
    name: "容器业务群组",
    explain: "容器业务群组描述",
    detail: [
      {
        name: "基本信息",
        fields: [
          { "name": "名称", "key": "name", "value": "" },
          { "name": "Region", "key": "regionIdName", "value": "" },
          { "name": "用途", "key": "useCategery", "value": "", renderPage: "useCategery" },
          { "name": "Vpc", "key": "vpcIdName", "value": "" },
          { "name": "创建时间", "key": "cmpCreateTime", "value": "" },
          // container_busines_group
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  security_group: {
    name: "安全组",
    explain: "",
    detail: [
      {
        name: "基本信息",
        fields: [
          { "name": "ID", "key": "uuid", "value": "" },
          { "name": "名称", "key": "security_group_name", "value": "" },
          { "name": "环境", "key": "environment_name", "value": "" },
          { "name": "地域", "key": "region_local_name", "value": "" },
          { "name": "VPC", "key": "vpc_uuid", "value": "" },
          { "name": "创建时间", "key": "cmpCreateTime", "value": "" },
          { "name": "描述", "key": "description", "value": "" },
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "security_group_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  elastic_public_ip: {
    name: "阿里云公网IP",
    explain: "阿里云公网IP",
    icon: "resourcecenter_networking_floatingip_v1",
    detail: [{}],
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  huawei_elastic_public_ip: {
    name: "华为云公网IP",
    explain: "华为云公网IP",
    icon: "resourcecenter_networking_floatingip_v1",
    detail: [{}],
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "bandwidth_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  tencent_elastic_public_ip: {
    name: "腾讯云公网IP",
    explain: "腾讯云公网IP",
    icon: "resourcecenter_networking_floatingip_v1",
    detail: [{}],
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store",
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "address_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  server_certificate: {
    name: "阿里云服务器证书",
    explain:
      "阿里云服务器证书，负载均衡https监听配置时，选择启动双向认证，需要上传阿里云服务器证书",
    icon: "certificate",
    detail: [{}],
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "server_certificate_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  ca_certificate: {
    name: "阿里云CA证书",
    explain: "阿里云CA证书，负载均衡https监听配置时，选择启动双向认证，需要上传阿里云CA证书",
    icon: "certificate",
    detail: [{}],
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "c_a_certificate_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  load_balance: {
    name: "阿里云负载均衡",
    explain:
      "负载均衡（Server Load Balancer）是将访问流量根据转发策略分发到后端多台云服务器（ECS实例）的流量分发控制服务。负载均衡扩展了应用的服务能力，增强了应用的可用性。",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "uuid", value: "" },
          { name: "名称", key: "load_balancer_name", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "IP", key: "address", value: "", renderType: 'EL-TAG', color: "success" },
          {
            name: "付费模式", key: "load_balancer_attribute", value: "",
            render(row) {
              if (row) {
                return row.pay_type == 'PayOnDemand' ? '按量付费' : '预付费';
              }
            }
          },
          { name: "主可用区", key: "master_zone_id", value: "" },
          { name: "备可用区", key: "slave_zone_id", value: "" },
          { name: "VPC ID", key: "vpc_id", value: "" },
          {
            name: "状态", key: "load_balancer_attribute", value: "",
            render(row) {
              if (row) {
                if (row.load_balancer_status == 'active') {
                  return `<span class='el-tag el-tag--success el-tag--small el-tag--light'>运行中</span>`
                } else if (row.load_balancer_status == 'inactive') {
                  return `<span class='el-tag el-tag--danger el-tag--small el-tag--light'>已停止</span>`
                } else if (row.load_balancer_status == 'locked') {
                  return `<span class='el-tag el-tag--info el-tag--small el-tag--light'>已锁定</span>`
                }
              }
            }
          },
          { name: "子网 ID", key: "subnet_id", value: "" },
          {
            name: "创建时间", key: "load_balancer_attribute", value: "",
            render(row) {
              if (row) {
                return row.create_time;
              }
            }
          },
          {
            name: "到期时间", key: "load_balancer_attribute", value: "",
            render(row) {
              if (row) {
                return row.end_time;
              }
            }
          },
          {
            name: "端口/协议", key: "load_balancer_attribute", value: "",
            render(row) {
              if (row) {
                if (row.listener_ports_and_protocal.length == 0) {
                  return '-';
                } else {
                  let str = '';
                  row.listener_ports_and_protocal.forEach(item => {
                    if (item.listenerProtocal) {
                      str += `<span style="display: block">${item.listenerProtocal.toUpperCase() + '：' + item.listenerPort}</span>`;
                    }
                  })
                  return str;
                }
              } else {
                return '-';
              }
            }
          }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "load_balancer_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  listener_detail: {
    name: "监听器详情",
    detail: [
      {
        name: "基本信息",
        fields: [
          // { name: "ID", key: "id", value: "" },
          { name: "名称", key: "description", value: "" },
          {
            name: "状态", key: "status", value: "",
            renderType: "EL-TAG",
            enums: {
              "stopped": { label: "已停止", type: "danger" },
              "running": { label: "运行中", type: "success" },
            }
          },
          {
            name: "前端协议", key: "listener_protocal", value: "",
            render: (v) => {
              if (v) {
                return v.toUpperCase();
              } else {
                return '-'
              }
            }
          },
          {
            name: "后端协议", key: "listener_protocal", value: "",
            render: (v) => {
              if (v) {
                if (v == 'https') {
                  return 'HTTP';
                } else {
                  return v.toUpperCase();
                }
              } else {
                return '-'
              }
            }
          },
          { name: "前端端口", key: "listener_port", value: "" },
          { name: "后端端口", key: "backend_server_port", value: "" },
          {
            name: "调度算法", key: "dispatch_algorithm", value: "",
            renderType: "EL-TAG",
            enums: {
              'wrr': { label: "加权轮询(WRR)", type: "info" },
              'wlc': { label: "加权最小连接数(WLC)", type: "info" },
              'rr': { label: "轮询(RR)", type: "info" },
              'tch': { label: "四元组哈希(TCH)", type: "info" },
              'sch': { label: "源IP哈希(SCH)", type: "info" },
            }
          },
          {
            name: "连接超时时间", key: "connect_timeout", value: "",
            render(v) {
              return v ? v + '秒' : '-';
            }
          },
          { name: "服务器证书", key: "server_certificate_name", value: "" },
          { name: "CA证书", key: "ca_certificate_name", value: "" },
          {
            name: "会话保持", key: "session_keep_timeout", value: "",
            render(v) {
              return v == 0 ? '未开启' : '开启';
            }
          },
          {
            name: "会话保持超时时间", key: "session_keep_timeout", value: "",
            render(v) {
              return v == 0 ? '-' : v + '秒';
            }
          }
        ]
      }
    ],
  },
  server_detail: {
    name: "服务器详情",
    detail: [
      {
        name: "服务器组",
        fields: [
          {
            name: "类型", key: "v_server_group_id", value: "",
            render: (v) => {
              return v ? '虚拟服务器组' : '默认服务器组';
            }
          },
          { name: "ID", key: "v_server_group_id", value: "" },
          { name: "名称", key: "v_server_group_name", value: "" },
          { name: "端口", key: "backend_server_port", value: "" }
        ]
      }
    ],
  },
  virtual_servers_detail: {
    name: "虚拟服务器组详情",
    detail: [
      {
        name: "虚拟服务器组详情",
        fields: [
          { name: "ID", key: "v_serverGroup_id", value: "" },
          { name: "名称", key: "v_serverGroup_name", value: "" }
        ]
      }
    ],
  },
  health_check_tcp: {
    name: "健康检查详情tcp&udp",
    detail: [
      {
        name: "健康检查",
        fields: [
          { name: "健康状态", key: "health_check", value: "" },
          { name: "健康检查协议", key: "check_protocol", value: "" },
          { name: "健康检查端口", key: "check_port", value: "" },
          {
            name: "健康检查响应超时时间", key: "response_timeout", value: "",
            render(v) {
              return v ? v + '秒' : '-';
            }
          },
          {
            name: "健康检查间隔时间", key: "interval_time", value: "",
            render(v) {
              return v ? v + '秒' : '-';
            }
          },
          {
            name: "健康检查健康阈值", key: "health_threshold", value: "",
            render(v) {
              return v ? v + '次' : '-';
            }
          },
          {
            name: "健康检查不健康阈值", key: "unhealth_threshold", value: "",
            render(v) {
              return v ? v + '次' : '-';
            }
          }
        ]
      }
    ]
  },
  health_check_http: {
    name: "健康检查详情http&https",
    detail: [
      {
        name: "健康检查",
        fields: [
          { name: "健康状态", key: "health_check", value: "" },
          { name: "健康检查协议", key: "check_protocol", value: "" },
          { name: "健康检查端口", key: "check_port", value: "" },
          { name: "健康检查路径", key: "check_path", value: "" },
          { name: "健康检查域名", key: "check_domain", value: "" },
          { name: "正常状态码", key: "normal_code", value: "" },
          {
            name: "健康检查响应超时时间",
            key: "response_timeout",
            value: "",
            render(v) {
              return v ? v + '秒' : '-';
            }
          },
          {
            name: "健康检查间隔时间", key: "interval_time", value: "",
            render(v) {
              return v ? v + '秒' : '-';
            }
          },
          {
            name: "健康检查健康阈值", key: "health_threshold", value: "",
            render(v) {
              return v ? v + '次' : '-';
            }
          },
          {
            name: "健康检查不健康阈值", key: "unhealth_threshold", value: "",
            render(v) {
              return v ? v + '秒' : '-';
            }
          }
        ]
      }
    ]
  },
  ali_template: {
    name: "阿里云启动模板",
    explain: "阿里云启动模板详细描述内容",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "搜索名称",
          placeholder: "搜索名称",
          field: "launch_template_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    tableColumns: [
      {
        prop: "launch_template_id",
        label: "ID",
        "show-overflow-tooltip": true
      },
      {
        prop: "launch_template_name",
        label: "名称",
        operateFun: {
          function: "info"
        }
      },
      {
        prop: "environment_name",
        label: "环境",
        "show-overflow-tooltip": true
      },
      {
        prop: "cmpCreateTime",
        label: "创建时间",
        "show-overflow-tooltip": true
      },
      {
        prop: "default_version_number",
        label: "默认版本号",
        "show-overflow-tooltip": true
      },
      {
        prop: "latest_version_number",
        label: "最新版本号",
        "show-overflow-tooltip": true
      },
      {
        prop: "operate",
        label: "操作",
        width: "240",
        operateFun: [
          {
            icon: "delete",
            label: "删除",
            function: "del"
          }
        ]
      }
    ]
  },
  ali_template_version: {
    name: "阿里云启动模板版本",
    explain: "阿里云启动模板版本详细描述内容",
    tableConfig: {
      isPublic: true
    },
  },
  vm_flavor_ali_template: {
    name: "阿里云规格",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "规格族",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "instanceFamilyList",
            labelName: "label",
            valueName: "value"
          },
          url: "",
          field: "instance_type_family",
          value: ""
        },
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    tableColumns: [
      { type: "radio" },
      { prop: "instance_type_id", label: "ID" },
      { prop: "instance_type_family", label: "规格族" },
      { prop: "cpu_core_count", label: "CPU（核）" },
      { prop: "memory_size", label: "内存（G）" }
    ]
  },
  vm_image_ali_template: {
    name: "阿里云镜像",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "镜像分类",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "imageTypeList",
            labelName: "label",
            valueName: "value"
          },
          url: "",
          field: "image_owner_alias",
          value: ""
        },
        {
          name: "操作系统",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "imagePlatformList",
            labelName: "label",
            valueName: "value"
          },
          url: "",
          field: "platform",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "image_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    tableColumns: [
      { type: "radio" },
      { prop: "image_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "osname", label: "操作系统名称" },
      // {
      //     prop: "image_name", label: "镜像名称"
      // },
      {
        prop: "image_owner_alias",
        label: "镜像分类",
        enums: {
          system: { label: "系统镜像", class: "" },
          self: { label: "用户镜像", class: "" },
          others: { label: "其他用户的公开镜像", class: "" },
          marketplace: { label: "镜像市场镜像", class: "" }
        }
      },
      { prop: "size", label: "大小(G)" },
      {
        prop: "status",
        label: "状态",
        enums: {
          UnAvailable: { label: "不可用", class: "" },
          Available: { label: "可用", class: "" },
          Creating: { label: "创建中", class: "" },
          CreateFailed: { label: "创建失败", class: "" }
        }
      }
    ]
  },
  bare_machine: {
    name: "裸机",
    explain: "",
    detail: [
      {
        name: "基本信息",
        fields: [
          // { "name": "物理机名称", "key": "host_name", "value": "" },
          // { "name": "操作系统", "key": "os", "value": "" },
          //  { "name": "region", "key": "region_idName", "value": ""},
          { "name": "资源区", "key": "resource_zone_idName", "value": "" },
          {
            "name": "业务状态", "key": "provision_state", "value": "",
            renderType: "DOT",
            enums: {
              "enrolling": { label: "录入中", type: "warning" },
              "enroll_failed": { label: "录入失败", type: "danger" },
              "manageable": { label: "录入成功", type: "success" },
              "inspecting": { label: "发现网卡中", type: "warning" },
              "inspect_success": { label: "发现网卡成功", type: "success" },
              "inspect_failed": { label: "发现网卡失败", type: "danger" },
              "deploying": { label: "部署中", type: "warning" },
              "deploy_failed": { label: "部署失败", type: "danger" },
              "active": { label: "可用", type: "success" },
              "error": { label: "错误", type: "danger" },
              "deleting": { label: "回收中", type: "warning" },
              "recycle_failed": { label: "回收失败", type: "danger" },
              "reducing": { label: "迁移中", type: "warning" },
            }
          },
          {
            "name": "电源状态", "key": "power_state", "value": "",
            renderType: "EL-TAG",
            enums: {
              "power on": { label: "开机", type: "success" },
              "power off": { label: "关机", type: "info" },
              "starting": { label: "开机中", type: "warning" },
              "stopping": { label: "关机中", type: "warning" },
              "rebooting": { label: "重启中", type: "warning" }
            }
          },
          {
            "name": "逻辑状态", "key": "logical_state", "value": "",
            renderType: "EL-TAG",
            enums: {
              "idle": { label: "空闲", type: "success" },
              "install": { label: "安装中", type: "warning" },
              "install_failed": { label: "安装失败", type: "danger" },
              "pre_allocate": { label: "待分配", type: "primary" },
              "reducing": { label: "迁移中", type: "warning" },
              "allocated": { label: "已分配", type: "warning" },
              "using": { label: "使用中", type: "warning" },
              "withdraw": { label: "注销", type: "danger" }
            }
          },
          { "name": "设备标准化", "key": "device_standardization", "value": "" },
          { "name": "描述", "key": "description", "value": "" },
          //{ "name": "网卡连接的交换机ID", "key": "bms_agent_id", "value": ""},
          { "name": "PXE网卡 MAC", "key": "mac_address", "value": "" },
          { "name": "物理云主机规格ID", "key": "flavor_id", "value": "" },
          { "name": "CPU（核）", "key": "cpu_core", "value": "" },
          {
            "name": "内存 (G）", "key": "memory", "value": "",
            render: (value) => {
              if (value) {
                return value / 1024;
              }
              else {
                return "";
              }
            }
          },
          {
            "name": "第一类磁盘数", "key": "extra", "value": "",
            render: (value) => {
              return value ? JSON.parse(value).disk1_count : "";
            }
          },
          {
            "name": "第一类磁盘大小（G）", "key": "extra", "value": "",
            render: (value) => {
              return value ? JSON.parse(value).disk1_size : "";
            }
          },
          {
            "name": "第二类磁盘数", "key": "extra", "value": "",
            render: (value) => {
              return value ? JSON.parse(value).disk2_count : "";
            }
          },
          {
            "name": "第二类磁盘大小（G）", "key": "extra", "value": "",
            render: (value) => {
              return value ? JSON.parse(value).disk2_size : "";
            }
          },
          { "name": "上次自发现结果", "key": "inspected_result", "value": "" },
          { "name": "上次自发现时间", "key": "inspected_at", "value": "" },
          //{ "name": "描述", "key": "description", "value": "" },
          {
            name: "资源来源", key: "remark_flag", value: "",
            render: (value) => {
              return value && value == 'inclusion_order_data' ? '纳管' : "云平台";
            }
          },
          { "name": "创建时间", "key": "cmpCreateTime", "value": "" },
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "标准化",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums; 
            dataKey: "deviceStandList",
            labelName: "label",
            valueName: "key"
          },
          url: "",
          field: "device_standardization",
          value: ""
        },
        {
          name: "资源区",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "server_name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  bare_machine_serverinfo: {
    name: "裸机服务器信息",
    explain: "",
    detail: [
      {
        name: "裸机信息",
        fields: [
          { "name": "裸机名称", "key": "server_name", "value": "" },
          { "name": "SN", "key": "sn", "value": "" },
          { "name": "IPMI地址", "key": "ipmi_address", "value": "" },
          {
            "name": "物理状态", "key": "physical_state", "value": "",
            renderType: "EL-TAG",
            enums: {
              "idle": { label: "空闲", type: "success" },
              "pre_allocate": { label: "待分配", type: "primary" },
              "using": { label: "使用中", type: "warning" },
              "withdraw": { label: "注销", type: "danger" }
            }
          },
          { name: "用途", key: "usage_mode", value: "" },
          { name: "服务器类型", key: "server_type", value: "" },
          { name: "电源", key: "power_supply", value: "" },
          { name: "设备U高", key: "dev_u_height", value: "" },
          { name: "品牌", key: "brand", value: "" },
          { name: "CPU总物理个数", key: "cpu_physical_number", value: "" },
          { name: "CPU频率（MHz）", key: "cpu_frequency", value: "" },
          { name: "CPU型号", key: "CPUModel", value: "" },
          { name: "IB卡数", key: "IBNUM", value: "" },
          { name: "IB卡口总数", key: "IBNUMT", value: "" },
          { name: "光纤卡数", key: "fibercardsNUM", value: "" },
          { name: "光纤卡口总数", key: "fibercardsNUMT", value: "" },
          { name: "千兆卡数", key: "ergigabitNUM", value: "" },
          { name: "千兆卡口数", key: "ergigabitNUMT", value: "" },
          { name: "磁盘总槽位数", key: "total_disk_slot", value: "" },
          { name: "额定功率", key: "rated_capacity", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  physical_instance: {
    name: "物理机",
    explain: "",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "物理机名称", key: "host_name", value: "" },
          { "name": "资源区", "key": "resource_zone_idName", "value": "" },
          { "name": "物理机资源池", "key": "resource_pool_idName", "value": "" },
          { "name": "IP地址", "key": "ip_address", "value": "" },
          { name: "操作系统", key: "os", value: "" },
          {
            name: "业务状态",
            key: "provision_state",
            value: "",
            renderType: "DOT",
            enums: {
              "enrolling": { label: "录入中", type: "warning" },
              "enroll_failed": { label: "录入失败", type: "danger" },
              "manageable": { label: "录入成功", type: "success" },
              "inspecting": { label: "发现网卡中", type: "warning" },
              "inspect_success": { label: "发现网卡成功", type: "success" },
              "inspect_failed": { label: "发现网卡失败", type: "danger" },
              "deploying": { label: "部署中", type: "warning" },
              "deploy_failed": { label: "部署失败", type: "danger" },
              "active": { label: "可用", type: "success" },
              "error": { label: "错误", type: "danger" },
              "deleting": { label: "回收中", type: "warning" },
              "recycle_failed": { label: "回收失败", type: "danger" },
              "reducing": { label: "迁移中", type: "warning" },
            }
          },
          {
            name: "电源状态", key: "power_state", value: "",
            renderType: "EL-TAG",
            enums: {
              "power on": { label: "开机", type: "success" },
              "power off": { label: "关机", type: "info" },
              "starting": { label: "开机中", type: "warning" },
              "stopping": { label: "关机中", type: "warning" },
              "rebooting": { label: "重启中", type: "warning" }
            }
          },
          {
            name: "逻辑状态", key: "logical_state", value: "",
            renderType: "EL-TAG",
            enums: {
              "idle": { label: "空闲", type: "success" },
              "install": { label: "安装中", type: "warning" },
              "install_failed": { label: "安装失败", type: "danger" },
              "pre_allocate": { label: "待分配", type: "primary" },
              "reducing": { label: "迁移中", type: "warning" },
              "allocated": { label: "已分配", type: "warning" },
              "using": { label: "使用中", type: "warning" },
              "withdraw": { label: "注销", type: "danger" }
            }
          },
          { name: "设备标准化", key: "device_standardization", value: "" },
          //{ name: "网卡连接的交换机ID", key: "bms_agent_id", value: "" },
          { name: "子网", key: "subnet_id", value: "" },
          { name: "PXE网卡 MAC", key: "mac_address", value: "" },
          { "name": "物理云主机规格ID", "key": "flavor_id", "value": "" },
          { "name": "CPU（核）", key: "cpu_core", value: "" },
          {
            "name": "内存 (G）", "key": "memory", "value": "",
            render: (value) => {
              if (value) {
                return value / 1024;
              }
              else {
                return "";
              }
            }
          },
          {
            "name": "第一类磁盘数", "key": "extra", "value": "",
            render: (value) => {
              return value ? JSON.parse(value).disk1_count : "";
            }
          },
          {
            "name": "第一类磁盘大小（G）", "key": "extra", "value": "",
            render: (value) => {
              return value ? JSON.parse(value).disk1_size : "";
            }
          },
          {
            "name": "第二类磁盘数", "key": "extra", "value": "",
            render: (value) => {
              return value ? JSON.parse(value).disk2_count : "";
            }
          },
          {
            "name": "第二类磁盘大小（G）", "key": "extra", "value": "",
            render: (value) => {
              return value ? JSON.parse(value).disk2_size : "";
            }
          },
          //{ name: "子网", key: "subnet_id", value: "" },
          {
            "name": "节点角色", "key": "node_role", "value": "",
            "renderType": "EL-TAG", color: "success"
          },
          {
            name: "资源来源", key: "remark_flag", value: "",
            render: (value) => {
              return value && value == 'inclusion_order_data' ? '纳管' : "云平台";
            }
          },
          { name: "描述", key: "description", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "标准化",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums; 
            dataKey: "deviceStandList",
            labelName: "label",
            valueName: "key"
          },
          url: "",
          field: "device_standardization",
          value: ""
        },
        {
          name: "物理机资源池",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "physicalResPoolList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_pool_id",
          value: ""
        },
        // {
        //   name: "资源区",
        //   type: "select",
        //   placeholder: "请选择",
        //   data: {
        //     type: 'store',//  store 存储;request 请求；数据字典 enums
        //     dataKey: 'resourceList',
        //     labelName: 'name',
        //     valueName: 'uuid'
        //   },
        //   url: "",
        //   field: "resource_zone_id",
        //   value: ""
        // },
        {
          name: "",
          placeholder: "搜索名称",
          field: "host_name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  physical_instance_systeminfo: {
    name: "物理机",
    explain: "",
    detail: [
      {
        name: "系统信息",
        fields: [
          { name: "VPC", key: "vpc", value: "" },
          { name: "子网", key: "subnet_id", value: "" },
          { name: "IP地址", key: "ip_address", value: "" },
          { name: "操作系统", key: "os", value: "" },
          { name: "物理机名称", key: "host_name", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  physical_instance_flavor: {
    name: "物理云主机规格",
    explain: "",
    detail: [
      {
        name: "基本信息",
        fields: [
          { "name": "名称", "key": "name", "value": "" },
          {
            "name": "状态", "key": "status", "value": "",
            renderType: "EL-TAG",
            enums: {
              "0": { label: "未发布", type: "info" },
              "1": { label: "已发布", type: "success" },
            }
          },
          { "name": "CPU（核）", "key": "cpu", "value": "" },
          { "name": "内存（G）", "key": "memory", "value": "" },
          {
            name: "一类磁盘数", key: "extra", value: "",
            render: (value) => {
              if (value) {
                let extra = JSON.parse(value);
                return extra.disk1_count;
              } else {
                return "";
              }
            }
          },
          {
            name: "一类磁盘大小（G）", key: "extra", value: "",
            render: (value) => {
              if (value) {
                let extra = JSON.parse(value);
                return extra.disk1_size;
              } else {
                return "";
              }
            }
          },
          {
            name: "二类磁盘数", key: "extra", value: "",
            render: (value) => {
              if (value) {
                let extra = JSON.parse(value);
                return extra.disk2_count;
              } else {
                return "";
              }
            }
          },
          {
            name: "二类磁盘大小（G）", key: "extra", value: "",
            render: (value) => {
              if (value) {
                let extra = JSON.parse(value);
                return extra.disk2_size;
              } else {
                return "";
              }
            }
          },
          // {
          //   "name": "是否全平台可见", "key": "is_public", "value": "",
          //   renderType: "EL-TAG",
          //   enums: {
          //     "0": { label: "否", type: "info" },
          //     "1": { label: "是", type: "success" },
          //   }
          // },
          { "name": "创建时间", "key": "cmpCreateTime", "value": "" },
          { "name": "描述", "key": "description", "value": "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  physical_res_pool: {
    name: "物理机资源池",
    explain: "",
    detail: [
      {
        name: "基本信息",
        fields: [
          { "name": "UUID", "key": "uuid", "value": "" },
          { "name": "资源池名称", "key": "name", "value": "" },
          { "name": "Region", "key": "region_idName", "value": "" },
          { "name": "资源区", "key": "resource_zone_idName", "value": "" },
          {
            "name": "状态", "key": "status", "value": "",
            renderType: "DOT",
            enums: {
              1: { label: "启用", type: "success" },
              0: { label: "禁用", type: "danger" }
            }
          },
          { "name": "资源用途", "key": "purpose", "value": "" },
          { "name": "生产用途", "key": "resourcegategory", "value": "" },
          { "name": "非生产用途", "key": "resourcegategorypre", "value": "" },
          { "name": "共享类型", "key": "shareType", "value": "" },
          { "name": "共享租户ID", "key": "belong_to_tenant", "value": "" },
          { "name": "文件系统", "key": "file_systems", "value": "" },
          // { "name": "raid类型", "key": "raid", "value": "" },
          { "name": "设备标准化", "key": "device_standardization", "value": "" },
          {
            "name": "预警数量", "key": "early_warning", "value": "",
            render: (value) => {
              return value === 0 ? '不预警' : value;
            }
          },
          { "name": "预警状态", "key": "early_warning_status", "value": "" },
          {
            name: "资源来源", key: "remark_flag", value: "",
            render: (value) => {
              return value && value == 'inclusion_order_data' ? '纳管' : "云平台";
            }
          },
          { "name": "创建时间", "key": "cmpCreateTime", "value": "" },
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "标准化",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums; 
            dataKey: "deviceStandList",
            labelName: "label",
            valueName: "key"
          },
          url: "",
          field: "device_standardization",
          value: ""
        },
        {
          name: "资源区",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  physical_S2: {
    name: "S2物理云主机",
    explain: "提供S2生产维护级别物理云主机申请，服务器超级管理员权限可以由用户提交平台申请临时持有，并根据规范进行合理使用。",
  },
  physical_S3: {
    name: "S3物理云主机",
    explain: "提供S3生产维护级别物理云主机申请，服务器超级管理员权限由运维服务团队持有。服务范围包括服务器（含虚拟机）硬件资源管理及操作系统管理，除默认云主机相关服务外，提供7*24小时运维服务。",
  },
  physical_S2_S: {
    name: "S2专有物理云主机",
    explain: "提供S2生产维护级别物理云主机申请，支持直接从裸机申请，并临时安装操作系统分配给用户，一次最多申请一台。",
  },
  physical_S3_S: {
    name: "S3专有物理云主机",
    explain: "提供S3生产维护级别物理云主机申请，支持直接从裸机申请，并临时安装操作系统分配给用户，一次最多申请一台。",
  },
  bms_compute_instance: {
    name: "物理云主机",
    explain: "",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "UUID", key: "uuid", value: "" },
          { name: "主机名称", key: "name", value: "" },
          {
            name: "IP 地址", key: "ip_address", value: "", renderType: "EL-TAG", color: "success"
          },
          {
            name: "状态", key: "power_state", value: "", renderType: "EL-TAG",
            enums: {
              "power on": { label: "开机", type: "info" },
              "power off": { label: "关机", type: "warning" },
              "starting": { label: "开机中", type: "success" },
              "stopping": { label: "关机中", type: "warning" },
              "rebooting": { label: "重启中", type: "danger" }
            }
          },
          { name: "创建者", key: "cmpUserName" },
          { name: "Project", key: "cmpProjectName" },
          { name: "租户", key: "cmpTenantName" },
          { "name": "资源区", "key": "resource_zone_idName", "value": "" },
          { "name": "订单编号", "key": "order_id", "value": "" },
          { name: "关联服务", key: "service_name", value: "" },
          { name: "物理机UUID", key: "bms_id", value: "" },
          { "name": "CPU（核）", key: "cpu_core", value: "" },
          {
            "name": "内存 (G）", "key": "memory", "value": "",
            render: (value) => {
              if (value) {
                return value / 1024;
              }
              else {
                return "";
              }
            }
          },
          {
            "name": "一类磁盘数", key: "extra", value: "",
            render: (value) => {

              if (value) {
                let extra = JSON.parse(value);
                return extra.disk1_count;
              } else {
                return "";
              }
            }
          },
          {
            "name": "一类磁盘大小（G）", key: "extra", value: "",
            render: (value) => {
              if (value) {
                let extra = JSON.parse(value);
                return extra.disk1_size;
              } else {
                return "";
              }
            }
          },
          {
            "name": "二类磁盘数", key: "extra", value: "",
            render: (value) => {
              if (value) {
                let extra = JSON.parse(value);
                return extra.disk2_count;
              } else {
                return "";
              }
            }
          },
          {
            "name": "二类磁盘大小（G）", key: "extra", value: "",
            render: (value) => {
              if (value) {
                let extra = JSON.parse(value);
                return extra.disk2_size;
              } else {
                return "";
              }
            }
          },
          { name: "描述", key: "description", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "资源区",
          type: "select",
          placeholder: "请选择",
          data: {
            type: 'store',//  store 存储;request 请求；数据字典 enums
            dataKey: 'resourceList',
            labelName: 'name',
            valueName: 'uuid'
          },
          url: "",
          field: "resource_zone_id",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  tencent_vpc: {
    name: "腾讯云VPC",
    explain:
      "允许VPC内的主机与租户的外部网络通信。备注：航信的不同外包租户之间可以基于这样的方式通过公网进行互相访问；航信用户可以基于这样的方式与Trill网络的网络互访。特别的当租户VPC没有购买专门的防火墙设备时，也可以少量使用南北防火墙实现同一租户的不同VPC的网络互访。",
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "vpc_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "vpc_id", value: "" },
          { name: "名称", key: "vpc_name", value: "" },
          { name: "网段", key: "cidr_block", value: "", renderPage: "tag" },
          // { name: "环境", key: "environment_name", value: "" },
          // { name: "地域", key: "region_id", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          // { name: "Project", key: "cmpProjectName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
        ]
      }
    ]
  },
  tencent_subnet: {
    name: "腾讯云子网",
    explain:
      "腾讯云子网。交换机或子网（VSwitch）是组成专有网络的基础网络设备，用来连接不同的云资源实例。专有网络是地域级别的资源，专有网络不可以跨地域，但包含所属地域的所有可用区。您可以在每个可用区内创建一个或多个交换机来划分子网。",
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "subnet_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "subnet_id", value: "" },
          { name: "名称", key: "subnet_name", value: "" },
          { name: "VPC", key: "vpc_name", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "可用区", key: "zone_local_name", value: "" },
          { name: "网段", key: "cidr_block", value: "", renderPage: "tag" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
        ]
      }
    ]
  },
  huawei_vpc: {
    name: "华为云VPC",
    explain:
      "华为云VPC。允许VPC内的主机与租户的外部网络通信。备注：航信的不同外包租户之间可以基于这样的方式通过公网进行互相访问；航信用户可以基于这样的方式与Trill网络的网络互访。特别的当租户VPC没有购买专门的防火墙设备时，也可以少量使用南北防火墙实现同一租户的不同VPC的网络互访。",
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "id", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "网段", key: "cidr", value: "", renderPage: "tag" },
          { name: "环境", key: "environment_name", value: "" },
          // { name: "地域", key: "region_id", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          // { name: "Project", key: "cmpProjectName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
        ]
      }
    ]
  },
  huawei_subnet: {
    name: "华为云子网",
    explain:
      "华为云子网。交换机或子网（VSwitch）是组成专有网络的基础网络设备，用来连接不同的云资源实例。专有网络是地域级别的资源，专有网络不可以跨地域，但包含所属地域的所有可用区。您可以在每个可用区内创建一个或多个交换机来划分子网。",
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "名称",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    },
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "id", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "VPC", key: "vpc_name", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "可用区", key: "zone_local_name", value: "" },
          { name: "网段", key: "cidr", value: "", renderPage: "tag" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
        ]
      }
    ]
  },
  pool_physical_instance: {
    name: "物理机资源池待扩容裸机",
    explain: "",
    detail: [],
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "server_name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  apply_physical_instance: {
    name: "申请物理机服务",
    explain: "",
    detail: [],
    searchForm: {
      labels: [
        {
          name: "镜像",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store",
            dataKey: "imageList",
            labelName: "image_name",
            valueName: "uuid"
          },
          url: "",
          field: "image_id",
          value: ""
        },
        // {
        //   name: "子网",
        //   type: "select",
        //   placeholder: "请选择",
        //   data: {
        //     type: "store",
        //     dataKey: "subnetList",
        //     labelName: "name",
        //     valueName: "uuid"
        //   },
        //   url: "",
        //   field: "subnet_id",
        //   value: ""
        // },
        {
          name: "",
          placeholder: "搜索名称",
          field: "host_name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  con_physical_res_pool: {
    name: "容器物理机资源池",
    explain: "",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "UUID", key: "uuid", value: "" },
          { name: "资源池名称", key: "name", value: "" },
          { name: "Region", key: "region_idName", value: "" },
          { name: "资源区", key: "resource_zone_idName", value: "" },
          {
            name: "状态",
            key: "status",
            value: "",
            renderType: "DOT",
            enums: {
              1: { label: "启用", type: "success" },
              0: { label: "禁用", type: "danger" }
            }
          },
          { name: "集群类型", key: "container_cluster_type", value: "", renderType: "EL-TAG", color: "success" },
          { name: "资源用途", key: "purpose", value: "" },
          { name: "生产用途", key: "resourcegategory", value: "" },
          { name: "非生产用途", key: "resourcegategorypre", value: "" },
          { name: "文件系统", key: "file_systems", value: "" },
          //{ name: "设备标准化", key: "device_standardization", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ],
    searchForm: {
      labels: [
        {
          name: "标准化",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums; 
            dataKey: "deviceStandList",
            labelName: "label",
            valueName: "key"
          },
          url: "",
          field: "device_standardization",
          value: ""
        },
        // {
        //   name: "Region",
        //   type: "select",
        //   placeholder: "请选择",
        //   data: {
        //     type: "store", //  store 存储;request 请求；数据字典 enums
        //     dataKey: "regionList",
        //     labelName: "name",
        //     valueName: "uuid"
        //   },
        //   url: "",
        //   field: "region_id",
        //   value: ""
        // },
        {
          name: "资源区",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "resourceList",
            labelName: "name",
            valueName: "uuid"
          },
          url: "",
          field: "resource_zone_id",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "server_name",
          value: "",
          connector: 6
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        }
      ],
      inputParams: {}
    }
  },
  "tencent_instance_type": {
    name: "腾讯云规格",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "规格族",
          type: "select",
          placeholder: "请选择",
          data: {
            type: "store",
            dataKey: "instanceTencentFamilyList",
            labelName: "label",
            valueName: "value"
          },
          url: "",
          field: "instance_family",
          value: ""
        },
        {
          name: "可见性",
          type: "select",
          placeholder: "请选择",
          data: [
            { value: "1", label: "可见" },
            { value: "0", label: "不可见" }
          ],
          url: "",
          field: "fhcmp_enabled",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "type_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      //{ prop: "cmpInstanceName", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "instance_type", label: "名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "type_name", label: "类型" },
      { prop: "instance_family", label: "规格族", width: "120" },
      //   { prop: "instance_charge_type", label: "计费模式", width: "120",
      //     enums: {
      //         PREPAID: { label: "包年包月", type: "info" },
      //         POSTPAID_BY_HOUR: { label: "按量计费", type: "info" },
      //         CDHPAID: {label: "CDH付费", type: "info"},
      //         SPOTPAID: {label: "竞价付费", type: "info"}
      //     }
      //   },
      //   { prop: "status", label: "状态", width: "120", align: 'center',
      //     enums: {
      //         SELL: { label: "可购买", type: "success" },
      //         SOLD_OUT: { label: "已售罄", type: "warning" },
      //         null: {label: "", type: "danger"}
      //     }
      //   },
      {
        prop: "cpu", label: "CPU", width: "120", align: 'center',
        render: (row) => {
          if (!row.cpu) return '';
          return row.cpu + '核';
        }
      },
      {
        prop: "memory", label: "内存", width: "120", align: 'center',
        render: (row) => {
          if (!row.memory) return '';
          return row.memory + 'G';
        }
      },
      {
        prop: "fhcmp_enabled", width: "120", label: "可见性", align: 'center',
        renderSwitch(row) {
          return row.fhcmp_enabled ? true : false;
        },
        switchConfig: {
          disabled: false
        }
      }
    ],
    detail: [
      {
        name: "规格详情",
        fields: [
          { name: "ID", key: "cmpInstanceName", value: "" },
          { name: "名称", key: "instance_type", value: "" },
          { name: "类型", key: "type_name", value: "" },
          { name: "规格族", key: "instance_family", value: "" },
          {
            name: "CPU", key: "cpu", value: "",
            render: (v) => {
              return v + '核';
            }
          },
          {
            name: "内存", key: "memory", value: "",
            render: (v) => {
              return v + 'G';
            }
          },
          {
            name: "可见性", key: "fhcmp_enabled", value: "",
            enums: {
              true: "可见",
              false: "不可见"
            }
          }
        ]
      }
    ]
  },
  "tencent_vm": {
    name: "腾讯云主机",
    explain: "云服务器是腾讯云提供的性能卓越、稳定可靠、弹性扩展的IaaS级别云计算服务，实现计算资源的即开即用和弹性伸缩。",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "状态",
          type: "select",
          placeholder: "请选择",
          data: [
            { value: "Running", label: "运行中" },
            { value: "Starting", label: "启动中" },
            { value: "Pending", label: "创建中" },
            { value: "Stopping", label: "停止中" },
            { value: "Stopped", label: "已停止" }
          ],
          url: "",
          field: "state",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "instance_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      //{ prop: "instanceId", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "instance_name",
        label: "云主机名称",
        operateFun: { function: "info" }
      },
      { prop: "environment_name", label: "环境", "show-overflow-tooltip": true },
      { prop: "cmpTenantName", label: "租户", "show-overflow-tooltip": true },
      { prop: "os_name", label: "镜像", "show-overflow-tooltip": true },
      {
        prop: "virtualPrivateCloud_PrivateIpAddresses", label: "IP地址", "show-overflow-tooltip": true, width: "120",
        render: (row) => {
          let vhtml = '(私)' + (row.virtualPrivateCloud_PrivateIpAddresses ? row.virtualPrivateCloud_PrivateIpAddresses : '');
          vhtml += '<br/>';
          vhtml += '(公)' + (row.json_public_ip_addresses ? row.json_public_ip_addresses : '');
          return vhtml;
        }
      },
      {
        prop: "cpu", label: "CPU", width: "100", align: 'center',
        render: (r) => {
          if (!r.cpu) return '';
          return r.cpu + '核';
        }
      },
      {
        prop: "memory", label: "内存", width: "100", align: 'center',
        render: (r) => {
          if (!r.memory) return '';
          return r.memory + 'G';
        }
      },
      //{ prop: "memory_size", label: "IP" },
      {
        prop: "instance_state", label: "状态", width: "100", align: 'center',
        render: (r) => {
          let qv = r.instance_state.toUpperCase();
          if (qv == 'RUNNING') {
            return "<span class='el-tag el-tag--success el-tag--small el-tag--light'>运行中</span>";
          } else if (qv == 'STARTING') {
            return "<span class='el-tag el-tag--warning el-tag--small el-tag--light'>启动中</span>";
          } else if (qv == 'PENDING') {
            return "<span class='el-tag el-tag--warning el-tag--small el-tag--light'>创建中</span>";
          } else if (qv == 'STOPPING') {
            return "<span class='el-tag el-tag--warning el-tag--small el-tag--light'>停止中</span>";
          } else if (qv == 'STOPPED') {
            return "<span class='el-tag el-tag--danger el-tag--small el-tag--light'>已停止</span>";
          }
          return '';
        }
      },
      {
        prop: "instance_charge_type", label: "付费模式", width: "100", align: 'center',
        enums: {
          PREPAID: { label: "包年包月", class: "" },
          POSTPAID_BY_HOUR: { label: "按量计费", class: "" },
          CDHPAID: { label: "CDH付费" },
          SPOTPAID: { label: "竞价实例付费" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "140", align: 'center' },
      {
        prop: "operate", label: "操作", width: "300", align: 'center',
        operateFun: [
          {
            icon: "video-pause",
            label: "停止",
            function: "stop",
            isEnabled: row => {
              return row.instance_state == "Running" ? true : false;
            }
          },
          {
            icon: "switch-button",
            label: "启动",
            function: "start",
            isEnabled: row => {
              return row.instance_state == "Stopped" ? true : false;
            }
          },
          {
            icon: "switch-button",
            label: "重启",
            function: "restart",
            isEnabled: row => {
              return row.instance_state == "Running" ? true : false;
            }
          },
          {
            icon: "edit",
            label: "修改",
            function: "edit",
            isEnabled: row => {
              return row.instance_state == "Running" || row.status == "Stopped" ? true : false;
            }
          },
          {
            icon: "delete",
            label: "删除",
            function: "del",
            isEnabled: row => {
              return row.instance_charge_type == "POSTPAID_BY_HOUR" ? true : false;
            }
          }
        ]
      }
    ],
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "instanceId", value: "" },
          { name: "云主机名称", key: "instance_name", value: "" },
          {
            name: "状态",
            key: "instance_state",
            value: "",
            renderType: "EL-TAG",
            enums: {
              Running: { label: "运行中", type: "success" },
              Starting: { label: "启动中", type: "warning" },
              Pending: { label: "创建中", type: "warning" },
              Stopping: { label: "停止中", type: "warning" },
              Stopped: { label: "已停止", type: "danger" }
            }
          },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "可用区", key: "zone_local_name", value: "" },
          { name: "镜像", key: "image_id", value: "" },
          { name: "规格", key: "instanceType", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          {
            name: "安全组", key: "json_security_group_ids", value: "",
            render: (v) => {
              if (!v) return '';
              try {
                let obj = JSON.parse(v);
                let arr = new Array();
                obj.forEach(el => {
                  arr.push(el);
                });
                return arr.join(',');
              } catch (e) { console.log(e) }
              return v;
            }
          },
          { name: "VPC", key: "virtual_private_cloud_vpc_id", value: "" },
          { name: "子网", key: "virtual_private_cloud_subnet_id", value: "" },
          { name: "IP地址(私)", key: "virtualPrivateCloud_PrivateIpAddresses", value: "" },
          { name: "IP地址(公)", key: "json_public_ip_addresses", value: "" },
          { name: "创建时间", key: "created_time", value: "" },
          { name: "到期时间", key: "expired_time", value: "" },
          {
            name: "付费模式", key: "instance_charge_type", value: "", renderType: "EL-TAG",
            enums: {
              PREPAID: { label: "包年包月", type: "info" },
              POSTPAID_BY_HOUR: { label: "按量计费", type: "info" },
              CDHPAID: { label: "CDH付费", type: "info" },
              SPOTPAID: { label: "竞价实例付费", type: "info" }
            }
          }
        ]
      }
    ]
  },
  "tencent_disk_vm": {
    name: "主机云硬盘",
    tableConfig: {
      isPublic: true,
      search: false
    },
    tableColumns: [
      { prop: "disk_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "disk_name", label: "名称" },
      {
        prop: "disk_type", label: "类型", width: 100, align: 'center',
        enums: {
          CLOUD_BASIC: { label: "普通云硬盘", type: "" },
          CLOUD_PREMIUM: { label: "高性能云硬盘", type: "" },
          CLOUD_SSD: { label: "SSD云硬盘", type: "" },
          CLOUD_HSSD: { label: "增强型SSD云硬盘", type: "" }
        }
      },
      { prop: "disk_size", label: "大小(G)", width: 100, align: 'center' },
      {
        prop: "disk_state", label: "状态", width: 100, align: 'center',
        render: () => {
          return '<span class="el-tag el-tag--success el-tag--small el-tag--light"> 已挂载 </span>';
        }
      },
      {
        prop: "disk_usage", label: "属性", width: 100, align: 'center',
        enums: {
          SYSTEM_DISK: { label: "系统盘", type: "" },
          DATA_DISK: { label: "数据盘", type: "" }
        }
      }
    ]
  },
  "tencent_vm_flavor": {
    name: "腾讯云规格",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { type: "radio" },
      { prop: "instance_type", label: "名称" },
      { prop: "type_name", label: "类型" },
      { prop: "instance_family", label: "规格族" },
      {
        prop: "cpu", label: "CPU（核）", width: "120",
        render: (row) => {
          if (!row.cpu) return '';
          return row.cpu + '核';
        }
      },
      {
        prop: "memory", label: "内存（G）", width: "120",
        render: (row) => {
          if (!row.memory) return '';
          return row.memory + 'G';
        }
      }
    ]
  },
  "tencent_vm_image": {
    name: "腾讯云镜像",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "镜像分类",
          type: "select",
          data: [
            { label: "系统镜像", value: "PUBLIC_IMAGE" },
            { label: "用户镜像", value: "PRIVATE_IMAGE" }
          ],
          url: "",
          field: "imageType",
          value: ""
        }, {
          name: "操作系统",
          type: "select",
          data: [
            { label: "CentOS", value: "CentOS" },
            { label: "CoreOS", value: "CoreOS" },
            { label: "Debian", value: "Debian" },
            { label: "Ubuntu", value: "Ubuntu" },
            { label: "Windows Server", value: "Windows Server" },
            { label: "EulerOS", value: "EulerOS" },
            { label: "openSUSE", value: "openSUSE" },
            { label: "FreeBSD", value: "FreeBSD" }
          ],
          url: "",
          field: "osName",
          value: ""
        }, {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { type: "radio" },
      { prop: "image_name", label: "镜像名称" },
      { prop: "os_name", label: "操作系统" },
      {
        prop: "image_type", label: "镜像分类", width: "120", align: 'center',
        enums: {
          PUBLIC_IMAGE: { label: "公共镜像", type: "info" },
          PRIVATE_IMAGE: { label: "私有镜像", type: "info" },
          SHARED_IMAGE: { label: "共享镜像", type: "info" }
        }
      },
      {
        prop: "image_size", label: "大小", width: "120", align: 'center',
        render: (r) => {
          if (!r.image_size) return '';
          return r.image_size + 'G';
        }
      },
      {
        prop: "image_state", label: "状态", width: "120", align: 'center',
        enums: {
          CREATING: { label: "创建中", type: "warning" },
          USING: { label: "使用中", type: "success" },
          SYNCING: { label: "同步中", type: "warning" },
          CREATEFAILED: { label: "创建失败", type: "danger" },
          NORMAL: { label: "正常", type: "success" },
          IMPORTING: { label: "导入中", type: "warning" },
          IMPORTFAILED: { label: "导入失败", type: "danger" }
        }
      }
    ]
  },
  "tencent_image": {
    name: "腾讯云系统镜像",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { prop: "image_id", label: "ID", width: "120" },
      {
        prop: "image_name", label: "镜像名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "os_name", label: "操作系统" },
      {
        prop: "image_size", label: "大小", width: "120", align: 'center',
        render: (row) => {
          return row.image_size + "GB";
        }
      },
      {
        prop: "image_state", label: "状态", width: "120", align: 'center',
        enums: {
          CREATING: { label: "创建中", type: "info" },
          USING: { label: "使用中", type: "success" },
          SYNCING: { label: "同步中", type: "warning" },
          CREATEFAILED: { label: "创建失败", type: "warning" },
          NORMAL: { label: "正常", type: "success" },
          IMPORTING: { label: "导入中", type: "warning" },
          IMPORTFAILED: { label: "导入失败", type: "danger" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "140", align: 'center' },
      {
        prop: "fhcmp_enabled", width: "120", align: 'center', label: "可见性",
        renderSwitch(row) {
          return row.fhcmp_enabled ? true : false;
        },
        switchConfig: {
          disabled: false
        }
      }
    ],
    detail: [
      {
        name: "镜像详情",
        fields: [
          { name: "ID", key: "image_id", value: "" },
          { name: "镜像名称", key: "image_name", value: "" },
          { name: "操作系统", key: "os_name", value: "" },
          {
            name: "大小", key: "image_size",
            render: (v) => {
              return v + "GB";
            }
          },
          {
            name: "状态", key: "image_state", value: "", renderType: "EL-TAG",
            enums: {
              CREATING: { label: "创建中", type: "info" },
              USING: { label: "使用中", type: "success" },
              SYNCING: { label: "同步中", type: "warning" },
              CREATEFAILED: { label: "创建失败", type: "warning" },
              NORMAL: { label: "正常", type: "success" },
              IMPORTING: { label: "导入中", type: "warning" },
              IMPORTFAILED: { label: "导入失败", type: "danger" }
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          {
            name: "可见性", key: "fhcmp_enabled", value: "",
            render: (v) => {
              return v ? "可见" : "不可见";
            }
          }
        ]
      }
    ]
  },
  "tencent_user_image": {
    name: "腾讯云用户镜像",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { prop: "image_id", label: "ID" },
      {
        prop: "image_name", label: "镜像名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "osName", label: "操作系统" },
      { prop: "environment_name", label: "环境", align: 'center', width: "120" },
      { prop: "region_local_name", label: "地域", align: 'center', width: "120" },
      {
        prop: "image_size", label: "大小", width: "120", align: 'center',
        render: (row) => {
          return row.image_size + "GB";
        }
      },
      {
        prop: "image_state", label: "状态", width: "120", align: 'center',
        enums: {
          CREATING: { label: "创建中", type: "info" },
          USING: { label: "使用中", type: "success" },
          SYNCING: { label: "同步中", type: "warning" },
          CREATEFAILED: { label: "创建失败", type: "warning" },
          NORMAL: { label: "正常", type: "success" },
          IMPORTING: { label: "导入中", type: "warning" },
          IMPORTFAILED: { label: "导入失败", type: "danger" }
        }
      }
    ],
    detail: [
      {
        name: "镜像详情",
        fields: [
          { name: "ID", key: "image_id", value: "" },
          { name: "镜像名称", key: "imageName", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "操作系统", key: "os_name", value: "" },
          {
            name: "大小", key: "image_size",
            render: (v) => {
              return v + "GB";
            }
          },
          {
            name: "状态", key: "image_state", value: "", renderType: "EL-TAG",
            enums: {
              CREATING: { label: "创建中", type: "info" },
              USING: { label: "使用中", type: "success" },
              SYNCING: { label: "同步中", type: "warning" },
              CREATEFAILED: { label: "创建失败", type: "warning" },
              NORMAL: { label: "正常", type: "success" },
              IMPORTING: { label: "导入中", type: "warning" },
              IMPORTFAILED: { label: "导入失败", type: "danger" }
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ]
  },
  "tencent_disk": {
    name: "腾讯云块存储",
    explain: "块存储是为云服务器提供的低时延、持久性、高可靠的数据块级随机存储。就像对待硬盘一样，您可以对挂载到ECS实例上的块存储做分区、创建文件系统等操作，并对数据持久化存储。",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { prop: "disk_id", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "disk_name", label: "名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "environment_name", label: "环境", align: 'center', width: "120" },
      { prop: "region_local_name", label: "地域", align: 'center', width: "120" },
      //{ prop: "placement_zone", label: "可用区", width: "120"},
      {
        prop: "disk_type", label: "类型", width: "120", align: 'center',
        enums: {
          CLOUD_BASIC: { label: "普通云硬盘", type: "" },
          CLOUD_PREMIUM: { label: "高性能云硬盘", type: "" },
          CLOUD_SSD: { label: "SSD云硬盘", type: "" },
          CLOUD_HSSD: { label: "增强型SSD云硬盘", type: "" }
        }
      },
      {
        prop: "disk_usage", label: "属性", width: "120", align: 'center',
        enums: {
          SYSTEM_DISK: { label: "系统盘", type: "" },
          DATA_DISK: { label: "数据盘", type: "" }
        }
      },
      {
        prop: "disk_charge_type", label: "付费类型", width: "120", align: 'center',
        enums: {
          PREPAID: { label: "预付费", type: "" },
          POSTPAID_BY_HOUR: { label: "按量付费", type: "" }
        }
      },
      {
        prop: "disk_size", label: "容量", width: "120", align: 'center',
        render: (r) => {
          if (!r.disk_size) return '';
          return r.disk_size + 'G';
        }
      },
      {
        prop: "disk_state", label: "状态", width: "120", align: 'center',
        enums: {
          UNATTACHED: { label: "未挂载", type: "warning" },
          ATTACHING: { label: "挂载中", type: "warning" },
          ATTACHED: { label: "已挂载", type: "success" },
          DETACHING: { label: "解挂中", type: "warning" },
          EXPANDING: { label: "扩容中", type: "warning" },
          ROLLBACKING: { label: "回滚中", type: "warning" },
          TORECYCLE: { label: "待回收", type: "info" },
          DUMPING: { label: "拷贝硬盘中", type: "warning" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "140", align: 'center' },
      {
        prop: "operate", label: "操作", width: "180", align: 'center',
        operateFun: [
          {
            icon: "edit",
            label: "挂载",
            function: "add",
            isEnabled: row => {
              if (row.disk_usage != 'DATA_DISK') return false;
              return row.disk_state == "UNATTACHED" ? true : false;
            }
          }, {
            icon: "delete",
            label: "卸载",
            function: "detach",
            isEnabled: row => {
              if (row.disk_usage != 'DATA_DISK') return false;
              return row.disk_state == "ATTACHED" || row.disk_state == 'Running' ? true : false;
            }
          }, {
            icon: "delete",
            label: "删除",
            function: "del",
            isEnabled: row => {
              if (row.disk_usage != 'DATA_DISK') return false;
              return row.disk_state == "UNATTACHED" && row.disk_charge_type == "POSTPAID_BY_HOUR" ? true : false;
            }
          }
        ]
      }
    ],
    detail: [
      {
        name: "云硬盘详情",
        fields: [
          { name: "ID", key: "disk_id", value: "" },
          { name: "名称", key: "disk_name", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "可用区", key: "placement_zone", value: "" },
          {
            name: "类型", key: "disk_usage", value: "", renderType: "EL-TAG",
            enums: {
              SYSTEM_DISK: { label: "系统盘", type: "info" },
              DATA_DISK: { label: "数据盘", type: "info" }
            }
          },
          {
            name: "容量", key: "disk_size", value: "",
            render: (v) => {
              return v + 'G';
            }
          },
          {
            name: "付费类型", key: "disk_charge_type", renderType: "EL-TAG",
            enums: {
              PREPAID: { label: "预付费", type: "info" },
              POSTPAID_BY_HOUR: { label: "按量付费", type: "info" }
            }
          },
          {
            name: "状态", key: "disk_state", value: "", renderType: "EL-TAG",
            enums: {
              UNATTACHED: { label: "未挂载", type: "warning" },
              ATTACHING: { label: "挂载中", type: "warning" },
              ATTACHED: { label: "已挂载", type: "success" },
              Running: { label: "已挂载", type: "success" },
              DETACHING: { label: "解挂中", type: "warning" },
              EXPANDING: { label: "扩容中", type: "warning" },
              ROLLBACKING: { label: "回滚中", type: "warning" },
              TORECYCLE: { label: "待回收", type: "info" },
              DUMPING: { label: "拷贝硬盘中", type: "warning" }
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ]
  },
  "tencent_disk_inst": {
    name: "云硬盘挂载主机列表",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { prop: "", type: "radio", width: "50", align: 'center' },
      { prop: "instance_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "instance_name", label: "云主机名称", "show-overflow-tooltip": true },
      { prop: "cmpTenantName", label: "租户", "show-overflow-tooltip": true },
      { prop: "image_id", label: "镜像", "show-overflow-tooltip": true },
      {
        prop: "cpu", label: "CPU", width: "100", align: 'center',
        render: (r) => {
          if (!r.cpu) return '';
          return r.cpu + '核';
        }
      },
      {
        prop: "memory", label: "内存", width: "100", align: 'center',
        render: (r) => {
          if (!r.memory) return '';
          return r.memory + 'G';
        }
      }
    ]
  },
  "tencent_security_group": {
    name: "腾讯云安全组",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "security_group_name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { prop: "security_group_id", label: "ID" },
      {
        prop: "security_group_name", label: "名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "environment_name", label: "环境", width: 120 },
      { prop: "region_local_name", label: "地域", width: 120 },
      //   { prop: "vpc_uuid", label: "VPC" },
      //   { prop: "service_managed", label: "相关实例" },
      { prop: "security_group_desc", label: "描述" },
      { prop: "cmpCreateTime", label: "创建时间", width: 140 },
      {
        label: "操作", prop: "operate", align: 'center', width: 120,
        operateFun: [
          {
            icon: "edit",
            label: "修改",
            function: "edit"
          },
          {
            icon: "del",
            label: "删除",
            function: "del"
          }
        ]
      }
    ],
    detail: [
      {
        name: "腾讯云安全组详情",
        fields: [
          { name: "ID", key: "security_group_id", value: "" },
          { name: "名称", key: "security_group_name", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "描述", key: "security_group_desc", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ]
  },
  "tencent_security_group_ingress": {
    name: "tencent_security_group_ingress",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      {
        prop: "action", label: "授权策略", width: 120, align: 'center',
        render: (row) => {
          if (row.action == 'ACCEPT') {
            return "<span class='el-tag el-tag--success el-tag--small el-tag--light'>允许</span>";
          } else if (row.action == 'DROP') {
            return "<span class='el-tag el-tag--danger el-tag--small el-tag--light'>拒绝</span>";
          }
          return "";
        }
      },
      //{ prop: "priority", label: "优先级", align: 'center' },
      { prop: "protocol", label: "协议类型", width: 120, align: 'center' },
      { prop: "port", label: "端口范围" },
      { prop: "cidr_block", label: "授权对象" },
      { prop: "policy_description", label: "描述" },
      { prop: "modifyTime", label: "修改时间", width: 140, align: 'center' },
      {
        label: "操作", prop: "operate", align: 'center', width: 120,
        operateFun: [
          {
            icon: "edit",
            label: "编辑",
            function: "edit"
          },
          {
            icon: "delete",
            label: "删除",
            function: "del"
          }
        ]
      }
    ]
  },
  "tencent_security_group_egress": {
    name: "tencent_security_group_egress",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      {
        prop: "action", label: "授权策略", width: 120, align: 'center',
        render: (row) => {
          if (row.action == 'ACCEPT') {
            return "<span class='el-tag el-tag--success el-tag--small el-tag--light'>允许</span>";
          } else if (row.action == 'DROP') {
            return "<span class='el-tag el-tag--danger el-tag--small el-tag--light'>拒绝</span>";
          }
          return "";
        }
      },
      //{ prop: "priority", label: "优先级", align: 'center' },
      { prop: "protocol", label: "协议类型", width: 120, align: 'center' },
      { prop: "port", label: "端口范围" },
      { prop: "cidr_block", label: "授权对象" },
      { prop: "policy_description", label: "描述" },
      { prop: "modifyTime", label: "修改时间", width: 140, align: 'center' },
      {
        label: "操作", prop: "operate", align: 'center', width: 120,
        operateFun: [
          {
            icon: "edit",
            label: "编辑",
            function: "edit"
          },
          {
            icon: "delete",
            label: "删除",
            function: "del"
          }
        ]
      }
    ]
  },
  "tencent_security_group_associate": {
    name: "tencent_security_group_associate",
    tableConfig: {
      isPublic: true,
      setting: false
    },
    tableColumns: [
      { prop: "instanceId", label: "ID", "show-overflow-tooltip": true },
      { prop: "instanceName", label: "名称", "show-overflow-tooltip": true },
      { prop: "virtual_private_cloud_vpc_id", label: "vpc" },
      {
        prop: "virtualPrivateCloud_PrivateIpAddresses", label: "IP地址", "show-overflow-tooltip": true, width: "120",
        render: (row) => {
          let vhtml = '(私)' + (row.virtualPrivateCloud_PrivateIpAddresses ? row.virtualPrivateCloud_PrivateIpAddresses : '');
          vhtml += '<br/>';
          vhtml += '(公)' + (row.json_public_ip_addresses ? row.json_public_ip_addresses : '');
          return vhtml;
        }
      },
      { prop: "description", label: "描述" }
      //   { label: "操作", prop: "operate", align: 'center', width: 120,					
      //     operateFun: [
      //       {
      //         icon: "delete",
      //         label: "移出安全组",
      //         function: "remove"
      //       }
      //     ]
      //   }
    ]
  },
  "huawei_instance_type": {
    name: "华为云规格",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "规格族",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "instanceHuaweiFamilyList",
            labelName: "label",
            valueName: "value"
          },
          url: "",
          field: "instance_family",
          value: ""
        },
        {
          name: "可见性",
          type: "select",
          placeholder: "请选择",
          data: [
            { value: "1", label: "可见" },
            { value: "0", label: "不可见" }
          ],
          url: "",
          field: "fhcmp_enabled",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { prop: "id", label: "ID" },
      {
        prop: "name", label: "名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "performancetype", label: "规格族" },
      //   { prop: "metadata_charging_mode", label: "付费模式", width: "120",
      //     enums: {
      //       "0": { label: "按量付费", class: "" },
      //       "1": { label: "包年包月", class: "" },
      //       "2": { label: "竞价实例", class: "" }
      //     }
      //   },
      {
        prop: "cond_operation_status", label: "状态", width: "120", align: 'center',
        render: () => {
          return '正常';
        }
      },
      //   { prop: "cond_operation_status", label: "状态", width: "120",
      //     enums: {
      //       normal: { label: "正常", type: "success" },
      //       abandon: { label: "下线", type: "warning" },
      //       sellout: {label: "售罄", type: "warning"},
      //       obt: {label: "公测", type: "warning"},
      //       obt_sellout: {label: "公测售罄", type: "warning"},
      //       promotion: {label: "推荐", type: "success"}
      //     }
      //   },
      {
        prop: "vcpus", label: "CPU", width: "120", align: 'center',
        render: (row) => {
          if (!row.vcpus) return '';
          return row.vcpus + '核';
        }
      },
      {
        prop: "ram", label: "内存", width: "120", align: 'center',
        render: (row) => {
          if (!row.ram) return '';
          return (row.ram / 1024) + 'G';
        }
      },
      {
        prop: "fhcmp_enabled", width: "120", align: 'center',
        label: "可见性",
        renderSwitch(row) {
          return row.fhcmp_enabled ? true : false;
        },
        switchConfig: {
          disabled: false
        }
      }
    ],
    detail: [
      {
        name: "规格详情",
        fields: [
          { name: "ID", key: "id", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "规格族", key: "performancetype", value: "" },
          {
            name: "CPU", key: "vcpus", value: "",
            render: (v) => {
              if (!v) return '';
              return (v) + '核';
            }
          },
          {
            name: "内存", key: "ram", value: "",
            render: (v) => {
              if (!v) return '';
              return (v / 1024) + 'G';
            }
          },
          {
            name: "可见性", key: "fhcmp_enabled", value: "",
            enums: {
              true: "可见",
              false: "不可见"
            }
          }
        ]
      }
    ]
  },
  "huawei_vm": {
    name: "华为云主机",
    explain: "云服务器是华为云提供的性能卓越、稳定可靠、弹性扩展的IaaS级别云计算服务，实现计算资源的即开即用和弹性伸缩。",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "状态",
          type: "select",
          placeholder: "请选择",
          data: [
            { value: "Running", label: "运行中" },
            { value: "Starting", label: "启动中" },
            { value: "Pending", label: "创建中" },
            { value: "Stopping", label: "停止中" },
            { value: "Stopped", label: "已停止" }
          ],
          url: "",
          field: "state",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      //{ prop: "id", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "云主机名称", "show-overflow-tooltip": true, operateFun: { function: "info" } },
      { prop: "environment_name", label: "环境" },
      { prop: "cmpTenantName", label: "租户", "show-overflow-tooltip": true },
      { prop: "metadata_image_name", label: "镜像", "show-overflow-tooltip": true },
      {
        prop: "address_first_addr", label: "IP地址", "show-overflow-tooltip": true, width: "100",
        render: (row) => {
          let vhtml = '(私)' + (row.address_first_addr ? row.address_first_addr : '');
          vhtml += '<br/>';
          vhtml += '(公)' + (row.public_ip_addresses ? row.public_ip_addresses : '');
          return vhtml;
        }
      },
      {
        prop: "flavor_vcpus", label: "CPU", width: "100", align: 'center',
        render: (row) => {
          if (!row.flavor_vcpus) return '';
          return row.flavor_vcpus + '核';
        }
      },
      {
        prop: "flavor_ram", label: "内存", width: "100", align: 'center',
        render: (row) => {
          if (!row.flavor_ram) return '';
          return (row.flavor_ram / 1024) + 'G';
        }
      },
      {
        prop: "status", label: "状态", align: 'center', width: "100",
        enums: {
          Running: { label: "运行中", type: "success" },
          Starting: { label: "启动中", type: "warning" },
          Pending: { label: "创建中", type: "warning" },
          Stopping: { label: "停止中", type: "warning" },
          Stopped: { label: "已停止", type: "info" },
          error: { label: "异常", type: "danger" }
        }
      },
      {
        prop: "metadata_charging_mode", label: "付费模式", width: "100", align: 'center',
        enums: {
          "0": { label: "按量付费", class: "" },
          "1": { label: "包年包月", class: "" },
          "2": { label: "竞价实例", class: "" }
        }
      },
      // { prop: "sale_cycle", label: "付费时长" },
      { prop: "cmpCreateTime", label: "创建时间", width: "140", align: 'center' },
      {
        prop: "operate", label: "操作", width: "300",
        operateFun: [
          {
            icon: "video-pause",
            label: "停止",
            function: "stop",
            isEnabled: row => {
              return row.status == "Running" ? true : false;
            }
          },
          {
            icon: "switch-button",
            label: "启动",
            function: "start",
            isEnabled: row => {
              return row.status == "Stopped" ? true : false;
            }
          },
          {
            icon: "switch-button",
            label: "重启",
            function: "restart",
            isEnabled: row => {
              return row.status == "Running" ? true : false;
            }
          },
          {
            icon: "edit",
            label: "修改",
            function: "edit",
            isEnabled: row => {
              return row.status == "Running" || row.status == "Stopped" ? true : false;
            }
          },
          {
            icon: "delete",
            label: "删除",
            function: "del",
            isEnabled: row => {
              return row.metadata_charging_mode == "0" ? true : false;
            }
          }
        ]
      }
    ],
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "ID", key: "id", value: "" },
          { name: "云主机名称", key: "name", value: "" },
          {
            name: "状态", key: "status", value: "", renderType: "EL-TAG",
            enums: {
              Running: { label: "运行中", type: "success" },
              Starting: { label: "启动中", type: "warning" },
              Pending: { label: "创建中", type: "warning" },
              Stopping: { label: "停止中", type: "warning" },
              Stopped: { label: "已停止", type: "info" }
            }
          },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "可用区", key: "zone_local_name", value: "" },
          { name: "镜像", key: "metadata_image_name", value: "" },
          { name: "规格", key: "flavor_name", value: "" },
          { name: "租户", key: "cmpTenantName", value: "" },
          { name: "用户", key: "cmpUserName", value: "" },
          { name: "Project", key: "cmpProjectName", value: "" },
          {
            name: "安全组", key: "json_security_groups", value: "",
            render: (v) => {
              if (v) {
                let obj = eval('(' + v + ')');
                let arr = [];
                obj.forEach(el => {
                  arr.push(el.name);
                });
                return arr.join(',');
              }
              return "";
            }
          },
          { name: "VPC", key: "metadata_vpc_id", value: "" },
          //{ name: "子网", key: "virtual_private_cloud_subnet_id", value: "" },
          { name: "IP地址(私)", key: "address_first_addr", value: "" },
          { name: "IP地址(公)", key: "public_ip_addresses", value: "" },
          {
            name: "付费模式", key: "metadata_charging_mode", value: "", renderType: "EL-TAG",
            enums: {
              "0": { label: "按量付费", class: "" },
              "1": { label: "包年包月", class: "" },
              "2": { label: "竞价实例", class: "" }
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          //{ name: "描述", key: "description", value: "" }
        ]
      }
    ]
  },
  "huawei_disk_vm": {
    name: "华为云云主机云硬盘",
    tableConfig: {
      isPublic: true,
      search: false
    },
    tableColumns: [
      { prop: "id", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称" },
      {
        prop: "volume_type", label: "类型", width: "120", align: 'center',
        enums: {
          SATA: { label: "普通云硬盘", type: "" },
          SAS: { label: "高IO云硬盘", type: "" },
          GPSSD: { label: "通用型SSD云硬盘", type: "" },
          DESS_SAS: { label: "企业高IO云硬盘", type: "" },
          ESSD: { label: "极速型SSD", type: "" },
          SSD: { label: "超高IO云硬盘", type: "" }
        }
      },
      {
        prop: "bootable", label: "属性", width: "100", align: 'center',
        enums: {
          true: { label: "系统盘", type: "" },
          false: { label: "数据盘", type: "" }
        }
      },
      { prop: "size", label: "大小(G)", width: "100", align: 'center' },
      {
        prop: "status", label: "状态", width: "100", align: 'center',
        enums: {
          'in-use': { label: "已挂载", type: "success" },
          'Running': { label: "已挂载", type: "success" },
          'creating': { label: "创建中", type: "warning" },
          'available': { label: "未挂载", type: "warning" },
          'attaching': { label: "挂载中", type: "warning" },
          'detaching': { label: "卸载中", type: "warning" },
          'restoring-backup': { label: "备份恢复中", type: "warning" },
          'backing-up': { label: "备份创建中", type: "warning" },
          'DUMPING': { label: "拷贝硬盘中", type: "warning" },
          'error_restoring': { label: "恢复中错误", type: "warning" },
          'uploading': { label: "上传镜像中", type: "warning" },
          'downloading': { label: "镜像下载中", type: "warning" },
          'extending': { label: "扩容中", type: "warning" },
          'error_extending': { label: "扩容中错误", type: "warning" },
          'error_deleting': { label: "删除中错误", type: "warning" },
          'rollbacking': { label: "回滚数据", type: "warning" },
          'error_rollbacking': { label: "回滚数据错误", type: "warning" },
          'awaiting-transfer': { label: "等待过户", type: "warning" }
        }
      }
    ]
  },
  "huawei_vm_flavor": {
    name: "华为云规格",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { type: "radio" },
      { prop: "id", label: "ID" },
      { prop: "name", label: "名称" },
      { prop: "performancetype", label: "规格族" },
      {
        prop: "vcpus", label: "CPU", width: "120",
        render: (row) => {
          if (!row.vcpus) return '';
          return row.vcpus + '核';
        }
      },
      {
        prop: "ram", label: "内存", width: "120",
        render: (row) => {
          if (!row.ram) return '';
          return (row.ram / 1024) + 'G';
        }
      }
    ]
  },
  "huawei_vm_image": {
    name: "华为云镜像",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "镜像分类",
          type: "select",
          data: [
            { label: "系统镜像", value: "PUBLIC_IMAGE" },
            { label: "用户镜像", value: "PRIVATE_IMAGE" }
          ],
          url: "",
          field: "imageType",
          value: ""
        }, {
          name: "操作系统",
          type: "select",
          data: [
            { label: "CentOS", value: "CentOS" },
            { label: "CoreOS", value: "CoreOS" },
            { label: "Debian", value: "Debian" },
            { label: "Ubuntu", value: "Ubuntu" },
            { label: "Windows Server", value: "Windows Server" },
            { label: "EulerOS", value: "EulerOS" },
            { label: "openSUSE", value: "openSUSE" },
            { label: "FreeBSD", value: "FreeBSD" }
          ],
          url: "",
          field: "osName",
          value: ""
        }, {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { type: "radio" },
      { prop: "name", label: "镜像名称" },
      { prop: "os_version", label: "操作系统名称" },
      {
        prop: "image_type", label: "镜像分类", width: "120",
        enums: {
          gold: { label: "公共镜像", type: "info" },
          private: { label: "私有镜像", type: "info" },
          shared: { label: "共享镜像", type: "info" }
        }
      },
      { prop: "min_disk", label: "大小", width: "120" },
      {
        prop: "status", label: "状态", width: "120",
        enums: {
          queued: { label: "创建成功", type: "info" },
          saving: { label: "正在上传", type: "info" },
          deleted: { label: "已删除", type: "danger" },
          killed: { label: "上传错误", type: "danger" },
          active: { label: "正常", type: "success" },
          error: { label: "异常", type: "danger" }
        }
      }
    ]
  },
  "huawei_image": {
    name: "华为云系统镜像",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      //{ prop: "id", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "name", label: "镜像名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "os_version", label: "操作系统" },
      //   { prop: "imagetype", label: "镜像类型", width: "120",
      //     enums: {
      //         gold: { label: "公共镜像", type: "info" },
      //         private: { label: "私有镜像", type: "info" },
      //         shared: { label: "共享镜像", type: "info" }
      //     }
      //   },
      {
        prop: "min_disk", label: "大小", width: "120", align: 'center',
        render: (row) => {
          return row.min_disk + 'GB';
        }
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "140", align: 'center' },
      {
        prop: "status", label: "状态", width: "120", align: 'center',
        enums: {
          queued: { label: "创建成功", type: "info" },
          saving: { label: "正在上传", type: "info" },
          deleted: { label: "已删除", type: "warning" },
          killed: { label: "上传错误", type: "warning" },
          active: { label: "正常", type: "success" },
          error: { label: "异常", type: "danger" }
        }
      },
      {
        prop: "fhcmp_enabled", width: "120", align: 'center',
        label: "可见性",
        renderSwitch(row) {
          return row.fhcmp_enabled ? true : false;
        },
        switchConfig: {
          disabled: false
        }
      }
    ],
    detail: [
      {
        name: "华为云系统镜像详情",
        fields: [
          //{name: "ID", key: "id", value: ""},
          { name: "镜像名称", key: "name", value: "" },
          { name: "操作系统", key: "os_version", value: "" },
          {
            name: "状态", key: "status", value: "", renderType: "EL-TAG",
            enums: {
              queued: { label: "创建成功", type: "info" },
              saving: { label: "正在上传", type: "info" },
              deleted: { label: "已删除", type: "warning" },
              killed: { label: "上传错误", type: "warning" },
              active: { label: "正常", type: "success" },
              error: { label: "异常", type: "danger" }
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          {
            name: "可见性", key: "fhcmp_enabled", value: "",
            render: (v) => {
              return v ? "可见" : "不可见";
            }
          }
        ]
      }
    ]
  },
  "huawei_user_image": {
    name: "华为云用户镜像",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store", //  store 存储;request 请求；数据字典 enums
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      //{ prop: "id", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "name", label: "镜像名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "os_version", label: "操作系统" },
      //   { prop: "imagetype", label: "镜像类型", width: "120",
      //     enums: {
      //         gold: { label: "公共镜像", type: "info" },
      //         private: { label: "私有镜像", type: "info" },
      //         shared: { label: "共享镜像", type: "info" }
      //     }
      //   },
      { prop: "environment_name", label: "环境", align: 'center', width: "120" },
      { prop: "region_local_name", label: "地域", align: 'center', width: "120" },
      {
        prop: "min_disk", label: "大小", width: "120", align: 'center',
        render: (row) => {
          return row.min_disk + 'GB';
        }
      },
      {
        prop: "status", label: "状态", width: "120", align: 'center',
        enums: {
          queued: { label: "创建成功", type: "info" },
          saving: { label: "正在上传", type: "info" },
          deleted: { label: "已删除", type: "warning" },
          killed: { label: "上传错误", type: "warning" },
          active: { label: "正常", type: "success" },
          error: { label: "异常", type: "danger" }
        }
      },
      {
        prop: "fhcmp_enabled", width: "120", align: 'center',
        label: "可见性",
        renderSwitch(row) {
          return row.fhcmp_enabled ? true : false;
        },
        switchConfig: {
          disabled: false
        }
      }
    ],
    detail: [
      {
        name: "华为云系统详情",
        fields: [
          { name: "ID", key: "id", value: "" },
          { name: "镜像名称", key: "name", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "操作系统", key: "os_version", value: "" },
          {
            name: "状态", key: "status", value: "", renderType: "EL-TAG",
            enums: {
              queued: { label: "创建成功", type: "info" },
              saving: { label: "正在上传", type: "info" },
              deleted: { label: "已删除", type: "warning" },
              killed: { label: "上传错误", type: "warning" },
              active: { label: "正常", type: "success" },
              error: { label: "异常", type: "danger" }
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          {
            name: "可见性", key: "fhcmp_enabled", value: "",
            render: (v) => {
              return v ? "可见" : "不可见";
            }
          }
        ]
      }
    ]
  },
  "huawei_disk": {
    name: "华为云块存储",
    explain: "块存储是为云服务器ECS提供的低时延、持久性、高可靠的数据块级随机存储。就像对待硬盘一样，您可以对挂载到ECS实例上的块存储做分区、创建文件系统等操作，并对数据持久化存储。",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      //{ prop: "id", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "name", label: "名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "environment_name", label: "环境", width: "120", align: 'center' },
      { prop: "region_local_name", label: "地域", width: "120", align: 'center' },
      { prop: "zone_local_name", label: "可用区", width: "120", align: 'center' },
      { prop: "instance_name", label: "虚拟机", width: "120", align: 'center' },
      {
        prop: "volume_type", label: "类型", width: "120", align: 'center',
        enums: {
          SATA: { label: "普通云硬盘", type: "" },
          SAS: { label: "高IO云硬盘", type: "" },
          GPSSD: { label: "通用型SSD云硬盘", type: "" },
          DESS_SAS: { label: "企业高IO云硬盘", type: "" },
          ESSD: { label: "极速型SSD", type: "" },
          SSD: { label: "超高IO云硬盘", type: "" }
        }
      },
      {
        prop: "bootable", label: "属性", width: "100", align: 'center',
        enums: {
          true: { label: "系统盘", type: "" },
          false: { label: "数据盘", type: "" }
        }
      },
      { prop: "size", label: "容量(G)", width: "100", align: 'center' },
      {
        prop: "status", label: "状态", width: "100", align: 'center',
        enums: {
          'in-use': { label: "已挂载", type: "success" },
          'Running': { label: "已挂载", type: "success" },
          'creating': { label: "创建中", type: "warning" },
          'available': { label: "未挂载", type: "warning" },
          'attaching': { label: "挂载中", type: "warning" },
          'detaching': { label: "卸载中", type: "warning" },
          'restoring-backup': { label: "备份恢复中", type: "warning" },
          'backing-up': { label: "备份创建中", type: "warning" },
          'DUMPING': { label: "拷贝硬盘中", type: "warning" },
          'error_restoring': { label: "恢复中错误", type: "warning" },
          'uploading': { label: "上传镜像中", type: "warning" },
          'downloading': { label: "镜像下载中", type: "warning" },
          'extending': { label: "扩容中", type: "warning" },
          'error_extending': { label: "扩容中错误", type: "warning" },
          'error_deleting': { label: "删除中错误", type: "warning" },
          'rollbacking': { label: "回滚数据", type: "warning" },
          'error_rollbacking': { label: "回滚数据错误", type: "warning" },
          'awaiting-transfer': { label: "等待过户", type: "warning" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "140", align: 'center' },
      {
        prop: "operate", label: "操作", width: "180", align: 'center',
        operateFun: [
          {
            icon: "edit",
            label: "挂载",
            function: "add",
            isEnabled: row => {
              if (row.bootable != 'false') return false;
              return row.status == "available" ? true : false;
            }
          }, {
            icon: "delete",
            label: "卸载",
            function: "detach",
            isEnabled: row => {
              if (row.bootable != 'false') return false;
              return (row.status == "in-use" || row.status == 'Running') ? true : false;
            }
          }, {
            icon: "delete",
            label: "删除",
            function: "del",
            isEnabled: row => {
              if (row.bootable != 'false') return false;
              return row.status == "available" ? true : false;
            }
          }
        ]
      }
    ],
    detail: [
      {
        name: "云硬盘详情",
        fields: [
          { name: "ID", key: "id", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          { name: "可用区", key: "zone_local_name", value: "" },
          { name: "虚拟机", key: "instance_name", value: "" },
          { name: "容量(G)", key: "size", value: "" },
          {
            name: "类型", key: "volume_type", renderType: "EL-TAG",
            enums: {
              SATA: { label: "普通云硬盘", type: "" },
              SAS: { label: "高IO云硬盘", type: "" },
              GPSSD: { label: "通用型SSD云硬盘", type: "" },
              ESSD: { label: "极速型SSD", type: "" },
              DESS_SAS: { label: "企业高IO云硬盘", type: "" },
              SSD: { label: "超高IO云硬盘", type: "" }
            }
          },
          {
            name: "属性", key: "bootable", value: "", renderType: "EL-TAG",
            enums: {
              true: { label: "系统盘", type: "" },
              false: { label: "数据盘", type: "" }
            }
          },
          {
            name: "状态", key: "status", value: "", renderType: "EL-TAG",
            enums: {
              'creating': { label: "创建中", type: "warning" },
              'available': { label: "未挂载", type: "warning" },
              'in-use': { label: "已挂载", type: "success" },
              'Running': { label: "已挂载", type: "success" },
              'attaching': { label: "挂载中", type: "warning" },
              'detaching': { label: "卸载中", type: "warning" },
              'restoring-backup': { label: "备份恢复中", type: "warning" },
              'backing-up': { label: "备份创建中", type: "warning" },
              'DUMPING': { label: "拷贝硬盘中", type: "warning" },
              'error_restoring': { label: "恢复中错误", type: "warning" },
              'uploading': { label: "上传镜像中", type: "warning" },
              'downloading': { label: "镜像下载中", type: "warning" },
              'extending': { label: "扩容中", type: "warning" },
              'error_extending': { label: "扩容中错误", type: "warning" },
              'error_deleting': { label: "删除中错误", type: "warning" },
              'rollbacking': { label: "回滚数据", type: "warning" },
              'error_rollbacking': { label: "回滚数据错误", type: "warning" },
              'awaiting-transfer': { label: "等待过户", type: "warning" }
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ]
  },
  "huawei_disk_inst": {
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { prop: "", type: "radio", width: "50" },
      { prop: "id", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "云主机名称", "show-overflow-tooltip": true },
      { prop: "zone_local_name", label: "可用区", width: "100", align: 'center' },
      {
        prop: "flavor_vcpus", label: "CPU(核)", width: "100", align: 'center',
        render: (row) => {
          if (!row.flavor_vcpus) return '';
          return row.flavor_vcpus + '核';
        }
      },
      {
        prop: "flavor_ram", label: "内存(MB)", width: "100", align: 'center',
        render: (row) => {
          if (!row.flavor_ram) return '';
          return (row.flavor_ram / 1024) + 'G';
        }
      }
    ]
  },
  "huawei_security_group": {
    name: "华为云安全组",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "环境",
          type: "select",
          placeholder: "",
          data: {
            type: "store",
            dataKey: "publicEnvList",
            labelName: "environment_name",
            valueName: "uuid"
          },
          url: "",
          field: "environment_uuid",
          value: ""
        },
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { prop: "id", label: "ID" },
      {
        prop: "name", label: "名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "environment_name", label: "环境", width: 120 },
      { prop: "region_local_name", label: "地域", width: 120 },
      //{ prop: "vpc_uuid", label: "VPC" },
      //{ prop: "service_managed", label: "相关实例" },
      //{ prop: "description", label: "描述", "show-overflow-tooltip": true },
      { prop: "cmpCreateTime", label: "创建时间", width: 140 },
      {
        label: "操作", prop: "operate", align: 'center', width: 120,
        operateFun: [
          //   {
          //     icon: "edit",
          //     label: "修改",
          //     function: "edit"
          //   },
          {
            icon: "del",
            label: "删除",
            function: "del"
          }
        ]
      }
    ],
    detail: [
      {
        name: "华为云安全组详情",
        fields: [
          { name: "ID", key: "id", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "环境", key: "environment_name", value: "" },
          { name: "地域", key: "region_local_name", value: "" },
          //{ name: "描述", key: "description", value: "" },
          { name: "创建时间", key: "cmpCreateTime", value: "" }
        ]
      }
    ]
  },
  "huawei_security_group_ingress": {
    name: "huawei_security_group_ingress",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      //   { prop: "action", label: "授权策略", width: 120, align: 'center',
      //     render: (row) => {
      //         if(row.action == 'ACCEPT') {
      //             return "<span class='el-tag el-tag--success el-tag--small el-tag--light'>允许</span>";
      //         } else if(row.action == 'DROP') {
      //             return "<span class='el-tag el-tag--danger el-tag--small el-tag--light'>拒绝</span>";
      //         }
      //          return "";
      //     }
      //   },
      //{ prop: "priority", label: "优先级", align: 'center' },
      { prop: "ethertype", label: "类型", width: 120, align: 'center' },
      {
        prop: "protocol", label: "协议", width: 120, align: 'center',
        render: (row) => {
          if (row.protocol) return row.protocol;
          return "全部";
        }
      },
      {
        prop: "port", label: "端口范围",
        render: (row) => {
          let vh = row.port_range_min;
          if (row.port_range_max && row.port_range_min != row.port_range_max) vh += ('-' + row.port_range_max);
          return vh;
        }
      },
      { prop: "remote_ip_prefix", label: "授权对象" },
      { prop: "description", label: "描述" },
      //{ prop: "modifyTime", label: "修改时间", width: 140, align: 'center' },
      {
        label: "操作", prop: "operate", align: 'center', width: 120,
        operateFun: [
          {
            icon: "delete",
            label: "删除",
            function: "del"
          }
        ]
      }
    ]
  },
  "huawei_security_group_egress": {
    name: "huawei_security_group_egress",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      //   { prop: "action", label: "授权策略", width: 120, align: 'center',
      //     render: (row) => {
      //         if(row.action == 'ACCEPT') {
      //             return "<span class='el-tag el-tag--success el-tag--small el-tag--light'>允许</span>";
      //         } else if(row.action == 'DROP') {
      //             return "<span class='el-tag el-tag--danger el-tag--small el-tag--light'>拒绝</span>";
      //         }
      //          return "";
      //     }
      //   },
      //{ prop: "priority", label: "优先级", align: 'center' },
      { prop: "ethertype", label: "类型", width: 120, align: 'center' },
      {
        prop: "protocol", label: "协议", width: 120, align: 'center',
        render: (row) => {
          if (row.protocol) return row.protocol;
          return "全部";
        }
      },
      {
        prop: "port", label: "端口范围",
        render: (row) => {
          let vh = row.port_range_min;
          if (row.port_range_max && row.port_range_min != row.port_range_max) vh += ('-' + row.port_range_max);
          return vh;
        }
      },
      { prop: "remote_ip_prefix", label: "授权对象" },
      { prop: "description", label: "描述" },
      //{ prop: "modifyTime", label: "修改时间", width: 140, align: 'center' },
      {
        label: "操作", prop: "operate", align: 'center', width: 120,
        operateFun: [
          {
            icon: "delete",
            label: "删除",
            function: "del"
          }
        ]
      }
    ]
  },
  "huawei_security_group_associate": {
    name: "huawei_security_group_associate",
    tableConfig: {
      isPublic: true,
      setting: false
    },
    tableColumns: [
      { prop: "id", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "zone_local_name", label: "可用区" },
      {
        prop: "address_first_addr", label: "私有IP地址", "show-overflow-tooltip": true, width: "100",
        render: (row) => {
          return row.address_first_addr;
        }
      },
      { prop: "description", label: "描述" }
      //   {
      //     label: "操作",
      //     prop: "operate",
      //     operateFun: [
      //       {
      //         icon: "delete",
      //         label: "移出安全组",
      //         function: "remove"
      //       }
      //     ]
      //   }
    ]
  },
  "elastic_scaling": {
    name: "弹性伸缩组",
    explain:
      "基于资源中心云主机组功能作为底层服务实现弹性伸缩功能",
    icon: "cluster",
    tableConfig: {
      isPublic: true
    },
    searchForm: {
      labels: [
        {
          name: "",
          placeholder: "搜索名称",
          field: "name",
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
    tableColumns: [
      { prop: "id", label: "ID" },
      {
        prop: "name", label: "名称",
        operateFun: {
          function: "info"
        }
      },
      { prop: "environment_name", label: "环境", width: 120 },
      { prop: "region_local_name", label: "地域", width: 120 },
      { prop: "vpc_uuid", label: "VPC" },
      { prop: "service_managed", label: "相关实例" },
      { prop: "description", label: "描述", "show-overflow-tooltip": true },
      { prop: "cmpCreateTime", label: "创建时间", width: 140 },
      {
        label: "操作", prop: "operate", align: 'center', width: 120,
        operateFun: [
          {
            icon: "edit",
            label: "修改",
            function: "edit"
          },
          {
            icon: "del",
            label: "删除",
            function: "del"
          }
        ]
      }
    ]
  },
  'resourcecenter_compute_instance_v1': {
    name: "虚拟云主机",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "主机名称", key: "name", value: "" },
          {
            name: "状态", key: "status", value: "", renderType: "EL-TAG",
            enums: {
              'active': { label: "运行中", type: "success" },
              'starting': { label: "启动中", type: "warning" },
              'stopping': { label: "关机中", type: "warning" },
              'snapshoting': { label: "快照中", type: "warning" },
              'stopped': { label: "已关机", type: "info" },
              'rebooting': { label: "重启中", type: "warning" },
              'error': { label: "错误", type: "danger" },
              'creating': { label: "创建中", type: "warning" },
              'deleting': { label: "删除中", type: "danger" },
              'recycling': { label: "回收中", type: "warning" },
              'resizing': { label: "更改规格中", type: "warning" },
              'attaching': { label: "挂载卸载资源中", type: "warning" },
            }
          },
          { name: "虚拟化类型", key: "cloud_platform_type", value: "" },
          { name: "Region", key: "region_idName", value: "" },
          { name: "创建者", key: "cmpUserName", value: "" },
          { name: "资源区", key: "resource_zone_idName", value: "" },
          { name: "资源池", key: "resource_pool_idName", value: "" },
          { name: "创建时间", key: "cmpUpdateTime", value: "" },
          { name: "描述", key: "description", value: "" },



        ]
      }
    ]
  },
  "host_security": {
    name: "主机安全",
    explain: "",
    searchForm: {
      labels: [
        {
          name: "防护状态",
          type: "select",
          placeholder: "请选择防护状态",
          field: "protectionStatus",
          value: "",
          data: [
            // { value: undefined, label: "未防护" },
            { value: "未安装", label: "未安装" },
            { value: "安装中", label: "安装中" },
            { value: "已安装", label: "已安装" },
            { value: "已防护", label: "已防护" },
            { value: "已防护", label: "已防护" },
            { value: "WebShell扫描中", label: "WebShell扫描中" },
            { value: "二进制扫描中", label: "二进制扫描中" },
            { value: "已隔离", label: "已隔离" },
            { value: "卸载中", label: "卸载中" },
          ]
        },
        {
          name: "IP 地址",
          placeholder: "请输入IP 地址",
          field: "ip_addr",
          connector: 6,
          value: ""
        },
        {
          name: "",
          placeholder: "请输入主机名称，支持模糊搜索",
          field: "name",
          connector: 6,
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
  },
  "host_antivirus": {
    name: "主机杀毒",
    explain: "支持对虚拟机云主机安装防病毒 Agent，以保护云主机免受病毒、间谍软件、木马和其他恶意软件的侵害。支持对系统进行实时防护，定期对云主机进行全盘扫描，手动对虚拟机进行磁盘扫描。手动扫描支持快速、全盘扫描两种安全检测方式。",
    icon: "antivirus",
    searchForm: {
      labels: [
        {
          name: "防病毒状态",
          type: "select",
          placeholder: "请选择防病毒状态",
          field: "antivirusStatus",
          value: "",
          data: [
            // { value: undefined, label: "未防护" },
            { value: "未安装", label: "未安装" },
            { value: "安装中", label: "安装中" },
            { value: "防病毒", label: "防病毒" },
            { value: "防病毒扫描中", label: "防病毒扫描中" },
            { value: "卸载中", label: "卸载中" },
          ]
        },
        {
          name: "IP 地址",
          placeholder: "请输入IP 地址",
          field: "ip_addr",
          connector: 6,
          value: ""
        },
        {
          name: "",
          placeholder: "请输入主机名称，支持模糊搜索",
          field: "name",
          connector: 6,
          value: ""
        }
      ],
      btns: [
        {
          name: "查询",
          click: ""
        },
      ],
      inputParams: {}
    },
  },
  "scaling_group": {
    name: "弹性伸缩组",
    detail: [
      {
        name: "基本信息",
        fields: [
          { name: "所属Project", key: "cmpProjectName", value: "" },
          { name: "名称", key: "name", value: "" },
          { name: "最小实例数", key: "minInstance", value: "" },
          { name: "最大实例数", key: "maxInstance", value: "" },
          { name: "冷却时间（秒）", key: "cdTime", value: "" },
          {
            name: "状态", key: "status", value: "", renderType: "EL-TAG",
            enums: {
              '0': { label: "空闲", type: "success" },
              '1': { label: "扩容中", type: "warning" },
              '2': { label: "缩容中", type: "warning" },
              '3': { label: "冷却中", type: "primary" },
            }
          },
          { name: "创建时间", key: "cmpCreateTime", value: "" },
          { name: "描述", key: "scalingDesc", value: "" },
        ]
      }
    ]
  },
  "scaling_activity": {
    name: "弹性伸缩组伸缩活动",
    detail: [
      {
        name: "基本信息",
        fields: [
          {
            key: "id",
            name: "ID",
            value: "",
          },
          {
            key: "name",
            name: "伸缩活动名称",
            value: "",
          },


          { key: "instanceNum", name: "当前数", value: "", },
          { key: "successNum", name: "成功数", value: "", },
          { key: "failNum", name: "失败数", value: "", },
          { key: "memberSuccessNum", name: "member数", value: "", },
          {
            key: "startTime",
            name: "开始时间",
            value: "",
          },
          {
            key: "endTime",
            name: "结束时间",
            value: "",
          },
          // { key: "memberFailNum", name: "member失败数", value: "", },
          {
            key: "status",
            name: "状态",
            value: "",
            renderType: "EL-TAG",
            enums: {
              0: { label: "执行中", type: "warning" },
              1: { label: "执行完毕", type: "success" },
              2: { label: "执行错误", type: "danger" },
            },
          },

        ]
      }
    ]
  }
};
