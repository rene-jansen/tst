define(['jquery', 'underscore', 'backbone', 'models/header', 'models/country', 'components/dataService'], function ($, _, Backbone, Header, Country, dataService) {
    var AppController = {
        currentView: null,
        home: function() {
            var self = this;
            require(['views/homeView'], function (HomeView) {
                //var country = app.countries.get(id),
                  var  view = new HomeView();
                self.renderView.call(self, view);
            });
        },
        details: function (id) {
            var self = this;
            require(['views/detailsView'], function (DetailsView) {
                var recipe = app.recipes.get(id),
                view = new DetailsView({ model: recipe });
                self.renderView.call(self, view);
            });
        },
        selectcountry: function () {
            var self = this;
            require(['views/countryView'], function (CountryView) {
                var view = new CountryView();
                self.renderView.call(self, view);
            });
        },
        country: function (id) {
            var self = this;
            var country = new Country(app.countries.get(id));
            var countryJ = country.toJSON();

            app.header = new Header({ country: countryJ.get('country'), imagePath: countryJ.get('imagePath') });
            dataService.setRecipes();
            self.home();
        },
        renderView: function(view) {
            this.currentView && this.currentView.remove();

            require(['views/headerView'], function (HeaderView) {
                //var country = app.countries.get(id),
                var header = app.header;
                var headerView = new HeaderView({ model: header });
                $('.header').html(headerView.render().el);

                $('#main').html(view.render().el);
                this.currentView = view;

            });



        }
    }
    return AppController;
});