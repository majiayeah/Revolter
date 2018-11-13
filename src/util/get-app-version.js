/**
 * 获取版本号
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

const getAppVersion = async () => {
    if (top.cordova) { // 实际打包为 Cordova App 时
        const appVersion = await top.cordova.getAppVersion.getVersionNumber()
        return `v${appVersion}`
    } else { // 本地测试
        return "v1.x.x 本地测试"
    }
}

export default getAppVersion
