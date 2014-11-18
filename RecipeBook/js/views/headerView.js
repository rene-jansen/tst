define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/HeaderView.html');

    return Backbone.View.extend({
        template: _.template(tpl),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });    
});