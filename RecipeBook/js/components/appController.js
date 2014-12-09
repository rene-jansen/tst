define(['jquery', 'underscore', 'backbone', 'models/header', 'models/country', 'components/dataService'], function ($, _, Backbone, Header, Country, dataService) {    
    var AppController = {        
        currentView: null,
        currentHeaderView: null,
        home: function() {
            var self = this;
            require(['views/homeView'], function (HomeView) {
                //var country = app.countries.get(id),
                var view = new HomeView();
                dataService.setTitle('CookeNut');
                self.renderView.call(self, view);
            });
        },
        details: function (id) {
            var self = this;
            require(['views/detailsView'], function (DetailsView) {
                var recipe = app.recipes.get(id),
                view = new DetailsView({ model: recipe });
                
                dataService.setTitle(recipe.get('name'), 'glyphicon glyphicon-chevron-left', '#/');

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
        country: function (_id) {
            var self = this;
            var country = new Country(app.countries.get(_id)).toJSON();
            
            app.header = new Header({ country: country.get('country'), imagePath: country.get('imagePath') });
            
            dataService.setRecipes(function () { self.home(); });
            
        },

        selectMenuItem: function (menuItem) {
            $('.nav li').removeClass('active');
            if (menuItem) {

                if (app.category) {
                    var bcd = $('.' + app.category).html(),
                        cde = bcd.slice(0, bcd.lastIndexOf(app.category)),
                        ret = cde + app.category + '</a>';


                    var htmlString = ret; //'<a href="#' + xxx + '">' + xxx + '</a>';

                    $('.' + app.category).empty();
                    $('.' + app.category).append(htmlString);
                }
             
                var abc = $('.' + menuItem).html();
                var re = new RegExp('/'+menuItem+'(?![\s\S]*'+menuItem+')/');
                var result = abc.replace(menuItem, menuItem + "&nbsp;&#10003;");
                // /Rice(?![\s\S]*Rice)/
                


                $('.' + menuItem).addClass('active');
                $('.' + menuItem).empty();
                $('.' + menuItem).append(result);

                app.category = menuItem;
               
            }
        },
        category: function (id) {            
            this.selectMenuItem(id.charAt(0).toUpperCase() + id.slice(1));
        },


        renderView: function(view) {
            this.currentView && this.currentView.remove();

            require(['views/headerView'], function (HeaderView) {
                //var country = app.countries.get(id),
                var header = app.header;
                var headerView = new HeaderView({ model: header });
                $('.header').html(headerView.render().el);
                this.currentHeaderView = headerView;

                $('#main').html(view.render().el);
                this.currentView = view;

            });



        }
    }
    return AppController;
});