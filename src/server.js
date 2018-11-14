/**
 * Revolter - server.js
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

import { CordovaLoaded } from "./util/util.js"
import { shellExecPromise, getPID } from "./util/exec.js"
import { copyFilePromise } from "./util/file.js"

export class Server {
    constructor() {
        this.filename = "wikipedia-proxy"
    }

    async init() {
        if (!top._deviceready) {
            await CordovaLoaded() // 等待 Cordova 完全加载
        }

        const appDir = top.cordova.file.applicationDirectory
        const dataDir = top.cordova.file.dataDirectory

        const filePath = appDir + "www/bin/" + this.filename

        // 复制文件
        const copiedFileEntry = await copyFilePromise(filePath, dataDir)

        // 获取复制到的文件路径
        const copiedFilePath = copiedFileEntry.nativeURL.replace("file://", "")
        this.copiedFilePath = copiedFilePath

        // 让wikipedia-proxy可执行文件有运行权限
        await shellExecPromise(["chmod", "0777", copiedFilePath])
    }

    /**
     * 运行本地反代服务器
     * @param {number} port 
     * @param {boolean} allowLAN 
     */
    async start(port, allowLAN) {
        const host = allowLAN ? "0.0.0.0" : "127.0.0.1"

        try {
            const res = await shellExecPromise([this.copiedFilePath, "-p", `${port}`, "--host", `${host}`])
            console.log(res.output)
        } catch (res) {
            console.log(res.output)
        }
    }

    /**
     * 停止运行本地反代服务器
     */
    async stop() {
        const PIDs = await getPID(this.filename)

        const promises = PIDs.map(pid => {
            return shellExecPromise(["kill", `${pid}`])
        })

        await Promise.all(promises)
    }

    async isRunning() {
        return (await getPID(this.filename)).length > 0
    }
}

export default Server
