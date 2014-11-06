var app = angular.module("app", []);
/**
 * 计时器
 */
app.controller("MyController", [ '$scope', function($scope) {
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
} ]);

/**
 * 表达式
 */
app.controller("WatchController", function($scope, $interpolate) {
    $scope.$watch("watchName", function(newVal, oldVal, scope) {
        $scope.beforeWatchName = oldVal;
        $scope.watchName = newVal;
    });

    $scope.$watch("emailBody", function(value) {
        $scope.mailTo = "xxx@cccis.com";
        if (value) {
            var template = $interpolate(value);
            $scope.previewText = template({
                to : $scope.mailTo
            });
        }

    });
});

/**
 * Click事件触发
 */
app.controller("CalcController", function($scope) {
    $scope.counter = 0;
    $scope.add = function(amount) {
        $scope.counter += amount;
    };
    $scope.subtract = function(amount) {
        $scope.counter -= amount;
    };
});

app.controller("FilterController", function($scope, $filter) {
    $scope.person = {
        name : "world"
    }
    $scope.$watch("person.name", function(val){
        $scope.person.nameLower = $filter("lowercase")(val);
    });
});

app.controller("ShowController", function($scope) {
    $scope.titleInfo = "";
    $scope.timeInfo = "";
    $scope.contentInfo = "";
    var url = "http://jofy1004.github.io/blog/data/dataFile.xml"
    QueryData.query(url).done(function(data) {
        if (data) {
            $scope.titleInfo = $(data).find("title").text();
            $scope.timeInfo = $(data).find("time").text();
            $scope.contentInfo = $(data).find("content").text();
        }
    });
});

$(function() {
    /*$("#boxDiv").draggable({
        scroll : false
    });*/
});
