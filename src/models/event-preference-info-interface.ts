import { Weekday } from "./weekday-enum";

export interface IEventPreferenceInfo {
    nameIncludes: string;
    weekday: Weekday;
    startTime: string;
}