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
        return JSON.parse(recipesString);
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
            { id: 4, countryID: 4, country: 'Germany', imagePath: 'img/germany.png' }
        ];
        localStorage.setItem("countries", JSON.stringify(countries));
    }


    var DataService = {
        getData: function () {
            var recipes = getRecipesFromCache(),
                countries = getCountriesFromCache(),
                header = { title: 'XXX', country: 'Australia', imagePath: 'img/australia.png' };

            // will be used as our client side models storage
            app.recipes = new Recipes(recipes);
            app.countries = new Countries(countries);
            app.header = new Header(header);

            setMaxRecipeID(recipes);
            setMaxCountryID(countries);
            
        },
        saveData: function (recipes) {
            localStorage.setItem("recipes", JSON.stringify(recipes.toJSON()));
        }
    };
    return DataService;
});