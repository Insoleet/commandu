"use strict";

module.exports = function(server) {
    "use strict";

    const IndexController = require('../../controllers/index');
    const AccountController = require('../../controllers/account');

    // Session-persisted message middleware
    server.use(function(req, res, next){
        let err = req.session.error,
            msg = req.session.notice,
            success = req.session.success;

        delete req.session.error;
        delete req.session.success;
        delete req.session.notice;

        if (err) res.locals.error = err;
        if (msg) res.locals.notice = msg;
        if (success) res.locals.success = success;

        next();
    });

    server.use('/', IndexController(server));
    server.use('/account', AccountController(server));


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

    // catch 404 and forward to error handler
    server.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
};
