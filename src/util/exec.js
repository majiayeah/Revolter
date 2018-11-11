/**
 * 运行一个 shell 子进程并在 shell 上运行命令
 * @author Xmader
 * @param {string | string[]} cmd 
 * @returns {Promise<{ exitStatus: number; output: string; }>}
 */

export const shellExecPromise = (cmd) => {
    return new Promise((resolve, reject) => {
        window.ShellExec.exec(cmd, (res) => {
            if (res.exitStatus == 0) {
                resolve(res)
            } else {
                reject(res)
            }
        })
    })
}