// install   :   cordova -d plugin add /Users/your/path/here/phonegap-facebook-plugin --variable APP_ID="123456789" --variable APP_NAME="myApplication"
// link      :   https://github.com/Wizcorp/phonegap-facebook-plugin
(function(window, angular){
  angular.module('facebook').factory('facebookFactory', facebookFactory);

  facebookFactory.$inject = ['$q'];

  function facebookFactory($q){
    return{
      browserInit : browserInit,
      login : login,
      showDialog : showDialog,
      api : api,
      getAccessToken : getAccessToken,
      getLoginStatus : getLoginStatus,
      logout : logout
    }

    function browserInit(id, version) {
      this.appID = id;
      this.appVersion = version || "v2.0";
      facebookConnectPlugin.browserInit(this.appID, this.appVersion);
    };

    function login(permissions) {
      var q = $q.defer();
      facebookConnectPlugin.login(permissions, function (res) {
        q.resolve(res);
      }, function (res) {
        q.reject(res);
      });

      return q.promise;
    };

    function showDialog(options) {
      var q = $q.defer();
      facebookConnectPlugin.showDialog(options, function (res) {
        q.resolve(res);
      }, function (err) {
        q.reject(err);
      });
      return q.promise;
    }

    function api(path, permissions) {
      var q = $q.defer();
      facebookConnectPlugin.api(path, permissions, function (res) {
        q.resolve(res);
      }, function (err) {
        q.reject(err);
      });
      return q.promise;
    }

    function getAccessToken() {
      var q = $q.defer();
      facebookConnectPlugin.getAccessToken(function (res) {
        q.resolve(res);
      }, function (err) {
        q.reject(err);
      });
      return q.promise;
    }

    function getLoginStatus() {
      var q = $q.defer();
      facebookConnectPlugin.getLoginStatus(function (res) {
        q.resolve(res);
      }, function (err) {
        q.reject(err);
      });
      return q.promise;
    }

    function logout() {
      var q = $q.defer();
      facebookConnectPlugin.logout(function (res) {
        q.resolve(res);
      }, function (err) {
        q.reject(err);
      });
      return q.promise;
    }
  }
}(window, angular));
