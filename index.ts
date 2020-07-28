import app from "./src/app";
import { Weekday } from "./src/models/weekday-enum";

async function startApp(): Promise<void> {
    try {
        console.log('App has started');
        const weekday: Number | undefined = Number(process.argv[2]);
        const log = await app(weekday as Weekday);
        console.log(log);
        console.log('App has ended');
    } catch (err) {
        console.log(err);
    }
}

startApp();