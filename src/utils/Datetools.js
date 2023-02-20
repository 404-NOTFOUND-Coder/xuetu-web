export default class DateTools {
  // 获取当前日期时间“yyyy-MM-dd HH:MM:SS”
  static getNowFormatDate () {
    const date = new Date()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    return date.getFullYear() + '-' + month + '-' + strDate +
      ' ' + date.getHours() + ':' + date.getMinutes() +
      ':' + date.getSeconds()
  }

  // 时间比较（yyyy-MM-dd）
  static compareDate (startDate, endDate) {
    const arrStart = startDate.split('-')
    const startTime = new Date(arrStart[0], arrStart[1], arrStart[2])
    const startTimes = startTime.getTime()
    const arrEnd = endDate.split('-')
    const endTime = new Date(arrEnd[0], arrEnd[1], arrEnd[2])
    const endTimes = endTime.getTime()
    if (endTimes < startTimes) {
      alert('结束时间不能小于开始时间')
      return false
    }
    return true
  }

  // 时间比较（yyyy-MM-dd HH:mm:ss）
  static compareTime (startTime, endTime) {
    const startTimes = startTime.substring(0, 10).split('-')
    const endTimes = endTime.substring(0, 10).split('-')
    startTime = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + startTime.substring(10, 19)
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19)
    const thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000
    if (thisResult < 0) {
      alert('endTime小于startTime！')
    } else if (thisResult > 0) {
      alert('endTime大于startTime！')
    } else if (thisResult === 0) {
      alert('endTime等于startTime！')
    } else {
      return '异常'
    }
  }

  // 获取年
  static getYear () {
    const date = new Date()
    return date.getFullYear()
  }

  // 获取月
  static getMonth () {
    const date = new Date()
    return date.getMonth()
  }

  // 获取日
  static getDay () {
    const date = new Date()
    return date.getDay()
  }

  // 获取时间（HH:MM:SS）
  static getTime () {
    const date = new Date()
    return date.getHours() + ':' + date.getMinutes() +
      ':' + date.getSeconds()
  }

  // 获取日期(yyyy-MM-dd)
  static getDate () {
    const date = new Date()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    return date.getFullYear() + '-' + month + '-' + strDate
  }
}
