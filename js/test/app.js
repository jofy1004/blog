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
        var emailBody = "Hello {{ to }}：\n{{body}}\n My name is AngelarJS!";
        if (value) {
            var template = $interpolate(emailBody);
            $scope.previewText = template({
                to : $scope.mailTo,
                body : value
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

/**
 * 过滤器
 */
app.controller("FilterController", function($scope, $filter) {
    $scope.person = {
        name : "world"
    };
    $scope.$watch("person.name", function(val) {
        $scope.person.nameLower = val;
    });
});

app.controller("ShowController", function($scope) {
    $scope.titleInfo = "111";
    $scope.timeInfo = "222";
    $scope.contentInfo = "333";
    /*var url = "http://jofy1004.github.io/blog/data/dataFile.xml"
    QueryData.query(url).done(function(data) {
        if (data) {
            $scope.titleInfo = $(data).find("title").text();
            $scope.timeInfo = $(data).find("time").text();
            $scope.contentInfo = $(data).find("content").text();
        }
    });*/
});

/**
 * 继承与隔离
 */
app.controller("extendAndIsolation", function($scope) {

}).controller("secondExtendAndIsolation", function($scope) {

});

/**
 * 继承但不隔离
 */
app.controller("extendButNotController", function($scope) {

}).directive("customDirective", function() {
    return {
        restrict : 'A',
        scope : false,
        priority : 100,
        template : '<div>内部：{{value}} <input ng-model="value"/></div>'
    }
});

/**
 * 继承并隔离
 */
app.controller("extendAndController", function($scope) {

}).directive("customDirectiveTwo", function() {
    return {
        restrict : 'A',
        scope : true,
        priority : 100,
        template : '<div>内部：{{value}} <input ng-model="value"/></div>'
    }
});


/**
 * 隔离不继承
 */
app.controller("isolationController", function($scope) {

}).directive("customDirectiveThree", function() {
    return {
        restrict : 'A',
        scope : {},
        priority : 100,
        template : '<div>内部：{{value}} <input ng-model="value"/></div>'
    }
});

/**
 * 自定义过滤器，功能：首字母大写，其他小写
 */
app.filter("capitalize", function() {
    return function(input) {
        if (input) {
            return input[0].toUpperCase() + input.slice(1).toLowerCase();
        }
    };
});

/**
 * 自定义指令
 */
app.directive('myDerective', function() {
    return {
        restrict : 'EAC',
        template : function(element, attr) {
            return '<a href="' + attr.value + '">' + attr.text + '</a>';
        }
    }
});

$(function() {
    /*$("#boxDiv").draggable({
        scroll : false
    });*/
});
