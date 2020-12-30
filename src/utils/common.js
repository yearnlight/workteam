import fields from "@/common/fields"
import codeMap from "@/common/code_map";
let parseFields = (resourceKey, resourceInfo) => {
    let result = [];
    if (!resourceKey) return result;
    for (let fKey in fields) {
        // 匹配到资源的fields
        if (fKey == resourceKey) {
            let f = fields[fKey];
            let detailInfo = f.detail;
            detailInfo.forEach(dItem => {
                if (Array.isArray(dItem.fields)) {
                    // dItem.fields.forEach(item => {
                    //     for (let resKey in resourceInfo) {
                    //         // 匹配字段
                    //         if (resKey == item.key) {
                    //             if (item.enums) {
                    //                 let _eValue = item.enums[resourceInfo[resKey]];
                    //                 if(item.renderType =="EL-TAG")
                    //                 {
                    //                     item.value = _eValue? (_eValue.label || ""): "";
                    //                     item.color = _eValue? (_eValue.type || ""): "";
                    //                 }
                    //                 else
                    //                 {
                    //                     item.value = _eValue
                    //                 }
                    //             }
                    //             else {
                    //                 item.value = resourceInfo[resKey];
                    //             }
                    //         }
                    //     }
                    // });
                    // 对于页面显示但是详情没有返回的 字段没有处理，使其为空，会保留上一次的数据；且不需要双层循环
                    dItem.fields.forEach(item => {
                        if (item.key in resourceInfo) {
                            if (item.enums) {
                                let _eValue = item.enums[resourceInfo[item.key]];
                                if (item.renderType == "EL-TAG" || item.renderType == "DOT") {
                                    item.value = _eValue ? (_eValue.label || "") : "";
                                    item.color = _eValue ? (_eValue.type || "") : "";
                                }
                                else {
                                    item.value = _eValue
                                }
                            }
                            else {
                                item.value = resourceInfo[item.key];
                            }
                        } else {
                            item.value = "";
                        }
                    })
                }
            })

            result = detailInfo;
            break;
        }
    }
    return result;
}

let getSearchFormConfig = (resourceKey) => {
    let result = {};
    if (!resourceKey) return result;
    for (let fKey in fields) {
        // 匹配到资源的fields
        if (fKey == resourceKey) {
            let f = fields[fKey];
            result = f.searchForm;
            break;
        }
    }
    return result;
}

let parseParams = params => {
    let result = {};
    for (let key in params) {
        result[key] = { default: params[key] };
    }
    let other = { "project_id": { "default": window.app.$util.getSStorage("projectId") || "1" }, "tenant_id": { "default": window.app.$util.getSStorage("tenantId") }, "user_id": { "default": window.app.$util.getSStorage("userId") } };
    Object.assign(result, other);
    return result;
}


let isHasPermission = (recourceType, opercode) => {
    //该方法为公共方法。
    //当前用户角色下权限数据，需要根据邻盛侧返回格式进行处理。
    //如果邻盛侧返回的数据是当前角色的所有数据，需要处理成每个页面(如region、vm、volume)的权限数据集，每个页面可以快速获取到。
    //const currentRoleAuthority = getAuthority() || [];
    //目前先使用简单mock 数据。region 页面对应权限集
    let permissonFlag = false;
    if (!recourceType) return permissonFlag;
    let currentRoleAuthority = ["region_enable", "region_disable", "region_edit", "region_delete"];
    if (!currentRoleAuthority.length) return permissonFlag;
    if (opercode && (currentRoleAuthority.indexOf(opercode) !== -1)) permissonFlag = true;
    return permissonFlag;

}

let getWebCodeBycomponentCode = (code, suffix) => {
    let listMap = codeMap.listMap;
    let findWebCode = "";
    for (let key in listMap) {
        if (listMap[key] == code) {
            findWebCode = key;
            break;
        }
    }
    return suffix ? `${findWebCode}_${suffix}` : findWebCode;
}

export default {
    parseFields: parseFields,//把入参解析成模板入参格式
    getSearchFormConfig: getSearchFormConfig,
    parseParams: parseParams,
    isHasPermission: isHasPermission,
    getWebCodeBycomponentCode: getWebCodeBycomponentCode,//根据组件code查出webCode
}
