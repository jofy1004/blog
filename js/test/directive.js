var directiveApp = angular.module("directiveApp", []);

/**
 * 自定义指令
 */
directiveApp.directive('myDirective', function() {
    return {
        restrict : 'EAC',
        //replace : true,
        template : function(element, attr) {
            return '<a href="' + attr.value + '">' + attr.text + '</a>';
        }
    }
});

/**
 * 继承与隔离
 */
directiveApp.controller("extendAndIsolation", function($scope) {

}).controller("secondExtendAndIsolation", function($scope) {

});

/**
 * 继承但不隔离
 */
directiveApp.controller("extendButNotController", function($scope) {

}).directive("customDirective", function() {
    return {
        restrict : 'A',
        scope : false,
        template : '<div>内部：{{value}} <input ng-model="value"/></div>'
    }
});

/**
 * 继承并隔离
 */
directiveApp.controller("extendAndController", function($scope) {

}).directive("customDirectiveTwo", function() {
    return {
        restrict : 'A',
        scope : true,
        template : '<div>内部：{{value}} <input ng-model="value"/></div>'
    }
});

/**
 * 隔离不继承
 */
directiveApp.controller("isolationController", function($scope) {

}).directive("customDirectiveThree", function() {
    return {
        restrict : 'A',
        scope : {},
        template : '<div>内部：{{value}} <input ng-model="value"/></div>'
    }
});

directiveApp.directive("paramDirective", function() {
    return {
        restrict : 'A',
        scope : {
            linkUrl : '@',
            linkText : '@'
        },
        template : '<a href="{{linkUrl}}">{{linkText}}</a>'
    }
});

directiveApp
        .directive(
                "bothWayDirective",
                function() {
                    return {
                        restrict : 'A',
                        scope : {
                            linkUrl : '=someAttr',
                            linkText : '@'
                        },
                        template : '<div>自定义的标签：<input ng-model="linkUrl" type="text" placeholder="http://www.bing.com"> <a href="{{linkUrl}}">{{linkText}}</a></div>'
                    }
                });

directiveApp.controller("inController", function($scope, $timeout) {
    $scope.$watch("value", function(value) {
        if (value != null) {
            $timeout(function() {
                $scope.valueHref = "http://www.bing.com";
            }, 500);

            $scope.imgSrc = "../images/test.png";
        }
    });
});

directiveApp.controller("selectController", function($scope) {
    $scope.cities = [ {
        name : 'Seattle'
    }, {
        name : 'San Francisco'
    }, {
        name : 'Chicago'
    }, {
        name : 'New York'
    }, {
        name : 'Boston'
    } ];
});

directiveApp.controller('LotteryController', function($scope) {
    $scope.generateNumber = function() {
        return Math.floor((Math.random() * 10) + 1);
    };
});

directiveApp.directive("sideBox", function() {
    return {
        restrict : 'EA',
        scope : {
            title : '@'
        },
        transclude : true,
        template : '<div><div><h2>{{ title }}</h2><span ng-transclude></span></div></div>'
    }
});

directiveApp.directive('linkDirective', function() {
    return {
        restrict : 'EA',
        transclude : true,
        controller : function($scope, $element, $transclude, $log) {
            $transclude(function(clone) {
                var a = angular.element('<a>');
                a.attr('href', clone.text());
                a.text(clone.text());
                $log.info("Created new a tag in link directive");
                $element.append(a);
            });
        }
    };
});

directiveApp.directive("asDirective", function(){
    return {
        restrict : "A",
        // controllerAs : 'ctrlAs',
        // template : '<h4>{{ctrlAs.name}}</h4>',
        controller : function(){
            this.name = '张三';
        }
    };
});

directiveApp.directive("exampleDirective", function(){
    return{
        restrict : 'EA',
        template : '{{value}}',
        controller : function($scope, $element){
            $scope.value = $scope.value + ";controller";
        },
        link : function(scope, element, attrs){
            scope.value = scope.value + ";link";
        },
        compile : function(element, attrs){
            return {
                pre : function(scope, element, attrs){
                    scope.value = scope.value + ";compile's pre";
                },
                post :function(scope, element, attrs){
                    scope.value = scope.value + ";compile's post";
                }
            }
        }
    }
});

