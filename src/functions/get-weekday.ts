import { Weekday } from "../models/weekday-enum";

function getWeekday(): Weekday {
    return ((new Date()).getDay() + 1) % 7;
}

export default getWeekday;