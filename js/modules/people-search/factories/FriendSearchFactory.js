(function(window, angular){
	angular.module('peopleSearch').factory('friendSearchFactory', friendSearchFactory);

	friendSearchFactory.$inject = ['facebookFactory', '$q'];

	function friendSearchFactory(facebookFactory, $q){
		var friendList = [],
				nextSearchPath = null;
		return{
			search : search,
			nextSearch : nextSearch
		}

		function search(){
			var defer = $q.defer();
      // var path = '/search?q='+query+'&type='+type;
      var path = '/me/friends?debug=all';
      nextSearchPath = null;
      friendList = [];
      facebookFactory.api(path,['user_friends']).then(function(response){
      	if(response){
	      	setFriendList(response.data);
	      	setPaginationValues(response.data, response.paging);
      	}
      	defer.resolve(friendList);
      }, function(response){
      	defer.reject();
      });
      return defer.promise;
    }

    function setFriendList(list){
    	if(list && list.length > 0){
    		friendList = friendList.concat(list);
    	}
    }

    function setPaginationValues(list, pagingData){
    	if(list.length > 0 && pagingData){
    		nextSearchPath = formatNextPath(pagingData.next);
    	}else{
    		nextSearchPath = null;
    	}
    }

    function nextSearch(){
    	var defer = $q.defer();
    	if(nextSearchPath){
    		facebookFactory.api('me/'+nextSearchPath,['user_friends']).then(function(response){
	      	if(response){
		      	setFriendList(response.data);
		      	setPaginationValues(response.data, response.paging);
	      	}
	      	defer.resolve(response.data);
	      }, function(response){
	      	defer.reject(response);
	      });
    	}else{
    		defer.resolve([]);
    	}
    	return defer.promise;
    }

    function formatNextPath(path){
    	if(path){
    		var indexOfSearch = path.indexOf('friends');
    		if(indexOfSearch >= 0){
    			return path.substring(indexOfSearch);
    		}else{
    			return null;
    		}
    	}
    	return null;
    }
	}
}(window, angular));