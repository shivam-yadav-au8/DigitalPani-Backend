import redis from 'redis';
let client;
export async function redis_connection() {
  client = redis.createClient();
  client.on('connect', () => {
  });
}
export async function redis_set(key, val) {
  return new Promise((resolve, reject) => {
    client.set(key, val, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}
export async function redis_get(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}
export async function redis_exp(key, time) {
  return new Promise((resolve, reject) => {
    client.expire(key, time, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}
export async function redis_exists(key) {
  return new Promise((resolve, reject) => {
    client.exists(key, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}
export async function redis_del(key) {
  return new Promise((resolve, reject) => {
    client.del(key, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}
