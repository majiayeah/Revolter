/**
 * Revolter
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

import { copyFilePromise } from "./util/file.js"
import { shellExecPromise } from "./util/exec.js"
import { randint } from "./util/random.js"

// 等待 Cordova 完全加载
document.addEventListener("deviceready", async function () {
    const appDir = top.cordova.file.applicationDirectory
    const dataDir = top.cordova.file.dataDirectory

    const filePath = appDir + "www/bin/wikipedia-proxy"

    // 复制文件
    const copiedFileEntry = await copyFilePromise(filePath, dataDir)

    // 获取复制到的文件路径
    const copiedFilePath = copiedFileEntry.nativeURL.replace("file://", "")

    // 让wikipedia-proxy可执行文件有运行权限
    await shellExecPromise(["chmod", "0777", copiedFilePath])

    // 运行本地反代服务器
    // const port = randint(60000, 65500)
    const port = 65500
    try {
        const res = await shellExecPromise([copiedFilePath, "-p", `${port}`])
        console.log(res.output)
    } catch (res) {
        console.log(res.output)
    }

}, { once: true })
