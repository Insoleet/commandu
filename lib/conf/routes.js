"use strict";

module.exports = function(server) {
    "use strict";

    const indexController = require('../../controllers/index');
    const accountController = require('../../controllers/account');

    server.use('/', indexController(server));
    server.use('/account', accountController(server));

    // catch 404 and forward to error handler
    server.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


    // error handlers
    // development error handler
    // will print stacktrace
    if (server.get('env') === 'development') {
        server.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to account
    server.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
