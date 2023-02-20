export default class Tools {
  static getUUID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // 随机生成订单
  static getOrder () {
    let RandomSixStr = ''
    for (let i = 0; i < 6; i++) {
      RandomSixStr += String(Math.floor(Math.random() * 10))
    }
    const date = new Date()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    return date.getFullYear() + month + strDate + RandomSixStr
  }
}
