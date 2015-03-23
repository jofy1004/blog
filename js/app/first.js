// 手动启动
var runAngular = function() {
    angular.bootstrap(document.getElementById("helloDiv"));
};

/**
 * 计时器
 * @param $scope
 * @constructor
 */
function ClockController($scope) {
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
}
