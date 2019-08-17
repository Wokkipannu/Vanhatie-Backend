const PlayerService = require('../services/PlayerService');
const Util = require('../utils/Utils');
const Socket = require('../utils/socket');

const util = new Util();

class PlayerController {
  static async getPlayers(req, res) {
    try {
      PlayerService.getPlayers()
        .then(players => {
          if (players.length > 0) {
            util.setSuccess(200, 'Players retrieved', players)
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

  static async getPlayer(req, res) {
    const { id } = req.params;

    if (!id) {
      util.setError(400, 'Please provide a valid id');
      return util.send(res);
    }

    try {
      PlayerService.getPlayer(id)
        .then(player => {
          if (player) {
            util.setSuccess(200, 'Player found', player);
            return util.send(res);
          }
          else {
            util.setError(404, `Could not find player with given id: ${id}`);
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

  static async addPlayer(req, res) {
    const { name, dkp } = req.body;
    if (!name || !dkp) {
      util.setError(400, 'Missing required information');
      return util.send(res);
    }

    try {
      PlayerService.addPlayer({ name: name, dkp: dkp })
        .then(player => {
          if (player) {
            util.setSuccess(201, 'Player added', player);
            Socket.emit('newPlayer', player);
            return util.send(res);
          }
          else {
            util.setError(400, 'Could not add player');
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

  static async removePlayer(req, res) {
    const { id } = req.params;

    if (!id) {
      util.setError(400, 'Please provide a valid id');
      return util.send(res);
    }

    try {
      PlayerService.removePlayer(id)
        .then(player => {
          if (player) {
            util.setSuccess(200, 'Player removed', player);
            Socket.emit('removePlayer', player);
            return util.send(res);
          }
          else {
            util.setError(400, 'Could not remove player');
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

  static async updatePlayer(req, res) {
    const player = req.body;

    const { id } = req.params;

    if (!id) {
      util.setError(400, 'Please provide a valid id');
      return util.send(res);
    }

    try {
      PlayerService.updatePlayer(id, player)
        .then(player => {
          if (player) {
            util.setSuccess(200, 'Player updated', player)
            Socket.emit('updatePlayer', player);
            return util.send(res);
          }
          else {
            util.setError(400, 'Could not update player');
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
}

module.exports = PlayerController;