(function() {
  angular.module('dashboard').factory('Config', [ function() {
    return {
      url_base: 'http://localhost:5000',
      _id: ''
    }
  }]);
}());
