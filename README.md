Angular Rooms Website
=================

[![Build Status](https://travis-ci.org/julianghionoiu/real-angular-rooms.svg?branch=master)](https://travis-ci.org/julianghionoiu/real-angular-rooms)

A sample project that creates an Angular app with a Node.js REST API.

#Table of contents

- [Introduction](#introduction)
- [Dependencies](#dependencies)
- [How to start the project](#how-to-start-the-project)
- [Running the tests](#running-the-tests)
- [Building the application](#building-the-application)
- [Roadmap](#roadmap)
- [Implementation details](#implementation-details)
	- [webClient](#webclient)
		- [Why AngularJS](#why-angularjs)
		- [App structure](#app-structure)
		- [Most important files](#most-important-files)
		- [Directives example](#directives-example)
	- [api](#api)		
		- [Why node.js and restify](#why-node.js-and-restify)
		- [Routes](#routes)
		- [CouchDB API](#couchDB-api)
	- [e2e](#e2e)
		- [Why protractor](#why-protractor)
		- [Specifications](#specifications)
		- [Page objects](#app-structure)
	- [Grunt file explanation](#grunt-file-explanation)
- [Testing strategy](#testing-strategy)
- [Continuous Integration](#continuous-integration)
- [Conclusion](#conclusion)

#Introduction

This project is a proof of concept that tries to integrate some "sexy" technologies and some best practices in testing and continuous integration.

In the web client we are using:
- <a href="https://angularjs.org/">AngularJS</a>; 
- <a href="http://getbootstrap.com/">Bootstrap</a> and <a href="http://sass-lang.com/">SASS</a>;   
- <a href="https://github.com/mgonto/restangular">Restangular</a>; 
- <a href="https://www.npmjs.org/">NPM</a> and <a href="http://bower.io/">Bower</a> to controll depencies;    
- <a href="http://gruntjs.com/">Grunt</a> to build & deploy the app;  
- <a href="https://github.com/angular/protractor">Protractor</a> for e2e tests;  

In the api we are using:
- <a href="https://github.com/angular/protractor">node.js</a>; 
- <a href="http://mcavage.me/node-restify/">restify</a>;  
- <a href="http://www.couchbase.com/download?gclid=CjwKEAjwhqShBRDS95LciqqaonISJADj1rgal_cnU7C5g9xs9wbIhIFjygvxitCWTHKfbap3CNWzThoCIyLw_wcB">Couchbase</a>  
- <a href="https://www.npmjs.org/">NPM</a> to controll depencies; 
- <a href="http://gruntjs.com/">Grunt</a> to build & deploy the API; 

This project is OS agnostic, at least for now :)
Follow the next steps to run it on your computer.

Feel free to fork it or help us to improve this PoC (here is the [roadmap](#roadmap)).

#Dependencies

To run this project you will need the following technologies installed in your computer:

- <a href="http://nodejs.org/">node.js</a> 
- <a href="http://www.couchbase.com/download?gclid=CjwKEAjwhqShBRDS95LciqqaonISJADj1rgao_MufRblcLFRxicB4rLM9aVADWi-sTeYJui-CaKQphoCZWLw_wcB">CouchBase</a> 

There are some node packages that are dependent on a bunch of other technologies, so you will probably need:
- <a href="https://www.ruby-lang.org/en/">Ruby</a> 
- <a href="https://www.python.org/">Python</a> 
- A c++ compiler (depends on the operational system)

Follow the [How to start the project](#how-to-start-the-project) and install the languages above if needed.

We are using a lot of amazing technologies, but don't worry, all of them will be automatically downloaded using NPM or Bower for you, just follow the [How to start the project](#how-to-start-the-project).

#How to start the project

Make sure you have the necessary <a href="https://github.com/julianghionoiu/real-angular-rooms#dependencies">dependencies installed</a> and download the project.

#### Install node packages and run the API project:

Open a command line tool and navigate to the API project root (/api).
Now run the following commands:

```shell
npm install
```

Followed by:

```shell
npm start
```

You should now be able to use a REST tool (try postman) to make a GET to: 

```shell
http://localhost:4000/rooms
```

#### Install node and bower packages and run the web client project:

Open a command line tool and navigate to the web client project root (/webClient).
Now run the following commands:

```shell
npm install
```

Followed by:

```shell
bower install
```

And finally by:

```shell
npm start
```

You should now be able to navigate to the web app, just go to http://localhost:3000. 

#Running the tests

With both API and webClient running go to the e2e folder (/e2e).
Now run the following command:

```shell
npm test
```

<b>PS:</b> If you are using <b>Windows</b> you'll have to edit the protractor configuration (/test/protractorConfiguration) to stop using phantom. The dafault is Chrome so you just need exclude the following lines:

```js
seleniumAddress: 'http://localhost:9000',

capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs'
},

chromeOnly: false,
```

#Building the application

We are using Grunt to package the web client app to production.
The build command handles the following:

- Copies all the html files to the /webClient/prod folder.
- Concatenates and minifies all the internal javascript files.
- Change the Index.html file to:
	- Use CDNs instead of local references to external javascript and CSS libraries.
	- Reference one minified javascript file that has all the internal javascript files concatenated.

To do that you just need to run the following command in the /webClient folder:

```shell
grunt build
```

The outcome will be in the /webClient/prod folder.

#Roadmap

You can have a look at the roadmap of this project on <a href="https://trello.com/b/jadAtdpV/laterooms">this trello board</a>.

#Implementation details

## webClient

This is where all the web client code is located.
It is being built using AngularJS, Bootstrap, Restangular, Grunt, Bower, NPM, Protractor and so on.

We called it web client because in the future we will probably have a mobile client as well. 

### Why AngularJS

If you are not familiar with AngularJS you can learn a little bit more on <a href="https://www.levelupcoder.com/why-and-how-to-start-using-angular/">this post</a>.
In short, <a href="https://angularjs.org/">AngularJS</a> is a comprehensive framework to build Single Application apps.
It is, at the same time, very extensible and powerful.

### App structure 

The file structure is following the <a href="https://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html">"AngularJS Style Guide and Best Practice for App Structure"</a>.

Basically we have the following structure inside of the public folder:

```shell

├── app.js
├── index.html
├── assets ( CSS and imgs )
├── bower_components ( not versioned, but contains javascript libraries )
├── common ( directives, exception handling and other common files )
└── domain
    ├── room
    ├── supplement
    └── ...
        └── ( views, controllers, directives and other domains specific files )		 
```

In the route folder we have files that are responsible for serving the public folder and for building the web client application.

### Most important files

#### app.js

This file is responsible for setting up the root module for the application.
It is also where you are going to define the routes that your application is going to have.

At this file you can also configure other parameter of the app, like the base URL for the server API. 

#### index.html

That is supposed to be the only "full html page" in our application. That is why AngularJS is a SPA (single page application) framework.

This page is supposed to reference the scripts and CSS files that our app needs to run. It can also have some common behaviour. In this example we have the header coded in this file.

This file also need an angular directive called ng-view:
```html
<div ng-view></div> 
```

It is inside of that div that all the angular views are going to be rendered.
Angular knows which view to display based on the routes that you defined in the app.js file.

You can note that in this html file all the references are wrapped in comments, like the following line:

```html
<!-- build:js //ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js -->
<script src="bower_components/angular/angular.js"></script>
<!-- /build -->
```

or:

```html
<!-- build:js js/app.js -->
<script src="app.js"></script>
<script src="domain/domain.js"></script>
<script src="domain/landingPage/landingPageController.js"></script>
<!-- /build -->
```

Those commentaries will be used by [grunt](#grunt-file-explanation) to refactor the index.html for deployment purposes.
It will change the references to external libraries to use the equivalent CDNs.
It also will concatenate and minify the scripts used in our app.

#### controllers

Controllers is where you code the bahivours for your views.
In the definiotion of the controller you will inform its dependecies, you could have for example a reference to a service that is responsible to fetch data from the server.

Here is an example of a controllers that does just that:

```js
angular.module('lateRooms.domain.room')
	
	.controller('RoomsController', 
		['$scope', '$location', 'RoomService', 
		function($scope, $location, roomService) {

	    $scope.populateRoomsTable = function(id) {
			roomService.list().then(function(data) {
		        $scope.rooms = data;
		    });
		};

		$scope.removeRoom = function(id) {
			roomService.remove(id).then(function() {
		        $scope.populateRoomsTable();
		    });
		};

		$scope.newRoom = function() {
			$location.path( "/rooms/new" );
		};

		$scope.editRoom = function(id) {
			$location.path( "/rooms/edit/" + id );
		};

		$scope.populateRoomsTable();
}]);
```

This controller is also depending on two AngularJS objects.
The scope is a "glue" between the controller and the view.
Everything that you include/edit in the $scope inside of a controller will be available in the binded view and vice versa. This is called <a href="http://www.angularjshub.com/examples/basics/twowaydatabinding/">two way binding</a> and it is one of the most important features of AngularJS.

The $location object, as you can see is responsible for navigating between the AngularJS routes.

#### services

The concept of a "service" can be implemented in <a href="http://stackoverflow.com/questions/15666048/service-vs-provider-vs-factory">three different ways</a> in AngularJS (services, providers and factories).
In AngularJS, services are singletons and normally contain operations that can be used by different controllers.
They are more commonly used for fetching data from the server.

In this example we have an implementation of a factory:

```js
angular.module('lateRooms.domain.room')
    
    .factory('RoomService', ['Restangular', function (restangular) {
       
       var domain = 'rooms';

       return {

            list: function() {
                return restangular.all(domain).getList();               
            },

            remove: function (id) {
                return restangular.one(domain, id).remove();
            }

        };
    }]);
```

We are using the <a href="https://github.com/mgonto/restangular">Restangular</a> library to fetch the data from the server.
This library is widely used for making REST calls, it is very powerful and will make your code much simpler.

#### views

No News Here. :)

These html pages are going to be inserted inside of the "ng-view" directive of the index.html file.
You just need to have a proper rout at the app.js file like this:

```js
$routeProvider.when('/rooms',     	{ 
	templateUrl: '/domain/room/rooms.html',
	controller: 'RoomsController' 
});
```

Inside of an AngularJS view you can use the "{{ }}" symbols to access data that was included in the $scope object through the controller or even inside the view.

Inside of angular directives you don't need to use "{{ }}", have a look at the ng-click or ng-repeat bellow:

```html
<h2>Rooms available</h2>

<table>
  <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Address</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="room in rooms">
      <td>{{ room.id }}</td>
      <td>{{ room.name }}</td>
      <td>{{ room.address }}</td>
      <td>
        <a ng-click="editRoom(room.id)" href="#">
          <i class="glyphicon glyphicon-pencil"></i>
        </a>
        
        <a ng-click="removeRoom(room.id)" href="#">
          <i class="glyphicon glyphicon-minus"></i>
        </a>        
      </td>      
    </tr>                 
  </tbody>
</table>
```

#### directives

Go to [Directives example](#directives-example). :)

### Directives example

Directives are one of the best ways to reuse UI behaviours in AngularJS.
You can read more about directives <a href="http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-i-the-fundamentals">here</a>.

In this app we implemented two very similar directives as examples. 
In the folder "public\domain\landingPage\directives" you can find both.

Normally you will have two files for the directives, the first one will define its behaviour.
The second one is optional and it is the html template.
It is optional because sometimes you will make directives that doesn't need a template.
Maybe you just want to format some numbers in a texbox or change the way dates are displayed.

Coming back to our example, the featureLink.js file is defining some parameters, the template URL and a link function.
The featureLink.html uses those parameters and the link function.
The landing page view (public\domain\landingPage) shows how to use that directive.

## api

### Why node.js and restify
### Routes
### CouchDB API

## e2e

### Why protractor
### Specifications
### Page objects
### Grunt file explanation

#Testing strategy

#Continuous Integration

#Conslusion

Congratulations for reading everything!

![alt tag](http://weknowmemes.com/generator/uploads/generated/g1365089101540651822.jpg)