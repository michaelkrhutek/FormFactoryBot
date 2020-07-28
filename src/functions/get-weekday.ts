import { Weekday } from "../models/weekday-enum";

function getCurrentWeekday(): Weekday {
    return (new Date()).getDay() - 1;
}

export default getCurrentWeekday;