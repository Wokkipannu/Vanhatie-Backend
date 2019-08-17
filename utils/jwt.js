const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { jwtsecret } = require('../config');

module.exports = {
  verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtsecret, (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err);
        }
        resolve(decodedToken);
      });
    });
  },

  createJWTToken(details) {
    if (typeof details !== 'object') {
      details = {}
    }

    if (!details.maxAge || typeof details.maxAge !== 'number') {
      details.maxAge = 360000;
    }

    details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
      if (typeof val !== "function" && key !== "password") {
        memo[key] = val;
      }
      return memo;
    }, {});

    let token = jwt.sign({
      data: details.sessionData
    }, jwtsecret, {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
    });

    return token;
  }
}