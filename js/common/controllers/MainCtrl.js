(function(window, angular){
	angular.module('common').controller('mainCtrl', mainCtrl);

	mainCtrl.$inject = ['$scope', '$timeout', 'facebookFactory', '$window', 'facebookEnums' , '$state'];

	function mainCtrl($scope, $timeout, facebookFactory, $window, facebookEnums, $state){
		var vm = this, authResponse;
		function init(){
			initMethods();
			initListeners();
		}

		function initMethods(){
			vm.fbLoginStatus = fbLoginStatus;
			vm.fbLogin = fbLogin;
			vm.fbLogout = fbLogout;
			vm.search = search;
		}

		function initListeners(){
			document.addEventListener('deviceready', onDeviceReady, false);
		}
		init();

		function startApp(){
			facebookFactory.browserInit('584636644972667');
			checkLoginStatus();
		}

		function checkLoginStatus(){
			facebookFactory.getLoginStatus().then(loginStatusSuccess, loginStatusError)
		}

		function loginStatusSuccess(response){
			// if(response.status === )
			console.log('>>>>>>>>>loginStatusSuccess>>>>>>>>>>>>>>>>>>',response);
			if(response.status === facebookEnums.status.connected){
				// alert('connected');
				$state.go('.profile');
			}else{
				$state.go('.login');
			}
		}

		function loginStatusError(response){
			console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>',response);
		}

		function onDeviceReady(){
			console.log("device ready");
			startApp();
		}

		function search(){
			alert('MAKING REQUEST');
			facebookConnectPlugin.api('/search?q=rupal khare&type=user', [], searchSuccess, searchError);	
		}

		function searchSuccess(data){
			alert('IN SUCCESS');
			setMessageFromFacebook(data);
		}

		function searchError(data){
			alert('IN ERROR');
			setMessageFromFacebook(data);
		}

		function fbLoginStatus(){
			facebookConnectPlugin.getLoginStatus(function(response){
				// alert(response);
				alert(response.status);
			}, function(err){
				alert("Error")
			});
		}

		function fbLogin(){
			var fbLoginSuccess = function (userData) {
		    // alert("UserInfo: " + JSON.stringify(userData));
		    var data = JSON.stringify(userData);
		    authResponse = data.authResponse;
		    setMessageFromFacebook(userData)
			}

			facebookConnectPlugin.login(["public_profile"],
		    fbLoginSuccess,
		    function (error) { alert("" + error) }
			);
		}

		function fbLogout(){
			facebookConnectPlugin.logout(function(response){
				alert('loggedout '+response);
			}, function(){
				alert('Error');
			});
		}

		function setMessageFromFacebook(message){
			$timeout(function(){
				vm.messageFromFacebook = JSON.stringify(message);
			},0);
		}
	}
}(window, angular));