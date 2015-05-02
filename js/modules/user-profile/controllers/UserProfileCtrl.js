(function(window, angular){
	angular.module('userProfile').controller('userProfileCtrl', userProfileCtrl);

	userProfileCtrl.$inject = ['$scope', 'facebookFactory', '$state'];

	function userProfileCtrl($scope, facebookFactory, $state){
		var vm = this;
		function init(){
			initMethods();
		}
		function initMethods(){
			vm.logoutClicked = logoutClicked;
		}

		init();

		function logoutClicked(){
			facebookFactory.logout().then( logoutSuccess, function(){alrt('logout error')});
		}

		function logoutSuccess(){
			$state.go('home.login');
		}

	}
}(window, angular));