(function(angular, document) {
    var secondApp = angular.module("secondApp", []);

    /**
     * 计时器
     * @param $scope
     */
    var initClock = function($scope) {
        $scope.clock = {
            now : new Date().Format("yyyy-MM-dd hh:mm:ss")
        };

        var updateClock = function() {
            $scope.clock.now = new Date().Format("yyyy-MM-dd hh:mm:ss");
        };

        setInterval(function() {
            $scope.$apply(updateClock);
        }, 1000);

        updateClock();
    };

    /**
     * 创建Controller
     */
    secondApp.controller("MyController", initClock);

    /**
     * click事件
     */
    secondApp.controller("CalcController", function($scope) {
        $scope.counter = 0;
        $scope.add = function(amount) {
            $scope.counter += amount;
        };
        $scope.subtract = function(amount) {
            $scope.counter -= amount;
        };
    });

    /**
     * 继承
     */
    secondApp.controller("FatherController", function($scope) {
        $scope.name = "father";
    }).controller("SonController", function($scope) {
        // $scope.name= "son";
    });

    /**
     * 表达式的使用
     */
    secondApp.controller("ExprController", function($scope, $parse) {
        // 1+1
        // aa={a:1};aa.a;
        $scope.$watch("param", function(newVal, oldVal, scope) {
            $scope.result = $parse(newVal)();
            //$scope.result= $parse(newVal)(scope);
        })
    });

    /**
     * 自定义配置
     * @type {module}
     */
    var secondAppOther = angular.module("secondAppOther", []);
    secondAppOther.config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('%%');
        $interpolateProvider.endSymbol('%%');
    }]);
    // 手动启动
    angular.bootstrap(document.getElementById("secondAppOther"), ["secondAppOther"]);

    /**
     * 函数过滤器
     */
    secondApp.controller("FunController", function($scope){
        $scope.isCapitalized = function(str){
            return str[0] == str[0].toUpperCase();
        }
    });

    /**
     * 自定义过滤器
     */
    secondApp.filter("customFilter", function() {
        return function(str) {
            if (str) {
                var strArray = str.split("_");
                var result= "";
                for ( var i = 0; i < strArray.length; i++) {
                    if(strArray[i][0]){
                        var tmp = strArray[i][0].toUpperCase() + strArray[i].slice(1);
                        result += tmp;
                    }

                }
                return result;
            }
        }
    });

})(angular, document);
