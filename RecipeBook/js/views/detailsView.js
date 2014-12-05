define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        EditView            = require('views/editView'),
        Router = require('routers/router'),
        
        dataService         = require('components/dataService'),
        tpl                 = require('text!tpl/RecipeDetails.html');

    return Backbone.View.extend({
        template: _.template(tpl),        
        tagName: 'div',
        events: {
            'click #btnEditRecipe': 'editRecipe',
            'click #btnDeleteRecipe': 'deleteRecipe',
            'click #btnCreateRecipe': 'createRecipe',
            'click #btnBack': 'back'
        },
        $cache: {
            EnterKey: 13
        },
        initialize: function() {
            //this.listenTo(this.model, 'change', this.modelChanged);
        },
        render: function () {
            
            //$('.navbar - brand')..$el.html('<a class="navbar-brand" href="#">Boot</a>');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        editRecipe: function(event) {
            var self = this;
            // get latest version
            dataService.getRecipe(this.model, function (r) {

                var recipe = {};

                recipe._id = r._id;
                recipe._rev = r._rev;
                recipe.name = r.name;
                recipe.country = r.country;
                recipe.category = r.category;
                recipe.imagePath = r.imagePath;
                recipe.description = r.description;
                recipe.ingredient1 = r.ingredient1;
                recipe.ingredient2 = r.ingredient2;
                recipe.production = r.production;
                recipe.author = r.author;
                recipe.source = r.source;
                recipe.preparationtime = r.preparationtime;
                recipe.cookingtime = r.cookingtime;
                recipe.serves = r.serves;



                var name = r.name;
                var view = new EditView({ model: app.recipe, collection: app.countries });
                self.renderView.call(self, view);
            });
        },
        deleteRecipe: function() {
            if (confirm('Are you sure you want to delete the Recipe?')) {


                // get latest version
                dataService.getRecipe(this.model, function (r) {
                    dataService.deleteData(app.recipe, function () {                        
                        Router.navigate('#/', { trigger: true });
                    });
                    app.recipes.remove(app.recipe);
                });


            }
        },
        createRecipe: function () {
            var self = this;
            require(['views/createView'], function (CreateView) {
                var view = new CreateView();
                self.renderView.call(self, view);
            });
        },
        renderView: function(view) {
            this.currentView && this.currentView.remove();
            $('#main').html(view.render().el);
            this.currentView = view;
        },
        back: function () {
            Router.navigate('#/', { trigger: true });
        },
        modelChanged: function () {
            this.render();
        }
    });
     
});