import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '27017';
const database = process.env.DB_DATABASE || 'file_manager';
const url = `mongodb://${host}:${port}`;
// import { MongoClient } from 'mongodb';

// const host = process.argv.DB_HOST || 'localhost';
// const port = process.argv.DB_PORT || '27017';
// const dbName = process.argv.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    this.client = new MongoClient(`mongodb://${host}:${port}`, { useUnifiedTopology: true });
    this._connected = false;
    this.client.connect()
      .then(() => {
        this._connected = true;
        this.db = this.client.db(dbName);
      });
  }

  isAlive() {
    return this._connected;
  }

  async nbUsers() {
    try {
      const nbDocs = await this.db.collection('users').estimatedDocumentCount();
      return nbDocs;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async nbFiles() {
    try {
      const nbDocs = await this.db.collection('files').estimatedDocumentCount();
      return nbDocs;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async filterBy(collection, query) {
    try {
      const result = await this.db.collection(collection).findOne(query);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async insertInto(collection, obj) {
    try {
      const res = await this.db.collection(collection).insertOne(obj);
      return res;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateOne(collection, query, update) {
    try {
      const res = await this.db.collection(collection).updateOne(query, { $set: update });
      return res;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
// class DBClient {
//   constructor() {
//     this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
//     this.db = null;
//     this.connected = false;
//     this.connectPromise = this.client.connect()
//       .then(async () => {
//         this.db = this.client.db(database);
//         this.connected = true;
//         console.log('Connected to MongoDB');

//         // Optional: Ensure collections are created
//         try {
//           await this.db.createCollection('users').catch((err) => {
//             if (err.codeName !== 'NamespaceExists') {
//               console.error(`Users collection error: ${err.message}`);
//             }
//           });

//           await this.db.createCollection('files').catch((err) => {
//             if (err.codeName !== 'NamespaceExists') {
//               console.error(`Files collection error: ${err.message}`);
//             }
//           });
//         } catch (err) {
//           console.error(`Error during collection setup: ${err.message}`);
//         }
//       })
//       .catch((error) => {
//         console.error(`Failed to connect to MongoDB: ${error.message}`);
//       });
//   }

//   isAlive() {
//     return this.connected;
//   }

//   async nbUsers() {
//     await this.connectPromise;
//     return this.db.collection('users').countDocuments();
//   }

//   async nbFiles() {
//     await this.connectPromise;
//     return this.db.collection('files').countDocuments();
//   }

//   async getUser(query) {
//     await this.connectPromise;
//     const user = await this.db.collection('users').findOne(query);
//     console.log(`User found: ${JSON.stringify(user)}`);
//     return user;
//   }
// }

// const dbClient = new DBClient();
// export default dbClient;
