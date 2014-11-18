define(['backbone'], function (Backbone) {
    var country = Backbone.Model.extend({
        defaults: {
            countryID: 0,
            country: 'Australia',
            imagePath: ''
        },
        idAttribute: 'countryID',
        validate: function (attrs, options) {
            if (attrs.country.length == 0 || attrs.imagePath.length == 0) {
                return "Country must include name and image!";
            }
        }
    });
    return country;
});