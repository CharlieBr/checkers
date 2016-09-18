angular.module("app", []).controller("home", function ($scope, $http, $location) {
    var self = this;
    self.game = true;
    self.join = true;
    self.clickedNew = false;
    self.clickedNew = false;
    $http.get("/user").success(function (data) {
        self.userName = data.userAuthentication.details.name;
        self.userId = data.userAuthentication.details.id;
        self.authenticated = true;
        $location.path("/");
    }).error(function () {
        self.userName = "N/A";
    });
    self.logout = function () {
        $http.post('/logout', {}).success(function () {
            self.authenticated = false;
            $location.path("/");
        }).error(function () {
            console.log("Logout failed!");
        });
    };
    self.newGame = function () {
        var query = "/new-game/white-player?id=" + self.userId + "&name=" + self.userName;
        $http.post(query, {}).success(function () {
            console.log("First player set!");
        }).error(function () {
            console.log("Error during setting first player");
        });
        self.game = false;
        self.join = true;
        self.clickedNew = true;
    };
    self.joinGame = function () {
        var query = "/new-game/black-player?id=" + self.userId + "&name=" + self.userName;
        $http.post(query, {}).success(function () {
            console.log("Second player set!");
        }).error(function () {
            console.log("Error during setting first player");
        });
        self.join = false;
        self.clickedJoin = true;
    }
}).controller("game", function ($scope, $http, $location) {
    var self = this;
    self.authenticated = true;
    self.start = false;
    $http.get("/new-game/start").success(function (data) {
        self.ready = data;
    }).error(function () {
        console.log("Error during checking if game is ready");
    });
    self.getWhitePlayerName = function () {
        var query = "/new-game/player?color=white";
        $http.get(query).success(function (data) {
            self.whitePlayer = data.toString();
        }).error(function () {
            console.log("Error during getting white player name!");
        });
        self.start = true;
    };
    self.getBlackPlayerName = function () {
        var query = "/new-game/player?color=black";
        $http.get(query).success(function (data) {
            self.blackPlayer = data.toString();
        }).error(function () {
            console.log("Error during getting black player name!");
        });
        self.start = true;
    };
    self.setPlayers = function () {
        $http.get("/new-game/start").success(function (data) {
            self.ready = data;
        }).error(function () {
            console.log("Error during checking if game is ready");
        });
        if (self.ready) {
            self.getBlackPlayerName();
        }
        self.getWhitePlayerName();
    };
});