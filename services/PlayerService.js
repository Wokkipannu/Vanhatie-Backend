const db = require('../database/db');

class PlayerService {
  static async getPlayers() {
    return new Promise((resolve, reject) => {
      db.players.find({}, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static async getPlayer(id) {
    return new Promise((resolve, reject) => {
      db.players.findOne({ _id: id }, (err, data) => {
         if (err) reject(err);
         resolve(data);
      });
    });
  }

  static async addPlayer(player) {
    return new Promise((resolve, reject) => {
      db.players.insert(player, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static async removePlayer(id) {
    return new Promise((resolve, reject) => {
      db.players.remove({ _id: id }, {}, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static async updatePlayer(id, player) {
    return new Promise((resolve, reject) => {
      db.players.update({ _id: id }, { $set: player }, {}, (err, data) => {
        if (err) reject(err);
        db.players.findOne({ _id: id }, (err, p) => {
          if (err) reject(err);
          resolve(p);
        });
      });
    });
  }
}

module.exports = PlayerService;