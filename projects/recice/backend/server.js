const http = require('http');
const app = require('./app');
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const adress = server.address;
    const bind = typeof adress === 'string' ? 'pipe' + adress : 'port:' + port;
    switch (error.code) {
        case EACESS:
            console.error(bind + 'requires elevated privilages');
            process.exit(1);
            break;
        case EADDRINUSE:
            console.error(bind + ' is already in use');
            process.exit(1);
            break;

        default:
            throw error;
    }
};


// app.set('app', process.env.PORT || 3000);
const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
    const adress = server.adress;
    const bind = typeof adress === 'string' ? 'pipe' + adress : 'port:' + port;
    console.log('server is listening' + bind);
})

server.listen(port);