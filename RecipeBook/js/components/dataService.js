define(['collections/recipes', 'collections/countries', 'models/header', 'pouchdb-3.1.0.min'], function (Recipes, Countries, Header, PouchDB) {

    function getRecipesFromCache(cb) {

        var remoteCouch = false;

        PouchDB.destroy('recipes').then(function () {
            return new PouchDB('recipes');
        }).then(function (db) {
            //
            // IMPORTANT CODE STARTS HERE
            //            
            db.put({
                _id: new Date().toISOString(),
                name: 'Kangaroo Steak',
                country: 'Australia',
                category: 'Main',
                imagePath: 'img/australia.png',
                description: 'Traditional outback food',
                ingredient1: '1 Skip',
                ingredient2: '',
                production: '1. Heat up the barbie',
                author: 'Waltzing Mathilda',
                source: 'NT recipes',
                preparationtime: 10,
                cookingtime: 4,
                serves: 4
            }).then(function () {
                return db.put({
                    _id: new Date().toISOString(),
                    name: 'Pavlova',
                    country: 'Australia',
                    category: 'Desert',
                    imagePath: 'img/australia.png',
                    description: 'Egg white',
                    ingredient1: '2 eggs',
                    ingredient2: '',
                    production: '1. Heat up the oven',
                    author: 'Ballerina',
                    source: 'Jamie Oliver',
                    preparationtime: 15,
                    cookingtime: 45,
                    serves: 6
                });
            }).then(function () {
                return db.put({
                    _id: new Date().toISOString(),
                    name: 'Peking Duck',
                    country: 'China',
                    category: 'Main',
                    imagePath: 'img/australia.png',
                    description: 'Traditional chinees',
                    ingredient1: '1 duck',
                    ingredient2: '',
                    production: '1. Heat up the fry pan',
                    author: 'Mao Tse Tung',
                    source: 'Wild China',
                    preparationtime: 30,
                    cookingtime: 60,
                    serves: 4
                });
            }).then(function () {
                var options = {};
                options.include_docs = true;

                return db.allDocs(options);
            }).then(function (response) {
                cb(response);
            }).catch(function (err) {
                console.log(err);
            });


            //
            // IMPORTANT CODE ENDS HERE
            //
        });

        //var abc = app.header.get('country');

        //var items = JSON.parse(recipesString).filter(function (item) { return item.country === abc });

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

        //return items; //JSON.parse(recipesString);
    }

    function setRecipes(cb) {

        /*
        var recipesString = localStorage.getItem("recipes");

        var abc = app.header.get('country');

        var items = JSON.parse(recipesString).filter(function (item) { return item.country === abc });


        var opts = {
  live: true,
  filter: function(doc) {
    return doc._id.indexOf('_design') !== 0;
  } 
};
        */

        var remoteCouch = false, 
            options = {},
            db = new PouchDB('recipes');

                
        options.include_docs = true;

        db.allDocs(options).then(function (response) {
            cb(response);
        }).catch(function (err) {
            console.log(err);
        });
    }


    function getCountriesFromCache(cb) {
        //var db = new PouchDB('countries');
        var remoteCouch = false

        PouchDB.destroy('countries').then(function () {
            return new PouchDB('countries');
        }).then(function (db) {
            //
            // IMPORTANT CODE STARTS HERE
            //

            db.put({
                _id: 'au',  // http://www.1728.org/countries.htm
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
                    _id: 'cn',
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


        /*
        var pouch = new PouchDB('mydb', {adapter: 'websql'});
        if (!pouch.adapter) { // websql not supported by this browser
          pouch = new PouchDB('mydb');
        }
        */
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


    function saveRecipe(recipe, cb) {
        var db = new PouchDB('recipes');
        var remoteCouch = false,
            //id = recipe.get('_id'),
            id2 = recipe._id,
            r = {};

        r._id = recipe.get('_id');
        r._rev = recipe.get('_rev');


        r.name = recipe.get('name');
        r.country = recipe.get('country');
        r.category = recipe.get('category');
        r.imagePath = recipe.get('imagePath');
        r.description = recipe.get('description');
        r.ingredient1 = recipe.get('ingredient1'); 
        r.ingredient2 = recipe.get('ingredient2');
        r.production = recipe.get('production');
        r.author = recipe.get('author');
        r.source = recipe.get('source');
        r.preparationtime = recipe.get('preparationtime');
        r.cookingtime = recipe.get('cookingtime');
        r.serves = recipe.get('serves');

        db.put(r, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a todo!');
            } else {
                console.log('Not Successfully posted a todo!');
                console.log(err);
            }

            cb();
        });

    }

    function getRecipe(recipe, cb) {
        var db = new PouchDB('recipes');
        var remoteCouch = false,
            id = recipe.get('_id');

        db.get(id, function(err, r) {
            if (!err) {
                console.log('Successfully got recipe!' + r._rev);
                app.recipe = app.recipes.get(r._id);
                app.recipe.set({ _rev: r._rev });
                cb(r);
                //return r;

            } else {
                console.log('Not Successfully posted a todo!' + id);
                console.log(err);
                cb();
            }            
        });

    }

    function deleteRecipe(recipe, cb) {
        var db = new PouchDB('recipes');
        var remoteCouch = false;
        
        r = {};

        r._id = recipe.get('_id');
        r._rev = recipe.get('_rev');


        r.name = recipe.get('name');
        r.country = recipe.get('country');
        r.category = recipe.get('category');
        r.imagePath = recipe.get('imagePath');
        r.description = recipe.get('description');
        r.ingredient1 = recipe.get('ingredient1');
        r.ingredient2 = recipe.get('ingredient2');
        r.production = recipe.get('production');
        r.author = recipe.get('author');
        r.source = recipe.get('source');
        r.preparationtime = recipe.get('preparationtime');
        r.cookingtime = recipe.get('cookingtime');
        r.serves = recipe.get('serves');

        db.remove(r, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a todo!');
            } else {
                console.log('Not Successfully posted a todo!');
                console.log(err);
            }
            cb();
        });

    }


    var DataService = {
        getData: function (cb) {
            var header = { country: 'Australia', imagePath: 'img/australia.png' };
            app.header = new Header(header);
            
            //var countries = 
            getCountriesFromCache(function (countries) {
                var countryList = [];
                countries.rows.forEach(function (country) {
                    countryList.push({ _id: country.doc._id, country: country.doc.country, imagePath: country.doc.imagePath });
                });
                app.countries = new Countries(countryList);

            });

            getRecipesFromCache(function (recipes) {
                var recipeList = [],
                    countryfilter = app.header.get('country');
                recipes.rows.forEach(function (recipe) {
                    if (countryfilter === recipe.doc.country) {
                        recipeList.push({ 
                            _id: recipe.doc._id,
                            _rev: recipe.doc._rev,
                            name: recipe.doc.name, 
                            country: recipe.doc.country, 
                            category: recipe.doc.category, 
                            imagePath: recipe.doc.imagePath,
                            description: recipe.doc.description, 
                            ingredient1: recipe.doc.ingredient1, 
                            ingredient2: recipe.doc.ingredient2, 
                            production: recipe.doc.production, 
                            author: recipe.doc.author, 
                            source: recipe.doc.source, 
                            preparationtime: recipe.doc.preparationtime, 
                            cookingtime: recipe.doc.cookingtime, 
                            serves: recipe.doc.serves, 
                        });
                    }
                });
                app.recipes = new Recipes(recipeList);
                cb();
            });
        },
        setRecipes: function (cb) {
            setRecipes(function (recipes) {
                var recipeList = [],
                    countryfilter = app.header.get('country');
                recipes.rows.forEach(function (recipe) {
                    if (countryfilter === recipe.doc.country) {
                        recipeList.push({
                            _id: recipe.doc._id,
                            _rev: recipe.doc._rev,
                            name: recipe.doc.name,
                            country: recipe.doc.country,
                            category: recipe.doc.category,
                            imagePath: recipe.doc.imagePath,
                            description: recipe.doc.description,
                            ingredient1: recipe.doc.ingredient1,
                            ingredient2: recipe.doc.ingredient2,
                            production: recipe.doc.production,
                            author: recipe.doc.author,
                            source: recipe.doc.source,
                            preparationtime: recipe.doc.preparationtime,
                            cookingtime: recipe.doc.cookingtime,
                            serves: recipe.doc.serves,
                        });
                    }
                });
                app.recipes = new Recipes(recipeList);
                cb();
            });
        },
        setTitle: function (title, back, action) {
            setTitle(title, back, action);
        },
        saveData: function (recipe, cb) {
            saveRecipe(recipe, function () { cb(); });            
        },
        getRecipe: function (recipe, cb) {
            getRecipe(recipe, function (r) { cb(r); });
        },
        deleteData: function (recipe, cb) {
            deleteRecipe(recipe, function () { cb(); });
        }
    };
    return DataService;
});