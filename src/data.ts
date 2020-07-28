import { Weekday } from "./models/weekday-enum";
import { IData } from "./models/data.interface";
import majkyCredentials from '../majky-credentials.json';
import lenaCredentials from '../lena-credentials.json';

const data: IData[] = [
    {
        credentials: majkyCredentials,
        preferredClasses: [
            { nameIncludes: 'BODYATTACK', weekday: Weekday.Monday, startTime:'18:45' },
            { nameIncludes: 'GRIT', weekday: Weekday.Tuesday, startTime:'17:30' },
            { nameIncludes: 'CXWORX', weekday: Weekday.Tuesday, startTime:'18:15' }
        ]
    },
    {
        credentials: lenaCredentials,
        preferredClasses: [
            { nameIncludes: 'GRIT', weekday: Weekday.Tuesday, startTime:'17:30' },
            { nameIncludes: 'BODYBALANCE', weekday: Weekday.Tuesday, startTime:'18:05' },
            { nameIncludes: 'BODYJAM', weekday: Weekday.Tuesday, startTime:'19:10' },
            { nameIncludes: 'BODYPUMP', weekday: Weekday.Thursday, startTime:'17:20' },
        ]
    }
];

export default data;