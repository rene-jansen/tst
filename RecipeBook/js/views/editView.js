define(function (require) {

    //"use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),        
        Router              = require('routers/router'),
        dataService         = require('components/dataService'),
        tpl                 = require('text!tpl/RecipeEdit.html');

    return Backbone.View.extend({
        name: 'editView',
        template: _.template(tpl),          
        render: function () {
            var templateArgs = {
                model: this.model.toJSON(),
                countries: app.countries.toJSON()
            };
            this.$el.html(this.template(templateArgs));
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
                $('#validationError').addClass('alert alert-danger');                
                //$('#validationError').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>');
                $('#validationError').text(this.model.validationError);

                //document.getElementById('name').focus();

                verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
                element = $('body');
                offset = element.offset();
                offsetTop = offset.top;
                $('html, body').animate({ scrollTop: offsetTop }, 500, 'linear');
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