
import { IEvent } from "../models/event-interface";
import { Weekday } from "../models/weekday-enum";
import { IEventPreferenceInfo } from '../models/event-preference-info-interface';

function getPreferredEvents(allWeekdayEvents: IEvent[], allPreferences: IEventPreferenceInfo[], weekday: Weekday): IEvent[] {
    const weekdayPreferences: IEventPreferenceInfo[] = allPreferences.filter(p => p.weekday == weekday);
    return allWeekdayEvents.filter(e => getDoesEventMatchPreferences(e, weekdayPreferences));
}

function getDoesEventMatchPreferences(event: IEvent, preferences: IEventPreferenceInfo[]): boolean {
    const minStartTime: string = getTimeAdjustedByMinutes(event.fromTime, -30);
    const maxStartTime: string = getTimeAdjustedByMinutes(event.fromTime, 30);
    return preferences.some(preference => {
        if (!event.name.toLowerCase().includes(preference.nameIncludes.toLowerCase())) return false;
        if (!Boolean(event.fromTime >= minStartTime)) return false;
        if (!Boolean(event.fromTime <= maxStartTime)) return false;
        return true;
    });
}

function getTimeAdjustedByMinutes(time: string, addMinutes: number): string {
    const [hours, minutes] = time.split(':').map(v => Number(v));
    const totalMinutes: number = hours * 60 + minutes;
    const newTotalMinutes: number = totalMinutes + addMinutes;
    let newHours: number = Math.floor(newTotalMinutes / 60);
    let newMinutes: number = newTotalMinutes % 60;
    if (newMinutes == 60) {
        newHours++;
        newMinutes = 0;
    }
    newHours = newHours % 24;
    return [newHours, newMinutes].map(v => String(v)).map(v => v.length == 1 ? `0${v}` : v).join(':');
}

export default getPreferredEvents;