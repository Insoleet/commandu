var co = require('co');
var _ = require('underscore');

module.exports = (app) => {

    app.config(['$stateProvider', '$urlRouterProvider',
        ($stateProvider, $urlRouterProvider) => {
            // States
            $stateProvider.state('index', {
                url: '/',
                template: require('views/index'),
                controller: 'IndexController'
            }).state('account.login', {
                url: '/account/login',
                template: require('views/account/login'),
                controller: 'AccountController'
            }).state('account.register', {
                url: '/account/register',
                template: require('views/account/register'),
                controller: 'AccountController'
            });

            // Default route
            $urlRouterProvider.otherwise('/');
        }
    ]);
};
