angular.module('cardApp')
    .controller('DeckController', ['$scope', 'DeckService', '$timeout', function ($scope, DeckService, $timeout) {
        $scope.show = false;
        $scope.sort = false;
        $scope.warning = false;

        $scope.newDeck = function () {
            $scope.deck = DeckService.shuffleDeck();
            switcher(true, false);
        };

        $scope.sortDeck = function () {
            if ($scope.deck) {
                DeckService.sortDeck($scope.deck).then(function (data) {
                    $scope.time = {};
                    $scope.hearts = data.heart.array;
                    $scope.time.hearts = data.heart.time;
                    $scope.diamonds = data.diamond.array;
                    $scope.time.diamonds = data.diamond.time;
                    $scope.spades = data.spade.array;
                    $scope.time.spades = data.spade.time;
                    $scope.clubs = data.club.array;
                    $scope.time.clubs = data.club.time;
                })
                switcher(false, true);
                $scope.deck = null;
            } else {
                showWarning();
            }
        };
        function switcher(show, sort) {
            $scope.show = show;
            $scope.sort = sort;
        }
        function showWarning() {
            $scope.warning = true;
            $timeout(function () {
                $scope.warning = false;
            }, 1200);
        }

    }])

