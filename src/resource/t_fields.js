export default {
  region: {
    name: "region",
    tableConfig: {},
    tableColumns: []
  },
  ali_vm: {
    name: "阿里云云主机",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      {
        prop: "instance_id",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "instance_name",
        label: "云主机名称",
        operateFun: { function: "info" }, "show-overflow-tooltip": true
      },
      {
        prop: "environment_name",
        label: "环境",
        "show-overflow-tooltip": true
      },
      { prop: "cmpTenantName", label: "租户" },
      { prop: "image_id", label: "镜像", "show-overflow-tooltip": true },
      { prop: "instance_type", label: "规格" },
      {
        prop: "first_primary_ip_address", label: "IP地址",
        render(row) {
          return `${row.listjson_private_ip_address && row.listjson_private_ip_address[0]}(私网)${row.eip_ip_address ? `,${row.eip_ip_address}(公网)` : ""}`;
        }
      },
      { prop: "v_switch_id", label: "子网" },
      {
        prop: "status",
        label: "状态",
        enums: {
          Running: { label: "运行中", type: "success" },
          Starting: { label: "启动中", type: "warning" },
          Pending: { label: "创建中", type: "warning" },
          Stopping: { label: "停止中", type: "warning" },
          Stopped: { label: "已停止", type: "info" }
        },
      },
      {
        prop: "instance_charge_type",
        label: "付费模式",
        enums: {
          PostPaid: { label: "按量付费", class: "" },
          PrePaid: { label: "预付费", class: "" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间" },
      {
        prop: "operate",
        label: "操作",
        width: "240",
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
              return row.status == "Running" || row.status == "Stopped"
                ? true
                : false;
            }
          },
          {
            icon: "delete",
            label: "删除",
            function: "del"
          },
          {
            icon: "monitor",
            label: "性能监控",
            function: "monitor"
          },
          {
            icon: "edit",
            label: "修改密码",
            function: "editPassword"
          }
        ]
      }
    ]
  },
  ali_vm_volume: {
    name: "阿里云主机关联云硬盘",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "disk_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "disk_name", label: "名称" },

      { prop: "size", label: "大小（GB）", width: "100" },
      {
        prop: "type", label: "用途",
        enums: {
          data: { label: "数据盘" },
          system: { label: "系统盘" }
        }
      },
      {
        prop: "category",
        label: "类型",
        width: "100",
        enums: {
          cloud_efficiency: { label: "高效云盘", class: "" },
          cloud_ssd: { label: "SSD云盘", class: "" },
          cloud_essd: { label: "ESSD云盘", class: "" },
          cloud: { label: "普通云盘", class: "" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间", width: 170 }
    ]
  },
  ali_volume: {
    name: "阿里云块存储",
    tableConfig: {
      isPublic: true
    },
    bindTableConfig: {
      isPublic: true,
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "disk_id", label: "ID", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      { prop: "disk_name", label: "名称" },
      {
        prop: "environment_name",
        label: "环境"
      },
      { prop: "size", label: "大小（GB）", width: "100" },
      {
        prop: "category",
        label: "类型",
        width: "100",
        // enums: {
        //   cloud_efficiency: { label: "高效云盘", class: "" },
        //   cloud_ssd: { label: "SSD云盘", class: "" },
        //   cloud_essd: { label: "ESSD云盘", class: "" },
        //   cloud: { label: "普通云盘", class: "" }
        // }
        txtEnums: true
      },
      {
        prop: "type",
        label: "用途",
        width: "80",
        // enums: {
        //   data: { label: "数据盘", class: "" },
        //   system: { label: "系统盘", class: "" },
        // },
        txtEnums: true
      },
      {
        prop: "status",
        label: "状态",
        width: "100",
        tagEnums: true,
        // enums: {
        //   In_use: { label: "使用中", type: "success" },
        //   Available: { label: "待挂载", type: "success" },
        //   Attaching: { label: "挂载中", type: "success" },
        //   Detaching: { label: "卸载中", type: "success" },
        //   Creating: { label: "创建中", type: "success" },
        //   ReIniting: { label: "初始化中", type: "success" }
        // }
      },
      {
        prop: "instance_id",
        label: "绑定的虚拟机",
      },
      { prop: "cmpCreateTime", label: "创建时间", width: 170 },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            label: "挂载",
            function: "mount",
            icon: "bind",
            isDisplay: row => {
              return !row.instance_id;
            }
          },
          {
            label: "卸载",
            function: "unmount",
            icon: "unbind",
            isDisplay: row => {
              return row.instance_id;
            }
          },
          {
            label: "删除",
            function: "del",
            icon: "delete"
          }
        ]
      }
    ],
    bindTableColumns: [
      { type: "radio" },
      { prop: "instance_name", label: "名称" },
      { prop: "image_id", label: "镜像" },
      { prop: "instance_type", label: "规格" },
      {
        prop: "first_primary_ip_address", label: "IP",
        render(row) {
          return row.listjson_private_ip_address[0]
        }
      },
      {
        prop: "status", label: "状态",
        enums: {
          Running: { label: "运行中", type: "success" },
          Starting: { label: "启动中", type: "warning" },
          Pending: { label: "创建中", type: "warning" },
          Stopping: { label: "停止中", type: "warning" },
          Stopped: { label: "已停止", type: "info" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间" }
    ]
  },
  ali_image: {
    name: "阿里云系统镜像",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      { prop: "image_id", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "image_name",
        label: "镜像名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "size", label: "大小(GiB)" },
      { prop: "platform", label: "操作系统" },
      {
        prop: "status",
        label: "状态",
        width: "100",
        enums: {
          UnAvailable: { label: "不可用", type: "danger" },
          Available: { label: "可用", type: "success" },
          Creating: { label: "创建中", type: "warning" },
          CreateFailed: { label: "创建失败", type: "danger" }
        }
      },
      {
        prop: "fhcmp_enabled",
        label: "可见性",
        width: "100",
        renderSwitch(row) {
          return row.fhcmp_enabled ? true : false;
        },
        switchConfig: {
          disabled: false
        }
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "200" }
    ],
  },
  ali_user_image: {
    name: "阿里云用户镜像",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      // { prop: "image_id", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "image_name",
        label: "镜像名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      {
        prop: "environment_uuid",
        label: "环境",
        "show-overflow-tooltip": true
      },
      { prop: "region_uuid", label: "地域", "show-overflow-tooltip": true },
      { prop: "platform", label: "操作系统" },
      {
        prop: "status",
        label: "状态",
        width: "100",
        enums: {
          UnAvailable: { label: "不可用", type: "danger" },
          Available: { label: "可用", type: "success" },
          Creating: { label: "创建中", type: "warning" },
          CreateFailed: { label: "创建失败", type: "danger" }
        }
      },
      { prop: "size", label: "大小" },
      { prop: "cmpCreateTime", label: "创建时间", width: "200" }
    ]
  },
  ali_vm_flavors: {
    name: "阿里云规格",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      { prop: "instance_type_id", label: "名称", "show-overflow-tooltip": true },
      { prop: "instance_type_family", label: "规格族" },
      { prop: "cpu_core_count", label: "CPU（核）" },
      { prop: "memory_size", label: "内存（G）" },
      {
        prop: "enabled",
        label: "可见性",
        renderSwitch(row) {
          return row.enabled ? true : false;
        },
        switchConfig: {
          disabled: false
        }
      }
    ]
  },
  com_region_zone: {
    name: "公有云地域和可用区",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      {
        prop: "region_id",
        label: "ID",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      {
        prop: "environment_uuid",
        label: "环境",
        "show-overflow-tooltip": true
      },
      {
        prop: "environment_name",
        label: "环境名称",
        "show-overflow-tooltip": true
      },
      { prop: "region_local_name", label: "地域" },
      {
        prop: "publiccloud_type",
        label: "公有云类型",
        width: "160",
        enums: {
          aliyun: { label: "阿里云", type: "info" },
          huaweicloud: { label: "华为云", type: "info" },
          tencentcloud: { label: "腾讯云", type: "info" },
        }
        // renderPage: "tag"
      },
      {
        prop: "shared",
        label: "独享共享",
        width: "100",
        render(row) {
          return row.shared == null ? "空" : row.shared == true ? "共享" : "独享";
        }
      },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "setting",
            label: "配置独占性",
            function: "configExclusive",
            opercode: "configExclusive"
            //isDisplay: "region_edit"
          },
          {
            icon: "connection",
            label: "关联Project",
            function: "associateProject",
            opercode: "associateProject"
            //isDisplay: "region_delete"
          }
        ]
      }
    ]
  },
  nas: {
    name: "文件存储",
    tableConfig: {},
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "name",
        label: "名称",
        operateFun: {
          function: "toDetail"
        }, "show-overflow-tooltip": true
      },
      { prop: "region_id", label: "Region" },
      { prop: "size", label: "大小(G)", width: 100 },
      { prop: "protocol", label: "文件服务协议", width: 120 },
      {
        prop: "status",
        label: "创建状态",
        width: 100
      },
      {
        prop: "cmpCreateTime",
        label: "创建时间"
      },
      {
        label: "操作",
        prop: "operate",
        width: 100,
        operateFun: [
          {
            label: "删除",
            function: "del",
            opercode: "region_edit",
            icon: "delete"
          }
        ]
      }
    ]
  },
  nas_virtual: {
    name: "nas_virtual",
    tableConfig: {},
    tableColumns: [
      { prop: "uuid", label: "虚拟机ID", "show-overflow-tooltip": true },
      {
        prop: "name",
        label: "虚拟机名称",
        "show-overflow-tooltip": true,
        width: "100"
      },
      { prop: "ip_address", label: "虚拟机IP address" },
      {
        prop: "instance_ports",
        width: "200",
        label: "IP地址",
        renderPage: "tag"
      },
      { prop: "status", label: "挂载状态", width: "200" },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "export",
            label: "卸载",
            function: "detach"
          }
        ]
      }
    ]
  },
  nas_serve: {
    name: "nas_serve",
    tableConfig: {},
    tableColumns: [
      { type: "selection" },
      { prop: "name", label: "主机名称", "show-overflow-tooltip": true },
      { prop: "cloud_platform_type", label: "虚拟化类型", width: "100" },
      { prop: "resource_zone_id", label: "资源区" },
      { prop: "image_id", label: "镜像名称", width: "200" }
    ]
  },
  fire_wall_ingress: {
    // TODO:请求修改后props的修改
    name: "fire_wall_ingress",
    tableConfig: {
      setting: false,
      isPublic: true
    },
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "source_ip_group_data", label: "原IP" },
      { prop: "source_service_group_data", label: "原端口" },
      { prop: "destination_ip_group_data", label: "目的IP" },
      { prop: "destination_service_group_data", label: "目的端口" },
      { prop: "action", label: "动作策略" },
      {
        label: "操作",
        prop: "operate",
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
  fire_wall_egress: {
    // TODO:请求修改后props的修改
    name: "fire_wall_ingress",
    tableConfig: {
      setting: false,
      isPublic: true
    },
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "source_ip_group_data", label: "原IP" },
      { prop: "source_service_group_data", label: "原端口" },
      { prop: "destination_ip_group_data", label: "目的IP" },
      { prop: "destination_service_group_data", label: "目的端口" },
      { prop: "action", label: "动作策略" },
      {
        label: "操作",
        prop: "operate",
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
  ip_pool: {
    name: "ip_pool",
    tableConfig: {},
    tableColumns: [
      { prop: "cmpInstanceName", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "name",
        label: "名称",
        "min-width": 260,
        operateFun: {
          function: "toDetail"
        }, "show-overflow-tooltip": true
      }, // .....
      {
        prop: "type",
        label: "类型",
        width: "110",
        enums: {
          Floatingip: { label: "浮动IP" },
          Loadbalance_vip: { label: "负载均衡VIP" }
        }
      },
      { prop: "resource_zone_idName", label: "资源区" },
      { prop: "cmpCreateTime", label: "创建时间", width: "200" },
      {
        label: "操作",
        prop: "operate",
        width: "150",
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
  ip_pool_sp: {
    name: "ip_pool_sp",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      { prop: "sp_ip_pool_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "cidr", label: "IP地址" },
      { prop: "vlan", label: "VLAN" },
      { prop: "created_at", label: "创建时间", width: "200" },
      {
        label: "操作",
        prop: "operate",
        width: "100",
        operateFun: [
          {
            icon: "delete",
            label: "删除",
            function: "deleteVlan"
          }
        ]
      }
    ]
  },
  subnet_ip_pool: {
    name: "subnet_ip_pool",
    tableConfig: {},
    tableColumns: [
      { prop: "cmpInstanceName", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "name",
        label: "名称",
        operateFun: {
          function: "toDetail"
        }, "show-overflow-tooltip": true
      },
      { prop: "resource_zone_idName", label: "资源区" },
      {
        prop: "scope",
        label: "租户类型",
        width: "80",
        enums: {
          hangxin: { label: "航信" },
          other: { label: "非航信" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "200" },
      {
        label: "操作",
        prop: "operate",
        width: "150",
        operateFun: [
          {
            icon: "edit",
            label: "编辑",
            function: "edit",
            opercode: "region_edit"
          },
          {
            icon: "delete",
            label: "删除",
            function: "del",
            opercode: "region_delete"
          }
        ]
      }
    ]
  },
  subnet_ip_pool_section: {
    name: "subnet_ip_pool_section",
    tableConfig: {
      search: false,
      setting: false,
      pageSizes: [5, 10, 15, 20],
      pageSize: 5
    },
    tableColumns: [
      { prop: "cidr", label: "CIDR" },
      { prop: "status", label: "状态", width: "100" },
      { prop: "start_ip", label: "第一个可用地址" },
      { prop: "end_ip", label: "最后一个可用地址" }
    ]
  },
  cidr_subnet: {
    name: "cidr_subnet",
    tableConfig: {
      setting: false,
      pageSizes: [5, 10, 15, 20],
      pageSize: 5
    },
    tableColumns: [
      { prop: "cidr", label: "CIDR" },
      { prop: "start_ip", label: "第一个可用地址" },
      { prop: "end_ip", label: "最后一个可用地址" }
    ]
  },
  subnet_ip_pool_prefix: {
    name: "subnet_ip_pool_prefix",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      {
        prop: "uuid",
        label: "ID",
        "show-overflow-tooltip": true
      },
      {
        prop: "cidr",
        label: "CIDR",
        operateFun: {
          function: "openDetail"
        }
      },
      { prop: "length", label: "长度", width: 100 },
      { prop: "created_at", label: "创建时间", width: 160 },
      {
        label: "操作",
        prop: "operate",
        width: "100",
        operateFun: [
          {
            icon: "delete",
            label: "删除",
            function: "deleteVlan"
          }
        ]
      }
    ]
  },
  vpc_connect: {
    name: "vpc_connect",
    tableConfig: {},
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "name",
        label: "名称",
        operateFun: {
          function: "toDetail"
        }, "show-overflow-tooltip": true
      },
      { prop: "vpc_idName", label: "VPC" },
      { prop: "peer_vpc_idName", label: "对端VPC" },
      {
        prop: "status",
        label: "创建状态",
        enums: {
          ACTIVE: { label: "正常", type: "success", component: "dot" },
          ERROR: { label: "失败", type: "danger", component: "dot" },
          PENDING_CREATE: { label: "创建中", type: "warning", component: "dot" },
          PENDING_UPDATE: { label: "修改中", type: "warning", component: "dot" },
          PENDING_DELETE: { label: "删除中", type: "warning", component: "dot" }
        },
        width: 160
      },
      {
        prop: "cmpCreateTime",
        label: "创建时间",
        width: 160
      },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          { label: "编辑", function: "edit", icon: "edit" },
          { label: "删除", function: "del", icon: "delete" }
        ]
      }
    ]
  },
  subnet: {
    name: "subnet",
    tableConfig: {},
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "name",
        label: "名称",
        operateFun: {
          function: "toDetail"
        }, "show-overflow-tooltip": true
      },
      { prop: "vpc_idName", label: "vpc" },
      { prop: "cidr", label: "IP段" },
      { prop: "gateway", label: "网关" },
      { prop: "segment_type", label: "segment_type" },
      {
        prop: "cmpCreateTime",
        label: "创建时间"
      },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          { label: "编辑", function: "edit", icon: "edit" },
          { label: "删除", function: "del", icon: "delete" }
        ]
      }
    ]
  },
  subnet_port: {
    name: "subnet_port",
    tableConfig: {
      setting: false,
      pageSizes: [5, 10, 30, 50],
      pageSize: 5
    },
    tableColumns: [
      {
        prop: "uuid",
        label: "ID",
        "show-overflow-tooltip": true
      },
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "ip_address", label: "IP", width: 120 },
      { prop: "device_type", label: "设备类型", width: 80 },
      { prop: "device_id", label: "设备ID" }
    ]
  },
  ali_environment: {
    name: "公有云环境",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      {
        prop: "uuid",
        label: "ID",
        operateFun: {
          function: "toDetail"
        }, "show-overflow-tooltip": true
      },
      {
        prop: "environment_name",
        label: "名称",
        "show-overflow-tooltip": true
      },
      {
        prop: "publiccloud_type",
        label: "公有云类型",
        width: "160",
        enums: {
          aliyun: { label: "阿里云", type: "info" },
          huaweicloud: { label: "华为云", type: "info" },
          tencentcloud: { label: "腾讯云", type: "info" },
        }
        // renderPage: "tag"
      },
      { prop: "access_key", label: "accesskey" },
      {
        prop: "tenant_name",
        label: "关联租户"
      },
      // {
      //   prop: "shared",
      //   label: "独享共享",
      //   width: "100",
      //   render(row) {
      //     return row.shared ? "共享" : "独享";
      //   }
      // },
      { prop: "cmpCreateTime", label: "创建时间", width: "200" },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          // {
          //   icon: "connection",
          //   label: "变更关联租户",
          //   function: "attatch"
          // },
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
  environment_tenant: {
    name: "关联租户",
    config: {
      isPublic: true,
      setting: false
    },
    tenantTableConfig: {
      isPublic: true,
      setting: false,
      pagination: false
    },
    tableColumns: [
      {
        prop: "id",
        label: "租户ID",
        "show-overflow-tooltip": true,
        width: "70"
      },
      { prop: "name", label: "租户名称", "show-overflow-tooltip": true },
      { prop: "englishName", label: "英文名称" },
      { prop: "typeId", label: "租户类型", width: "100" },
      { prop: "description", label: "描述", width: "100" },
      {
        prop: "status",
        label: "状态",
        enums: {
          1: { label: "禁用", type: "info" },
          0: { label: "启用", type: "success" }
        }
      },
      { prop: "createTime", label: "创建时间", width: "160" },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "folder-remove",
            label: "移除",
            function: "remove"
          }
        ]
      }
    ],
    tenantTableColumns: [
      { type: "selection", width: "50" },
      { prop: "id", label: "租户ID", width: "70" },
      {
        prop: "name",
        label: "租户名称",
        "show-overflow-tooltip": true,
        width: "100"
      },
      {
        prop: "englishName",
        label: "英文名称",
        "show-overflow-tooltip": true,
        width: "100"
      },
      { prop: "typeId", label: "租户类型", width: "70" },
      {
        prop: "description",
        label: "描述",
        "show-overflow-tooltip": true,
        width: "100"
      },
      {
        prop: "status",
        label: "状态",
        enums: {
          1: { label: "禁用", type: "info" },
          0: { label: "启用", type: "success" }
        }
      },
      { prop: "createTime", label: "创建时间", width: "160" }
    ],
    tenantDetailColumns: [
      {
        prop: "id",
        label: "租户ID",
        "show-overflow-tooltip": true
      },
      { prop: "name", label: "租户名称", "show-overflow-tooltip": true },
      { prop: "englishName", label: "英文名称" },
      { prop: "typeId", label: "租户类型", width: "100" },
      { prop: "description", label: "描述", width: "100" },
      {
        prop: "status",
        label: "状态",
        enums: {
          1: { label: "禁用", type: "info" },
          0: { label: "启用", type: "success" }
        }
      },
      { prop: "createTime", label: "创建时间", width: "160" }
    ]
  },
  storage_resource_pool: {
    name: "storage_resource_pool",
    tableConfig: {
      setting: false,
      pagination: false
    },
    dialog_add_tableConfig: {
      setting: false,
      pagination: false,
      isPublic: true
    },
    tableColumns: [
      { prop: "name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      {
        prop: "tags",
        label: "用途",
        renderPage: "tags"
      },
      { prop: "region_idName", label: "Region" },
      {
        prop: "form",
        label: "存储形式",
        enums: {
          file: { label: "文件存储", type: "info", component: "dot" },
          object: { label: "对象存储", type: "primary", component: "dot" }
        }
      },
      {
        prop: "utilization_threshold",
        label: "分配限制阈值",
        render(row) {
          return `${row.utilization_threshold}`;
        }
      },
      { prop: "cmpCreateTime", label: "创建时间" },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          { label: "编辑", function: "edit", icon: "edit" },
          { label: "删除", function: "del", icon: "delete" }
        ]
      }
    ],
    detail_tableColumns: [
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "total_capacity", label: "存储池总容量(GB)" },
      { prop: "used_capacity", label: "存储池已用容量(GB)" },
      {
        prop: "use_type",
        label: "存储用途",
        enums: {
          file: { label: "文件存储", type: "info", component: 'dot' },
          object: { label: "对象存储", type: "success", component: 'dot' }
        }
      },
      {
        prop: "operate",
        label: "操作",
        operateFun: [
          { label: "移除", function: "remove", icon: "folder-remove" }
        ]
      }
    ],
    remove_tableColumns: [
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "storage_environment_name", label: "所属存储环境" },
      {
        prop: "use_type",
        label: "用途",
        enums: {
          file: { label: "文件存储", type: "info", component: 'dot' },
          object: { label: "对象存储", type: "success", component: 'dot' }
        }
      }
    ],
    dialog_add_tableColumns: [
      { type: "selection" },
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "storage_environment_name", label: "所属存储环境" },
      {
        prop: "use_type",
        label: "用途",
        enums: {
          file: { label: "文件存储", type: "info", component: 'dot' },
          object: { label: "对象存储", type: "success", component: 'dot' }
        }
      }
    ]
  },
  cluster_manage: {
    name: "cluster_manage",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableConfigInDetail: {
      setting: false,
      pagination: false,
      search: false
    },
    tableColumns: [
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      {
        prop: "cmpStatus",
        label: "状态",
        enums: {
          0: { label: "启用", type: "success" },
          1: { label: "禁用", type: "danger" }
        }
      },
      { prop: "cloud_platform_type", label: "虚拟化类型" },
      { prop: "resource_pool_idName", label: "所属资源池" },
      { prop: "cluster_pool_idName", label: "所属集群池" },
      { prop: "instance_over_ratio", label: "虚拟机超售比" },
      { prop: "vcpu_over_ratio", label: "CPU超售比" },
      { prop: "mem_over_ratio", label: "内存超售比" },
      { prop: "extra", label: "备注" },
      {
        prop: "operate",
        label: "操作",
        operateFun: [
          { label: "启用", function: "enable", icon: "enable" },
          { label: "禁用", function: "disable", icon: "disable" }
        ]
      }
    ]
  },
  user_images: {
    name: "user_images",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "image_name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      // { prop: "cmpUserName", label: "用户名称" },
      {
        prop: "cloud_platform_type",
        label: "虚拟化类型",
        width: "160",
        renderPage: "tagCloudType"
      },
      {
        prop: "operating_system",
        label: "OS",
        width: "160",
        renderPage: "tagOS"
      },
      { prop: "os_version", label: "Version" },
      { prop: "resource_zone_idName", label: "资源区" },
      {
        prop: "cmpStatus",
        label: "启用状态",
        width: "100",
        // enums: {
        //   'ENABLE': { label: "启用", type: "success" },
        //   'DISABLE': { label: "禁用", type: "danger" }
        // },
        enums: {
          0: { label: "启用", type: "success", component: "dot" },
          1: { label: "禁用", type: "info", component: "dot" }
        }
      },
      { prop: "image_size", label: "镜像大小（G）", width: "130" },
      {
        prop: "operate",
        label: "操作",
        width: "80",
        operateFun: [{ label: "删除", function: "del", icon: "delete" }]
      }
    ],
    tableColumns_image: [
      { prop: "image_name", label: "名称", "show-overflow-tooltip": true },
      { prop: "boot_index", label: "数据盘排序" },
      {
        prop: "cloud_platform_type",
        label: "云平台类型",
        width: 150,
        renderPage: "tag"
      },
      { prop: "cmpCreateTime", label: "创建时间" },
      { prop: "image_size", label: "镜像大小(G)", width: 100 },
      { prop: "checksum", label: "校验和" }
    ],
    tableColumns_task: [
      { prop: "id", label: "ID", "show-overflow-tooltip": true },
      { prop: "desc", label: "任务描述" },
      {
        prop: "state",
        label: "状态",
        enums: {
          waiting: { label: "等待中", class: "black" },
          running: { label: "进行中", class: "black" },
          success: { label: "成功", class: "black" },
          fail: { label: "失败", class: "black" }
        }
      },
      { prop: "created_at", label: "状态更新时间" }
    ]
  },
  vlan: {
    name: "vlan",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      { prop: "type", label: "类型" },
      { prop: "resource_zone_idName", label: "资源区" },
      { prop: "cmpCreateTime", label: "创建时间", width: "160" },
      {
        prop: "operate",
        label: "操作",
        width: "120",
        operateFun: [
          { label: "编辑", function: "edit", icon: "edit" },
          { label: "删除", function: "del", icon: "delete" }
        ]
      }
    ]
  },
  vlan_range: {
    name: "vlan_range",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      { prop: "range_start", label: "起始VLAN" },
      { prop: "range_end", label: "终止VLAN" },
      { prop: "available_number", label: "可用VLAN个数" },
      {
        prop: "operate",
        label: "操作",
        width: 120,
        operateFun: [
          { label: "编辑", function: "edit", icon: "edit" },
          { label: "删除", function: "del", icon: "delete" }
        ]
      }
    ]
  },
  vlan_segment: {
    name: "vlan_segment",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "range_start", label: "起始VLAN" },
      { prop: "range_end", label: "终止VLAN" },
      { prop: "available_number", label: "可用VLAN个数" }
    ]
  },
  network_layout: {
    name: "network_layout",
    tableConfig: {},
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      { prop: "username", label: "用户名" },
      { prop: "type", label: "类型" },
      { prop: "url", label: "URL" },
      {
        prop: "operate",
        label: "操作",
        operateFun: [
          { label: "编辑", function: "edit", icon: "edit" },
          { label: "删除", function: "del", icon: "delete" }
        ]
      }
    ]
  },
  ali_vpc: {
    name: "阿里云VPC",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      { prop: "vpc_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "vpc_name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      { prop: "cmpTenantName", label: "租户" },
      {
        prop: "environment_name",
        label: "环境",
        "show-overflow-tooltip": true
      },
      { prop: "region_id", label: "地域" },
      {
        prop: "cidr_block",
        label: "网段",
        renderPage: "tag"
      },
      { prop: "cmpCreateTime", label: "创建时间" },
      {
        prop: "operate",
        label: "操作",
        width: "120",
        operateFun: [
          { label: "编辑", function: "edit", icon: "edit" },
          { label: "删除", function: "del", icon: "delete" },
        ]
      }
    ]
  },
  ali_subnet: {
    name: "阿里云子网",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      { prop: "subnet_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "subnet_name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      {
        prop: "cidrBlock",
        label: "网段",
        renderPage: "tag"
      },
      { prop: "vpc_name", label: "VPC", "show-overflow-tooltip": true },
      {
        prop: "environment_name",
        label: "环境",
        "show-overflow-tooltip": true
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "160" },
      {
        prop: "operate",
        label: "操作",
        width: "120",
        operateFun: [
          { label: "编辑", function: "edit", icon: "edit" },
          { label: "删除", function: "del", icon: "delete" },
        ]
      }
    ]
  },
  ali_vpc_subnet: {
    name: "阿里云VPC关联子网",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "subnet_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "subnet_name", label: "名称" },
      {
        prop: "cidrBlock",
        label: "网段",
        renderPage: "tag"
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "160" },
    ]
  },
  region_zone: {
    name: "可用区",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "zone_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "zone_local_name", label: "可用区" },
      //{ prop: "describe", label: "描述" }
    ]
  },
  region_project: {
    name: "关联project",
    tableConfig: {
      setting: false,
      // isPublic: true
    },
    tableColumns: [
      { prop: "id", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "tenantName", label: "所属租户" },
      // {prop: "project", label: "关联业务"},
      //{ prop: "quotamanager", label: "Project配额管理员" },
      {
        prop: "status",
        label: "状态",
        enums: {
          "1": { label: "禁用", type: "danger" },
          "0": { label: "启用", type: "success" }
        }
      },
      { prop: "createTime", label: "创建时间" },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            label: "移除",
            function: "detach",
            opercode: "region_project_detach",
            //isDisplay: "region_project_detach"
            icon: "folder-remove"
          }
        ]
      }
    ]
  },
  region_project_add: {
    name: "添加关联project",
    tableConfig: {
      setting: false,
      isPublic: true,
      // pagination: false
    },
    tableColumns: [
      { type: "selection" },
      { prop: "id", label: "ID", "show-overflow-tooltip": true, width: "50" },
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "tenantName", label: "所属租户", "show-overflow-tooltip": true },
      // {prop: "project", label: "关联业务"},
      //{ prop: "quotamanager", label: "Project配额管理员" },
      {
        prop: "status",
        label: "状态",
        enums: {
          "1": { label: "禁用", type: "danger" },
          "0": { label: "启用", type: "success" }
        }
      },
      { prop: "createTime", label: "创建时间", width: "160" }
    ]
  },
  volume: {
    name: "云硬盘",
    tableConfig: {},
    tableColumns: [
      {
        prop: "volume_name",
        label: "名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      {
        prop: "server_name",
        label: "虚拟机名称",
        width: 140
      },
      {
        prop: "cloud_platform_type",
        label: "虚拟化类型",
        width: "140",
        renderPage: "tag"
      },
      {
        prop: "usage_type",
        label: "用途",
        width: "100",
        renderPage: "usage_type"
      },
      { prop: "volume_size", label: "大小(GB)", width: "100" },
      {
        prop: "volume_type",
        label: "性能等级",
        width: "100",
        enums: {
          "0": { label: "标准盘", class: "" },
          "1": { label: "高速盘", class: "" }
        }
      },
      {
        prop: "state",
        label: "状态",
        width: "100",
        enums: {
          "0": { label: "可用", type: "info", component: 'dot' },
          "1": { label: "已挂载", type: "success", component: 'dot' },
          "2": { label: "错误", type: "danger", component: 'dot' },
          "3": { label: "创建中", type: "warning", component: 'dot' },
          "4": { label: "删除中", type: "warning", component: 'dot' }
        },
        dotEnums: true
      },
      { prop: "region_idName", label: "Region" },
      { prop: "resource_zone_idName", label: "资源区" },
      { prop: "cmpCreateTime", label: "创建时间", width: "150" },
      {
        label: "操作",
        prop: "operate",
        width: "120",
        operateFun: [
          {
            icon: "plus",
            label: "扩容",
            function: "expand",
            isEnabled: row => {
              return row.usage_type === "1" ? false : true;
            }
          },
          {
            icon: "export",
            label: "卸载",
            function: "detach",
            isEnabled: row => {
              return row.usage_type === "1" ? false : true;
            }
          }
        ]
      }
    ]
  },
  float_ip: {
    name: "浮动IP",
    tableConfig: {},
    tableColumns: [
      {
        prop: "uuid",
        label: "ID",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      {
        prop: "resource_zone_idName",
        label: "资源区",
        "show-overflow-tooltip": true
      },
      {
        prop: "floating_ip_type",
        label: "浮动IP类型",
        width: "100",
        enums: {
          Internal: { label: "内网", type: "info" },
          External: { label: "外网", type: "success" }
        }
      },
      { prop: "cmpTenantName", label: "租户" },
      { prop: "cmpUserName", label: "用户" },
      {
        prop: "floating_ip_address",
        label: "浮动IP 地址",
        width: "150",
        renderPage: "tag"
      },
      {
        prop: "status",
        label: "状态",
        enums: {
          ALLOCATED: { label: "已分配", type: "success" },
          ASSOCIATED: { label: "已关联", type: "info" },
          ACTIVE: { label: "ACTIVE", type: "info" },
          ERROR: { label: "错误", type: "danger" }
        },
        width: "100"
      },
      {
        prop: "resource_type",
        label: "绑定资源类型",
        enums: {
          lb: { label: "负载均衡" },
          vm: { label: "虚拟机" },
          baremetal: { label: "baremetal" }
        }
      },
      {
        prop: "resource_id",
        label: "绑定资源ID",
        "show-overflow-tooltip": true
      },
      {
        prop: "fixed_ip_address",
        label: "内网IP地址",
        width: "150",
        isvisible: false,
        renderPage: "tag"
      },
      {
        label: "操作",
        prop: "operate",
        width: "200",
        operateFun: [
          {
            icon: "bind",
            label: "绑定",
            function: "bind",
            opercode: "float_ip_bind",
            // isDisplay: row=>{
            //     return false;
            // },
            isEnabled: row => {
              return row.status == "ALLOCATED" ? true : false;
            }
          },
          {
            icon: "unbind",
            label: "解绑",
            function: "unbind",
            opercode: "float_ip_unbind",
            // isDisplay: row=>{
            //     return false;
            // },
            isEnabled: row => {
              return row.status == "ASSOCIATED" ? true : false;
            }
          },
          {
            icon: "delete",
            label: "删除",
            function: "del",
            // isDisplay: row=>{
            //     return false;
            // },
            opercode: "float_ip_delete"
          }
        ]
      }
    ]
  },
  bucket: {
    name: "对象存储",
    tableConfig: {},
    tableColumns: [
      {
        prop: "bucket_id",
        label: "ID",
        "show-overflow-tooltip": true
      },
      {
        prop: "bucket_name",
        label: "名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "region_idName", label: "Region" },
      { prop: "store_env_name", label: "存储环境" },
      {
        prop: "state",
        label: "状态",
        width: 120,
        // enums: {
        //   active: { label: "可用", type: "success", component: 'dot' },
        //   error: { label: "错误", type: "danger", component: 'dot' },
        //   creating: { label: "创建中", type: "warning", component: 'dot' },
        //   deleting: { label: "删除中", type: "warning", component: 'dot' }
        // },
        dotEnums: true
      },
      { prop: "bucket_capacity", width: 120, label: "容量(GB)" },
      { prop: "object_count", width: 120, label: "最大对象数" },
      { prop: "cmpCreateTime", label: "创建时间", width: 160 },
      {
        label: "操作",
        width: 120,
        prop: "operate",
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
  volume_vm: {
    name: "虚拟机",
    tableConfig: {},
    tableColumns: [
      {
        prop: "uuid",
        label: "虚拟机ID"
      },
      {
        prop: "name",
        label: "虚拟机名称"
      },
      {
        prop: "ip_addr",
        label: "IP地址"
      }
    ]
  },
  volume_task: {
    name: "任务",
    tableConfig: {},
    tableColumns: [
      {
        prop: "uuid",
        label: "ID",
        "show-overflow-tooltip": true
      },
      {
        prop: "description",
        label: "任务描述"
      },
      {
        prop: "status",
        label: "状态",
        enums: {
          available: { label: "可用", class: "green" },
          waiting: { label: "等待中", class: "green" },
          done: { label: "完成", class: "green" },
          doing: { label: "进行中", class: "green" },
          success: { label: "成功", class: "green" },
          failed: { label: "失败", class: "red" }
        }
      },
      { prop: "updateTime", label: "状态更新时间" }
    ]
  },
  volume_attach_vm: {
    name: "虚拟机",
    tableConfig: {},
    tableColumns: [
      { type: "radio" },
      {
        prop: "name",
        label: "主机名称",
      },
      {
        prop: "cloud_platform_type",
        label: "虚拟化类型",
        renderPage: "tag"
        // enums: {
        //     "openstack": { label: "openstack", class: "" },
        //     "vmware": { label: "vmware", class: "" }
        // }
      },
      { prop: "resource_zone_idName", label: "资源区" },
      {
        prop: "ip_addr",
        label: "IP地址"
      },
      { prop: "systemType", label: "系统类型" }
    ]
  },
  aliVolume_attach_aliVm: {
    name: "虚拟机",
    tableConfig: {
      isPublic: true,
      setting: false,
      pagination: false
    },
    tableColumns: [
      { type: "radio" },
      { prop: "instance_name", label: "名称" },
      { prop: "image_id", label: "镜像" },
      { prop: "instance_type", label: "规格" },
      {
        prop: "first_primary_ip_address", label: "IP",
        render(row) {
          return row.listjson_private_ip_address[0]
        }
      },
      {
        prop: "status", label: "状态",
        enums: {
          Running: { label: "运行中", type: "success" },
          Starting: { label: "启动中", type: "warning" },
          Pending: { label: "创建中", type: "warning" },
          Stopping: { label: "停止中", type: "warning" },
          Stopped: { label: "已停止", type: "info" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间" }
    ]
  },
  floatip_bind_vm: {
    name: "虚拟机",
    tableConfig: {},
    tableColumns: [
      { type: "radio" },
      { prop: "name", label: "主机名称" },
      {
        prop: "cloud_platform_type",
        label: "虚拟化类型",
        renderPage: "tag"
        // enums: {
        //     "openstack": { label: "openstack", class: "" },
        //     "vmware": { label: "vmware", class: "" }
        // }
      },
      { prop: "resource_zone_idName", label: "资源区" },
      {
        prop: "ip_addr",
        label: "IP地址",
      }
    ]
  },
  floatip_bind_lb: {
    name: "负载均衡",
    tableConfig: {},
    tableColumns: [
      { type: "radio" },
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "vpc_idName", label: "VPC" },
      {
        prop: "type",
        label: "类型",
        enums: {
          "SDN-NS": { label: "南北向", type: "success" },
          "SDN-EW": { label: "东西向", type: "info" }
        }
      },
      {
        prop: "admin_state_up",
        label: "使能状态",
        enums: {
          "1": { label: "是", class: "" },
          "0": { label: "否", class: "" }
        }
      },
      {
        prop: "provisioning_status",
        label: "下发状态",
        enums: {
          PENDING_CREATE: { label: "PENDING_CREATE", class: "" },
          PENDING_UPDATE: { label: "PENDING_UPDATE", class: "" },
          PENDING_DELETE: { label: "PENDING_DELETE", class: "" },
          ACTIVE: { label: "ACTIVE", class: "" },
          ERROR: { label: "ERROR", class: "" }
        }
      },
      {
        prop: "operating_status",
        label: "运行状态",
        enums: {
          ONLINE: { label: "ONLINE", class: "" },
          OFFLINE: { label: "OFFLINE", class: "" }
        }
      }
    ]
  },
  policy_select_lb: {
    name: "负载均衡",
    tableConfig: {
      setting: false
    },
    tableColumns: [
      { type: "selection" },
      { prop: "name", label: "名称", "show-overflow-tooltip": true },
      { prop: "vpc_idName", label: "VPC" },
      { prop: "vip_address", label: "IP地址" },
      {
        prop: "operating_status",
        label: "运行状态",
        enums: {
          ONLINE: { label: "ONLINE", class: "" },
          OFFLINE: { label: "OFFLINE", class: "" }
        }
      }
    ]
  },
  policy_select_compute: {
    name: "负载均衡",
    tableConfig: {
      setting: false,
      isPublic: true
    },
    tableColumns: [
      { type: "selection" },
      // {
      //     prop: "name", label: "主机名称",
      //     operateFun: {
      //         function: "info"
      //     }, "show-overflow-tooltip": true
      // },
      // {prop: "resource_zone_idName", label: "资源区"},
      { prop: "ip_address", label: "IP地址" }
    ]
  },
  policy_select_subnet: {
    name: "防火墙策略选择子网",
    tableConfig: {
      setting: false
    },
    tableColumns: [
      { type: "selection" },
      {
        prop: "name",
        label: "名称"
      },
      {
        prop: "cidr",
        label: "CIDR"
      }
    ]
  },
  lb_pool: {
    name: "Pool",
    tableConfig: {},
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", operateFun: { function: "poolinfo" } },
      {
        prop: "admin_state_up",
        label: "是否使能",
        enums: {
          "1": { label: "是", type: "success" },
          "0": { label: "否", type: "danger" }
        },
        width: 170
      },
      {
        prop: "lb_algorithm",
        label: "负载均衡算法",
        width: 170,
        enums: {
          ROUND_ROBIN: { label: "轮询", class: "" },
          SOURCE_IP: { label: "权重", class: "" },
          LEAST_CONNECTIONS: { label: "最小连接数", class: "" }
        }
      },
      { prop: "protocol", label: "后端协议类型", width: 170 },
      {
        prop: "operate",
        label: "操作",
        width: 240,
        operateFun: [
          { label: "管理成员", function: "manageMember", icon: "group-ctrl" },
          {
            label: "健康检查",
            function: "healthMonitor",
            icon: "healthycheck"
          },
          { label: "删除", function: "poolDel", icon: "delete" }
        ]
      }
    ]
  },
  lb_listener: {
    name: "Listener",
    tableConfig: {},
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", operateFun: { function: "listenerinfo" } },
      { prop: "connection_limit", label: "最大连接数", width: 140 },
      { prop: "protocol", label: "协议", width: 140 },
      { prop: "protocol_port", label: "端口号", width: 140 },
      { prop: "default_pool_id", label: "关联的POOL" },
      {
        prop: "operate",
        width: 140,
        label: "操作",
        operateFun: [{ label: "删除", function: "listenerDel", icon: "delete" }]
      }
    ]
  },
  lb_member: {
    name: "Member",
    tableConfig: {},
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      { prop: "address", label: "IP", width: 180 },
      { prop: "protocol_port", label: "端口", width: 140 },
      { prop: "weight", label: "权重", width: 140 },
      { prop: "provisioning_status", label: "下发状态", width: 140 },
      { prop: "operating_status", label: "运行状态", width: 140 },
      {
        prop: "operate",
        width: 140,
        label: "操作",
        operateFun: [
          { label: "编辑", function: "edit", icon: "edit" },
          { label: "删除", function: "del", icon: "delete" }
        ]
      }
    ]
  },
  lb_monitor: {
    name: "Monitor",
    tableConfig: {},
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "健康管理名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      { prop: "type", label: "检测类型", width: 140 },
      { prop: "http_method", label: "HTTP方法", width: 140 },
      { prop: "url_path", label: "URL", width: 140 },
      {
        prop: "admin_state_up",
        label: "是否使能",
        enums: {
          "1": { label: "是", type: "success" },
          "0": { label: "否", type: "danger" }
        },
        width: 170
      },
      {
        prop: "operate",
        label: "操作",
        width: 170,
        operateFun: [
          { label: "编辑", function: "edit", icon: "edit" },
          { label: "删除", function: "del", icon: "delete" }
        ]
      }
    ]
  },
  vpc: {
    name: "VPC",
    tableConfig: {},
    tableColumns: [
      {
        prop: "uuid",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "name",
        label: "名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      {
        prop: "alias",
        label: "英文名称"
      },
      {
        prop: "admin_state_up",
        label: "管理状态",
        enums: {
          "0": { label: "禁用", type: "danger" },
          "1": { label: "启用", type: "success" }
        }
      },
      {
        prop: "cmpTenantName",
        label: "租户"
      },
      {
        prop: "cmpProjectName",
        label: "Project"
      },
      {
        prop: "cmpUserName",
        label: "用户"
      },
      {
        prop: "cmpCreateTime",
        label: "创建时间"
      },
      {
        label: "操作",
        prop: "operate",
        width: 250,
        operateFun: [
          {
            icon: "edit",
            label: "编辑",
            function: "edit"
          },
          {
            icon: "enable",
            label: "启用",
            function: "start",
            isEnabled: row => {
              return row.admin_state_up ? false : true;
            }
          },
          {
            icon: "disable",
            label: "禁用",
            function: "ban",
            isEnabled: row => {
              return row.admin_state_up ? true : false;
            }
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
  router: {
    name: "路由器",
    tableConfig: {},
    tableColumns: [
      {
        prop: "uuid",
        label: "ID",
        "show-overflow-tooltip": true
      },
      {
        prop: "name",
        label: "名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      {
        prop: "status",
        label: "状态",
        renderPage: "tag"
      },
      {
        prop: "cmpTenantName",
        label: "租户"
      },
      {
        prop: "cmpProjectName",
        label: "Project"
      },
      {
        prop: "cmpUserName",
        label: "用户"
      },
      {
        prop: "cmpCreateTime",
        label: "创建时间"
      },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "edit",
            label: "编辑",
            function: "editRouter"
          },
          {
            icon: "bind",
            label: "挂载子网",
            function: "attachSubnet"
          },
          {
            icon: "unbind",
            label: "卸载子网",
            function: "detachSubnet"
          },
          {
            icon: "bind",
            label: "创建组网",
            function: "connectRouter"
          },
          {
            icon: "unbind",
            label: "解除组网",
            function: "disconnectRouter"
          },
          {
            icon: "delete",
            label: "删除",
            function: "delRouter"
          }
        ]
      }
    ]
  },
  "router-subnet": {
    name: "子网",
    tableConfig: {},
    tableColumns: [
      { type: "selection" },
      {
        prop: "uuid",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "name",
        label: "名称"
      },
      {
        prop: "cidr",
        label: "CIDR"
      },
      {
        prop: "gateway",
        label: "网关"
      }
    ]
  },
  "router-detail-subnet": {
    name: "子网",
    tableConfig: {},
    tableColumns: [
      {
        prop: "uuid",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "name",
        label: "名称"
      },
      {
        prop: "cidr",
        label: "CIDR"
      },
      {
        prop: "gateway",
        label: "网关"
      }
    ]
  },
  "router-fw": {
    name: "防火墙",
    tableConfig: {},
    tableColumns: [
      { type: "selection" },
      {
        prop: "uuid",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "name",
        label: "名称"
      },
      {
        prop: "role",
        label: "方向"
      }
    ]
  },
  "router-lb": {
    name: "负载均衡",
    tableConfig: {},
    tableColumns: [
      { type: "selection" },
      {
        prop: "uuid",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "name",
        label: "名称"
      },
      {
        prop: "type",
        label: "类型"
      }
    ]
  },
  vm_flavor: {
    name: "阿里云规格",
    tableConfig: {
      isPublic: true,
      setting: false,
      pageSize: 5,
      pageSizes: [5, 10, 20, 30, 50],
    },
    tableColumns: [
      { type: "radio" },
      { prop: "instance_type_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "instance_type_family", label: "规格族" },
      { prop: "cpu_core_count", label: "CPU（核）" },
      { prop: "memory_size", label: "内存（G）" }
    ]
  },
  vm_image: {
    name: "阿里云镜像",
    tableConfig: {
      isPublic: true,
      setting: false,
      pageSize: 5,
      pageSizes: [5, 10, 20, 30, 50],
    },
    tableColumns: [
      { type: "radio" },
      { prop: "image_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "platform", label: "操作系统" },
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
      { prop: "size", label: "大小" },
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
  fw_policy: {
    name: "防火墙策略",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "policy_id", label: "策略ID", width: 60 },
      { prop: "src_zone", label: "源区域", renderPage: "sourceZone" },
      { prop: "src_address", label: "源IP组", renderPage: "sourceIp" },
      { prop: "dst_zone", label: "目的区域", renderPage: "dstZone" },
      { prop: "dst_address", label: "目的IP组", renderPage: "dstIP" },
      { prop: "policy_type", label: "策略类别" },
      {
        prop: "protocol_ports",
        label: "目的端口",
        renderPage: "dstPort",
        width: 120
      },
      {
        label: "操作",
        prop: "operate",
        width: 80,
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
  server_vm_table: {
    tableColumns: [
      { type: "selection" },
      { prop: "name", label: "主机名称" },
      { prop: "resourcegategory", label: "用途" },
      { prop: "service_name", label: "关联服务" },
      { prop: "resource_zone_idName", label: "资源区" },
      {
        prop: "ip_addr",
        label: "IP地址"
      }
    ]
  },
  user_table: {
    tableColumns: [
      { type: "selection" },
      { prop: "username", label: "姓名" },
      { prop: "tenantName", label: "部门" },
      { prop: "email", label: "邮箱" }
    ]
  },
  border_gateway: {
    name: "边界网关",
    tableConfig: {
      pagination: false
    },
    tableColumns: [
      {
        prop: "nsp_border_gateway_id",
        label: "ID",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "name", label: "名称" },
      { prop: "resource_zone_idName", label: "资源区" },
      {
        prop: "status",
        label: "状态",
        enums: {
          ACTIVE: { label: "正常", type: "success", component: "dot" },
          ERROR: { label: "异常", type: "danger", component: "dot" },
          PENDING_CREATE: { label: "创建中", type: "warning", component: "dot" }
        }
      },
      { prop: "down_link", label: "下行链路", renderPage: "tag" },
      { prop: "created_at", label: "创建时间" }
    ]
  },
  container_cluster: {
    name: "容器集群",
    tableConfig: {
      pagination: false
    },
    tableColumns: [
      {
        prop: "uuid",
        label: "资源号(ID)",
        "show-overflow-tooltip": true
      },
      {
        prop: "name", label: "集群名称", operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "clusterType", label: "集群类型", width: 80 },
      { prop: "clusterUrl", label: "集群URL" },
      { prop: "clusterPartitionName", label: "集群partition名称" },
      { prop: "useCategery", label: "用途", renderPage: "useCategery" },
      { prop: "regionIdName", label: "Region" },
      { prop: "clusterVersion", label: "版本", width: 80 },
      { prop: "businessGroupIdName", label: "所在容器业务群组" },
      {
        prop: "cmpStatus", label: "状态", width: 80, renderPage: "status"
      },
      {
        prop: "cmpCreateTime", label: "创建时间", width: 135
      },
      {
        label: "操作",
        prop: "operate",
        width: 260,
        operateFun: [
          {
            icon: "delete",
            label: "节点删除",
            function: "nodeDel",
            isEnabled: row => {
              return row.cmpStatus != 3;
            },
          },
          {
            icon: "top",
            label: "集群扩容",
            function: "expand",
            isEnabled: row => {
              return row.cmpStatus != 3;
            },
          },
          {
            icon: "bottom",
            label: "集群下线",
            function: "offLine",
            isEnabled: row => {
              return row.cmpStatus != 3;
            },
          }
        ]
      }
    ]
  },
  container_machine: {
    name: "容器节点机器",
    tableColumns: [
      {
        prop: "nodeRole",
        label: "节点角色"
      },
      {
        prop: "nodeType",
        label: "机器类型"
      },
      {
        prop: "machineId",
        label: "机器ID"
      },
      {
        prop: "machineName",
        label: "机器名称"
      },
      {
        prop: "machineIP",
        label: "IP"
      },
      {
        prop: "cmpCreateTime", label: "创建时间"
      },
    ]
  },
  container_cluster_vm: {
    name: "容器集群虚拟机节点",
    tableColumns: [
      {
        prop: "node_role",
        label: "节点角色"
      },
      {
        prop: "resource_zone_name",
        label: "资源区"
      },
      {
        prop: "resource_pool_name",
        label: "资源池"
      },
      {
        prop: "subnet_name",
        label: "子网"
      },
      {
        prop: "flavor_name",
        label: "规格"
      },
      {
        prop: "image_name",
        label: "镜像"
      },
      {
        prop: "filesystem",
        label: "文件系统",
        renderPage: "filesystem"
      },
      {
        label: "操作",
        prop: "operate",
        width: 100,
        operateFun: [
          {
            icon: "folder-remove",
            label: "移除",
            function: "removeVm"
          }
        ]
      }
    ]
  },
  container_cluster_physical: {
    name: "容器集群物理机节点",
    tableColumns: [
      {
        prop: "node_role",
        label: "节点角色"
      },
      {
        prop: "resource_zone_name",
        label: "资源区"
      },
      {
        prop: "resource_pool_name",
        label: "资源池"
      },
      {
        prop: "host_name",
        label: "物理机名称",
      },
      // {
      //   prop: "flavor",
      //   label: "规格",
      //   renderPage: "flavorTag"
      // },
      {
        prop: "image_idName",
        label: "镜像",
        "show-overflow-tooltip": true
      },
      {
        prop: "ip_address",
        label: "IP地址",
        width: 150,
        renderPage: "tag"
      },
      {
        label: "操作",
        prop: "operate",
        width: 100,
        operateFun: [
          {
            icon: "folder-remove",
            label: "移除",
            function: "removePhysical"
          }
        ]
      }
    ]
  },
  container_node: {
    name: "集群节点",
    tableConfig: {
      setting: false,
      pageSize: 5,
      pageSizes: [5, 10, 20, 30, 50]
    },
    tableColumns: [
      { type: "radio" },
      { label: "角色", prop: "nodeRole" },
      { label: "集群名称", prop: "clusterIdName" },
      { label: "虚拟机名称", prop: "vmIdName" },
      { label: "创建者", prop: "cmpUserName" },
      { label: "创建时间", prop: "cmpCreateTime" }
    ]
  },
  container_image: {
    name: "容器镜像",
    tableConfig: {
      pagination: false
    },
    tableColumns: [
      {
        prop: "name",
        label: "Harbor集群名称"
      },
      { prop: "harborActive", label: "Harbor主节点" },
      { prop: "harborStandby", label: "Harbor备节点" },
      { prop: "harborVip", label: "Harbor服务VIP" },
      { prop: "useCategery", label: "用途", renderPage: "useCategery" },
      { prop: "harborDomain", label: "Harbor域名" },
      { prop: "harborTotalResource", label: "Harbor总共存储资源(GB)" },
      { prop: "harborVersion", label: "Harbor当前版本" },
      {
        label: "操作",
        prop: "operate",
        width: 130,
        operateFun: [
          {
            icon: "key",
            label: "更改密码",
            function: "edit"
          },
          // {
          //   icon: "delete",
          //   label: "删除",
          //   function: "del"
          // }
        ]
      }
    ]
  },
  container_tap_user: {
    name: "TAP 用户",
    tableConfig: {
      pagination: false
    },
    tableColumns: [
      {
        prop: "uuid",
        label: "资源号(ID)", "show-overflow-tooltip": true
      },
      { prop: "accountName", label: "用户名称" },
      { prop: "cmpProjectName", label: "所属Project" },
      { prop: "role", label: "角色", renderPage: "role" },
      {
        label: "操作",
        prop: "operate",
        width: 140,
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
  container_real_pv_storage: {
    name: "底层PV存储",
    tableColumns: [
      {
        prop: "uuid",
        label: "资源号(ID)", "show-overflow-tooltip": true
      },
      { prop: "pvName", label: "PV名称" },
      { prop: "useCategery", label: "用途", width: 100 },
      { prop: "connectType", label: "连接类型", width: 100 },
      { prop: "storageType", label: "存储类型", width: 100 },
      { prop: "size", label: "容量大小(G)", width: 100 },
      { prop: "containerPvName", label: "容器PV名称" },
      { prop: "resGroupIdName", label: "容器资源分组" },
      { prop: "storageStatus", label: "状态", renderPage: "tag", width: 100 },
      { prop: "cmpCreateTime", label: "创建时间", width: 180 }
    ]
  },
  container_pv_storage: {
    name: "PV 存储",
    tableConfig: {
      pagination: false
    },
    tableColumns: [
      {
        prop: "uuid",
        label: "资源号(ID)", "show-overflow-tooltip": true
      },
      { prop: "name", label: "存储名称" },
      { prop: "useCategery", label: "用途", width: 100 },
      { prop: "regionIdName", label: "存储地点(Region)" },
      { prop: "storageType", label: "存储类型", width: 100, renderPage: "storageType" },
      { prop: "size", label: "容量大小(G)", width: 100 },
      { prop: "realPvIdName", label: "PV名称" },
      { prop: "connectStr", label: "连接串" },
      { prop: "pvClusterName", label: "集群" },
      { prop: "resGroupIdName", label: "容器资源分组" },
      { prop: "cmpCreateTime", label: "创建时间", width: 180 },
      {
        label: "操作",
        prop: "operate",
        width: 120,
        operateFun: [
          {
            icon: "",
            label: "下线",
            function: "offline"
          },
          {
            icon: "",
            label: "编辑",
            function: "edit"
          }
        ]
      }
    ]
  },
  container_tenant_image: {
    name: "租户镜像仓库",
    tableConfig: {
      pagination: false
    },
    tableColumns: [
      {
        prop: "uuid",
        label: "资源号(ID)", "show-overflow-tooltip": true
      },
      {
        prop: "name",
        label: "名称"
      },
      { prop: "cmpProjectName", label: "所属Project" },
      { prop: "useCategery", label: "用途", width: 124, renderPage: "useCategery" },
      { prop: "storageSize", label: "存储空间(G)", width: 120 },
      { prop: "userType", label: "用户类型", width: 120 },
      { prop: "status", label: "状态", width: 120 },
      {
        label: "操作",
        prop: "operate",
        width: 140,
        operateFun: [
          {
            icon: "",
            label: "扩容",
            function: "expand"
          },
          {
            icon: "",
            label: "下线",
            function: "offline"
          }
        ]
      }
    ]
  },
  vm: {
    name: "虚拟机",
    tableColumns: [
      { prop: "name", label: "主机名称" },
      { prop: "cmpProjectName", label: "Project" },
      { prop: "resourcegategory", label: "用途" },
      {
        prop: "cloud_platform_type",
        label: "虚拟化类型",
        renderPage: "cloud_platform_type"
      },
      { prop: "service_name", label: "关联服务" },
      { prop: "region_idName", label: "Region" },
      { prop: "ip_addr", label: "IP地址" },
      { prop: "status", label: "状态", renderPage: "status" },
      { prop: "cmpCreateTime", label: "创建时间" }
    ]
  },
  external_network_domain: {
    name: "外部网络域",
    tableConfig: {},
    tableColumns: [
      {
        prop: "uuid",
        label: "ID",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "name", label: "名称" },
      { prop: "addresses", label: "网段", width: "150", renderPage: "addresses" },
      {
        prop: "border_gateways",
        label: "边界网关",
        renderPage: "tagBg",
        "show-overflow-tooltip": true
      },
      { prop: "description", label: "描述" },
      { prop: "created_at", label: "创建时间", width: 160 },
      {
        label: "操作",
        prop: "operate",
        width: "150",
        operateFun: [
          {
            icon: "edit",
            label: "编辑",
            function: "edit"
            // isDisplay: row=>{
            //     return false;
            // },
          },
          {
            icon: "delete",
            label: "删除",
            function: "del"
            // isDisplay: row=>{
            //     return false;
            // },
          }
        ]
      }
    ]
  },
  external_net_domain_bg: {
    name: "边界网关",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      { type: "selection" },
      { prop: "name", label: "名称" },
      { prop: "resource_zone_idName", label: "资源区" },
      {
        prop: "status",
        label: "状态",
        enums: {
          ACTIVE: { label: "正常", type: "success" },
          ERROR: { label: "异常", type: "danger" },
          PENDING_CREATE: { label: "创建中", type: "warning" }
        }
      },
      { prop: "down_link", label: "下行链路", renderPage: "tag" }
    ]
  },
  business_chain: {
    name: "业务链",
    tableConfig: {},
    tableColumns: [
      {
        prop: "uuid",
        label: "ID",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "name", label: "名称" },
      {
        prop: "status",
        label: "状态",
        width: "100",
        renderPage: "tag"
        // enums: {
        //     "ACTIVE": {label: "正常", type: "success"},
        //     "ERROR": {label: "异常", type: "danger"},
        //     "PENDING_CREATE": {label: "创建中", type: "warning"},
        //"PENDING_UPDATE": {label: "更新中", type: "warning"},
        //"PENDING_DELETE": {label: "删除中", type: "warning"},
        // }
      },
      { prop: "vpc_idName", label: "VPC" },
      //{prop: "src", label: "SRC",  renderPage: "tagBg", 'show-overflow-tooltip': true},
      { prop: "dstName", label: "外部网络域", "show-overflow-tooltip": true },
      { prop: "description", label: "描述" },
      { prop: "cmpCreateTime", label: "创建时间", width: 160 },
      {
        label: "操作",
        prop: "operate",
        width: "200",
        operateFun: [
          {
            icon: "edit",
            label: "编辑",
            function: "edit",
            // isDisplay: row=>{
            //     return false;
            // },
            isEnabled: row => {
              return row.status === "ACTIVE" ? true : false;
            }
          },
          {
            icon: "delete",
            label: "删除",
            function: "del",
            // isDisplay: row=>{
            //     return false;
            // },
            isEnabled: row => {
              return row.status === "ACTIVE" || row.status === "ERROR"
                ? true
                : false;
            }
          },
          {
            icon: "refresh",
            label: "重建",
            function: "reload",
            // isDisplay: row=>{
            //     return false;
            // },
            isEnabled: row => {
              return row.status === "ACTIVE" || row.status === "ERROR"
                ? true
                : false;
            }
          }
        ]
      }
    ]
  },
  business_chain_subnet: {
    name: "子网",
    tableConfig: {
      setting: false,
      pageSize: 5,
      pageSizes: [5, 10, 20, 30, 50]
    },
    tableColumns: [
      { type: "selection" },
      {
        prop: "uuid",
        label: "ID", "show-overflow-tooltip": true
      },
      { prop: "name", label: "名称" },
      {
        prop: "status",
        label: "状态",
        width: "100",
        enums: {
          ACTIVE: { label: "正常", type: "success" },
          ERROR: { label: "异常", type: "danger" },
          PENDING_CREATE: { label: "创建中", type: "warning" }
        }
      },
      { prop: "ip_subnetpool_id", label: "云主机IP地址池" },
      { prop: "ip_version", label: "IP段" },
      { prop: "prefixlen", label: "前缀长度" },
      { prop: "cidr", label: "CIDR" }
    ]
  },
  business_chain_lb: {
    name: "负载均衡",
    tableConfig: {
      setting: false,
      pageSize: 5,
      pageSizes: [5, 10, 20, 30, 50]
    },
    tableColumns: [
      { type: "selection" },
      {
        prop: "uuid",
        label: "ID", "show-overflow-tooltip": true
      },
      { prop: "name", label: "名称" },
      {
        prop: "type",
        label: "类型",
        width: "100",
        enums: {
          "SDN-NS": { label: "南北向", type: "success" },
          "SDN-EW": { label: "东西向", type: "info" }
        }
      }
    ]
  },
  container_group: {
    name: "K8S容器资源分组",
    tableConfig: {
      pagination: false
    },
    tableColumns: [
      {
        prop: "name",
        label: "业务分组名称",
        operateFun: {
          function: "detail"
        }
      },
      { prop: "cmpProjectName", label: "所属Project" },
      {
        prop: "useCategery",
        label: "用途",
        renderPage: "useCategery",
        // width:80
      },
      {
        prop: "doubleLive",
        label: "是否双活",
        enums: {
          "1": { label: "是", type: "success" },
          "0": { label: "否", type: "warning" }
        },
        // width:80

      },
      {
        prop: "cmpCreateTime",
        label: "创建时间",
      },

      {
        label: "操作",
        prop: "operate",
        width: 120,
        operateFun: [
          {
            icon: "top",
            label: "扩容",
            function: "capacity"
          },
          {
            icon: "bottom",
            label: "下线",
            function: "offline"
          },
        ]
      }
    ]
  },
  security_group: {
    name: "安全组",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      {
        prop: "security_group_id",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "security_group_name",
        label: "名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "environment_name", label: "环境" },
      { prop: "region_local_name", label: "地域" },
      { prop: "cmpTenantName", label: "租户" },
      { prop: "vpc_id", label: "VPC" },
      {
        prop: "service_managed", label: "相关实例",
        render(row) {
          return row.instances && row.instances.map(item => item.instance_name).toString();
        }
      },
      { prop: "cmpCreateTime", label: "创建时间" },
      { prop: "description", label: "描述" },
      {
        label: "操作",
        prop: "operate",
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
  ali_vpc_security_group: {
    name: "阿里云VPC关联安全组",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      {
        prop: "security_group_id",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "security_group_name",
        label: "名称",
      },
      { prop: "service_managed", label: "相关实例" },
      { prop: "cmpCreateTime", label: "创建时间" },
    ]
  },
  tencent_vpc_security_group: {
    name: "腾讯云VPC关联安全组",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      {
        prop: "security_group_id",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "security_group_name",
        label: "名称",
      },
      { prop: "service_managed", label: "相关实例" },
      { prop: "cmpCreateTime", label: "创建时间" },
    ]
  },
  huawei_vpc_security_group: {
    name: "华为云VPC关联安全组",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      {
        prop: "security_group_id",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "security_group_name",
        label: "名称",
      },
      { prop: "service_managed", label: "相关实例" },
      { prop: "cmpCreateTime", label: "创建时间" },
    ]
  },
  elastic_public_ip: {
    name: "阿里云公网IP",
    tableConfig: {
      isPublic: true
    },
    bindTableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      {
        prop: "eip_address_id",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "name",
        label: "名称",
      },
      { prop: "environment_name", label: "环境" },
      { prop: "region_local_name", label: "地域" },
      { prop: "cmpTenantName", label: "租户" },
      { prop: "ip_address", label: "IP" },
      { prop: "bandwidth", label: "带宽(Mbps)" },
      {
        prop: "charge_type", label: "付费类型",
        enums: {
          PrePaid: { label: "包年包月" },
          PostPaid: { label: "按量计费" },
        }
      },
      {
        prop: "internet_charge_type", label: "计费模式",
        enums: {
          PayByBandwidth: { label: "宽带" },
          PayByTraffic: { label: "流量" },
        }
      },
      { prop: "expired_time", label: "到期时间" },
      {
        prop: "status", label: "状态",
        enums: {
          "Available": { label: "可用", type: "success" },
          "InUse": { label: "已分配", type: "info" },
          "Associating": { label: "绑定中", type: "success" },
          "Unassociating": { label: "解绑中", type: "success" },
        }
      },
      { prop: "instance_id", label: "绑定实例ID" },
      {
        label: "操作",
        prop: "operate",
        width: 150,
        operateFun: [
          {
            icon: "bind",
            label: "绑定",
            function: "bind",
            isDisplay: row => {
              return !row.instance_id;
            }
          },
          {
            icon: "unbind",
            label: "解绑",
            function: "unbind",
            isDisplay: row => {
              return row.instance_id;
            }
          },
          {
            icon: "del",
            label: "删除",
            function: "del"
          }
        ]
      }
    ],
    bindTableColumns: [
      { type: "radio" },
      {
        prop: "uuid",
        label: "ID", "show-overflow-tooltip": true
      },
      { prop: "instance_name", label: "名称" },
      { prop: "vpc_id", label: "VPC" },
      {
        prop: "isp", label: "IP",
        render(row) {
          return row.listjson_private_ip_address && row.listjson_private_ip_address[0];
        }
      },
      {
        prop: "status", label: "状态",
        enums: {
          Running: { label: "运行中", type: "success" },
          Starting: { label: "启动中", type: "warning" },
          Pending: { label: "创建中", type: "warning" },
          Stopping: { label: "停止中", type: "warning" },
          Stopped: { label: "已停止", type: "info" }
        },
      }
    ]
  },
  tencent_elastic_public_ip: {
    name: "腾讯云公网IP",
    tableConfig: {
      isPublic: true
    },
    bindTableConfig: {
      setting: false
    },
    tableColumns: [
      {
        prop: "address_id",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "address_name",
        label: "名称",
      },
      { prop: "environment_name", label: "环境" },
      { prop: "region_local_name", label: "地域" },
      { prop: "cmpProjectName", label: "Project" },
      { prop: "cmpTenantName", label: "租户" },
      { prop: "address_ip", label: "IP" },
      { prop: "bandwidth", label: "带宽(Mbps)" },
      {
        prop: "internet_charge_type", label: "计费模式",
        enums: {
          BANDWIDTH_POSTPAID_BY_HOUR: { label: "按小时带宽" },
          TRAFFIC_POSTPAID_BY_HOUR: { label: "按小时流量" },
          BANDWIDTH_PREPAID_BY_MONTH: { label: "包月带宽" },
        }
      },
      {
        prop: "address_status", label: "状态",
        enums: {
          "BIND": { label: "已绑定", type: "success" },
          "UNBIND": { label: "已解绑", type: "info" },
          "CREATING": { label: "创建中", type: "primary" },
          "BINDING": { label: "绑定中", type: "primary" },
          "UNBINDING": { label: "解绑中", type: "primary" },
          "OFFLINING": { label: "释放中", type: "primary" },
          "BIND_ENI": { label: "绑定悬空弹性网卡", type: "primary" },
        }
      },
      { prop: "instance_name", label: "绑定实例名称" },
      {
        label: "操作",
        prop: "operate",
        width: 150,
        operateFun: [
          {
            icon: "bind",
            label: "绑定",
            function: "bind",
            isDisplay: row => {
              return !row.instance_name;
            }
          },
          {
            icon: "unbind",
            label: "解绑",
            function: "unbind",
            isDisplay: row => {
              return row.instance_name;
            }
          },
          {
            icon: "del",
            label: "删除",
            function: "del"
          }
        ]
      }
    ],
    bindTableColumns: [
      { type: "radio" },
      {
        prop: "instance_id",
        label: "ID", "show-overflow-tooltip": true
      },
      { prop: "instance_name", label: "名称" },
      { prop: "virtual_private_cloud_vpc_id", label: "VPC" },
      {
        prop: "virtual_private_cloud_private_ip_addresses", label: "IP",
        render(row) {
          return `${row.virtual_private_cloud_private_ip_addresses}(私)${row.json_public_ip_addresses ? `,${row.json_public_ip_addresses}(公)` : ""}`;
        }
      },
      { prop: "instance_state", label: "状态" }
    ]
  },
  huawei_elastic_public_ip: {
    name: "华为云公网IP",
    tableConfig: {
      isPublic: true
    },
    bindTableConfig: {
      setting: false
    },
    tableColumns: [
      {
        prop: "uuid",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "bandwidth_name",
        label: "名称",
      },
      { prop: "environment_name", label: "环境" },
      { prop: "region_local_name", label: "地域" },
      { prop: "cmpProjectName", label: "Project" },
      { prop: "cmpTenantName", label: "租户" },
      { prop: "public_ip_address", label: "IP" },
      {
        prop: "bandwidth_size", label: "带宽(Mbps)",
      },
      {
        prop: "profile", label: "付费类型",
        render(row) {
          return row.profile ? "包年包月" : "按量计费";
        }
      },
      {
        prop: "charge_mode", label: "计费模式",
        render(row) {
          return row.charge_mode === "bandwidth" ? "带宽" : "流量";
        },
      },
      {
        prop: "status", label: "状态",
        enums: {
          "FREEZED": { label: "冻结", type: "success" },
          "BIND_ERROR": { label: "绑定失败", type: "success" },
          "BINDING": { label: "绑定中", type: "success" },
          "PENDING_DELETE": { label: "释放中", type: "success" },
          "PENDING_CREATE": { label: "创建中", type: "success" },
          "PENDING_UPDATE": { label: "更新中", type: "success" },
          "DOWN": { label: "未绑定", type: "info" },
          "ACTIVE": { label: "绑定", type: "success" },
          "ELB": { label: "绑定ELB", type: "success" },
          "ERROR": { label: "异常失败", type: "success" },
        }
      },
      {
        prop: "type", label: "类型",
        enums: {
          "5_telcom": { label: "电信" },
          "5_union": { label: "联通" },
          "5_bgp": { label: "全动态BGP" },
          "5_sbgp": { label: "静态BGP" },
        }
      },
      { prop: "instance_name", label: "绑定实例名称" },
      {
        label: "操作",
        prop: "operate",
        width: 150,
        operateFun: [
          {
            icon: "bind",
            label: "绑定",
            function: "bind",
            isDisplay: row => {
              return !row.instance_name;
            }
          },
          {
            icon: "unbind",
            label: "解绑",
            function: "unbind",
            isDisplay: row => {
              return row.instance_name;
            }
          },
          {
            icon: "del",
            label: "删除",
            function: "del"
          }
        ]
      }
    ],
    bindTableColumns: [
      { type: "radio" },
      { prop: "name", label: "名称" },
      { prop: "metadata_vpc_id", label: "VPC" },
      { prop: "address_first_addr", label: "IP" },
      { prop: "status", label: "状态" }
    ]
  },
  load_balance: {
    name: "负载均衡",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      { prop: "uuid", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "load_balancer_name",
        label: "名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "environment_name", label: "环境" },
      { prop: "region_local_name", label: "地域" },
      {
        prop: "instance_charge_type", label: "付费模式",
        render(row) {
          if (row.load_balancer_attribute && row.load_balancer_attribute.pay_type) {
            return row.load_balancer_attribute.pay_type == 'PayOnDemand' ? '按量付费' : '预付费';
          } else {
            return '-'
          }
        }
      },
      { prop: "address", label: "IP", renderPage: "iptag", width: 150 },
      { prop: "vpc_id", label: "VPC ID" },
      { prop: "subnet_id", label: "子网 ID" },
      {
        prop: "load_balancer_attribute", label: "状态", renderPage: "statustag"
      },
      {
        prop: "load_balancer_attribute", label: "协议和端口", renderPage: "renderProtocal",
      },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "edit",
            label: "编辑",
            function: "edit"
          },
          {
            icon: "del",
            label: "删除",
            function: "del",
            isEnabled: row => {
              if (row.load_balancer_attribute && row.load_balancer_attribute.pay_type) {
                return row.load_balancer_attribute.pay_type === "PrePay" ? false : true;
              } else {
                return true;
              }
            }
          }
        ]
      }
    ]
  },
  load_balance_listener: {
    name: "负载均衡监听器",
    tableConfig: {
      pagination: false,
      // setting: false
    },
    tableColumns: [
      {
        prop: "description", label: "名称",
        operateFun: {
          function: "listenerInfo"
        }
      },
      {
        prop: "listener_port", label: "协议和端口",
        inputPopover: "后端协议 端口为-：该监听使用了虚拟服务器组，后端端口为服务器组中的端口",
        render(row) {
          if (row.listener_protocal && row.backend_protocol) {
            return `<div>
              <span style="display: block">前端协议：${row.listener_protocal.toUpperCase()}：${row.listener_port}</span>
              <span style="display: block">后端协议：${row.backend_protocol.toUpperCase()}：${row.backend_server_port ? row.backend_server_port : `-`}</span>
            </div>`;
          }
        }
      },
      {
        prop: "status", label: "状态", width: 100,
        enums: {
          "stopped": { label: "已停止", type: "danger" },
          "running": { label: "运行中", type: "success" },
        }
      },
      {
        prop: "health_check", label: "健康检查状态",
        render(row) {
          return row.health_check == 'off' ? '未开启' : '-';
        }
      },
      {
        prop: "ip", label: "服务器组",
        render(row) {
          return row.v_server_group_id ? `【虚拟】${row.v_server_group_name}` : '默认服务器组';
        }
      },
      {
        label: "操作",
        prop: "operate",
        width: 260,
        operateFun: [
          // {
          //   icon: "edit",
          //   label: "修改",
          //   function: "edit"
          // },
          {
            icon: "switch-button",
            label: "启动",
            function: "start",
            isEnabled: row => {
              return row.status == "stopped" ? true : false;
            }
          },
          {
            icon: "video-pause",
            label: "停止",
            function: "stop",
            isEnabled: row => {
              return row.status == "running" ? true : false;
            }
          },
          {
            icon: "transpond",
            label: "配置转发策略",
            function: "transpond",
            isEnabled: row => {
              return (row.listener_protocal == "http" || row.listener_protocal == "https") ? true : false;
            }
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
  load_balance_virtualServers: {
    name: "负载均衡虚拟服务器组",
    tableConfig: {
      pagination: false,
      // setting: false
    },
    tableColumns: [
      { prop: "vserverGroupId", label: "ID", "show-overflow-tooltip": true },
      {
        prop: "vserverGroupName",
        label: "名称",
        operateFun: {
          function: "virtualInfo"
        }
      },
      {
        prop: "includeListener", label: "关联监听",
        render(row) {
          if (row.associatedObjects.listeners.length) {
            let str = '';
            row.associatedObjects.listeners.forEach(item => {
              if (item.bizProtocol) {
                str += `<span style="display: block">${item.bizProtocol.toUpperCase() + '：' + item.port}</span>`;
              }
            })
            return str;
          }
        }
      },
      { prop: "associatedObjects", label: "关联转发策略", renderPage: "renderRule" },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "edit",
            label: "编辑",
            function: "editVirtual"
          },
          {
            icon: "del",
            label: "删除",
            function: "delVirtual",
            isEnabled: row => {
              return (row.associatedObjects.rules.length || row.associatedObjects.listeners.length) ? false : true;
            }
          }
        ]
      }
    ]
  },
  virtual_servers_detail: {
    name: "虚拟服务器组详情",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      { prop: "server_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "instanceName", label: "名称" },
      // { prop: "serverRegionId", label: "地域" },
      { prop: "vpc_id", label: "VPC" },
      { prop: "server_ip", label: "IP", renderPage: "iptag", width: 150 },
      {
        prop: "status",
        label: "状态",
        enums: {
          Running: { label: "运行中", type: "success" },
          Starting: { label: "启动中", type: "warning" },
          Pending: { label: "创建中", type: "warning" },
          Stopping: { label: "停止中", type: "warning" },
          Stopped: { label: "已停止", type: "info" }
        },
        width: 120
      },
      { prop: "port", label: "端口" },
      { prop: "weight", label: "权重" },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "del",
            label: "删除",
            function: "del"
          }
        ]
      }
    ]
  },
  virtual_servers_add: {
    name: "虚拟服务器组详情添加",
    tableConfig: {
      setting: false
    },
    tableColumns: [
      { type: "selection" },
      { prop: "instance_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "instance_name", label: "名称" },
      { prop: "region_id", label: "地域" },
      { prop: "vpc_id", label: "VPC" },
      {
        prop: "first_primary_ip_address", label: "IP地址",
        render(row) {
          return `${row.listjson_private_ip_address && row.listjson_private_ip_address[0]}(私网)${row.eip_ip_address ? `,${row.eip_ip_address}(公网)` : ""}`;
        }
      },
      {
        prop: "status",
        label: "状态",
        enums: {
          Running: { label: "运行中", type: "success" },
          Starting: { label: "启动中", type: "warning" },
          Pending: { label: "创建中", type: "warning" },
          Stopping: { label: "停止中", type: "warning" },
          Stopped: { label: "已停止", type: "info" }
        },
        width: 120
      },
      {
        prop: "port_weight", label: "端口和权重", width: 250,
        renderInput: "inputWeight",
        inputPopover: "请按格式输入：“端口1,权重1”为一组，以“,”分隔，多组以“;”分隔，分隔符均为英文字符（其中端口取值范围为1-65535，权重取值范围为0-100）。"
      },
    ]
  },
  load_balance_defaultServers: {
    name: "负载均衡默认服务器组",
    tableConfig: {
      pagination: false,
      // setting: false
    },
    tableColumns: [
      { prop: "server_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "instance_name", label: "名称" },
      { prop: "vpc_id", label: "VPC" },
      { prop: "server_ip", label: "IP", renderPage: "iptag", width: 150 },
      {
        prop: "status",
        label: "状态",
        enums: {
          Running: { label: "运行中", type: "success" },
          Starting: { label: "启动中", type: "warning" },
          Pending: { label: "创建中", type: "warning" },
          Stopping: { label: "停止中", type: "warning" },
          Stopped: { label: "已停止", type: "info" }
        },
        width: 120
      },
      { prop: "weight", label: "权重" },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "del",
            label: "删除",
            function: "delDefault"
          }
        ]
      }
    ]
  },
  load_balance_defaultServers_add: {
    name: "添加默认服务器组",
    tableConfig: {
      setting: false
    },
    tableColumns: [
      { type: "selection" },
      { prop: "instance_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "instance_name", label: "名称" },
      { prop: "region_id", label: "地域" },
      { prop: "vpc_id", label: "VPC" },
      {
        prop: "first_primary_ip_address", label: "IP地址",
        render(row) {
          return `${row.listjson_private_ip_address && row.listjson_private_ip_address[0]}(私网)${row.eip_ip_address ? `,${row.eip_ip_address}(公网)` : ""}`;
        }
      },
      {
        prop: "status",
        label: "状态",
        enums: {
          Running: { label: "运行中", type: "success" },
          Starting: { label: "启动中", type: "warning" },
          Pending: { label: "创建中", type: "warning" },
          Stopping: { label: "停止中", type: "warning" },
          Stopped: { label: "已停止", type: "info" }
        },
        width: 120
      },
      {
        prop: "weight", label: "权重", width: 150, renderInput: "inputWeight",
        inputPopover: "权重取值范围：1-100"
      },
    ]
  },
  detail_defaultServers: {
    name: "选择默认服务器组",
    tableConfig: {
      pagination: false,
      // setting: false
    },
    tableColumns: [
      { type: "radio" },
      { prop: "server_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "instance_name", label: "名称" },
      { prop: "vpc_id", label: "VPC" },
      { prop: "server_ip", label: "IP", renderPage: "iptag", width: 150 },
    ]
  },
  forward_strategy: {
    name: "配置转发策略",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      { prop: "ruleName", label: "名称" },
      { prop: "domain", label: "域名" },
      { prop: "url", label: "URL" },
      { prop: "vserverGroupId", label: "虚拟服务器组" },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "del",
            label: "删除",
            function: "del"
          }
        ]
      }
    ]
  },
  security_group_ingress: {
    name: "security_group_ingress",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      {
        prop: "policy", label: "授权策略",
        enums: {
          "Accept": { label: "允许" },
          "Drop": { label: "拒绝" },
        }
      },
      { prop: "priority", label: "优先级" },
      { prop: "ipProtocol", label: "协议类型" },
      { prop: "portRange", label: "端口范围" },
      { prop: "sourceCidrIp", label: "授权对象" },
      { prop: "description", label: "描述" },
      {
        prop: "createTime", label: "创建时间",
        render(row) {
          return row.createTime && moment(row.createTime).format("YYYY-MM-DD HH:mm:ss")
        }
      },
      {
        label: "操作",
        prop: "operate",
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
  security_group_egress: {
    name: "security_group_egress",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      {
        prop: "policy", label: "授权策略",
        enums: {
          "Accept": { label: "允许" },
          "Drop": { label: "拒绝" },
        }
      },
      { prop: "priority", label: "优先级", "show-overflow-tooltip": true },
      { prop: "ipProtocol", label: "协议类型" },
      { prop: "portRange", label: "端口范围" },
      { prop: "destCidrIp", label: "授权对象" },
      { prop: "description", label: "描述" },
      { prop: "createTime", label: "创建时间" },
      {
        label: "操作",
        prop: "operate",
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
  security_group_associate: {
    name: "security_group_associate",
    tableConfig: {
      pagination: false,
      setting: false
    },
    tableColumns: [
      { prop: "instance_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "instance_name", label: "名称", "show-overflow-tooltip": true },
      { prop: "zone_id", label: "可用区" },
      { prop: "description", label: "描述" },
    ]
  },
  server_certificate: {
    name: "服务器证书",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      {
        prop: "resource_group_id",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "server_certificate_name", label: "名称"
      },
      { prop: "environment_name", label: "环境" },
      { prop: "region_local_name", label: "地域" },
      { prop: "cmpTenantName", label: "租户" },
      { prop: "cmpCreateTime", label: "创建时间" },
      {
        prop: "expire_time", label: "过期时间"
      },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "del",
            label: "删除",
            function: "del"
          }
        ]
      }
    ]
  },
  ca_certificate: {
    name: "CA证书",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      {
        prop: "uuid",
        label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "c_a_certificate_name", label: "名称",
      },
      { prop: "environment_name", label: "环境" },
      { prop: "region_local_name", label: "地域" },
      { prop: "cmpTenantName", label: "租户" },
      { prop: "cmpCreateTime", label: "创建时间" },
      {
        prop: "expire_time", label: "过期时间"
      },
      {
        label: "操作",
        prop: "operate",
        operateFun: [
          {
            icon: "del",
            label: "删除",
            function: "del"
          }
        ]
      }
    ]
  },
  bare_machine: {
    name: "裸机",
    tableConfig: {},
    tableColumns: [
      {
        prop: "uuid",
        label: "ID",
        "show-overflow-tooltip": true
      },
      { type: "selection" },
      {
        prop: "server_name",
        label: "裸机名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "sn", label: "SN" },
      { prop: "ipmi_address", label: "IPMI地址", width: 85 },
      { prop: "flavor_id", label: "规格ID", "show-overflow-tooltip": true },
      {
        prop: "power_state", label: "电源状态",
        enums: {
          "power on": { label: "开机", type: "success" },
          "power off": { label: "关机", type: "info" },
          "starting": { label: "开机中", type: "warning" },
          "stopping": { label: "关机中", type: "warning" },
          "rebooting": { label: "重启中", type: "warning" }
        }
      },
      {
        prop: "physical_state", label: "物理状态",
        enums: {
          "idle": { label: "空闲", type: "success" },
          "pre_allocate": { label: "待分配", type: "primary" },
          "using": { label: "使用中", type: "warning" },
          "withdraw": { label: "注销", type: "danger" }
        }

      },
      {
        prop: "logical_state", label: "逻辑状态", width: 90,
        enums: {
          "idle": { label: "空闲", type: "success" },
          "install": { label: "安装中", type: "warning" },
          "install_failed": { label: "安装失败", type: "danger" },
          "pre_allocate": { label: "待分配", type: "primary" },
          "reducing": { label: "迁移中", type: "warning" },
          "allocated": { label: "已分配", type: "success" },
          "using": { label: "使用中", type: "warning" },
          "withdraw": { label: "注销", type: "danger" }
        }
      },
      {
        prop: "provision_state", label: "业务状态", width: 120,
        enums: {
          "enrolling": { label: "录入中", type: "warning", component: "dot" },
          "enroll_failed": { label: "录入失败", type: "danger", component: "dot" },
          "manageable": { label: "录入成功", type: "success", component: "dot" },
          "inspecting": { label: "发现网卡中", type: "warning", component: "dot" },
          "inspect_success": { label: "发现网卡成功", type: "success", component: "dot" },
          "inspect_failed": { label: "发现网卡失败", type: "danger", component: "dot" },
          "deploying": { label: "部署中", type: "warning", component: "dot" },
          "deploy_failed": { label: "部署失败", type: "danger", component: "dot" },
          "active": { label: "可用", type: "primary", component: "dot" },
          "error": { label: "错误", type: "danger", component: "dot" },
          "deleting": { label: "回收中", type: "warning", component: "dot" },
          "recycle_failed": { label: "回收失败", type: "danger", component: "dot" },
          "reducing": { label: "迁移中", type: "test", component: "dot" },
        }
      },
      { prop: "device_standardization", label: "设备标准化", width: 85 },
      { prop: "resource_zone_idName", label: "资源区" },
      { prop: "cmpCreateTime", label: "创建时间", width: 135 },
      {
        label: "操作",
        prop: "operate",
        width: "220",
        isOperate: true,
        renderPage: "tagOperate"
      }
    ]
  },
  bare_machine_mac: {
    name: "裸机网卡",
    tableConfig: {},
    tableColumns: [
      { prop: "mac_address", label: "MAC地址" },
      { prop: "switch_id", label: "交换机ID" },
      { prop: "switch_port_id", label: "交换机网口" }
    ]
  },
  bare_machine_disk: {
    name: "裸机磁盘",
    tableConfig: {},
    tableColumns: [
      { prop: "disk_type", label: "磁盘类型" },
      { prop: "disk_size", label: "磁盘大小" }
    ]
  },
  physical_instance: {
    name: "物理机",
    tableConfig: {},
    tableColumns: [
      { type: "selection" },
      {
        prop: "uuid",
        label: "ID",
        "show-overflow-tooltip": true
      },
      {
        prop: "host_name",
        label: "物理机名称",
        width: 110,
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "os", label: "操作系统", "show-overflow-tooltip": true },
      { prop: "ip_address", label: "IP地址", width: 100 },
      {
        prop: "power_state", label: "电源状态",
        enums: {
          "power on": { label: "开机", type: "success" },
          "power off": { label: "关机", type: "info" },
          "starting": { label: "开机中", type: "warning" },
          "stopping": { label: "关机中", type: "warning" },
          "rebooting": { label: "重启中", type: "warning" }
        }
      },
      {
        prop: "logical_state", label: "逻辑状态", width: 90,
        enums: {
          "idle": { label: "空闲", type: "success" },
          "install": { label: "安装中", type: "warning" },
          "install_failed": { label: "安装失败", type: "danger" },
          "pre_allocate": { label: "待分配", type: "primary" },
          "reducing": { label: "迁移中", type: "warning" },
          "allocated": { label: "已分配", type: "success" },
          "using": { label: "使用中", type: "warning" },
          "withdraw": { label: "注销", type: "danger" }
        }
      },
      { prop: "resource_pool_idName", label: "资源池" },
      { prop: "cpu_core", label: "CPU（核）", width: 90 },
      {
        prop: "memory", label: "内存 (G）",
        render: (row) => {
          return row.memory / 1024
        }
      },
      { prop: "device_standardization", label: "设备标准化", width: 85 },
      { prop: "cmpCreateTime", label: "创建时间", width: 140 },
      {
        label: "操作",
        prop: "operate",
        width: "230",
        isOperate: true,
        renderPage: "tagOperate"
      }
    ],
    poolTableColumns: [
      {
        prop: "uuid", label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "host_name", label: "物理机名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "os", label: "操作系统", "show-overflow-tooltip": true },
      { prop: "ip_address", label: "IP地址" },
      {
        prop: "power_state", label: "电源状态",
        enums: {
          "power on": { label: "开机", type: "success" },
          "power off": { label: "关机", type: "info" },
          "starting": { label: "开机中", type: "warning" },
          "stopping": { label: "关机中", type: "warning" },
          "rebooting": { label: "重启中", type: "warning" }
        }
      },
      {
        prop: "logical_state", label: "逻辑状态",
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
      // { prop: "resource_zone_idName", label: "资源区" },
      { prop: "resource_pool_idName", label: "资源池" },
      { prop: "cpu_core", label: "CPU（核）" },
      {
        prop: "memory", label: "内存 (G）",
        render: (row) => {
          return row.memory / 1024
        }
      },
      { prop: "device_standardization", label: "设备标准化" },
      { prop: "cmpCreateTime", label: "创建时间", width: 150 },
      {
        label: "操作",
        prop: "operate",
        width: "100",
        operateFun: [
          {
            icon: "folder-remove",
            label: "迁回裸机",
            function: "reduce",
            isEnabled: row => {
              if (row.power_state !== 'power on' && row.power_state !== 'power off' || row.remark_flag === 'inclusion_order_data' || row.logical_state === 'allocated' || row.logical_state === 'using') {
                return false;
              }
              else {
                return true;
              }
            }
          }
        ]
      }
    ],
    conPoolTableColumns: [
      {
        prop: "uuid", label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "host_name", label: "物理机名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "os", label: "操作系统", "show-overflow-tooltip": true },
      { prop: "ip_address", label: "IP地址" },
      {
        prop: "power_state", label: "电源状态",
        enums: {
          "power on": { label: "开机", type: "success" },
          "power off": { label: "关机", type: "info" },
          "starting": { label: "开机中", type: "warning" },
          "stopping": { label: "关机中", type: "warning" },
          "rebooting": { label: "重启中", type: "warning" }
        }
      },
      {
        prop: "logical_state", label: "逻辑状态",
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
      // { prop: "resource_zone_idName", label: "资源区" },
      { prop: "resource_pool_idName", label: "资源池" },
      { prop: "cpu_core", label: "CPU（核）" },
      {
        prop: "memory", label: "内存 (G）",
        render: (row) => {
          return row.memory / 1024
        }
      },
      { prop: "node_role", label: "节点角色", renderPage: "nodeRoleTag" },
      { prop: "cmpCreateTime", label: "创建时间", width: 150 },
      {
        label: "操作",
        prop: "operate",
        width: "100",
        operateFun: [
          {
            icon: "folder-remove",
            label: "迁回裸机",
            function: "reduce",
            isEnabled: row => {
              if (row.power_state !== 'power on' && row.power_state !== 'power off' || row.remark_flag === 'inclusion_order_data' || row.logical_state === 'allocated') {
                return false;
              }
              else {
                return true;
              }
            }
          }
        ]
      }
    ]
  },
  physical_instance_flavor: {
    name: "物理云主机规格",
    tableConfig: {},
    tableColumns: [
      {
        prop: "name", label: "名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "cpu", label: "CPU（核）" },
      { prop: "memory", label: "内存（G）" },
      { prop: "disk", label: "磁盘", renderPage: "tag" },
      {
        prop: "status", label: "状态", width: 100,
        enums: {
          "0": { label: "未发布", type: "info" },
          "1": { label: "已发布", type: "success" },
        }
      },
      // {
      //   prop: "is_public", label: "是否全平台可见", width: 150,
      //   enums: {
      //     "0": { label: "否", type: "info" },
      //     "1": { label: "是", type: "success" },
      //   }
      // },
      { prop: "cmpCreateTime", label: "创建时间", width: 150 },
      {
        label: "操作",
        prop: "operate",
        width: 250,
        isOperate: true,
        renderPage: "tagOperate",
      }
    ],
    flavorTableColumns: [
      { type: "radio" },
      {
        prop: "name",
        label: "名称"
      },
      { prop: "cpu", label: "CPU（核）" },
      { prop: "memory", label: "内存（G）" },
      { prop: "disk", label: "磁盘", renderPage: "tag" },
      {
        prop: "status", label: "状态",
        enums: {
          "0": { label: "未发布", type: "info" },
          "1": { label: "已发布", type: "success" },
        }
      },
      // { prop: "is_public", label: "全平台可见" ,
      //   enums: {
      //     "0": { label: "否", type: "info" },
      //     "1": { label: "是", type: "success" },
      //   }},
    ]

  },
  physical_res_pool: {
    name: "物理机资源池",
    tableConfig: {},
    tableColumns: [
      {
        prop: "uuid",
        label: "ID",
        "show-overflow-tooltip": true
      },
      {
        prop: "name",
        label: "资源池名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "region_idName", label: "Region" },
      { prop: "resource_zone_idName", label: "资源区" },
      { prop: "purpose", label: "资源用途", renderPage: "tag" },
      { prop: "shareType", label: "共享类型", renderPage: "shareTag" },
      { prop: "device_standardization", label: "设备标准化" },
      {
        prop: "early_warning",
        label: "预警数量",
        render: (row) => {
          return row.early_warning === 0 ? "不预警" : row.early_warning;
        }
      },
      {
        prop: "status",
        label: "状态",
        enums: {
          0: { label: "禁用", type: "info", component: "dot" },
          1: { label: "启用", type: "success", component: "dot" }
        }
      },
      { prop: "early_warning_status", label: "预警状态" },
      { prop: "cmpCreateTime", label: "创建时间", width: 150 },
      {
        label: "操作",
        prop: "operate",
        width: "230",
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
          },
          {
            icon: "plus",
            label: "扩容物理机",
            function: "addPhysicalInstance"
          }
        ]
      }
    ]
  },
  "con_physical_res_pool": {
    name: "容器物理机资源池",
    tableConfig: {
    },
    tableColumns: [
      {
        prop: "uuid", label: "ID", "show-overflow-tooltip": true
      },
      {
        prop: "name", label: "资源池名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "region_idName", label: "Region" },
      { prop: "resource_zone_idName", label: "资源区" },
      { prop: "purpose", label: "资源用途", renderPage: "tag" },
      { prop: "container_cluster_type", label: "集群类型" },
      //{ prop: "device_standardization", label: "设备标准化" },
      {
        prop: "status", label: "状态",
        enums: {
          0: { label: "禁用", type: "info", component: "dot" },
          1: { label: "启用", type: "success", component: "dot" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间", width: 150 },
      {
        label: "操作",
        prop: "operate",
        width: '230',
        operateFun: [
          {
            icon: "edit",
            label: "编辑",
            function: "edit",
          },
          {
            icon: "delete",
            label: "删除",
            function: "del",
          },
          {
            icon: "plus",
            label: "扩容物理机",
            function: "addPhysicalInstance"
          }
        ]
      }
    ]

  },
  bms_compute_instance: {
    name: "物理云主机",
    tableConfig: {},
    tableColumns: [
      { type: "selection" },
      {
        prop: "uuid",
        label: "ID",
        "show-overflow-tooltip": true
      },
      {
        prop: "name",
        label: "主机名称",
        operateFun: {
          function: "info"
        }, "show-overflow-tooltip": true
      },
      { prop: "cmpProjectName", label: "Project" },
      { prop: "order_id", label: "订单编号" },
      { prop: "resourcegategory", label: "用途" },
      //{ prop: "cloud_platform_type", label: "虚拟化类型" },
      { prop: "service_name", label: "关联服务" },
      { prop: "resource_zone_idName", label: "资源区" },
      {
        prop: "ip_address",
        label: "IP 地址",
        width: 140,
        renderPage: "tag"
      },
      {
        prop: "power_state", label: "状态",
        enums: {
          "power on": { label: "开机", type: "success" },
          "power off": { label: "关机", type: "info" },
          "starting": { label: "开机中", type: "warning" },
          "stopping": { label: "关机中", type: "warning" },
          "rebooting": { label: "重启中", type: "warning" }
        }
      },
      { prop: "cmpCreateTime", label: "创建时间", width: 160 },
      {
        label: "操作",
        prop: "operate",
        width: "230",
        isOperate: true,
        renderPage: "tagOperate"
      }
    ]
  },
  tencent_vpc: {
    name: "腾讯云VPC",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      { prop: "vpc_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "vpc_name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      { prop: "cmpTenantName", label: "租户" },
      {
        prop: "environment_name",
        label: "环境",
        "show-overflow-tooltip": true
      },
      { prop: "region_local_name", label: "地域" },
      {
        prop: "cidr_block",
        label: "网段",
        renderPage: "tag"
      },
      { prop: "cmpCreateTime", label: "创建时间" },
      {
        prop: "operate",
        label: "操作",
        width: "200",
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
          },
        ]
      }
    ]
  },
  tencent_subnet: {
    name: "腾讯云子网",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      { prop: "subnet_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "subnet_name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      {
        prop: "cidrBlock",
        label: "网段",
        renderPage: "tag"
      },
      { prop: "vpc_name", label: "VPC", "show-overflow-tooltip": true },
      {
        prop: "environment_name",
        label: "环境",
        "show-overflow-tooltip": true
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "160" },
      {
        prop: "operate",
        label: "操作",
        width: "200",
        operateFun: [
          // {
          //   icon: "edit",
          //   label: "编辑",
          //   function: "edit"
          // },
          {
            icon: "delete",
            label: "删除",
            function: "del"
          },
        ]
      }
    ]
  },
  tencent_vpc_subnet: {
    name: "腾讯云VPC关联子网",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "subnet_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "subnet_name", label: "名称" },
      {
        prop: "cidrBlock",
        label: "网段",
        renderPage: "tag"
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "160" },
    ]
  },
  huawei_vpc: {
    name: "华为云VPC",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      { prop: "id", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      { prop: "cmpTenantName", label: "租户" },
      {
        prop: "environment_name",
        label: "环境",
        "show-overflow-tooltip": true
      },
      { prop: "region_local_name", label: "地域" },
      {
        prop: "cidr",
        label: "网段",
        renderPage: "tag"
      },
      { prop: "cmpCreateTime", label: "创建时间" },
      {
        prop: "operate",
        label: "操作",
        width: "200",
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
          },
        ]
      }
    ]
  },
  huawei_subnet: {
    name: "华为云子网",
    tableConfig: {
      isPublic: true
    },
    tableColumns: [
      { prop: "id", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称", operateFun: { function: "info" }, "show-overflow-tooltip": true },
      {
        prop: "cidr",
        label: "网段",
        renderPage: "tag"
      },
      { prop: "vpc_name", label: "VPC", "show-overflow-tooltip": true },
      {
        prop: "environment_name",
        label: "环境",
        "show-overflow-tooltip": true
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "160" },
      {
        prop: "operate",
        label: "操作",
        width: "200",
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
          },
        ]
      }
    ]
  },
  huawei_vpc_subnet: {
    name: "华为云VPC关联子网",
    tableConfig: {
      setting: false,
      pagination: false
    },
    tableColumns: [
      { prop: "id", label: "ID", "show-overflow-tooltip": true },
      { prop: "name", label: "名称" },
      {
        prop: "cidr",
        label: "网段",
        renderPage: "tag"
      },
      { prop: "cmpCreateTime", label: "创建时间", width: "160" },
    ]
  },
  tencentVolume_attach_tencentVm: {
    name: "虚拟机",
    tableConfig: {
      isPublic: true,
      setting: false,
      pagination: false
    },
    tableColumns: [
      { type: "radio" },
      { prop: "instance_id", label: "ID", "show-overflow-tooltip": true },
      { prop: "instance_name", label: "名称" },
      { prop: "instance_type", label: "规格" },
      { prop: "region_local_name", label: "可用区" },
      { prop: "os_name", label: "操作系统" }
    ]
  },
  huaweiVolume_attach_huaweiVm: {
    name: "虚拟机",
    tableConfig: {
      isPublic: true,
      setting: false,
      pagination: false
    },
    tableColumns: [
      { type: "radio" },
      {
        prop: "name", label: "名称", width: 300,
        render: (row) => {
          return row.name + '<br>ID: ' + row.id;
        }
      },
      { prop: "flavor_name", label: "规格" },
      { prop: "region_local_name", label: "可用区" },
      { prop: "metadata_image_name", label: "操作系统" }
    ]
  },
  host_security: {
    name: "主机安全",
    tableConfig: {},
    tableColumns: [
      { type: "selection" },
      { prop: "name", label: "主机名称", renderPage: "hostName", width: "200" },
      { prop: "status", label: "主机运行状态", renderPage: "status" },
      { prop: "cmpTenantName", label: "所属租户" },
      { prop: "cmpProjectName", label: "所属Project" },
      { prop: "protectionStatus", label: "防护状态", renderPage: "protectionStatus" },
      { prop: "protectionModule", label: "防护模块" },
      { prop: "antivirusStatus", label: "防病毒状态" },
      { prop: "risk_rating", label: "风险评级", renderPage: "risk_rating" },
      {
        prop: "operate",
        label: "操作",
        width: "200",
        renderPage: "operate"
      }
    ]
  },
  host_antivirus: {
    name: "主机杀毒",
    tableConfig: {},
    tableColumns: [
      { type: "selection" },
      { prop: "hostName", label: "主机名称", renderPage: "hostName", width: "200" },
      { prop: "status", label: "主机运行状态", renderPage: "status" },
      { prop: "cmpTenantName", label: "所属租户" },
      { prop: "cmpProjectName", label: "所属Project" },
      { prop: "antivirusStatus", label: "防病毒状态" },
      { prop: "protectionStatus", label: "防护状态" },
      { prop: "protectionModule", label: "防护模块" },
      { prop: "os", label: "操作系统" },
      { prop: "count", label: "病毒数量" },
      { prop: "risk_rating", label: "风险评级", renderPage: "risk_rating" },
      {
        prop: "operate",
        label: "操作",
        width: "150",
        isOperate: true,
        renderPage: "tagOperate"
      }
    ]
  },
  isolation: {
    name: "隔离区",
    tableConfig: {
      pageSize: 5,
      pageSizes: [5, 10, 20, 30, 50],
    },
    tableColumns: [
      { type: "selection" },
      { prop: "name", label: "病毒名称" },
      { prop: "path", label: "路径" },
      { prop: "cmpCreateTime", label: "创建时间", width: "160" },
    ]
  },
  container_busines_group: {
    name: '容器业务群组',
    tableColumns: [
      {
        prop: "name", label: "名称", operateFun: {
          function: "detail"
        }
      },
      { prop: "regionIdName", label: "Region" },
      { prop: "useCategery", label: "用途", renderPage: "useCategery", width: 80 },
      { prop: "vpcIdName", label: "VPC" },
      { prop: "cmpCreateTime", label: "创建时间" },
      {
        label: "操作",
        prop: "operate",
        width: 100,
        operateFun: [
          { label: "删除", function: "del" },
        ],
      },
    ],
  }

};
