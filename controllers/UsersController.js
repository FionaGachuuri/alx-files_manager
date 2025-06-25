<<<<<<< HEAD
import dbClient from '../utils/db';
// eslint-disable-next-line import/named
import { sha1Hash, getUserByToken } from '../utils/auth';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (email === undefined) {
      res.statusCode = 400;
      return res.send({ error: 'Missing email' });
    }
    if (password === undefined) {
      res.statusCode = 400;
      return res.send({ error: 'Missing password' });
    }
    if (await dbClient.filterBy('users', { email }) !== null) {
      res.statusCode = 400;
      return res.send({ error: 'Already exist' });
    }
    const user = await dbClient.insertInto('users', { email, password: sha1Hash(password) });
    if (user !== null) {
      res.statusCode = 201;
      return res.send({ id: user.ops[0]._id, email: user.ops[0].email });
    }
    res.statusCode = 400;
    return res.send({ error: 'Error occured!' });
  }

  static async getMe(req, res) {
    const { user } = await getUserByToken(req);
    if (!user) {
      res.statusCode = 401;
      return res.send({ error: 'Unauthorized' });
    }
    res.statusCode = 200;
    return res.send({ id: user._id, email: user.email });
=======
import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  static async postNew (request, response) {
    const { email, password } = request.body;
    if (!email) {
      response.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      response.status(400).json({ error: 'Missing password' });
    }

    const hashPwd = sha1(password);

    try {
      const collection = dbClient.db.collection('users');
      const user1 = await collection.findOne({ email });

      if (user1) {
        response.status(400).json({ error: 'Already exist' });
      } else {
        collection.insertOne({ email, password: hashPwd });
        const newUser = await collection.findOne(
          { email }, { projection: { email: 1 } }
        );
        response.status(201).json({ id: newUser._id, email: newUser.email });
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: 'Server error' });
    }
  }

  static async getMe (request, response) {
    try {
      const userToken = request.header('X-Token');
      const authKey = `auth_${userToken}`;
      const userID = await redisClient.get(authKey);
      console.log('USER KEY GET ME', userID);
      if (!userID) {
        response.status(401).json({ error: 'Unauthorized' });
      }
      const user = await dbClient.getUser({ _id: ObjectId(userID) });
      response.json({ id: user._id, email: user.email });
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: 'Server error' });
    }
>>>>>>> 086bb10 (Add utils and controllers updates)
  }
}

export default UsersController;