(function(angular) {
    var serviceModule = angular.module("serviceModule", []);

    /**
     * 创建一个服务
     */
    serviceModule.factory("LoadDataService", function() {
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
    })

})(angular);