define(['backbone'], function (Backbone) {
    var country = Backbone.Model.extend({
        defaults: {
            _id: 'aus',
            country: 'Australia',
            imagePath: 'img/australia.png'
        },
        idAttribute: '_id',
        validate: function (attrs, options) {
            if (attrs.country.length == 0 || attrs.imagePath.length == 0) {
                return "Country must include name and image!";
            }
        }
    });
    return country;
});