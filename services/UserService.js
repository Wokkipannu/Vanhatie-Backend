const db = require('../database/db');
const { createHash } = require('../utils/hash');

class UserService {
  static async getUsers() {
    return new Promise((resolve, reject) => {
      db.users.find({}, (err, data) => {
         if (err) return reject(err);
         data.forEach(user => delete user.password);
         return resolve(data);
      });
    });
  }

  static async getUser(id) {
    return new Promise((resolve, reject) => {
      db.users.findOne({ _id: id }, (err, data ) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  static async addUser(user) {
    user.password = createHash(user.password);

    return new Promise((resolve, reject) => {
      db.users.insert(user, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  static async login(username, password) {
    return new Promise((resolve, reject) => {
      db.users.findOne({ username: username }, (err, data) => {
        if (err) return reject(err);
        if (!data) return reject('Invalid username');
        if (data.password === createHash(password)) {
          return resolve(data);
        }
        else {
          return reject('Invalid password');
        }
      });
    });
  }
}

module.exports = UserService;