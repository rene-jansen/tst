define(['jquery', 'underscore', 'backbone', 'models/recipe', 'routers/router', 'components/dataService'],
function ($, _, Backbone, Recipe, Router, dataService) {
    var createView = Backbone.View.extend({
        template: _.template($('#create-template').html()),
        tagName: 'div',
        initialize: function () {
            this.model = new Recipe();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click #saveEditButton': 'createRecipe',
            'click #btnBack': 'back'
        },
        createRecipe: function (event) {
            event.preventDefault();
            var self = this,
            id;
            if(this.model.set(this.getCurrentFormValues(), {validate:true}))
            {
                id = ++app.recipeID;
                this.model.set({ recipeID: id, id: id });
                /*
                $.proxy(this.handleImageFile(function () {
                    app.recipes.add(self.model);
                    dataService.saveData(app.recipes);
                    Router.navigate('#/', {trigger: true});
                }), this);
                */
                app.recipes.add(self.model);
                dataService.saveData(app.recipes);
                Router.navigate('#/', { trigger: true });

            }
            else {
                $('#validationError').text(this.model.validationError);
            }
        },
        handleImageFile: function (callback) {
            var file = document.getElementById('txtImage').files[0],
            reader = new FileReader(),
            self = this;
            if (file) {
                reader.onloadend = function () {
                    self.model.set({ imagePath: reader.result });
                    callback();
                }
                reader.readAsDataURL(file);
            }
            else {
                callback();
            }
        },
        back: function() {
            Router.navigate('#/', {trigger: true});
        },
        getCurrentFormValues: function() {
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
    return createView;
});

