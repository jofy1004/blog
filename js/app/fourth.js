(function(angular) {
    var serviceApp = angular.module("serviceApp", []);

    /**
     * 创建一个服务
     */
    serviceApp.factory("MyFirstService", function() {

        var loadData = function() {
            var result = {}
            var URL = "http://jofy1004.github.io/blog/data/dataFile.xml";
            QueryData.query(URL).done(function(data) {
                if (data) {
                    result.titleInfo = $(data).find("title").text();
                    result.timeInfo = $(data).find("time").text();
                    result.contentInfo = $(data).find("content").text();
                }
            });
            return result;
        };

        return {
            loadData : loadData
        }

    }).controller("LoadDataController", function($scope, MyFirstService) {
        var data = MyFirstService.loadData();
        $scope.data = data;
    });

})(angular);
