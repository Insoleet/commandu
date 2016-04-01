"use strict";

var co = require('co');

module.exports = ($scope) => {
    console.log('Init RegisterController.');
    $scope.checkForm = function() {
        console.log($scope.register_form.user_mail);
        console.log($scope.register_form.user_mail_2);
        if ($scope.register_form.user_mail != $scope.register_form.user_mail_2) {
            $scope.wrong_mail = true
        }
        console.log($scope.register_form.user_passwd);
        console.log($scope.register_form.user_passwd_2);

        if ($scope.register_form.user_passwd != $scope.register_form.user_passwd_2) {
            $scope.wrong_password = true
        }
    }
};
