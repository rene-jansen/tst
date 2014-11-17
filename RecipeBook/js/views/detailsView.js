define(['jquery', 'underscore', 'backbone', 'views/editView', 'routers/router', 'components/dataService'],
function ($, _, Backbone, EditView, Router, dataService) {
    var detailsView = Backbone.View.extend({
        template: _.template($('#details-template').html()),
        tagName: 'div',
        events: {
            'click #btnEditRecipe': 'editRecipe',
            'click #btnDeleteRecipe': 'deleteRecipe',
            'click #btnCreateRecipe': 'createRecipe',
            'click #btnBack': 'back'
        },
        $cache: {
            EnterKey: 13
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.modelChanged);
        },
        render: function () {
            
            //$('.navbar - brand')..$el.html('<a class="navbar-brand" href="#">Boot</a>');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        editRecipe: function(event) {
            var self = this;
            var view = new EditView({ model: this.model });            
            self.renderView.call(self, view);
        },
        deleteRecipe: function() {
            if (confirm('Are you sure you want to delete the Recipe?')) {
                app.recipes.remove(this.model);
                dataService.saveData(app.recipes);
                Router.navigate('#/', { trigger: true });
            }
        },
        createRecipe: function () {
            var self = this;
            require(['views/createView'], function (CreateView) {
                var view = new CreateView();
                self.renderView.call(self, view);
            });
        },
        renderView: function(view) {
            this.currentView && this.currentView.remove();
            $('#main').html(view.render().el);
            this.currentView = view;
        },
        back: function () {
            Router.navigate('#/', { trigger: true });
        },
        modelChanged: function () {
            this.render();
        }
    });
    return detailsView;
});