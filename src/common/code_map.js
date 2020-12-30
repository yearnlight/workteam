// 路由识别码 -> {componentCode,name,webCode}
export default {
    "resourcecenter_region": { componentCode: "resourcecenter_region", name: "Region", webCode: "region" },
    "resourcecenter_availability_zone": { componentCode: "resourcecenter_availability_zone", name: "AZ", webCode: "az" },
    "resourcecenter_resource_zone": { componentCode: "resourcecenter_resource_zone", name: "资源区", webCode: "rz" },
    "resourcecenter_compute_instance_v1": { componentCode: "resourcecenter_compute_instance_v1", name: "虚拟云主机", webCode: "vm" },
    "resourcecenter_networking_sp_ip_pools": { componentCode: "resourcecenter_networking_sp_ip_pools", name: "IP地址池", webCode: "ip_pool" },

    // webCode ==>componentCode  列表页面表格和详情唯一表格
    listMap:{
        "resource_zone":"resourcecenter_resource_zone",
        "nas":"resourcecenter_filestorage_volume_v1",
        "fire_wall":"resourcecenter_fw_firewall_v1",
        "subnet_ip_pool":"resourcecenter_networking_ip_subnetpools",
        "vpc_connect":"resourcecenter_vpc2vpc_connection_v1",
        "ip_pool":"resourcecenter_networking_sp_ip_pools",
        "prefix":"resourcecenter_network_subnet_ip_pool",
        "ippool":'resourcecenter_networking_ip_pool',
        "vm":"resourcecenter_compute_instance_v1",
        "router":"resourcecenter_networking_router_v1",
        "storage_resource_pool":"resourcecenter_storage_resource_pools",
        "storage_pool":"resourcecenter_storage_pools",
        "cluster_manage":"resourcecenter_cluster",
        "user_images":"resourcecenter_image",
        // "sys_images":"resourcecenter_image",
        "vlan":"resourcecenter_networking_vlan",
        "vlan_range":"resourcecenter_networking_network_ranges",
        "network_layout":"resourcecenter_networking_orchestration_v1",
        "subnet":"resourcecenter_networking_subnet_v1",
        "bucket":"resourcecenter_objectstorage_bucket_v1",
        "port":"resourcecenter_networking_port_v1",
        "float_ip": "resourcecenter_networking_floatingip_v1",
        "volume": "resourcecenter_blockstorage_volume_v1",
        "border_gateway": "resourcecenter_networking_bordergateway",
        "external_network_domain": "resourcecenter_networking_external_network_domain",
        "business_chain": "resourcecenter_networking_business_chain",
        "bare_machine": "bms_physical_instance",
        "physical_instance": "bms_physical_instance",
        "physical_instance_flavor": "bms_physical_flavor",
        "physical_res_pool": "bms_physical_resource_pool",
        "con_physical_res_pool": "bms_physical_resource_pool",
        "bms_compute_instance": "resourcecenter_bms_compute_instance_v1",
        "compute_instance": "resourcecenter_compute_instance_v1",
        "host_antivirus": "resourcecenter_compute_instance_v1",
    },
    otherMap:{
        "nas_vm":"vm",
        "prefix":"subnet_ip_pool",
        "bare_machine":"physical_instance",
        "con_physical_res_pool":"physical_res_pool",
        "host_antivirus":"compute_instance",
    },
    operateCodeMap:{
        "prefix_add":"add_subnet_ip_pool",//  add_prefix_to_ip_subnet_pools
        "prefix_delete":"remove_subnet_ip_pool",// delete_prefix_to_ip_subnet_pools
        "prefix_page":"get_cidrs",

        "srp_remove_p":"resourcecenter_storage_resource_pools_remove_pools",
        "srp_add_p":"resourcecenter_storage_resource_pools_add_pools",

        "ippool_add":"add_sp_ip_pool_id",
        "ippool_delete":"delete_sp_ip_pool_id",

        "subnet_ip_pool_detail":"select_ip_subnet_pools_detial",
        "subnet_ip_pool_add":"create_ip_subnet_pools",
        "subnet_ip_pool_edit":"update_ip_subnet_pools",
        "subnet_ip_pool_delete":"delete_ip_subnet_pools",

        "ip_pool_detail":"select_sp_ip_pools_detail",
        "ip_pool_add":"create_sp_ip_pools",
        "ip_pool_edit":"update_sp_ip_pools",
        "ip_pool_delete":"delete_sp_ip_pools",

        "vlan_create":"create_provider_network",
        "vlan_update":"modify_provider_network",
        "vlan_remove":"remove_provider_network",

        "vlan_range_create":"create_resourcecenter_networking_network_ranges",
        "vlan_range_update":"modify_resourcecenter_networking_network_ranges",
        "vlan_range_remove":"remove_resourcecenter_networking_network_ranges",

        "network_layout_create":"create_resourcecenter_networking_orchestration_v1",
        "network_layout_update":"modify_resourcecenter_networking_orchestration_v1",
        "network_layout_remove":"remove_resourcecenter_networking_orchestration_v1",

        "border_gateway_list":"select_resourcecenter_network_bordergateway_list",
        "border_gateway_detail":"select_resourcecenter_network_bordergateway_detail",

        "vpc_connect_add":"create_resourcecenter_vpc2vpc_connection_service_v1",
        "vpc_connect_update":"modify_resourcecenter_vpc2vpc_connection_v1",
        "vpc_connect_delete":"remove_resourcecenter_vpc2vpc_connection_service_v1",

        "external_network_domain_add":"create_external_network_domain",
        "external_network_domain_edit":"modify_external_network_domain",
        "external_network_domain_delete":"delete_external_network_domain",
        "external_network_domain_list":"select_external_network_domain_list",
        "external_network_domain_detail":"select_external_network_domain_detail",

        "business_chain_add":"create_business_chain",
        "business_chain_edit":"modify_business_chain",
        "business_chain_delete":"delete_business_chain",
        "business_chain_list":"select_business_chain_list",
        "business_chain_detail":"select_business_chain_detail",
        "business_chain_reload":"reload_business_chain",
        "business_chain_add_service":"create_business_chain_service",
        "business_chain_delete_service":"delete_business_chain_service",
        "business_chain_edit_service":"modify_business_chain_service",
        "business_chain_reload_service":"reload_business_chain_service",


        "physical_instance_detail":"select_physical_instance_detail",
        "physical_instance_list":"select_bms_physical_instance_list",
        "physical_instance_add":"create_physical_instance",
        "physical_instance_edit":"modify_physical_instance",
        "physical_instance_delete":"remove_physical_instance",
        "physical_instance_discover":"discover_physical_instance",
        "physical_instance_publish":"publish_physical_instance",
        "physical_instance_recycle":"recycle_physical_instance",
        "physical_instance_start":"start_physical_instance",
        "physical_instance_stop":"stop_physical_instance",
        "physical_instance_restart":"reboot_physical_instance",
        "physical_instance_import":"upload_excel_physical_instance",
        "physical_instance_import_test":"check_legal_physical_instance_excel",
        "physical_instance_reduce":"reduce_physical_instance",
        "physical_instance_associate_flavor":"assign_physical_instance_to_flavor",

        "physical_instance_flavor_detail":"select_physical_flavor_detail",
        "physical_instance_flavor_add":"create_physical_flavor",
        "physical_instance_flavor_edit":"modify_physical_instance",
        "physical_instance_flavor_delete":"remove_physical_flavor",
        "physical_instance_flavor_publish":"publish_physical_flavor",
        "physical_instance_flavor_unpublish":"unpublish_physical_flavor",


        "physical_res_pool_detail":"select_physical_resource_pool_detail", //查询物理机资源池详情
        "physical_res_pool_add":"create_physical_resource_pool",            //创建物理机资源池
        "physical_res_pool_edit":"update_physical_resource_pool",           //修改物理机资源池
        "physical_res_pool_delete":"remove_physical_resource_pool",         //删除物理机资源池
        "physical_res_pool_dilatation":"dilatation_physical_resource_pool", //添加物理机到物理机资源池
        "physical_res_pool_container_dilatation":"container_dilatation_physical_resource_pool", //添加物理机到容器物理机资源池


        //物理云主机
        "bms_compute_instance_detail":"select_bms_compute_instance_detail",
        "bms_compute_instance_list":"select_resourcecenter_bms_compute_instance_v1_list",
        "bms_compute_instance_start":"start_bms_compute_instance",
        "bms_compute_instance_stop":"stop_bms_compute_instance",
        "bms_compute_instance_restart":"restart_bms_compute_instance",


        //容器节点删除
        "container_cluster_node_delete":"cluster-node-role-delete",
        "container_image_add":"image_warehouse_create",
        "container_image_update":"image_warehouse_update",
        "container_image_delete":"image_warehouse_delete",
        //租户镜像仓库
        "tenant_image_expand":"tenant_image_warehouse_expansion",
        "tenant_image_offline":"tenant_image_warehouse_delete",
        //TAP用户
        "container_tap_user_delete":"tap_user_delete",
        //PV存储
        "container_pv_storage_delete":"delete_pv_storage",
        //底层PV存储同步
        "container_real_pv_storage_sync":"sync_pv_storage",
        // 容器集群下线
        "container_cluster_delete":"cluster-delete",
        "cluster_manage_enable":"enable_cluster",
        "cluster_manage_disable":"disable_cluster",


        //主机杀毒
        "host_antivirus_detail":"select_resourcecenter_compute_instance_v1_detail",
        "host_antivirus_add":"antivirus_install_agent",
        "host_antivirus_full_scan":"virus_scan",
        "host_antivirus_fast_scan":"virus_scan",
        "host_antivirus_isolation":"isolation_area",
        "host_antivirus_uninstall":"antivirus_uninstall_agent",
        "host_antivirus_info":"protection_details",
        "host_antivirus_isolation_delete":"segregation_files_operation",
        "host_antivirus_isolation_rollback":"segregation_files_operation",



    },
}