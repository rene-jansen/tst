define(['jquery', 'underscore', 'backbone', 'views/editView', 'routers/router', 'components/dataService'],
function ($, _, Backbone, editView, Router, dataService) {
    var editView = Backbone.View.extend({
        name: 'editView',
        template: _.template($('#edit-template').html()),
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
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
                //this.hideModal();
            }
            else {
                $('#validationError').text(this.model.validationError);
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
    return editView;
});