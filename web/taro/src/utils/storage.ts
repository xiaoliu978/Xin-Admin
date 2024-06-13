/**
 * 缓存数据优化
 * const storage = require('@/utils/storage');
 * import storage from '@/utils/storage'
 * 使用方法 【
 *     一、设置缓存
 *         string    storage.set('k', 'string你好啊');
 *         json      storage.set('k', { "b": "3" }, 2);
 *         array     storage.set('k', [1, 2, 3]);
 *         boolean   storage.set('k', true);
 *     二、读取缓存
 *         默认值    storage.get('k')
 *         string    storage.get('k', '你好')
 *         json      storage.get('k', { "a": "1" })
 *     三、移除/清理
 *         移除: storage.remove('k');
 *         清理：storage.clear();
 * 】
 * @type {String}
 */
import Taro from "@tarojs/taro";

const postfix = '_expiry' // 缓存有效期后缀

export default {

  /**
   * 设置缓存
   * @param  {[type]} k [键名]
   * @param  {[type]} v [键值]
   * @param  {[type]} t [时间、单位秒]
   */
  set(k: string, v: any, t: number = 0) {
    Taro.setStorageSync(k, v)
    if (t > 0) {
      let timestamp = Date.parse((new Date()).toString())
      timestamp = timestamp / 1000 + t
      Taro.setStorageSync(k + postfix, timestamp + '')
    } else {
      Taro.removeStorageSync(k + postfix)
    }
  },

  /**
   * 获取缓存
   * @param  {[type]} k   [键名]
   * @param  {[type]} def [获取为空时默认]
   */
  get(k: string, def: any = null) {
    const deadTime = parseInt(Taro.getStorageSync(k + postfix))
    if (deadTime) {
      if (parseInt(deadTime.toString()) < Date.parse((new Date()).toString()) / 1000) {
        if (def) {
          return def
        } else {
          return false
        }
      }
    }
    const res = Taro.getStorageSync(k)
    if (res) {
      return res
    }
    if (def == undefined || def == "") {
      def = false
    }
    return def
  },

  /**
   * 删除指定缓存
   * @param {Object} k
   */
  remove(k: string) {
    Taro.removeStorageSync(k)
    Taro.removeStorageSync(k + postfix)
  },

  /**
   * 清理所有缓存
   * @return {[type]} [description]
   */
  clear() {
    Taro.clearStorageSync()
  }
}
