var Hapi = require('hapi');
var assert = require('assert');

describe('Hapi server', function() {
    var server = null;

    beforeEach(function() {
        server = new Hapi.Server('localhost', '8000', { files: { relativeTo: __dirname } });
    });

    afterEach(function () {
        server = null;
    });

    /*
    it('should be able to register plugin', function(done) {
        server.pack.register({
            plugin: require('../'),
            options: {
                server: server
            }
        }, function (err) {
            assert(err === undefined, 'An error was thrown but should not have been.');
            done();
        });
    });
    */

    it('should be able to run and listen', function(done) {
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
    });
    /*
        it('should be able to register plugin with URL and settings', function(done) {
            server.pack.register({
                plugin: require('../'),
                options: {
                    url: 'mongodb://localhost:27017',
                    settings: {
                        db : {
                            native_parser : false
                        }
                    }
                }
            }, function (err) {
                assert(err === undefined, 'An error was thrown but should not have been.');
                done();
            });
        });

        it('should be able to find the plugin exposed objects', function(done) {
            server.pack.register({
                plugin: require('../'),
                options: {
                    url: 'mongodb://localhost:27017'
                }
            }, function (err) {
                server.route({ method: 'GET', path: '/', handler: function(request, reply) {
                    assert(request.server.plugins['hapi-mongodb'].db, 'Could not find db object');
                    assert(request.server.plugins['hapi-mongodb'].lib, 'Could not find mongodb library');
                    assert(request.server.plugins['hapi-mongodb'].ObjectID, 'Could not find mongodb ObjectID');

                    done();
                }});

                server.inject({ method: 'GET', url: '/' }, function() {});
            });
        });

        it('should use the correct default mongodb url in options', function(done) {
            server.pack.register({
                plugin: require('../')
            }, function () {
                assert(
                        server.pack.plugins['hapi-mongodb'].db.options.url === 'mongodb://localhost:27017',
                    'Default mongodb url was not `mongodb://localhost:27017`'
                );
                done();
            });
        });
        */
});