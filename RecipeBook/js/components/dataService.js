define(['collections/recipes', 'collections/countries', 'models/header', 'pouchdb-3.1.0.min'], function (Recipes, Countries, Header, PouchDB) {

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

    function getCountriesFromCache(cb) {
        //var db = new PouchDB('countries');
        var remoteCouch = false,
            countriesString = '',
        self = this;
        
        countriesString = PouchDB.destroy('countries').then(function () {
            return new PouchDB('countries');
        }).then(function (db) {
            //
            // IMPORTANT CODE STARTS HERE
            //

            db.put({
                _id: 'aus',
                country: 'Australia',            
                imagePath: 'img/australia.png'
            }).then(function () {
                return db.put({
                    _id: 'br',
                    country: 'Brazil',
                    imagePath: 'img/brazil.png'
                });
            }).then(function () {
                return db.put({
                    _id: 'chi',
                    country: 'China',
                    imagePath: 'img/china.png'
                });
            }).then(function () {
                return db.allDocs({include_docs: true});
            }).then(function (response) {
                cb(response);
            }).catch(function (err) {
                console.log(err);
            });


            //
            // IMPORTANT CODE ENDS HERE
            //
        });
/*        
        db.bulkDocs([
            { _id: 1, country: 'Australia', imagePath: 'img/australia.png' },
            { _id: 2, country: 'Brazil', imagePath: 'img/brazil.png' },
            { _id: 3, country: 'China', imagePath: 'img/china.png' },
            { _id: 4, country: 'Germany', imagePath: 'img/germany.png' },
            { _id: 5, country: 'Italy', imagePath: 'img/italy.png' }
        ]);
        


        //{ include_docs: true, descending: false },
        db.allDocs( function (err, doc) {
            if (err) {
                // oh noes! we got an error
                console.log("oops");
            } else {
                // okay, doc contains our document
                var tr = doc.total_rows;
                self.countriesString = doc.rows;
            }


        });
*/
        /*
        var countriesString = localStorage.getItem("countries");
        if (!countriesString) {
            generateInitialCountryData();
            countriesString = localStorage.getItem("countries");
        }

        return JSON.parse(countriesString);
        
        return 
        [
            { id: 1, countryID: 1, country: 'Australia', imagePath: 'img/australia.png' },
            { id: 2, countryID: 2, country: 'Brazil', imagePath: 'img/brazil.png' },
            { id: 3, countryID: 3, country: 'China', imagePath: 'img/china.png' },
            { id: 4, countryID: 4, country: 'Germany', imagePath: 'img/germany.png' },
            { id: 5, countryID: 5, country: 'Italy', imagePath: 'img/italy.png' }
        ];
        */
        //return countriesString;
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

    function createDB() {
        var db = new PouchDB('todos');        
    }

    function initialize() {
        var db = new PouchDB('todos');
        var remoteCouch = false;

        db.changes({
            since: 'now',
            live: true
        }).on('change', showTodos);

    }

    function addTodo(text) {
        var todo = {
            _id: new Date().toISOString(),
            title: text,
            completed: false
        };
        db.put(todo, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a todo!');
            }
        });
    }

    function showTodos() {
        db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
            redrawTodosUI(doc.rows);
        });
    }

    function checkboxChanged(todo, event) {
        todo.completed = event.target.checked;
        db.put(todo);
    }

    function deleteButtonPressed(todo) {
        db.remove(todo);
    }

    function todoBlurred(todo, event) {
        var trimmedText = event.target.value.trim();
        if (!trimmedText) {
            db.remove(todo);
        } else {
            todo.title = trimmedText;
            db.put(todo);
        }
    }

    var DataService = {
        getData: function () {
            var header = { country: 'Australia', imagePath: 'img/australia.png' };
            app.header = new Header(header);
            
            //var countries = 
            getCountriesFromCache(function (countries) {
                var resp = [];
                countries.rows.forEach(function (country) {
                    resp.push({ _id: country.doc._id, country: country.doc.country, imagePath: country.doc.imagePath });                    
                });

                app.countries = new Countries(resp);
                //return result.rows;
            }),
                recipes = getRecipesFromCache();

            // will be used as our client side models storage
            app.recipes = new Recipes(recipes);
            //app.countries = new Countries(countries);            

            //setMaxRecipeID(recipes);
            //setMaxCountryID(countries);
            
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