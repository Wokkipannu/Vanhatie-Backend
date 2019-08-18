const Datastore = require('nedb');

let db = {};
db.users = new Datastore({ filename: './database/users.db' });
db.players = new Datastore({ filename: './database/players.db' });

db.users.loadDatabase();
db.players.loadDatabase();

module.exports = db;