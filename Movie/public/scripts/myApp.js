var app = angular.module("myApp", ["ui.bootstrap", "ngRoute"]);
var base = 'https://api.themoviedb.org/3';
var service = '/movie/';
var apiKey = '7818a329e35690a67516ba8b2cff71a6';
var callback = 'JSON_CALLBACK';
var movieType = ["popular", "now_playing", "upcoming", "top_rated"];
var db = firebase.database();

app.controller("favouriteCtrl", function($scope, $uibModal, userProperties){
	$scope.openModal = function(){
		var modalInstance = $uibModal.open({
			windowClass: "show",
			templateUrl: "templates/favourite.html",
			controller: "favModalCtrl",
			resolve:{
				data: function(){
					return userFavourite(userProperties);
				}
			}
		});
	}
});

app.controller("favModalCtrl", function($scope, $timeout, $http, data, $uibModal, $uibModalInstance){
	var key = [];
	$scope.data = [];
	$timeout(function(){
		for(var x=0; x<data.length; x++){
			var url = base + service + data[x] + '?api_key=' + apiKey;
			$http.get(url).then(function(response){
				console.log(response.data.title);
				key.push(response.data);
				pagination();
			});
			$scope.data = key;
		}
	}, 3000);
	
	function pagination(){
		$scope.totalItems = key.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		
		$scope.$watch("currentPage", function(){
			setPagingData($scope.currentPage);
		});
	}
	
	function setPagingData(page){
		$scope.currentPage = page;
		var begin = (($scope.currentPage-1)*$scope.itemsPerPage);
		var end = $scope.currentPage * $scope.itemsPerPage;
		$scope.data = key.slice(begin, end);
	}
	
	$scope.openModal = function(movieID){
		modalInstance(movieID, key, $uibModal);
	}

	$scope.ok = function(){
		$uibModalInstance.close("closed");
	}
});

app.config(["$routeProvider", function($routeProvider){
	$routeProvider
		.when("/popular", {
			templateUrl: "templates/popular.html",
			controller: "popularCtrl"
		})
		.when("/nowPlaying",{
			templateUrl: "templates/nowPlaying.html",
			controller: "upcomingCtrl"			
		})
		.when("/upcoming",{
			templateUrl: "templates/upcoming.html",
			controller: "upcomingCtrl"
		})
		.when("/topRated",{
			templateUrl: "templates/topRated.html",
			controller: "topRatedCtrl"
		})
		.otherwise({
			redirectTo: $routeProvider
		});
}]);

app.controller("ctrl", function($scope){	
	$scope.templates = [
	{name: "popular.html", url: "templates/popular.html"},
	{name: "nowPlaying.html", url: "templates/nowPlaying.html"},
	{name: "upcoming.html", url: "templates/upcoming.html"},
	{name: "topRated.html", url: "templates/topRated.html"},
	];
});

app.controller("popularCtrl", function($scope, $http, $uibModal){
	var popular = [];
	getPopular();
	function getPopular(){
		var url = base + service + movieType[0] + '?api_key=' + apiKey;
		$http.get(url).then(function(response){
			console.log(response.data.results);
			for(var x=0; x<response.data.results.length; x++){
				popular.push(response.data.results[x]);
			}
			pagination();
		});		
	}
	
	function pagination(){
		$scope.totalItems = popular.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		
		$scope.$watch("currentPage", function(){
			setPagingData($scope.currentPage);
		});
	}

	function setPagingData(page){
		$scope.currentPage = page;
		var begin = (($scope.currentPage-1)*$scope.itemsPerPage);
		var end = $scope.currentPage * $scope.itemsPerPage;
		$scope.popular = popular.slice(begin, end);
	}
	
	$scope.openModal = function(movieID){
		modalInstance(movieID, popular, $uibModal);
	}
});

app.controller("nowPlayingCtrl", function($scope, $http, $uibModal){
	var nowPlaying = [];
	getNowPlaying();
	function getNowPlaying(){
		var url = base + service + movieType[1] + '?api_key=' + apiKey;
		$http.get(url).then(function(response){
			console.log(response.data.results);
			for(var x=0; x<response.data.results.length; x++){
				nowPlaying.push(response.data.results[x]);
			}
			pagination();
		});	
	}

	function pagination(){
		$scope.totalItems = nowPlaying.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		
		$scope.$watch("currentPage", function(){
			setPagingData($scope.currentPage);
		});
	}

	function setPagingData(page){
		$scope.currentPage = page;
		var begin = (($scope.currentPage-1)*$scope.itemsPerPage);
		var end = $scope.currentPage * $scope.itemsPerPage;
		$scope.nowPlaying = nowPlaying.slice(begin, end);
	}
	
	$scope.openModal = function(movieID){
		modalInstance(movieID, nowPlaying, $uibModal);
	}
});

app.controller("upcomingCtrl", function($scope, $http, $uibModal){
	var upcoming = [];
	getUpcoming();
	
	function getUpcoming(){
		var url = base + service + movieType[2] + '?api_key=' + apiKey;
		$http.get(url).then(function(response){
			console.log(response.data.results);
			for(var x=0; x<response.data.results.length; x++){
				upcoming.push(response.data.results[x]);
			}
			pagination();
		});	
	}

	function pagination(){
		$scope.totalItems = upcoming.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		
		$scope.$watch("currentPage", function(){
			setPagingData($scope.currentPage);
		});
	}

	function setPagingData(page){
		$scope.currentPage = page;
		var begin = (($scope.currentPage-1)*$scope.itemsPerPage);
		var end = $scope.currentPage * $scope.itemsPerPage;
		$scope.upcoming = upcoming.slice(begin, end);
	}
	
	$scope.openModal = function(movieID){
		modalInstance(movieID, upcoming, $uibModal);
	}
});

