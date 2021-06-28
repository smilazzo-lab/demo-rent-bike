# what
Demo Rent Bike is an'example of a single page web app  written in vanillaJS ES6 (SPA) built on top of Step Framework, 
by the same author.
It allows to rent some bikes with calculation of the order total , with some price strategies
See booking-some-bike use case for more info.
Demo Rent Bike's architecture is based on clean architecture by uncle Bob

# how to use

Dependencies:

- 1. npm i step-fmw@1.0.1
- 2. npm i express
- 3. npm i pug
- 4. npm i browserify
- 5. npm i esmify

using step-fmw as a browser running javascript library

- 6. browserify ./public/frontend/App.js --plugin esmify > ./public/frontend/app-bundle.js

Note: if you change the name of app-bungle.js please remember to change the link in index.html

# why
Steps on a MVC application (single page app or regular web app) should be UI Framework agnostic. 
In this application you could change the UI framework to Angular, Vue, React or whatever you prefer..
In the demo I use a simple pug template engine running on NodeJs with express routes, pure vanillaJS ES6
for the client side.



