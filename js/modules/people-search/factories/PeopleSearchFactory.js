(function(window, angular){
	angular.module('peopleSearch').factory('peopleSearchFactory', peopleSearchFactory);

	peopleSearchFactory.$inject = ['facebookFactory', '$q'];

	function peopleSearchFactory(facebookFactory, $q){
		var peopleList = [],
				nextSearchPath = null,
				searchText = null;
		return{
			search : search,
			nextSearch : nextSearch
		}

		function search(query, type){
			var defer = $q.defer();
      var path = '/search?q='+query+'&type='+type;
      // var path = '/me/friends?debug=all';
      nextSearchPath = query;
      nextSearchPath = null;
      // peopleList = [];
      facebookFactory.api(path,[]).then(function(response){
      	if(response){
	      	setPeopleList(response.data, true);
	      	setPaginationValues(response.data, response.paging);
      	}
      	defer.resolve(peopleList);
      }, function(response){
      	defer.reject();
      });
      return defer.promise;
    }

    function setPeopleList(list, emptyList){
    	if(emptyList){
    		peopleList = [];
    	}
    	if(list && list.length > 0){
    		peopleList = peopleList.concat(list);
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
    		facebookFactory.api(nextSearchPath,[]).then(function(response){
	      	if(response){
		      	setPeopleList(response.data, false);
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
    		var indexOfSearch = path.indexOf('search');
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