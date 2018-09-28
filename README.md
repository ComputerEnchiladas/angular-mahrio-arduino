# Setup

* Clone this repo or download
* Open using WebStorm or Terminal the repo's location
* Run `npm install`

## Module Dependencies

* mahrio - Application Server
* socket.io - Socket Support for Application Server
* socket.io-client - Client Socket Support for Web App
* johnny-five - Hardware Interface with Arduino

# Web Server

## Start

Run `node server/index` to start server.

# Web App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To run development server using your local IP, add `--host xxx.xxx.xxx.xxx` at end of scripts > start value in package.json, on mac 
hold down `option` key and click wireless icon on top right corner then look for IP Address.

To change port of development server, add `--port 8000` at end of value of scripts > start in package.json.

# Web App Proxy to Server

The web app runs it's own dev server on local development. We `proxy-conf.json` to map routes to our mahrio server.
