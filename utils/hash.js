const crypto = require('crypto');

module.exports = {
  createHash(str) {
    const hash = crypto.createHmac('sha256', 'zS0RB58qgr')
      .update(str)
      .digest('hex');
    return hash;
  }
}