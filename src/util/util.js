/**
 * Cordova 相关工具包
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

export const _version = "1.0.0"

/**
 * 等待 Cordova 完全加载
 * @returns {Promise<void>}
 */
export const CordovaLoaded = () => {
    return new Promise((resolve) => {
        document.addEventListener("deviceready", () => {
            top._deviceready = true
            resolve()
        }, { once: true })
    })
}