var customTagParser = angular.module("customTagParser", []);
/**
 *  自定义开始和结尾，默认为{{}}更新数据，现在改为[[]]
 */
customTagParser.config([ "$interpolateProvider", function($interpolateProvider) {
    $interpolateProvider.startSymbol("--");
    $interpolateProvider.endSymbol("--");
} ]);

customTagParser.factory("CustomTagParser", [ '$interpolate', function($interpolate) {
    return {
        parse : function(text, context) {
            var template = $interpolate(text);
            return template(context);

        }
    };
} ]);

/********************************** 自定义开头和结尾标签的controller *******************************************/

var tagParser = angular.module("tagParser", ["customTagParser"]);

/**
 * 自定义的开头和结尾标签
 */
tagParser.controller("CustomTagController", ["$scope", "CustomTagParser", function($scope, CustomTagParser) {
    $scope.to = "test";
    $scope.$watch("customTagBody", function(value) {
        if (value) {
            $scope.customTagPreviewText = CustomTagParser.parse(value, {
                to : $scope.to
            });
        }
    });
} ]);