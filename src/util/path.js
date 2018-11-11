/**
 * Cordova 文件路径相关工具包
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

export const _version = "1.0.0"

/**
 * 从一个文件路径获取文件名
 * @param {string} filePath 
 */
export const getFileName = (filePath) => {
    return filePath.split("/").pop()
}

/**
 * 把全部给定的路径片段连接到一起
 * @param {...string} paths 
 */
export const joinPath = (...paths) => {
    return paths.join("/").replace(/([^:])\/{3,}|([^/:])\/{2}/g, "$1$2/")
}
