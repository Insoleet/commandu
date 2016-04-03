"use strict";

module.exports = function(server) {
    "use strict";

    const IndexController = require('../../controllers/index');
    const AccountController = require('../../controllers/account');

    // Session-persisted message middleware
    server.use((req, res, next) => {
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

    // Session-persisted message middleware
    server.use((req, res, next) => {
        if (req.user) res.locals.user = req.user;
        next();
    });

    server.use('/', IndexController(server));
    server.use('/account', AccountController(server));

    // catch 404 and forward to error handler
    server.use((req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers
    // development error handler
    // will print stacktrace
    if (server.get('env') === 'development') {
        server.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to account
    server.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
