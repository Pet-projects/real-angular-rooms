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
	- [Other tools](#other-tools)
		- [NPM](#npm)
		- [Bower](#bower)
		- [Grunt](#grunt)
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

#Top level architecture

![top level architecture](https://www.lucidchart.com/publicSegments/view/542c0d3c-7fb8-4ebc-adae-6b6f0a00593a/image.png =500px)

#Dependencies

To run this project you will need the following technologies installed in your computer:

- <a href="http://nodejs.org/">node.js</a> 
- <a href="http://www.couchbase.com/download?gclid=CjwKEAjwhqShBRDS95LciqqaonISJADj1rgao_MufRblcLFRxicB4rLM9aVADWi-sTeYJui-CaKQphoCZWLw_wcB">CouchBase</a> 

Download and install Couchbase. It has been tested with Couchbase 2.5.0-dp1, 2.2.0, 2.1.1.
For a sure bet, try installing Coucbase 2.2.0:
- OSX: http://packages.couchbase.com/releases/2.2.0/couchbase-server-enterprise_2.2.0_x86_64.zip
- Linux (Debian): http://packages.couchbase.com/releases/2.2.0/couchbase-server-enterprise_2.2.0_x86_64.deb 
- Windows: http://packages.couchbase.com/releases/2.2.0/couchbase-server-enterprise_2.2.0_x86_64.setup.exe

Important ! The default installation will locate all the RAM to the bucket "default".
To be able to run the project you need to allow the cration of new buckets by changing the quota for the bucket "default" to a smaller value such as 200Mb

There are some node packages that are dependent on a bunch of other technologies, so you will probably need:
- <a href="https://www.ruby-lang.org/en/">Ruby</a> 
- <a href="https://www.python.org/">Python</a> 
- A c++ compiler (depends on the operational system)

Follow the [How to start the project](#how-to-start-the-project) and install the languages above if needed.

We are using a lot of amazing technologies, but don't worry, all of them will be automatically downloaded using NPM or Bower for you, just follow the [How to start the project](#how-to-start-the-project).

#How to start the project

Make sure you have the necessary <a href="https://github.com/julianghionoiu/real-angular-rooms#dependencies">dependencies installed</a> and cloned the project.

## On Linux/OSX:

In the root folder of the project run:

```shell
./run.sh install
```

Next, create a file called _private-config.js_ in the _db_ folder. The minimal content of this file should be:

```js
var config = {
  adminPassword: '<your Couchbase administrator password>''
};

module.exports = config;
```

Now, you need to setup the database. Make sure you have Couchbase installed and the quota for the bucket "default" is 200Mb.

```shell
./run.sh db-setup
./run.sh db-seed
```

then start the services (webClient and API):

```shell
./run.sh start
```

## On Windows:

#### Configure the database
 
Open a command line tool and navigate to the Db Setup project root (/db/setup).
Make sure you have Couchbase installed and the quota for the bucket "default" is 200Mb.
Now run the following commands:

```shell
npm install
npm run db-setup
```

In order to insert some test data into the database go to Db Query project root (/db/query).
Run:

```shell
npm install
npm run db-seed
```

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

You should now be able to use a REST tool (try <a href="http://www.getpostman.com/">postman</a>) to make a GET to: 

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

You should now be able to navigate to the web app, just go to <a href="http://localhost:3000">http://localhost:3000</a>. 

#Running the tests

With both API and webClient running.

On Linux/OSX:

```shell
./run.sh test
```

On Windows:

```shell
cd ./e2e
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
angular.module('ngRooms.domain.room')
	
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
angular.module('ngRooms.domain.room')
    
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

## API

The component which holds all the business logic is called the API. This is a RESTful application exposes resources such as "rooms".

### Why node.js and restify

The purpose of this small project was to test drive a full web application stack based on Node.js.
<a href="http://mcavage.me/node-restify/">Restify</a> is a small framework that is aimed at creating REST services.
From the developer:
Restify is a framework that gives you absolute control over interactions with HTTP and full observability into the latency and characteristics of your applications.


### Routes

Basicaly, restify is mapping resource urls to functions.
This is the whole backend:

```js
module.exports = function(server){
	server.get('/rooms', function(req, res, next) {
        db.getRooms(function(rooms) {
            res.send(200, rooms);
            return next();
        });
    });

    server.del('/rooms/:id', function (req, res, next) {
        var id = parseInt(req.params.id);

        db.deleteRoom(id, function() {
            res.send();
            return next();
        });
    });

};
```

As you can see, the backend performs simple CRUD operations on the database.

### CouchDB API

The code that interacts with the database can be found in the ./db folder and it is structured in two NPM modules.
 
#### DB-Setup

The database setup module is responsible for programmaticaly creating a Couchbase bucket and the required views.
This is useful for testing and for deployment.

The module communicates with the Couchbase server using the <a href="http://docs.couchbase.com/couchbase-manual-2.1/">REST API</a>.


#### DB-Query

This module is responsible for CRUD operations on the couchbase bucket. 
It is a wrapper around the <a href="https://www.npmjs.org/package/couchbase">Couchnode library</a> and exposes methods such as:

```js
db.getRooms(callback)
db.deleteRoom(id, callback);
```

## e2e

Our e2e tests are built with javascript. We are using Jasmine to format our specifications, Protractor as the testing framework and the PageObject pattern to reuse the css selectors in different tests. 

The development of the application has been driven by full End-to-End tests. 
These tests exercise the webClient using a WebDriver based testing framework and control the database using the DB-Setup module.

### Why protractor

Protractor is the best testing framework for e2e tests when you are building an app with AngularJS.
It can help you to test and handle some AngularJS specific features, for example: 

```js
this.getListOfRooms = function() {
    return element.all(by.repeater('room in rooms'));
};
```

The <b>element.all</b> function makes it easier to iterate and test the viwes that uses the ng-repeat directive.

As a second example, you could mock your server API asking protractor to use a fake AngularJS module. The fake module could override the real one, which contains the services that consumes your server API. 


In order to run tests fast in a CI server we used Protractor in conjunction with PhantomJs.

### Specifications

The specification are written with Jasmine. They beggin with a set of one or more "describe" blocks that can contain multiple "it" blocks. 

```js
describe('As a owner', function() {
  
  describe("when I go to the list of rooms", function() {

    beforeEach(function() {
    	...
	}

	it('I should see the rooms', function() {
      	var roomList = roomsPage.getListOfRooms();
      	expect(roomList.count()).toBe(rooms.length);

    });

    it('I should be able to delete the first room', function() {

      	roomsPage.deleteRoomAtRow(0);

      	var roomList = roomsPage.getListOfRooms();
      	expect(roomList.count()).toBe(rooms.length - 1);
    });

    ...
  });

  ...
});
```

The "beforeEach" function will be runned before of each containing/sibling block. In this example, before all the "it" blocks. It is normally used to fake modules or reset server data.

Since the "it" blocks are your actual tests, all of them should have assertions, using the "expec" function.

You can also use some modifiers to make your life easier while testing your app:

```js
ddescribe(... //Will only run this describe block
xdescribe(... //Will ignore this describe block

iit(... //Will only run this it block
xit(... //Will ignore this it block
```

## Other tools

### NPM

We are using NPM as a package manager and also as the runner for the project, using it's scripting capabilities.
The file that descripes an NPM project is: `package.json`.

For the API project, the `package.json` file looks like:

```json
{
    "name": "NgRooms_backend",
    "version": "0.0.1",
    "description": "Api to handle NgRooms requests.",
    "author": "Matt Davies=",
    "contributors": [
        "Julian Ghionoiu <julian.ghionoiu@valtech.co.uk>",
        "Rafael Audy Glanzner <rafael.glanzner@valtech.co.uk>"
    ],
    "dependencies": {
        "start-stop-daemon": "0.1.0",
        "restify": "2.8.2",
        "couchbase": "2.0.0-dp1",
        "rooms-db-query": "x"
    },
    "scripts": {
        "preinstall": "npm install ../db/query",

        "prestart": "npm install",
        "start" : "node daemon.js start",
        "stop" : "node daemon.js stop",
        "status": "node daemon.js status"
    }
}
```

You can see the way the dependencies are defined and the basic commands like "start" and "stop" are mapped to source files inside the project.


### Bower

We are using bower to manage the dependencies of the Angular App. 
These dependencies are different from the ones from NPM in the sense that they will be delivered to the client as part of the app.

The Bower file looks like:

```json
{
  "name": "ngRooms",
  "version": "0.0.1",
  "authors": [
    "Julian Ghionoiu <julian.ghionoiu@valtech.co.uk>",
    "Rafael Audy Glanzner <rafael.glanzner@valtech.co.uk>"
  ],
  "dependencies": {
    "angular": "1.2.x",
    "angular-route": "1.2.x",
    "bootstrap": "3.2.x",
    "restangular": "1.4.0"
  }
}
```

### Grunt

We are using Grunt to concatenate and minify all the javascript files that we are sending to the client as part of the Angular App.

#Continuous Integration

We used GitHub and Travis for <a href="https://travis-ci.org/julianghionoiu/real-angular-rooms">continuous integration</a>. 
The build status can be seen at the beginning of this README.

The way it works is that Travis configures a hook with GitHub so once we push, it will start the build process and test the application.
The Travis configuration file is .travis.yml.

The build process can be summarized as:
- A developer checks code into GitHub
- Travis spawns a VM and clones the new code
- It then runs the scripts mentioned in the configuration file which:
    - Installs Couchbase
    - Setups the database
    - Installs the NPM dependencies
    - Starts the services
- It runs all the tests
    

#Conslusion

Congratulations for reading everything!

![alt tag](http://weknowmemes.com/generator/uploads/generated/g1365089101540651822.jpg)