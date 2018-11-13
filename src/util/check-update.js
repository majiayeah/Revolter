/**
 * 检查更新相关工具包
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

import "whatwg-fetch"

import getAppVersion from "./get-app-version.js"


const versionCheckAPI = "https://api.github.com/repos/Xmader/Revolter/releases"
const downloadURL = "https://github.com/Xmader/Revolter/releases/latest"

/**
 * 检查版本更新
 * @returns {Promise<boolean>} 是否有更新
 */
const checkUpdate = async () => {
    const appVersion = await getAppVersion()
    const appVersionFormatted = formatVersion(appVersion)

    const r = await fetch(versionCheckAPI)
    const newVersion = (await r.json())[0].tag_name
    const newVersionFormatted = formatVersion(newVersion)

    return (newVersionFormatted > appVersionFormatted)
}

/**
 * 格式化版本号, 不包含先行版本号和版本编译元数据
 * @param {string} version 
 */
const formatVersion = (version) => {
    version = version.match(/(\d+\.){2}\d+/)[0]
    return version.split(".").map(e => +e)
}

export default checkUpdate
