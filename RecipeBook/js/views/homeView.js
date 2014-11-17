define(['jquery', 'underscore', 'backbone', 'views/recipeTileView', "routers/router"],
function ($, _, Backbone, recipeTileView, Router) {
    var homeView = Backbone.View.extend({
        tagName: 'div',
        initialize: function() {
            this.collection = app.recipes;
        },
        render: function() {
            this.$el.empty();
            // this.$el.append(this.addCreateRecipeButton());

            $(this.el).html('<div class="list-group"></div>');

            this.collection.each(function(item) {
                this.addOne(item);
            }, this);
            return this;
        },
        addCreateRecipeButton: function () {
            var btn = document.createElement('input');
            btn.type = 'button';
            btn.value = 'Create Recipe';
            btn.className = 'default';
            btn.id = 'btnCreateRecipe';
            btn.addEventListener('click', function() {
                Router.navigate('#/createRecipe', { trigger: true });
            }, false);
            return btn;
        },
        addOne: function (recipe) {
            var view = new recipeTileView({ model: recipe });
            this.$el.append(view.render().el);
        }
    });
    return homeView;
});