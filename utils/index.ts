const SECOND = 1000 // 1s=1000ms
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export const parseTime = (time: any) => {
    const days = Math.floor(time / DAY)
    const hours = Math.floor((time % DAY) / HOUR)
    const minutes = Math.floor((time % HOUR) / MINUTE)
    const seconds = Math.floor((time % MINUTE) / SECOND)
    const millSeconds = Math.floor(time % SECOND)
    return {
        days,
        hours,
        minutes,
        seconds,
        millSeconds
    }
}

export const formatTime = (format:any, time:any) => {
    let { days, hours, minutes, seconds, millSeconds } = time
    if (format.includes('DD')) {
        format = format.replace('DD', padZero(days))
    } else {
        hours += days * 24
        days = 0
    }

    if (format.includes('HH')) {
        format = format.replace('HH', padZero(hours))
    } else {
        minutes += hours * 60
        hours = 0
    }

    if (format.includes('mm')) {
        format = format.replace('mm', padZero(minutes))
    } else {
        seconds += minutes * 60
        minutes = 0
    }
    
    if (format.includes('ss')) {
        format = format.replace('ss', padZero(seconds))
    } else {
        millSeconds += seconds * 1000
        seconds = 0
    }

    if (format.includes('SSS')) {
        format = format.replace('SSS', padZero(millSeconds,3))
    }
// 返回最终格式化的时间format
    return {format, days, hours,minutes,seconds,millSeconds}

}
export const padZero = (str:any, actualLength=2) => {
    str += ''
    let strLen = str.length 
    if (strLen < actualLength) {
        str  = '0'.repeat(actualLength-strLen) + str
    }
    return str
}