app.controller("topRatedCtrl", function($scope, $http, $uibModal){
	var topRated = [];
	getTopRated();
	
	function getTopRated(){
		var url = base + service + movieType[3] + '?api_key=' + apiKey;
		$http.get(url).then(function(response){
			console.log(response.data.results);
			for(var x=0; x<response.data.results.length; x++){
				topRated.push(response.data.results[x]);
			}
			pagination();
		});	
	}

	function pagination(){
		$scope.totalItems = topRated.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = 5;
		
		$scope.$watch("currentPage", function(){
			setPagingData($scope.currentPage);
		});
	}

	function setPagingData(page){
		$scope.currentPage = page;
		var begin = (($scope.currentPage-1)*$scope.itemsPerPage);
		var end = $scope.currentPage * $scope.itemsPerPage;
		$scope.topRated = topRated.slice(begin, end);
	}
	
	$scope.openModal = function(movieID){
		modalInstance(movieID, topRated, $uibModal);
	}
});

function modalInstance(movieID, movieArr, $uibModal){
	var id = movieID;
	var modalInstance = $uibModal.open({
		windowClass: "show",
		templateUrl: "templates/modal.html",
		controller: "modalCtrl",
		resolve:{
			data: function(){
				return getSelectedMovie(id, movieArr);
			}
		}
	});
}

function getSelectedMovie(id, movieArr){
	var selectedMovie;
	for(var x=0; x<movieArr.length; x++){
		if(movieArr[x].id == id){
			selectedMovie=movieArr[x];
		}
	}
	return selectedMovie;
}

app.controller("modalCtrl", function($scope, $http, $uibModalInstance, data, $sce, userProperties){
	var url = base + service + data.id + "/videos" + '?api_key=' + apiKey;
	var youtubeService = "https://www.youtube.com/embed/";
	$scope.data = data;
	$scope.trustSrc = function(src){
		return $sce.trustAsResourceUrl(src);
	}
	
	$http.get(url).then(function(response){
		console.log(response.data.results);
		$scope.trailerURL = youtubeService + response.data.results[0].key;
		console.log($scope.trailerURL);
	});
	
	$scope.ok = function(){
		$uibModalInstance.close("closed");
	}
	
	$scope.addToFavourite = function(id){
		if(userProperties.getUserID()!=""){
			var userRef = db.ref("/users/" + userProperties.getUserID() + "/favouriteID/");
			userRef.child(id).set(id);
			document.getElementById(id).style.opacity = "1";
		}
		else{
			alert("Login to add it!");
		}
	}
	
	$scope.removeFromFavourite = function(id){
		if(userProperties.getUserID()!=""){
			var userRef = db.ref("/users/" + userProperties.getUserID() + "/favouriteID/");
			userRef.child(id).remove();
			document.getElementById(id).style.opacity = "0.2";
		}
		else{
			alert("Login to add it!");
		}
	}
	
	$scope.isFavourite = function(id){
		if(userFavourite(userProperties).includes(id)){
			return true;
		}
		else{
			return false;
		}
	}
});

app.controller("loginCtrl", function($scope, userProperties, $anchorScroll){
		var provider = null;
		$scope.accType = function(accountType){
			if(accountType == "fb"){
				provider = new firebase.auth.FacebookAuthProvider();
			}
			else if(accountType == "google"){
				provider = new firebase.auth.GoogleAuthProvider();
			}
			signInAcc(provider);
		}
		
		$scope.goToPopular = function(){
			$anchorScroll("popular");
		}
		
		$scope.goToNowPlaying = function(){
			$anchorScroll("nowPlaying");
		}
		
		$scope.goToUpcoming = function(){
			$anchorScroll("upcoming");
		}
		
		$scope.goToTopRated = function(){
			$anchorScroll("topRated");
		}
		
		function signInAcc(provider){
			firebase.auth().signInWithPopup(provider).then(function(result){
				console.log("Login successfull");
				$("#login").modal("hide");
			}).catch(function(error){
				console.log("Error sign in with social media account");
			});
		}
		
		function currentUser(){
			firebase.auth().onAuthStateChanged(function(user){
				if(user != null){
					console.log(user);
					userProperties.setUserID(user.uid);
					console.log("User loging");
					storeUserInfo(user);					
					$scope.isLogin = true;
					$scope.$apply();
				}
				else{
					console.log("No user loging");
					$scope.isLogin = false;
				}
			});
		}
		
		function storeUserInfo(user){
			db.ref("users/" + user.uid).update({
				username: user.displayName
			});
		}
		
		currentUser();
	}
);

app.service("userProperties", function(){
	var userID = "";
	var movieID = "";
	
	return{
		getUserID: function(){
			return userID;
		},
		setUserID: function(uid){
			userID = uid;
		},
		getMovieID: function(){
			return movieID;
		},
		setMovieID: function(mid){
			movieID = mid;
		}
	}
});

function signOut(){
	firebase.auth().signOut().then(function(){
		console.log("Sign-out success");
	}).catch(function(error){
		console.log("Error sign out");
	});
}

function userFavourite(userProperties){
	var key = [];
	var favouriteID = [];
	var userRef = db.ref("/users/" + userProperties.getUserID() + "/favouriteID/");
	userRef.on("value", function(snapshot){
		snapshot.forEach(function(doc){
			key.push(doc.val());
		});
		for(var x=0; x<key.length; x++){
			favouriteID.push(key[x]);
		}
	});
	return favouriteID;
}

