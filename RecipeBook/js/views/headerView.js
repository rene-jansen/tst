define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Router              = require('routers/router'),
        tpl                 = require('text!tpl/HeaderView.html');

    require('bootstrap');
    //var PouchDB = require('pouchdb-3.1.0.min');

    return Backbone.View.extend({
        initialize: function(){

        },
        template: _.template(tpl),
        events: {
            'click #btnEditRecipe': 'editRecipe',
            'click #btnDeleteRecipe': 'deleteRecipe',
            'click #btnCreateRecipe': 'createRecipe',
            'click #btnBack': 'back'
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        // version 2 - buttons on header?
        editRecipe: function (event) {
            var self = this;
            var view = new EditView({ model: this.model });
            self.renderView.call(self, view);
        },
        back: function () {
            Router.navigate('#/', { trigger: true });
        }
    });    
});