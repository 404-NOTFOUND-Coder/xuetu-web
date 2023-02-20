export default class Rulestools {
  /**
   * @param {string} path  判断字符串是否是https?:|mailto:|tal: 开头的
   * @returns {Boolean}
   */
  static isExternal (path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }

  /**
   * @param {string} str  判断都是小写字母
   * @returns {Boolean}
   */
  static validLowerCase (str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
  }

  /**
   * @param {string} str  判断都是大写字母
   * @returns {Boolean}
   */
  static validUpperCase (str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
  }

  /**
   * @param {string} str  判断是否是字母
   * @returns {Boolean}
   */
  static validAlphabets (str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
  }

  /**
   * @param {string} str 判断是否字符串
   * @returns {Boolean}
   */
  static isString (str) {
    return typeof str === 'string' || str instanceof String
  }

  /**
   * @param {Array} arg  判断是否是数组
   * @returns {Boolean}
   */
  static isArray (arg) {
    if (typeof Array.isArray === 'undefined') {
      return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 校验邮箱
   */
  static validateEMail (rule, value, callback) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!value) {
      callback(new Error('邮箱不能为空'))
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 手机号
   */
  static validatePhone (rule, value, callback) {
    const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    if (!value) {
      callback(new Error('手机号不能为空'))
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 固定电话
   */
  static validateTelphone (rule, value, callback) {
    const reg = /0\d{2,3}-\d{7,8}/
    if (!value) {
      callback(new Error('固定电话不能为空'))
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入正确的固定电话）'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 身份证
   */
  static validateIdNo (rule, value, callback) {
    const reg = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 正整数
   */
  static validateInteger (rule, value, callback) {
    const reg = /^\+?[1-9]\d*$/
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 小写字母
   */
  static validateLowerCase (rule, value, callback) {
    const reg = /^[a-z]+$/
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入小写字母'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 大写字母
   */
  static validateUpperCase (rule, value, callback) {
    const reg = /^[A-Z]+$/
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入小写字母'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 数字字母下划线
   */
  static validateBaseData (rule, value, callback) {
    const reg = /^[a-zA-Z0-9_]{4,16}$/
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入数字字母下划线'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * url
   */
  static validateUrl (rule, value, callback) {
    const reg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-()]*[\w@?^=%&/~+#-()])?$/
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入合法地址'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 密码  （最少八位，包含一个大写字母，一个小写字母，一个数字，一个字符）
   */
  static validatePass (rule, value, callback) {
    const reg = /^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
    if (value === '' || value === undefined || value == null) {
      callback(new Error('请输入密码'))
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入8-16个数字、字母的组合'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 只能输入中文
   */
  static validateHan (rule, value, callback) {
    const reg = /^[\u4e00-\u9fa5·]{2,16}$/
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入中文'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * IPv4
   */
  static validateIPv4 (rule, value, callback) {
    const reg = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('不合法IPV4'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * IPv6
   */
  static validateIPv6 (rule, value, callback) {
    const reg = /^(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))|\[(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/i
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('不合法IPV6'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * MAC
   */
  static validateMAC (rule, value, callback) {
    const reg = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('不合法MAC'))
      } else {
        callback()
      }
    }
  }

  /**
   * @param {string} value
   * @returns {Boolean}
   * 数字
   */
  static validatenum (rule, value, callback) {
    const reg = /^-?\d*\.?\d+$/
    if (value === '' || value === undefined || value == null) {
      callback()
    } else {
      if ((!reg.test(value)) && value !== '') {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
  }
}
