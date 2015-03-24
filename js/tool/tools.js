(function(angular) {
    var toolsApp = angular.module("toolsApp", []);

    /**
     * 数字控件
     */
    toolsApp.directive("cccNumberInput", function() {
        return {
            restrict : "EA",
            scope : {
                value : "="
            },
            template : "<input ng-model='value' ng-keyup='pressKey()'/>",
            link : function($scope, $element, $attr) {
                $scope.pressKey = function() {
                    $scope.value = $scope.value.replace(/[^\d]/g, '')
                }
            }
        }
    });

})(angular);