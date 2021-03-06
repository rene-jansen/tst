﻿define(['backbone'], function (Backbone) {
    var recipe = Backbone.Model.extend({
        defaults: {
            _id: new Date().toISOString(),
            _rev: '',
            name: '',
            country: 'Australia',
            category: 'Main',
            imagePath: '',
            description: '',
            ingredient1: '',
            ingredient2: '',
            production: '',
            author: '',
            source: '',
            preparationtime: 0,
            cookingtime: 0,
            serves: 0
        },
        idAttribute: '_id',
        validate: function (attrs, options) {
            if (attrs.name.length == 0 || attrs.description.length == 0) {
                return "Recipe must include name and description!";
            }
        }
    });
    return recipe;
});