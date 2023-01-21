import dayjs from 'dayjs'

export function generateDateFromYearBeginnig() {
  const firstDayOfTheYear = dayjs().startOf('year')
  const today = new Date()

  const dates = []
  let compareDate = firstDayOfTheYear

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  return dates
  //aqui estou comparando as datas e aumentando uma por dia
}
