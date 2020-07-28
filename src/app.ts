import getAuthentificationCookie from "./functions/get-authentification-cookie";
import getWeekdayEvents from "./functions/get-weekday-events";
import { Weekday } from "./models/weekday-enum";
import { IEvent } from "./models/event-interface";
import getPreferredEvents from "./functions/get-preferred-events";
import registerForEvent from "./functions/register-for-event";
import { IData } from "./models/data.interface";
import data from './data';
import getCurrentWeekday from "./functions/get-weekday";

async function app(): Promise<any> {
    console.log('App has started');
    data.forEach(async (userData) => await loginAndRegisterForClasses(userData));
    console.log('App has ended');
}

async function loginAndRegisterForClasses(userData: IData): Promise<void> {
    try {
        const weekday: Weekday = getCurrentWeekday();
        const events: IEvent[] = await getWeekdayEvents(weekday);
        console.log(events);
        const preferredEvents: IEvent[] = getPreferredEvents(events, userData.preferredClasses, weekday);
        console.log(preferredEvents);
        const cookie = await getAuthentificationCookie(userData.credentials);
        console.log(cookie);
        if (cookie) {
            preferredEvents.forEach(async (e) => await registerForEvent(e, userData.credentials.userId, cookie));
        }
    } catch(err) {
        console.log(err);
    }
}

export default app;