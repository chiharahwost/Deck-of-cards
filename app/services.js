angular.module('cardApp')
    .service('DeckService', function ($q) {

        var defer = $q.defer();

        this.shuffleDeck = function () {
            this.deck = createDeck();
            for (var i = this.deck.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = this.deck[i];
                this.deck[i] = this.deck[j];
                this.deck[j] = temp;
            }
            return this.deck;
        };

        this.sortDeck = function (deck) {
            var hearts = [],
                diamonds = [],
                spades = [],
                clubs = [];

            for (var i = 0; i < deck.length; i++) {
                switch (deck[i].suit) {
                    case "hearts":
                        hearts.push(deck[i]);
                        break;
                    case "diamonds":
                        diamonds.push(deck[i]);
                        break;
                    case "spades":
                        spades.push(deck[i]);
                        break;
                    default :
                        clubs.push(deck[i]);
                }
            }
            hearts = sortSuit(hearts, false);
            diamonds = sortSuit(diamonds, false);
            spades = sortSuit(spades, true);
            clubs = sortSuit(clubs, true);
            var response = {heart: hearts, diamond: diamonds, spade: spades, club: clubs};
            defer.resolve(response);
            return defer.promise;

        };
        function createDeck() {
            var deck = [];
            var values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
            var suits = ['hearts', 'diamonds', 'spades', 'clubs'];

            function cardConstructor(id, suit, value) {
                return {
                    id: id,
                    suit: suit,
                    value: value
                };
            }

            for (var i = 0; i < suits.length; i++) {
                for (var j = 0; j < values.length; j++) {
                    deck.push(cardConstructor(j, suits[i], values[j]));
                }
            }
            return deck;
        }

        function sortSuit(array, reverse) {
            var end, result,
                start = new Date().getTime();

            if (reverse) {
                array.sort(function (a, b) {
                    return b.id - a.id
                });
            } else {
                array.sort(function (a, b) {
                    return a.id - b.id
                });
            }

            end = new Date().getTime();
            result = end - start;
            return {time: result, array: array};
        }

    })
