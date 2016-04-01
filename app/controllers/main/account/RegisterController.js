"use strict";

var co = require('co');

module.exports = ($scope) => {
    console.log('Init RegisterController.');
    $scope.checkForm = function() {
        if ($scope.register_form.mail != $scope.register_form.mail_2) {

        }
    }
};
