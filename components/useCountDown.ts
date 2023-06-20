import { ref, computed } from 'vue'
import { parseTime, formatTime } from '../utils'

// vue3中的组合函数
export default (options: any) => {
    // 是否还在倒计时内，控制start/pause、clearTime按钮的禁用
    let isCounting = ref(true)
    // 保存初始倒计时时间，in order to reset time
    const saveInitialTime = options.time
    // 当前剩余倒计时
    const remainTime = ref(options.time)
    const endTime = ref(0)
    // test

    // stop 监听暂停和播放按钮
    const isStop = ref(!options.immediate)
    const switchStopOrPause = () => {
        // 倒计时已经结束
        if(remainTime.value<=0) return
        console.log('switch button: ', isStop.value);
        
        isStop.value = !isStop.value
        // 点击continue按钮的时候继续播放
        if (!isStop.value) {
            endTime.value = Date.now() + remainTime.value
            tickTime()
        }
    }

    // 清空时间
    const toClearTime = () => {
        if (remainTime.value > 0) {
            endTime.value = 0
            setRemainTime(0)
            isCounting.value = false
        }

    }

    //reset time
    const resetTime = () => {

        if (remainTime.value === saveInitialTime) {
            toClearTime()
            return
        }
        remainTime.value = saveInitialTime
        isCounting.value = true

        // 设置倒计时结束的时间戳
        endTime.value = Date.now() + remainTime.value
        // 设置当前的stop状态
        isStop.value = true

    }

    // 格式化输出日期格式
    const currentTime = computed(() => formatTime(options.format, parseTime(remainTime.value)))
    
    // 获取当前的剩余时间
    const getCurrentRemainTime = () => Math.max(0, endTime.value - Date.now())
    
    const setRemainTime = (value:any) => {
        // 更新剩余时间
        remainTime.value = value
        // 倒计时结束
        if (value === 0) {
            // 触发倒计时结束函数
            // console.log('finishhhh func: ', options.onFinish);
            options.onFinish?.()
            isCounting.value = false
        }
    }
    const tickTime = () => {
        requestAnimationFrame(() => {
            setRemainTime(getCurrentRemainTime())
            console.log('ticktimeeeee: ', remainTime.value, isStop.value);
            
            // 如果是暂停状态则不会进行倒计时
            if (remainTime.value > 0 && !isStop.value) {
                tickTime()
            }
        })
    }
    const start = () => {
        // 忽略多次调用, 当前倒计时还未结束，不能重复调用
        if (endTime.value>0) return
        isCounting.value = true

        // 设置倒计时结束的时间戳
        endTime.value = Date.now() + remainTime.value

        // 开启倒计时
        tickTime()

    }
    return {
        currentTime,
        start,
        isStop,
        switchStopOrPause,
        isCounting,
        toClearTime,
        resetTime,

    }
}