var calcApp = angular.module("calcApp", []);

calcApp.directive("calcDirective", function(){
    return{
        restrict : "EA",
        template:'<div class="mainBorder">' +
        '<div> ' +
        '   <input type="text" value="{{result}}" class="right" readOnly/>' +
        '</div>' +
        '<hr/>' +
        '<div ng-repeat="d in button">' +
        '   <input ng-repeat=" n in d" type="button" value="{{n}}" class="button" ng-click="op(n)"/>' +
        '</div>',
        controller : function($scope){

        },
        link : function($scope) {
            $scope.button = [ [ '7', '8', '9', '+' ], [ '4', '5', '6', '-' ], [ '1', '2', '3', '*' ],
                    [ 'C', '0', '=', '/' ] ];

            var data = "1234567890";
            var operate = "+-*/";

            $scope.result = "0";
            var firstParam = "";
            var lastParam = "";
            var operateParam = "";
            // 定义按键数组，将所有操作符
            $scope.op = function(val) {
                debugger;
                if (data.indexOf(val) >=0) {
                    if(operateParam != null){
                        firstParam = "";
                    }
                    firstParam += val;
                    $scope.result = firstParam;

                } else if (operate.indexOf(val) >=0) {
                    operateParam = val;
                    if(firstParam != "" && lastParam != ""){
                        $scope.result = eval(firstParam + val + lastParam);
                    }
                    lastParam = firstParam;
                    firstParam = "";
                } else if("=" == val){
                    $scope.result = eval(firstParam + operateParam + lastParam);
                    lastParam = "";
                    operateParam = ""
                }
            }
        }
    }
});