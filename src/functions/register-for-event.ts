import { IEvent } from "../models/event-interface";
import fetch from 'node-fetch';
import FormData from 'form-data';

async function registerForEvent(event: IEvent, userId: number, cookie: string): Promise<void> {
    const headers: string[][] = [['cookie', cookie]];
    const formData: FormData = new FormData();
    formData.append('id', event.id.toString());
    formData.append('memberID', userId.toString());
    formData.append('promoCodeID', '');
    formData.append('promoCode', '');
    const res = await fetch('https://vinohradska.formfactory.cz/Schedule/RegisterForClass', {
        method: 'POST',
        headers: headers,
        body: formData
    });
    console.log(res);
}

export default registerForEvent;