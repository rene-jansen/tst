define(['backbone'], function (Backbone) {
    return Backbone.Model.extend({
        defaults: {
            title: 'CookeNut',
            country: 'Australia',
            imagePath: '',
            backButton: '',
            backButtonAction: ''
        }
    });    
});