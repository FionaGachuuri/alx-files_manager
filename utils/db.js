import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '27017';
const database = process.env.DB_DATABASE || 'file_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.db = null;
    this.connected = false;

    this.connectPromise = this.client.connect()
      .then(async () => {
        this.db = this.client.db(database);
        this.connected = true;
        console.log('Connected to MongoDB');

        // Optional: Ensure collections are created
        try {
          await this.db.createCollection('users').catch((err) => {
            if (err.codeName !== 'NamespaceExists') {
              console.error(`Users collection error: ${err.message}`);
            }
          });

          await this.db.createCollection('files').catch((err) => {
            if (err.codeName !== 'NamespaceExists') {
              console.error(`Files collection error: ${err.message}`);
            }
          });
        } catch (err) {
          console.error(`Error during collection setup: ${err.message}`);
        }
      })
      .catch((error) => {
        console.error(`Failed to connect to MongoDB: ${error.message}`);
      });
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    await this.connectPromise;
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    await this.connectPromise;
    return this.db.collection('files').countDocuments();
  }

  async getUser(query) {
    await this.connectPromise;
    const user = await this.db.collection('users').findOne(query);
    console.log(`User found: ${JSON.stringify(user)}`);
    return user;
  }
}

const dbClient = new DBClient();
export default dbClient;
