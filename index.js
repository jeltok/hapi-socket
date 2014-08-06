// Load modules
var Hoek = require('hoek');
var Socket = require('socket.io');
var io = null;

var internals = {

    defaults: {
        logLevel: 0,
        description: 'A module to support WebSockets by utilizing socket.io. library',
        messageHandler: function (socket) {
            return function (message) {
                socket.send(message);
            };
        },
        disconnectHandler: function (socket) {
            return function () {
                console.log('user disconnected');
            };
        },
        tags: ['hapi', 'socket.io']
    }

};

exports.register = function (plugin, options, next) {

    var settings = Hoek.applyToDefaults(internals.defaults, options);

    plugin.log([ 'hapi-socket', 'info' ], 'Socket.IO initialization started ...');

    io = Socket.listen(plugin.servers[0].listener, { 'log level': settings.logLevel });

    io.sockets.on('connection', function (socket) {
        console.log('a user connected');
        // Setup handlers
        socket.on('message', settings.messageHandler(socket));
        socket.on('disconnect', settings.disconnectHandler(socket));

        // Send session id
        socket.json.send({ type: 'connect', session: socket.id });
    });

    //plugin.expose('io', io);

    plugin.log([ 'hapi-socket', 'info' ], 'Socket.IO initialization done.');

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};
