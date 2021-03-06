﻿define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),      
        Recipe              = require('models/recipe'),
        Router              = require('routers/router'),
        dataService         = require('components/dataService'),
        tpl                 = require('text!tpl/RecipeCreate.html');

    return Backbone.View.extend({
        template: _.template(tpl),
        tagName: 'div',
        initialize: function () {
            this.model = new Recipe();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click #saveEditButton': 'createRecipe',
            'click #btnBack': 'back'
        },
        createRecipe: function (event) {
            event.preventDefault();
            var self = this,
            id;
            if(this.model.set(this.getCurrentFormValues(), {validate:true}))
            {                
                this.model.set({ _id: new Date().toISOString() });
                /*
                $.proxy(this.handleImageFile(function () {
                    app.recipes.add(self.model);
                    dataService.saveData(app.recipes);
                    Router.navigate('#/', {trigger: true});
                }), this);
                */

                dataService.saveData(this.model, function () {
                    Router.navigate('#/', { trigger: true });
                });

                app.recipes.add(self.model);                

            }
            else {
                $('#validationError').text(this.model.validationError);
            }
        },
        handleImageFile: function (callback) {
            var file = document.getElementById('txtImage').files[0],
            reader = new FileReader(),
            self = this;
            if (file) {
                reader.onloadend = function () {
                    self.model.set({ imagePath: reader.result });
                    callback();
                }
                reader.readAsDataURL(file);
            }
            else {
                callback();
            }
        },
        back: function() {
            Router.navigate('#/', {trigger: true});
        },
        getCurrentFormValues: function() {
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

