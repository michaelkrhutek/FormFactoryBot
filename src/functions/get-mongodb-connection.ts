import { MongoClient } from "mongodb";
import { username, password, host, databaseName } from '../../mongodb-credentials.json';

async function getMongoDbConnection(): Promise<MongoClient | null> {
    try {
        const mongoDbClient = new MongoClient(
            `mongodb+srv://${username}:${password}@${host}/${databaseName}?retryWrites=true&w=majority`,
            { useNewUrlParser: true }
        );
        return await mongoDbClient.connect();
    } catch(err) {
        return null;
    }
}

export default getMongoDbConnection;