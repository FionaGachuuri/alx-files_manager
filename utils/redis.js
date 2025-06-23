import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    // Handle errors
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    // Connect to Redis
    this.client.connect()
      .then(() => console.log('Connected to Redis'))
      .catch((err) => console.error('Connection failed:', err));
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error('Error getting key from Redis:', err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value.toString());
    } catch (err) {
      console.error('Error setting key in Redis:', err);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error('Error deleting key from Redis:', err);
    }
  }
}

// Export an instance
const redisClient = new RedisClient();
export default redisClient;
