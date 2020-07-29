import { IEvent } from "../models/event-interface";
import { JSDOM } from 'jsdom';
import { Weekday } from "../models/weekday-enum";
import getUpcomingDayDate from "./get-upcoming-day-date";
import fetch from 'node-fetch';

async function getWeekdayEvents(weekday: Weekday): Promise<IEvent[]> {
    const res = await fetch(`https://vinohradska.formfactory.cz/calendar?day=${getUpcomingDayDate(weekday)}`);
    const body = await res.text();
    const dom = new JSDOM(body);
    const calendarTableElement = dom.window.document.getElementsByClassName('calendar_table')[0];
    const eventElements: HTMLCollectionOf<Element> = calendarTableElement
        .getElementsByTagName('tbody')[0]
        .getElementsByTagName('td')[weekday]
        .getElementsByClassName('event');
    return Array.from(eventElements).map(ee => getDataFromEventElement(ee, weekday));
}

function getDataFromEventElement(eventElement: Element, weekday: Weekday): IEvent {
    const time: string = eventElement.getElementsByClassName('eventlength')[0].innerHTML.trim();
    const [fromTime, toTime] = time.split('-');
    const data: IEvent = {
        id: Number(eventElement.getAttribute('meta:id')),
        name: eventElement.getElementsByClassName('event_name')[0].innerHTML.trim(),
        weekday, fromTime, toTime
    };
    return data;
}

export default getWeekdayEvents;