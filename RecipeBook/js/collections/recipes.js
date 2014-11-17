define(['backbone', 'models/recipe'], function (Backbone, Recipe) {
    var Recipes = Backbone.Collection.extend({
        model: Recipe,
        create: function (options) {
            this.push(new Recipe(options));
        }
    });
    return Recipes;
});