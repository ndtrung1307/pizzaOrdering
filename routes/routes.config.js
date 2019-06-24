const userRoute = require('./user.route.config');
const authRoute = require('../routes/auth.route.config');
const categoryRoute = require('../routes/category.route.config');
const productRoute = require('../routes/product.route.config');
const pizzaOptionRoute = require('../routes/pizzaOption.route.config');

exports.routesConfig = (server) => {

    pizzaOptionRoute.routesconfig(server);
    productRoute.routesconfig(server);
    categoryRoute.routesconfig(server);
    authRoute.routeconfig(server);
    userRoute.routeconfig(server);
};