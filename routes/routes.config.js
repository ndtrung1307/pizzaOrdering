const userRoute = require('./user.route.config');
const authRoute = require('../routes/auth.route.config');
const categoryRoute = require('../routes/category.route.config');
const productRoute = require('../routes/product.route.config');
const pizzaOptionRoute = require('../routes/pizzaOption.route.config');

exports.routesConfig = (server) => {

    server.route({
        method: 'GET',
        path: '/',
        handler: (req,h) => {
            h.response('Welcome to Pizza API').code(200);            
        },
        options: {
            auth: false
        }
    });

    pizzaOptionRoute.routesconfig(server);
    productRoute.routesconfig(server);
    categoryRoute.routesconfig(server);
    authRoute.routeconfig(server);
    userRoute.routeconfig(server);
};