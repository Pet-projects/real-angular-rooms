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
	- [webClient](#webClient)
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

#Introduction

#Dependencies

#How to start the project

#Running the tests

#Building the application

#Roadmap

#Implementation details

## webClient

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
├── assets ( css and imgs )
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

#### controllers

#### views

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