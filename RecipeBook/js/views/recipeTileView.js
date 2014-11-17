/*
define(['jquery', 'underscore', 'backbone', 'require'], function ($, _, Backbone, require) {

    var tpl = require('text!tpl/Home.html'),

        template = _.template(tpl);
        */
define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/RecipeTile.html');

    return Backbone.View.extend({
        template: _.template(tpl),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });    
});