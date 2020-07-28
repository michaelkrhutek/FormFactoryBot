import { IEventPreferenceInfo } from "./event-preference-info-interface";

export interface IData {
    credentials: IUserCredentials;
    preferredClasses: IEventPreferenceInfo[];
}