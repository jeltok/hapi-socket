hapi-socket
===========

Socket.IO plugin for Hapi

Sample usage code:

        server.pack.register({
            plugin: require('hapi-socket'),
            options: {
                messageHandler: function (socket) {
                    return function (message) {
                        console.log("Message sent!");
                        socket.send(message);
                    };
                },
                logLevel: 2
            }
        }, function (err) {
            server.start(function () {
                console.log("Hapi server started @ " + server.info.uri);
            });
        });
