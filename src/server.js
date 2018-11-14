/**
 * Revolter - server.js
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

import CordovaLoaded from "./util/util.js"
import { shellExecPromise } from "./util/exec.js"
import { copyFilePromise } from "./util/file.js"

export const Server = {
    async prepare() {
        if (!top._deviceready) {
            await CordovaLoaded() // 等待 Cordova 完全加载
        }

        const appDir = top.cordova.file.applicationDirectory
        const dataDir = top.cordova.file.dataDirectory

        const filePath = appDir + "www/bin/wikipedia-proxy"

        // 复制文件
        const copiedFileEntry = await copyFilePromise(filePath, dataDir)

        // 获取复制到的文件路径
        const copiedFilePath = copiedFileEntry.nativeURL.replace("file://", "")

        // 让wikipedia-proxy可执行文件有运行权限
        await shellExecPromise(["chmod", "0777", copiedFilePath])
    },
    async start() {

    },
    async stop() {

    },
}

export default Server
