define(['collections/recipes', 'collections/countries', 'models/header'], function (Recipes, Countries, Header) {

    // Sets the maximum recipe id to use later in the application
    function setMaxRecipeID(recipes) {
        app.recipeID = _.max(recipes, function (recipe) {
            return recipe.recipeID;
        }).recipeID;
    }
    function setMaxCountryID(countries) {
        app.countryID = _.max(countries, function (country) {
            return country.countryID;
        }).countryID;
    }

    function getRecipesFromCache() {
        var recipesString = localStorage.getItem("recipes");
        if (!recipesString) {
            generateInitialRecipeData();
            recipesString = localStorage.getItem("recipes");
        }

        var abc = app.header.get('country');

        var items = JSON.parse(recipesString).filter(function (item) { return item.country === abc });
        /*
        var json = JSON.parse(recipesString);
        var items = json.filter(function (item) {
            if (item.country === 'Italy') {
                return item;
            }
        });


        var yahooOnly = JSON.parse(recipesString).filter(recipe) {
            return recipe.country === 'Italy';
        } 
        $.each(JSON.parse(recipesString), function (idx, obj) {
            if (obj.country === 'Italy') {
                // do whatever you want
                var x = 'x';
            }
        }); 
        */

        return items; //JSON.parse(recipesString);
    }

    function setRecipes() {
        var recipesString = localStorage.getItem("recipes");

        var abc = app.header.get('country');

        var items = JSON.parse(recipesString).filter(function (item) { return item.country === abc });
        /*
        var json = JSON.parse(recipesString);
        var items = json.filter(function (item) {
            if (item.country === 'Italy') {
                return item;
            }
        });


        var yahooOnly = JSON.parse(recipesString).filter(recipe) {
            return recipe.country === 'Italy';
        } 
        $.each(JSON.parse(recipesString), function (idx, obj) {
            if (obj.country === 'Italy') {
                // do whatever you want
                var x = 'x';
            }
        }); 
        */
        app.recipes = new Recipes(items);
        //return items; //JSON.parse(recipesString);
    }


    function generateInitialRecipeData() {
        var recipes = [
            { id: 1, recipeID: 1, name: 'Bond', country: 'Italy', category: 'Main', imagePath: 'img/JamesBondImage.png', description: 'Killer'
                , ingredient1: '', ingredient2: '', production: '', author: '', source: '', preparationtime: 0, cookingtime: 0, serves: 0},
            { id: 2, recipeID: 2, name: 'Llewelyn', country: 'Italy', category: 'Main', imagePath: 'img/LDesmond.png', description: 'Master of Gadgets'
                , ingredient1: '', ingredient2: '', production: '', author: '', source: '', preparationtime: 0, cookingtime: 0, serves: 0},
            { id: 3, recipeID: 3, name: 'Lynd', country: 'Italy', category: 'Main', imagePath: 'img/VesperLynd.png', description: 'Seducer'
               , ingredient1: '', ingredient2: '', production: '', author: '', source: '', preparationtime: 0, cookingtime: 0, serves: 0},
            { id: 4, recipeID: 4, name: 'Noris', country: 'Italy', category: 'Main', imagePath: 'img/ChuckNoris.png', description: 'Facts Collector'
               , ingredient1: '', ingredient2: '', production: '', author: '', source: '', preparationtime: 0, cookingtime: 0, serves: 0}
        ];
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }    

    function getCountriesFromCache() {
        generateInitialCountryData();
        var countriesString = localStorage.getItem("countries");
        if (!countriesString) {
            generateInitialCountryData();
            countriesString = localStorage.getItem("countries");
        }
        return JSON.parse(countriesString);
    }

    function generateInitialCountryData() {
        var countries = [
            { id: 1, countryID: 1, country: 'Australia', imagePath: 'img/australia.png' },
            { id: 2, countryID: 2, country: 'Brazil', imagePath: 'img/brazil.png' },
            { id: 3, countryID: 3, country: 'China', imagePath: 'img/china.png' },
            { id: 4, countryID: 4, country: 'Germany', imagePath: 'img/germany.png' },
            { id: 5, countryID: 5, country: 'Italy', imagePath: 'img/italy.png' }
        ];
        localStorage.setItem("countries", JSON.stringify(countries));
    }
    function setTitle(title, backButton, action) {

        var h = app.header;
        var header = { title: title, country: h.get('country'), imagePath: h.get('imagePath'), backButton: backButton, backButtonAction: action };
        app.header = new Header(header);

        
        //h.set('title') = title;
        //app.header = h;
    }

    var DataService = {
        getData: function () {
            var header = { country: 'Australia', imagePath: 'img/australia.png' };
            app.header = new Header(header);

            var countries = getCountriesFromCache(),
                recipes = getRecipesFromCache();

            // will be used as our client side models storage
            app.recipes = new Recipes(recipes);
            app.countries = new Countries(countries);            

            setMaxRecipeID(recipes);
            setMaxCountryID(countries);
            
        },
        setRecipes: function () {
            setRecipes();
        },
        setTitle: function (title, back, action) {
            setTitle(title, back, action);
        },
        saveData: function (recipes) {
            localStorage.setItem("recipes", JSON.stringify(recipes.toJSON()));
        }
    };
    return DataService;
});