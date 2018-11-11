/**
 * Cordova 文件操作相关工具包
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

export const _version = "1.0.0"

/**
 * 复制文件
 * 如果文件已存在, 则自动覆盖
 * @param {string} srcPath 源文件路径
 * @param {string} destDir 目标目录
 * @param {string=} destFileName 目标文件名 (如果留空, 则不改变文件名)
 * @returns {Promise<Entry>}
 */
export const copyFilePromise = (srcPath, destDir, destFileName = null) => {
    return new Promise((resolve, reject) => {
        const successCallback = (entry) => resolve(entry)
        const errorCallback = (e) => reject(e)

        window.resolveLocalFileSystemURL(srcPath, function (fileEntry) {
            window.resolveLocalFileSystemURL(destDir, function (dirEntry) {
                fileEntry.copyTo(dirEntry, destFileName || fileEntry.name, successCallback, errorCallback)
            })
        }, errorCallback)
    })
}

/**
 * 判断文件或目录是否存在
 * @param {string} filePath
 * @returns {Promise<boolean>}
 */
export const fileOrDirExistsPromise = (filePath) => {
    return new Promise((resolve) => {
        const successCallback = () => resolve(true)
        const errorCallback = (e) => {
            if (e.code == 1) { // 文件或目录不存在 FileError.NOT_FOUND_ERR
                resolve(false)
            } else { // 其它错误
                resolve(true)
            }
        }

        window.resolveLocalFileSystemURL(filePath, successCallback, errorCallback)
    })
}