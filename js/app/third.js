(function(angular) {
    var directiveApp = angular.module("directiveApp", []);

    /**
     * 延迟的href
     */
    directiveApp.run(function($rootScope, $timeout) {
        $timeout(function() {
            $rootScope.myHref = "http://www.bing.com";
        }, 5000);
    });

    /**
     * 复制值/复制引用
     */
    directiveApp.controller("FatherController", function($scope) {
        debugger;
        $scope.someValue = "Hello father!";
        $scope.fatherAction = function() {
            $scope.someValue = 'hello human, from parent.';
        };

        /*$scope.some={
            value: "Hello father!"
        };
        $scope.fatherAction = function(){
            $scope.some.value = 'hello human, from parent.';
        };*/
    }).controller("ChildController", function($scope) {
        $scope.childAction = function() {
            $scope.someValue = 'hello human, from child.';
        };
        /*$scope.childAction = function(){
            $scope.some.value = 'hello human, from child.';
        };*/
    });

    /**
     * replace
     */
    directiveApp.directive("cccReplaceDirective", function() {
        // 需要返回一个指令对象
        return {
            // 通过设置项来定义指令，在这里进行覆写
            restrict : "A",
            replace : false,
            template : '<div>Directive里面定义</div>'
        }
    });

    /**
     * 继承与隔离
     */
    directiveApp.controller("FaController", function($scope) {

    }).controller("SonController", function($scope) {

    });

    /**
     * 继承但不隔离
     */
    directiveApp.controller("ExtendButNotController", function($scope) {

    }).directive("cccCustomDirective", function() {
        return {
            restrict : 'A',
            scope : false,
            template : '<div class="border2">内部：{{value}} <input ng-model="value"/></div>'
        }
    });

    /**
     * 继承并隔离
     */
    directiveApp.controller("ExtendAndController", function($scope) {

    }).directive("cccCustomDirectiveTwo", function() {
        return {
            restrict : 'A',
            scope : true,
            template : '<div class="border2">内部：{{value}} <input ng-model="value"/></div>'
        }
    });

    /**
     * 隔离不继承
     */
    directiveApp.controller("IsolationController", function($scope) {

    }).directive("cccCustomDirectiveThree", function() {
        return {
            restrict : 'A',
            scope : {},
            template : '<div class="border2">内部：{{value}} <input ng-model="value"/></div>'
        }
    });

    /**
     * 双向绑定
     */
    directiveApp.controller("BindController", function($scope) {
        $scope.sendMessage = function() {
            alert("sendMessage");
        }
    }).directive("cccBindDirective", function() {
        return {
            scope : {
                dataVal : "@val",
                daVal : "=",
                sendMessage : "&"
            },
            templateUrl : "bindTemplate.html"
        }
    });

    directiveApp.directive("cccTranDirective", function(){
        return{
            restrict: 'A',
            transclude : true,
            template : "<div ng-transclude>内部DIV</div>"
        }
    });


    directiveApp.directive("cccCalcDirective", function() {
        return {
            restrict: "A",
            template: '<div class="mainBorder">\
                        <div>\
                           <input type="text" value="{{result}}" class="right" readOnly/>\
                        </div>\
                        <hr/>\
                        <div ng-repeat="d in button">\
                           <input ng-repeat=" n in d" type="button" value="{{n}}" class="button" ng-click="op(n)"/>\
                      </div>',
            link: function ($scope) {
                $scope.button = [['7', '8', '9', '+'], ['4', '5', '6', '-'], ['1', '2', '3', '*'],
                    ['C', '0', '=', '/']];

                var data = "1234567890";
                var operate = "+-*/";

                $scope.result = "0";
                var firstParam = "";
                var lastParam = "";
                var operateParam = "";
                // 定义按键数组，将所有操作符
                $scope.op = function (val) {
                    if (data.indexOf(val) >= 0) {
                        if (operateParam != null) {
                            firstParam = "";
                        }
                        firstParam += val;
                        $scope.result = firstParam;

                    } else if (operate.indexOf(val) >= 0) {
                        operateParam = val;
                        if (firstParam != "" && lastParam != "") {
                            $scope.result = eval(firstParam + val + lastParam);
                        }
                        lastParam = firstParam;
                        firstParam = "";
                    } else if ("=" == val) {
                        $scope.result = eval(firstParam + operateParam + lastParam);
                        lastParam = "";
                        operateParam = ""
                    } else if("C" == val){
                        $scope.result = "0";
                    }
                }
            }
        }
    });
})(angular);
