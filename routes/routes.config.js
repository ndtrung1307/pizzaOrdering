// const accountRoute = require('./account.route.config');
// const authRoute = require('../auth/auth.routes.config');
exports.routesConfig = (server) => {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            return 'Hello Chou!';
        }
    });
    // authRoute.routesConfig(server);
    // accountRoute.routesConfig(server);
}
