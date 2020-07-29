import { Weekday } from "../models/weekday-enum";

function getWeekday(daysAheadFromToday: number): Weekday {
    const verifiedDaysAheadFromToday: number = daysAheadFromToday % 7;
    return ((new Date()).getDay() - 1 + verifiedDaysAheadFromToday) % 7;
}

export default getWeekday;