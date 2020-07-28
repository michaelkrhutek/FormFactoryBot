import getMongoDbConnection from "./get-mongodb-connection";
import { databaseName } from '../../mongodb-credentials.json';
import { Db } from "mongodb";

async function saveErrorLogToDb(err: Error): Promise<void> {
    const connection = await getMongoDbConnection();
    if (!connection) return;
    try {
        const db: Db = connection.db(databaseName);
        await db.collection('error-logs').insertOne({ created: (new Date()).toISOString(), error: err.toString() });
    } catch(err) {
        console.log(err);
    } finally {
        await connection.close();
    }
}

export default saveErrorLogToDb;