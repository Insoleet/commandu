module.exports = () => {

    require('./services/inputs_compare')(angular);
    var commanduApp = angular.module('commanduApp', [
        'ui.router',
        'homeControllers',
        'pascalprecht.translate'
    ]);

    //require('./lib/conf/translate')(duniterApp);
    require('./lib/conf/routes')(commanduApp);

    let homeControllers = angular.module('homeControllers', ['commandu.services']);

    homeControllers.controller('IndexController', require('./controllers/IndexController'));
    homeControllers.controller('AccountController', require('./controllers/main/AccountController'));
};
