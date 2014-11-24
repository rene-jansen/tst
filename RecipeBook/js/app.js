requirejs.config({
    //By default load any module IDs from scripts/lib
    baseUrl: 'js/lib',
    paths: {        
        collections: '../collections',
        components: '../components',
        models: '../models',
        routers: '../routers',
        views: '../views',
        tpl: '../tpl'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

var app = app || {};

require(['routers/router', 'components/dataService'], function (router, dataService) {
    $(document).ready(function () {
        dataService.getData();
        router.start();
    });
});