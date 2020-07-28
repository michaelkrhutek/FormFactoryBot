
import { IEvent } from "../models/event-interface";
import { Weekday } from "../models/weekday-enum";
import { IEventPreferenceInfo } from '../models/event-preference-info-interface';

function getPreferredEvents(allWeekdayEvents: IEvent[], allPreferences: IEventPreferenceInfo[], weekday: Weekday): IEvent[] {
    const weekdayPreferences: IEventPreferenceInfo[] = allPreferences.filter(p => p.weekday == weekday);
    return allWeekdayEvents.filter(e => getDoesEventMatchPreferences(e, weekdayPreferences));
}

function getDoesEventMatchPreferences(event: IEvent, preferences: IEventPreferenceInfo[]): boolean {
    const eventTimeInMinutes: number = getTimeInMinutes(event.fromTime);
    return preferences.some(preference => {
        const preferenceTimeInMinutes: number = getTimeInMinutes(preference.startTime);
        if (!event.name.toLowerCase().includes(preference.nameIncludes.toLowerCase())) return false;
        if (!Boolean(eventTimeInMinutes >= preferenceTimeInMinutes - 30)) return false;
        if (!Boolean(eventTimeInMinutes <= preferenceTimeInMinutes + 30)) return false;
        return true;
    });
}

function getTimeInMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(v => Number(v));
    return hours * 60 + minutes;
}

export default getPreferredEvents;