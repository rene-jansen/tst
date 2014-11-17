define(['collections/recipes'], function (Recipes) {

    // Sets the maximum recipe id to use later in the application
    function setMaxRecipeID(recipes) {
        app.recipeID = _.max(recipes, function (recipe) {
            return recipe.recipeID;
        }).recipeID;
    }

    function getRecipesFromCache() {
        var recipesString = localStorage.getItem("recipes");
        if (!recipesString) {
            generateInitialData();
            recipesString = localStorage.getItem("recipes");
        }
        return JSON.parse(recipesString);
    }

    function generateInitialData() {
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

    var DataService = {
        getData: function () {
            var recipes = getRecipesFromCache();

            // will be used as our client side models storage
            app.recipes = new Recipes(recipes);
            setMaxRecipeID(recipes);
            
        },
        saveData: function (recipes) {
            localStorage.setItem("recipes", JSON.stringify(recipes.toJSON()));
        }
    };
    return DataService;
});