import { IEventPreferenceInfo } from "./event-preference-info-interface";
import { IEvent } from "./event-interface";

export class OverallLog {

    constructor(username: string, weekday: number) {
        this.username = username;
        this.weekday = weekday;
    }

    username: string;
    weekday: number;
    eventsFound: IEvent[] = [];
    preferredClasses: IEventPreferenceInfo[] = [];
    eventsMatchingPreferredClasses: IEvent[] = [];
    registredEvents: IEvent[] = [];
    error: string = '';
}