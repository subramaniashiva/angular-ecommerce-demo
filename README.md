Demo Angular Store
===================
This is a demo e-commerce store built using Angular 5 and TypeScript. The application can be directly viewed [here](https://subramaniashiva.github.io/angular-ecommerce-demo/dist/). The application lists the items that can be bought from the store. Every item has its own page with more details. Any item can be added or removed from the shopping cart. The user can visit the shopping cart at any time. The user can also apply voucher codes to the shopping cart. Based on the voucher code, price will be discounted.

Following voucher codes are valid in the application:

 - 5OFF - Gives £5 off from the total price
 - 10OFF - Gives £10 off from the total price provided the total value of cart is above £50
 - 15OFF - Gives £15 off from the total price provided the total value of the cart is above £75 and atleast one footwear is added in the shopping cart.

The application sends an actual HTTP requests while getting the list of items, item description, verifying voucher code and also buying. But since we don't have a real back-end all these HTTP requests' responses are not used. Instead mock data is used. The code is written such a way that, this HTTP URL can be easily replaced with an actual back-end URL in future. We just need to change one configuration file and no need to touch the actual logic.

Setup
-----

1)  Run the following command to install the dependencies

  `npm install`

2) To start the app, run and go to http://localhost:4200 to view the app

  `npm start`

3) This project is enabled with **TSLint**. Any TypeScript file that you write must be linted using TSLint. To run the linting command type

  `npm run lint`

4) This project uses Karma for unit testing. To run tests, type

  `npm run test`

5) To build a production version of the application, run the command

  `npm run build`


Tech Stack
----------
Following is the tech stack:

 - **Angular 5** - Angular 5 gives us an MVC framework to write our code in a more modular and scalable way
 - **TypeScript** - A strict version of JavaScript with typings added.
 - **Babel** - Used to transpile the advanced version of JavaScript
 - **SCSS** - Used to write CSS in more scalable and modular way
 - **TSLint** - Used to lint the typescript code
 - **Karma** - Used for unit testing the application

Directory Structure
-------------------
 - **src/app** - Contains the main application and all the logic
 - **src/assets** - Contains static assets like images and theme files
 - **src/environments** - Contains the environment file. We can configure the main API URL in this file.

App Directory Structure
-------------------
 - **components** - Contains the dumb components of the application. These dumb components just receive properties and render them. They have no idea about HTTP calls and other services
 - **containers** - Contains smart components. These components work with services and get the data and pass it down to dumb components
 - **mock** - Contains the mock data for the application. Can be removed safely once we have the real back-end
 - **models** - Contains the model which is used to maintain the state and structure while passing around data
 - **modules** - Contains external modules that the application depends upon. Currently we use material design and hence this folder includes the material module
 -  **providers** - Contains the services that raises the actual HTTP requests. This is a place to add business logic
 - **utils** - Contains small utility function / files that are used throughout the application
 
**TSLint**

The project is enabled with TSLint. The reason for choosing TSLint is, it enforces a common rule across the team. Developers working on this project will be forced to have uniform code styling. This helps in maintaining the project in long run.

 - TSLint configurations are maintained in the tslint.json file in the root directory

Unit Tests
----------
The repo uses [Karma](https://karma-runner.github.io/2.0/index.html) as its testing framework. The files ends with .spec.ts extension. Currently we test only the components. This can be extended to test providers in future that can improve code coverage.

Future Improvements
----------

 - Improve the UI/UX - Though the application uses Material design, the UI/UX can be improved a lot
 - Improve code coverage - Add tests for providers and other files
 - Implement filter by category in the application
 - Ability to add item directly to the cart from the list page
 - Proper error / status messages to the user
 - Support for internationalisation 
