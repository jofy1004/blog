(function(angular) {
    var serviceApp = angular.module("serviceApp", [ "serviceModule" ]);

    /**
     * 创建一个服务并推断式注入
     */
    serviceApp.factory("MyFirstService", function() {
        /**
         * 加载数据
         * @returns {*}
         */
        var loadData = function(url) {
            var deferred = new $.Deferred();
            QueryData.query(url).done(function(data) {
                var result = {};
                result.titleInfo = $(data).find("title").text();
                result.timeInfo = $(data).find("time").text();
                result.contentInfo = $(data).find("content").text();

                deferred.resolve(result);
            });
            return deferred.promise();
        };

        return {
            loadData : loadData
        }
    }).controller("LoadDataController", function($scope, MyFirstService) {
        var URL = "http://jofy1004.github.io/blog/data/dataFile.xml";
        MyFirstService.loadData(URL).done(function(result) {
            $scope.$apply(function() {
                $scope.data = result;
            });
        });
    });

    /**
     * 显式注入声明
     */
    ReloadDataController.$inject = [ '$scope', 'LoadDataService' ];

    function ReloadDataController($scope, load) {
        var url = "http://jofy1004.github.io/blog/data/dataFile.xml";
        load.loadData(url).done(function(result) {
            $scope.$apply(function() {
                $scope.data = result;
            });
        });
    }
    serviceApp.controller("ReloadDataController", ReloadDataController);

    /**
     * 行内注入声明
     */
    serviceApp.controller("lineDataController", [ "$scope", "LoadDataService", function($scope, load) {
        //var url = "http://jofy1004.github.io/blog/data/menu.xml";
        var url = "http://jofy1004.github.io/blog/data/dataFile.xml";
        load.loadData(url).done(function(result) {
            $scope.$apply(function() {
                $scope.data = result;
            });
        });
    } ]);

})(angular);
