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
            { nameIncludes: 'BODYATTACK', weekday: Weekday.Monday, startTime:'18:45' },
            { nameIncludes: 'GRIT', weekday: Weekday.Tuesday, startTime:'17:30' },
            { nameIncludes: 'CXWORX', weekday: Weekday.Tuesday, startTime:'18:15' }
        ]
    }
];

export default data;