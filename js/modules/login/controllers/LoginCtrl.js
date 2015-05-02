(function(window, angular){
	angular.module('login').controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$scope', 'facebookFactory', '$state'];

	function loginCtrl($scope, facebookFactory, $state){
		var vm = this;
		function init(){
			initMethods();
		}

		function initMethods(){
			vm.facebookLogin = facebookLogin;
		}

		init();

		function facebookLogin(){
			facebookFactory.login(['user_friends', 'public_profile', 'read_custom_friendlists']).then(loginSuccess, loginError);
		}

		function loginSuccess(response){
			$state.go('home.profile');
			console.log('facebookLogin success', response);

		}

		function loginError(response){
			console.log('facebookLogin error', response);
		}
	}
}(window, angular));