import { Weekday } from "../models/weekday-enum";

function getUpcomingDayDate(weekday: Weekday): string {
    const currentDate: Date = new Date();
    const currentDay: number = currentDate.getDay() - 1;
    const addDays: number = weekday > currentDay ? weekday - currentDay : weekday - currentDay + 7;
    const weekdayDate: Date = new Date();
    weekdayDate.setDate(weekdayDate.getDate() + addDays);
    return `${weekdayDate.getDate()}-${weekdayDate.getMonth() + 1}-${weekdayDate.getFullYear()}`;
}

export default getUpcomingDayDate;