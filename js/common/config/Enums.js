(function(window, angular){
	angular.module('common').constant('facebookEnums',facebookEnums());

	function facebookEnums(){
		return{
			status : {
				'connected' : 'connected',
				'notAuthorized' : 'not_anuthorized',
				'unknown' : 'unknown'
			}
		}
	}
}(window, angular))