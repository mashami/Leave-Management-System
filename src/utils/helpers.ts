import { holidayTypes } from "./types"

export const findDaysBetweenDates = (
  startDateStr: string,
  endDateStr: string
) => {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error(
      "Invalid date format. Please provide dates in the format 'YYYY-MM-DD'."
    )
  }

  const startUTC = Date.UTC(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  )
  const endUTC = Date.UTC(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  )

  const diffMillis = Math.abs(endUTC - startUTC)

  const days = Math.floor(diffMillis / (1000 * 60 * 60 * 24))

  return days
}

// export const isEmailValid = (email: string): boolean => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   return emailRegex.test(email)
// }

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.endsWith('@ist.com')
}


export function formatDate(inputDate: string | number | Date) {
  const date = new Date(inputDate)

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}

export function daysAgo(inputDate: Date) {
  const now = new Date() as any
  const pastDate = new Date(inputDate) as any

  // Calculate the difference in milliseconds
  const diffInMs = now - pastDate

  // Convert milliseconds to days
  const diffInDays = Math.floor(diffInMs / 1000 / 60 / 60 / 24)

  return diffInDays
}


export const holidays: holidayTypes[] = [
  { date: '2025-01-01', title: "New Year's Day" },
  { date: '2025-01-02', title: 'Day after New Year’s Day' },
  { date: '2025-02-01', title: 'National Heroes Day' },
  { date: '2025-02-03', title: 'National Heroes Day (observed)' },
  { date: '2025-03-30', title: 'Eid al-Fitr' },
  { date: '2025-03-31', title: 'Eid al-Fitr Holiday' },
  { date: '2025-04-07', title: 'Genocide Against the Tutsi Memorial Day' },
  { date: '2025-04-18', title: 'Good Friday' },
  { date: '2025-04-21', title: 'Easter Monday' },
  { date: '2025-05-01', title: 'Labor Day' },
  { date: '2025-06-06', title: 'Eid al-Adha' },
  { date: '2025-07-01', title: 'Independence Day' },
  { date: '2025-07-04', title: 'Liberation Day' },
  { date: '2025-08-01', title: 'Umuganura Day' },
  { date: '2025-08-15', title: 'Assumption Day' },
  { date: '2025-12-25', title: 'Christmas Day' },
  { date: '2025-12-26', title: 'Boxing Day' }
];




//  export const holidaysFun = async (): Promise<holidayTypes[]> => {
//   const response = await fetch(
//     `https://calendarific.com/api/v2/holidays?&api_key=YOUR_API_KEY&country=RW&year=2025`
//   );
  
//   const data = await response.json();

//   const holidays: holidayTypes[] = data.response.holidays.map((h: any) => ({
//     date: h.date.iso,
//     title: h.name,
//   }));

//   return holidays;
// };
