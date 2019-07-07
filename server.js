require('dotenv').config();
const Hapi = require('@hapi/hapi');
const config = require('./src/common/config/env.config');
const routesConfig = require('./src/routes/routes.config');

const dbConnect = require('./src/util/database');



const init = async () => {

    const server = Hapi.server({
        port: config.port
    });


    await server.register([{
        plugin: require('./src/plugins/hapi-autho/autho.hapi')
    }, {
        plugin: require('./src/plugins/jwt-auth/jwt.auth')
    }, {
        plugin: require('./src/plugins/hapi-swagger/hapi-swagger')
    }]);

    server.auth.default('Bearer');
    
    routesConfig.routesConfig(server);
    dbConnect;
    await server.start((err) =>{
        if (err) {
            throw err;
        }
        console.log('Server running on %s', server.info.uri);
    });
};



process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
