define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
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

            require(['views/homeView'], function (HomeView) {
                var country = app.countries.get(id),
                view = new HomeView({ model: country });
                self.renderView.call(self, view);
            });
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