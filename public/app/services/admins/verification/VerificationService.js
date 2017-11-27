(function() {
  angular.module('dashboard').service('Verification', ['$http','Config', function($http,Config) {

    var url_base = Config.url_base;

    this.adminVerifyEmail = function(email) {
      return $http.get(url_base+'/verifications/admins?email=' + email).then(function(result){
        return result;
      });
    };

    this.verifyPassword = function(password) {
      return $http.post(url_base+'/verifications/password',{
        'password': password
      }).then(function(result){
        return result;
      });
    };

  }]);
}());
