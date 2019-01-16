# Coding Challenge Orders
The Coding Challenge order consist:
Using json-server as backend. Generate a random orders list where each element contains the following information:
- Date
- Status  (in process or completed)
- Subtotal
- Taxes
- Total

On the client side:
- Create an application (create react app of preference) that consumes the endpoint generated by json-server and renders the list showing date, order status and total.
- If the status of the order is completed, clicking the item should redirect to a tip widget.
- If the status of the order is in process, do not respond to the click.
- The tip widget should include values: no tip, 5%, 10%, 15% and an input in case the user wants to enter a different non-percentage value.
- The tip must be calculated based on the subtotal
- The widget must have a submit button that updates the corresponding order  in the json-server, add the "Tip" field and redirect to the initial page.
- When clicking again on an element with added tip, show the way you prefer the view of the new total.
 
### Tech
This app is building with:
* [Reactjs] - JavaScript framework for building user interfaces. 
* [Redux] - Predictable state container for JavaScript apps.
* [node.js] - A JavaScript runtime built on Chrome's V8 JavaScript engine. For Backend
* [Express] - Node.js web application server framework

### Installation

Requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the app.

```sh
$ cd CodingChallenge
$ npm install
$ npm run client-install
$ npm run server-install
$ npm run dev
```

### Test API

Test api is simple just run
```sh
$ cd CodingChallenge
$ npm run server-test
```
or
```sh
$ cd CodingChallenge
$ cd server
$ npm run test
```

### API Documentation
 [Click here]( https://documenter.getpostman.com/view/2361874/RznJnwd1) for see  the api documentation
