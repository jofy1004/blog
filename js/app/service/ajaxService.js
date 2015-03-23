(function(angular) {
    var httpModule = angular.module("httpModule", []);

    httpModule.factory("ajaxService", loadData);

    loadData.$inject = [ "$http" ];

    function loadData(http) {

        /**
         *  http请求
         */
        var httpRequest = function(url) {
            return http({
                method : 'GET',
                url : url,
                param : {}
            })
        };

        /**
         * get请求
         * @param url
         * @returns {*}
         */
        var httpGet = function(url) {
            return http.get(url);
        };

        /**
         * Post请求
         * @param url
         * @returns {*|HttpPromise}
         */
        var httpPost = function(url) {
            return http.post(url);
        };

        return {
            httpRequest : httpRequest,
            httpGet : httpGet,
            httpPost : httpPost
        }
    }

})(angular);