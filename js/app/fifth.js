(function(angular) {
    var requestApp = angular.module("requestApp", [ "httpModule" ]);

    requestApp.controller("HttpController", loadJson);

    loadJson.$inject = [ "$scope", "ajaxService" ];

    function loadJson($scope, http) {
        var url = "http://jofy1004.github.io/blog/data/jsonData.json";
        var result = http.httpRequest(url);

        // 成功返回
        result.success(function(data, stauts, headers, config) {
            $scope.data = data;
            $scope.stauts = stauts;
            $scope.headers = headers();
            $scope.config = config;
        });

        // 异常返回
        result.error(function(data, stauts, headers, config) {

        });

        // 响应对象返回
        result.then(function(response) {
            // 返回一个响应对象
        }, function(response) {
            // 返回一个带有错误信息的响应对象
        });

    }

    /**
     * Get方式请求
     */
    requestApp.controller("GetController", loadJsonUseGet);

    loadJsonUseGet.$inject = [ "$scope", "ajaxService" ];

    function loadJsonUseGet($scope, http) {
        var url = "http://jofy1004.github.io/blog/data/jsonData.json";
        var result = http.httpGet(url);
        result.then(function(response) {
            $scope.data = response.data;
        });
    }

    /**
     * Post方式请求
     */
    requestApp.controller("PostController", loadJsonUsePost);

    loadJsonUsePost.$inject = [ "$scope", "ajaxService" ];

    function loadJsonUsePost($scope, http) {
        var url = "http://jofy1004.github.io/blog/data/jsonData.json";
        var result = http.httpPost(url);
        result.error(function(data, stauts, headers, config) {
            $scope.stauts = stauts;
        }).then(function(resp) {
            $scope.stauts = resp;
        }, function(resp) {
            $scope.response = resp;
        });
    }

})(angular);
