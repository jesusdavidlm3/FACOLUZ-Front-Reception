export function mergeDateTime(rawDate, rawTime){
    const date = new Date(rawDate)
    const time = new Date(rawTime)

    const year = date.getFullYear()
    const month = date.getMonth()+1 <= 9 ? (`0${date.getMonth()+1}`):(date.getMonth()+1)
    const day = date.getDate() <= 9 ? (`0${date.getDate()}`):(date.getDate())

    const hour = time.getHours() <= 9 ? (`0${time.getHours()}`):(time.getHours())
    const minutes = time.getMinutes() <=9 ? (`0${time.getMinutes()}`):(time.getMinutes())

    const res = `${year}-${month}-${day} ${hour}:${minutes}:00`
    return res
}

export function getAge(date){
    const year = new Date(date).getFullYear()
    const currentDate = new Date(Date.now())
    const currentYear = currentDate.getFullYear()

    return(currentYear-year)
}