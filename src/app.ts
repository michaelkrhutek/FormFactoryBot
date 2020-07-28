import getAuthentificationCookie from "./functions/get-authentification-cookie";
import getWeekdayEvents from "./functions/get-weekday-events";
import { Weekday } from "./models/weekday-enum";
import { IEvent } from "./models/event-interface";
import getPreferredEvents from "./functions/get-preferred-events";
import registerForEvent from "./functions/register-for-event";
import { IData } from "./models/data.interface";
import data from './data';
import getWeekday from "./functions/get-weekday";
import { OverallLog } from "./models/overall-log";
import saveOverallLogToDb from "./functions/save-overall-log-to-db";
import saveErrorLogToDb from "./functions/save-error-log-to-db";

async function app(wantedWeekday?: Weekday): Promise<OverallLog[] | null> {
    try {
        const weekday: Weekday = wantedWeekday || getWeekday();
        const logs: OverallLog[] = await Promise.all(
            data.map((userData) => loginAndRegisterForClasses(userData, weekday))
        );
        return logs;
    } catch(err) {
        await saveErrorLogToDb(err);
        return null;
    }
}

async function loginAndRegisterForClasses(userData: IData, weekday: Weekday): Promise<OverallLog> {
    const log: OverallLog = new OverallLog(userData.credentials.username, weekday);
    try {
        log.preferredClasses = userData.preferredClasses;
        const events: IEvent[] = await getWeekdayEvents(weekday);
        log.eventsFound = events;
        const preferredEvents: IEvent[] = getPreferredEvents(events, userData.preferredClasses, weekday);
        log.eventsMatchingPreferredClasses = preferredEvents;
        const cookie = await getAuthentificationCookie(userData.credentials);
        if (cookie) {
            const registredEvents: IEvent[] = await Promise.all(
                preferredEvents.map((e) => registerForEvent(e, userData.credentials.userId, cookie))
            );
            log.registredEvents = registredEvents.filter(e => e);
        }
        return log;
    } catch(err) {
        log.error = err.toString();
        return log;
    } finally {
        await saveOverallLogToDb(log);
    }
}

export default app;