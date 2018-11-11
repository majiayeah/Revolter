/**
 * 随机数相关工具包
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

export const _version = "1.0.0"

/**
 * 生成一个在 [min, max] 的范围内 (包含两个端点) 的随机整数
 * @param {number} min 
 * @param {number} max 
 */
export const randint = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
