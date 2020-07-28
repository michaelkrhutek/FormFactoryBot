import { OverallLog } from "../models/overall-log";
import getMongoDbConnection from "./get-mongodb-connection";
import { databaseName } from '../../mongodb-credentials.json';
import { Db } from "mongodb";

async function saveOverallLogToDb(overallLog: OverallLog): Promise<void> {
    const connection = await getMongoDbConnection();
    if (!connection) return;
    try {
        const db: Db = connection.db(databaseName);
        await db.collection('overall-logs').insertOne({ created: (new Date()).toISOString(), log: overallLog });
    } catch(err) {
        console.log(err);
    } finally {
        await connection.close();
    }
}

export default saveOverallLogToDb;