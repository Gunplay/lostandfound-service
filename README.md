About Lost and Found:

A Web Application for Recovering Lost Items
Lost and Found is a web application I am currently developing. Its purpose is simple: to help people find their lost items. For example, if someone loses their passport, they can visit the application and register. They will be prompted to fill out a form with important details such as the name of the item, photos, and the place where it was lost. After submitting the form, the data will be sent to the Mongo.DB server and reviewed by an administrator.

If another person finds the lost passport or any other thing, they can also register on the site and fill out their own form with important details. This data will also be sent to the server and reviewed by the same administrator. If the information matches and everything checks out, the data will be published in the form of lost or found advertisements.

The final step involves the relationship between the two parties. If the person who lost the item is connected with the person who found it, they can arrange an exchange. To ensure security, they may set up a secret word or passcode to confirm the exchange.

Currently, the form has been implemented to send and validate data using Yup. Our next steps involve developing a login system via authorization and creating a separate page with pagination of lost and found items. We are also working on the logic for exchanging items between two participants in the situation.

LINK: https://lostandfound-service.vercel.app/

Technologies used:

Yup for sending and validating data
Mongo.DB for data storage
Google authorization for login system (in progress)
React + Redux Toolkit + Type Script + Router
Ant Design
Leaflet - map
Node.js + Nest

Unfortunately, the backend and database are not deployed on a remote server and because of this many requests are not executed and therefore most of the functionality is not working, but if you are interested I can show you and run this project on my local server.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
