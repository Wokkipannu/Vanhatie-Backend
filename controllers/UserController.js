const UserService = require('../services/UserService');
const Util = require('../utils/Utils');
const Socket = require('../utils/socket');
const { createJWTToken } = require('../utils/auth');

const util = new Util();

class UserController {
  static async getUsers(req, res) {
    try {
      UserService.getUsers()
        .then(users => {
          if (users.length > 0) {
            util.setSuccess(200, 'Users retrieved', users);
            return util.send(res);
          }
          else {
            util.setSuccess(200, 'No players found');
            return util.send(res);
          }
        })
        .catch(error => {
          util.setError(400, error);
          return util.send(res);
        });
    }
    catch(error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getUser(req, res) {
    const { id } = req.params;

    if (!id) {
      util.setError(400, 'Please provide a valid id');
      return util.send(res);
    }

    try {
      UserService.getUser(id)
        .then(user => {
          if (user) {
            util.setSuccess(200, 'User found', user);
            return util.send(res);
          }
          else {
            util.setError(404, `Could not find user with the given id: ${id}`);
            return util.send(res);
          }
        })
        .catch(error => {
           util.setError(400, error);
           return util.send(res);
        });
    }
    catch(error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      util.setError(400, 'Missing required information');
      return util.send(res);
    }

    try {
      UserService.addUser({ username: username, password: password })
        .then(user => {
          if (user) {
            util.setSuccess(201, 'User added', user);
            return util.send(res);
          }
          else {
            util.setError(400, 'Could not add user');
            return util.send(res);
          }
        })
        .catch(error => {
          util.setError(400, error);
          return util.send(res);
        })
    }
    catch(error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;

    try {
      UserService.login(username, password)
        .then(user => {
          if (user) {
            util.setSuccess(200, 'Success login', createJWTToken({ sessionData: user, maxAge: 360000 }));
            return util.send(res);
          }
          else {
            util.setSuccess(200, `Could not find user with given username: ${username}`);
            return util.send(res);
          }
        })
        .catch(error => {
          util.setError(404, error);
          return util.send(res);
        });
    }
    catch(error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

module.exports = UserController;