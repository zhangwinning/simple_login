
const session = require('express-session');

module.exports = function (config) {
	let Store = require('connect-mongo')(session);
    let sessionStore = new Store({
        url: config.db,
        collection: 'sessions'
    });
    return sessionStore;
}