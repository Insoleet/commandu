"use strict";

var co = require('co');

module.exports = ($scope) => {
    $scope.submit = function() {
        console.log("Submit")
    };
};
