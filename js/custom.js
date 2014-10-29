/** 自定义js*/

var ClientInfo = function($) {

    var init = function() {
        var WshNetwork = new ActiveXObject("WScript.Network");
        var user_Domain = WshNetwork.UserDomain;
        var Computer_Name = WshNetwork.ComputerName;
        var User_Name = WshNetwork.UserName;

        console.log(User_Name);
    };

    $(function(){
        init();
    });

    return {

    }
}(jQuery);