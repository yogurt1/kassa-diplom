const http = require('http');
const app = require('./server');
const config = require('./server/config');
const server = new http.Server();

server.on('request', app.callback())
server.on('listening', (error) => {
    if (error) {
        throw error;
    }

    console.log('App listening on port', config.port);
});

server.listen({
    port: config.port,
    host: config.host
});
