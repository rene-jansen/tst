define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Router              = require('routers/router'),
        tpl                 = require('text!tpl/HeaderView.html');

    require('bootstrap');

    return Backbone.View.extend({
        initialize: function(){

        },
        template: _.template(tpl),
        events: {
            'click #btnEditRecipe': 'editRecipe',
            'click #btnDeleteRecipe': 'deleteRecipe',
            'click #btnBack': 'back'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        back: function () {
            Router.navigate('#/', { trigger: true });
        }
    });    
});