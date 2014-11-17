define(['jquery', 'underscore', 'backbone', 'views/recipeTileView', "routers/router"], function ($, _, Backbone, recipeTileView, Router) {

    return Backbone.View.extend({
        tagName: 'div',
        initialize: function() {
            this.collection = app.recipes;
        },
        render: function() {
            this.$el.empty();

            $(this.el).html('<div class="list-group"></div>');

            this.collection.each(function(item) {
                this.addOne(item);
            }, this);
            return this;
        },

        addOne: function (recipe) {
            var view = new recipeTileView({ model: recipe });
            this.$el.append(view.render().el);
        }
    });

});