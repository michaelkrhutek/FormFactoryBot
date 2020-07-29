import app from "./src/app";
import { Weekday } from "./src/models/weekday-enum";
import getWeekdayEvents from "./src/functions/get-weekday-events";

async function startApp(): Promise<void> {
    try {
        console.log('App has started');
        const daysAhedFromToday: number = Number(process.argv[2]) || 0;
        const log = await app(daysAhedFromToday);
        console.log(log);
        console.log('App has ended');
    } catch (err) {
        console.log(err);
    }
}

startApp();