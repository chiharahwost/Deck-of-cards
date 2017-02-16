angular.module('cardApp')
    .directive('card', function () {
        return {
            restrict: 'E',
            template: '<div class="card {{card.suit}}"><span class="value value-{{card.suit}}">{{card.value}}</span></div>',
            replace: true
        }
    })

