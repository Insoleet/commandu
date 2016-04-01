var co = require('co');
var _ = require('underscore');

module.exports = (angular) => {

    angular.module('commandu.services', [])
        .directive('mustRepeat', [
            function () {

                let link = function ($scope, $element, $attrs, ctrl) {
                    let validate = function (viewValue) {
                        if (!viewValue || !$scope.mustRepeat || !$scope.mustRepeat.$viewValue) {
                            // It's valid because we have nothing to compare against
                            ctrl.$setValidity('mustRepeat', true);
                            return viewValue;
                        }
                        // It's valid if model is equal to the model we're comparing against
                        ctrl.$setValidity('mustRepeat', viewValue === $scope.mustRepeat.$viewValue);
                        return viewValue;
                    };

                    ctrl.$parsers.unshift(validate);
                    ctrl.$formatters.push(validate);
                    $attrs.$observe('mustRepeat', function (comparisonModel) {
                        // Whenever the comparison model changes we'll re-validate
                        return validate(ctrl.$viewValue);
                    });

                };

                return {
                    require: 'ngModel',
                    scope: { mustRepeat: '=' },
                    link: link
                };

            }
        ]);
};