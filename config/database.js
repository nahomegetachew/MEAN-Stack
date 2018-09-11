const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
uri: 'mongodb://localhost:27017/meman-angular-2',
secret: crypto,
db: 'meman-angular-2'
}