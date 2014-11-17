define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        EditView            = require('views/editView'),
        Router              = require('routers/router'),
        dataService         = require('components/dataService'),
        tpl                 = require('text!tpl/RecipeEdit.html');

    return Backbone.View.extend({
        name: 'editView',
        template: _.template(tpl),          
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click #saveEditButton': 'updateRecipe',
            'click #btnBack': 'back'
        },
        updateRecipe: function (event) {
            event.preventDefault();
            var r = '#/details/' + this.model.id;
            if (this.model.set(this.getCurrentFormValues(), { validate: true })) {
                dataService.saveData(app.recipes);                
                Router.navigate(r, { trigger: true });                
            }
            else {
                $('#validationError').text(this.model.validationError);
            }
        },
        back: function () {
            var r = '#/details/' + this.model.id;
            Router.navigate(r, { trigger: true });
        },
        getCurrentFormValues: function () {
            return {
                name: $('#name').val(),
                country: $('#country').val(),
                category: $('#category').val(),
                description: $('#description').val(),
                ingredient1: $('#ingredient1').val(),
                ingredient2: $('#ingredient2').val(),
                production: $('#production').val(),
                author: $('#author').val(),
                source: $('#source').val(),
                preparationtime: $('#preparationtime').val(),
                cookingtime: $('#cookingtime').val(),
                serves: $('#serves').val()
            };
        }
    });
    
});