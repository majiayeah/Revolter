/**
 * 检查更新相关工具包
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

import "whatwg-fetch"

const versionCheckAPI = "https://api.github.com/repos/Xmader/Revolter/releases"

/**
 * 获取最新的版本号
 * @returns {Promise<string>} 最新的版本号
 */
export const getLatestVersionNumber = async () => {
    const r = await fetch(versionCheckAPI)
    const latestRelease = (await r.json()).filter(
        x => !x.draft && !x.prerelease // 过滤掉草稿和预发布版本
    )[0]
    const latestVersionNumber = latestRelease.tag_name

    return latestVersionNumber
}

/**
 * 格式化版本号, 不包含先行版本号和版本编译元数据
 * @param {string} version 
 */
export const formatVersion = (version) => {
    version = version.match(/(\d+\.){2}\d+/)[0]
    return version.split(".").map(e => +e)
}

/**
 * 比较版本号大小
 * @param {string} appVersionNumber 当前版本号
 * @param {string} latestVersionNumber 最新的版本号
 */
export const compareVersionNumbers = (appVersionNumber, latestVersionNumber) => {
    const appVersionNumberFormatted = formatVersion(appVersionNumber)
    const latestVersionNumberFormatted = formatVersion(latestVersionNumber)

    return (latestVersionNumberFormatted > appVersionNumberFormatted)
}
