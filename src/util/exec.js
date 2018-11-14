
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

/**
 * 获取指定程序的所有进程的PID
 * @param {string} name 程序名称
 */
export const getPID = async (name) => {
    try {
        const { output } = await shellExecPromise(["sh", "-c", `ps | grep $(whoami) | grep ${name}`]) // Android上的ps命令用法似乎和GNU/Linux上的不一致

        return output.split(/\n|\r\n/g).map(x => {
            const r = x.match(/\s+(\d+)/)
            return r && +r[1]
        }).filter(x => !!x)

    } catch (e) {
        return []
    }
}
