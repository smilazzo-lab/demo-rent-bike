# what
Demo Rent Bike is an'example of a single page web app built on top of Step Framework
an MVC framework written by Salvatore Milazzo in pure vanilla js
His architecture is based on clean architecture by uncle Bob 

# how to use
the only dependency is stem-fmw@1.0.1 from npm (Node Package Manager)

- 1. npm i step-fmw@1.0.1
- 2. npm i browserify
- 3. npm i esmify
- 4. browserify ./public/frontend/App.js --plugin esmify > ./public/frontend/app-bundle.js
- 5. if you change the nae of app-bungle.js please remember to change the link in index.html

# why
Steps on a mvc application should be UI Framework agnostic. In this application you could change
the UI framework to Angular, Vue, React or whatever you prefer.. In the demo I use step-fmw as utility
to change the dom dinamically


