define(['jquery', 'underscore', 'backbone', 'components/appController'], function ($, _, Backbone,
AppController) {
    var router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'details/:id': 'details',
            'createRecipe': 'createRecipe',
            'selectcountry': 'selectcountry',
            'rice': 'rice',
            'starter': 'starter',
            'category/:id': 'category',
            'country/:id': 'country'
        },
        initialize: function () {
            var routeName;
            for (var route in this.routes) {
                routeName = this.routes[route];
                this.route(route, routeName, $.proxy(AppController[routeName], AppController));
            }
        },
        start: function () {
            Backbone.history.start();
        }
    });
    return new router();
});