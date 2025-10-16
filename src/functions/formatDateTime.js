export function mergeDateTime(rawDate, rawTime){
    const date = new Date(rawDate)

    const rawDay = Number(`${rawDate[8]}${rawDate[9]}`)
    const rawMonth = Number(`${rawDate[5]}${rawDate[6]}`)
    const year = Number(`${rawDate[0]}${rawDate[1]}${rawDate[2]}${rawDate[3]}`)

    console.log(rawMonth, year)

    const rawHours = Number(`${rawTime[0]}${rawTime[1]}`)
    const rawMinutes = Number(`${rawTime[3]}${rawTime[4]}`)

    const month = rawMonth <= 9 ? (`0${rawMonth}`):(rawMonth)
    const day = rawDay <= 9 ? (`0${rawDay}`):(rawDay)

    const hour = rawHours <= 9 ? (`0${rawHours}`):(rawHours)
    const minutes = rawMinutes <=9 ? (`0${rawMinutes}`):(rawMinutes)

    const res = `${year}-${month}-${day} ${hour}:${minutes}:00`

    return res
}

export function mergeDate(rawDate){
    const date = new Date(rawDate)
    const year = date.getFullYear()
    const month = date.getMonth()+1 <= 9 ? (`0${date.getMonth()+1}`):(date.getMonth()+1)
    const day = date.getDate() <= 9 ? (`0${date.getDate()}`):(date.getDate())

    const res = `${year}-${month}-${day}`
    return res
}

export function mergeTime(rawTime){
    const time = new Date(rawTime)
    const hour = time.getHours() <= 9 ? (`0${time.getHours()}`):(time.getHours())
    const minutes = time.getMinutes() <=9 ? (`0${time.getMinutes()}`):(time.getMinutes())

    const res = `${hour}:${minutes}:00`
    return res
}

export function getDate(rawDate, reverse){
    const date = new Date(rawDate)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return reverse === true ? `${year}-${month}-${day}` : `${day}-${month}-${year}`
}

export function getTime(rawDate){
    const date = new Date(rawDate)
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    return `${hour}:${minute}`
}




export function getAge(date){
    const year = new Date(date).getFullYear()
    const currentDate = new Date(Date.now())
    const currentYear = currentDate.getFullYear()
    return (currentYear-year)
}