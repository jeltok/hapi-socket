hapi-socket
===========

Socket.IO plugin for Hapi

        server.pack.register({
            plugin: require('../'),
            options: {
                messageHandler: function (socket) {
                    return function (message) {
                        console.log("Message sent!");
                        socket.send(message);
                    };
                },
                logLevel: 6
            }
        }, function (err) {
            server.route({ method: 'GET', path: '/', handler: { file: './chat.html' }});
            server.start(function () {
                console.log("Hapi test server started @ " + server.info.uri);
            });
        });
