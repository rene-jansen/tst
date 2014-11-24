define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        EditView            = require('views/editView'),
        Router              = require('routers/router'),
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
            this.listenTo(this.model, 'change', this.modelChanged);
        },
        render: function () {
            
            //$('.navbar - brand')..$el.html('<a class="navbar-brand" href="#">Boot</a>');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        editRecipe: function(event) {
            var self = this;
            var view = new EditView({ model: this.model, collection: app.countries });            
            self.renderView.call(self, view);
        },
        deleteRecipe: function() {
            if (confirm('Are you sure you want to delete the Recipe?')) {
                app.recipes.remove(this.model);
                dataService.saveData(app.recipes);
                Router.navigate('#/', { trigger: true });
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