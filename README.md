# PERN Full Stack : Bookify
- PostgreSQL Express React Node (PERN) full-stack application, integrates React frontend with Node.js backend that is deployed to AWS. 

- [General info](#general-info)
- [Features](#features)
- [Configuration](#configuration)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributing)
- [License](#license)


## General info

 ### Backend
- PostgeSQL needs to be installed and running prior to starting the application. For ease of access, it is recommened to install and set-up pgAdmin4.
- Sequelize CLI used to handle database migrations
- Postman used to test backend routes, prior to the availability of the frontend.
- Utilizes migration files to streamline database configuration.
### Frontend
- React frontend including a simple navbar and searchbar. Users and manage (edit, delete) their inventories, as well Stores and manage their inventories via seperate login pages.
- JavaScriptXML (JSX) used to write HTML elements in JavaScript
- Axios used to handle Http request and responses.
- TailwindCSS used to style the webpages.
- Vite used to optimize server health.

## Screenshots
![Screenshot of the landing page of the Bookify Application](/frontend/src/assets/homepage.jpg)
![Screenshot of the Stores page of the Bookify Application](/frontend/src/assets/storespage.png)
![Screenshot of the Store Login page of the Bookify Application](/frontend/src/assets/storelogin.png)
![Screenshot of the Store Inventory page of the Bookify Application](/frontend/src/assets/storeinventory.png)

## Technologies - Backend
- [PostgeSQL](https://www.postgresql.org) 
- [pgAdmin4](https://www.pgadmin.org)(recommended)
- [Postman](https://www.postman.com)
- [Express.js Middleware](https://expressjs.com/en/starter/installing.html)  
- [Node.js](https://nodejs.org/docs/latest/api/)
- [Sequelize](https://sequelize.org)
- [Sequelize CLI](https://sequelize.org/docs/v7/cli/)

## Technologies - Frontend
- [React](https://react.dev/learn/installation)
- [Axios](https://axios-http.com/docs/intro) 
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [Vite](https://vitejs.dev/guide/)

## App Setup - Backend
- Change to the Backend directory `cd Backend`
- Install dependencies using `npm i`
- Install & run PostgreSQL
- Install `npm dotenv`
- Install Sequelize & Sequelize-cli `npm install sequelize sqlite3` || `npm install --save-dev sequelize-cli`
- Create a .env file and store **your** PostgreSQL connection link into a `PG_URI` variable. Additionally, create a `PORT` variable and assign it to a free port (3001). 
- Run `node server.js`

## App Setup - Frontend
- Change to the Frontend directory `cd Frontend`
- Install dependencies using `npm i`
- Install Vite `npm create vite@latest`
- Install TailwindCSS `npm install -D tailwindcss`
- Install Axios `npm install axios`
- Run `npm run dev`

## Deploying to AWS
- ***COMING SOON***
 
## Features

- **Search Bar:** Easily find books using the search functionality.
- **User Login:** Allow users to create accounts and log in to personalize their experience.
- **Reviews and Ratings:** Share and read reviews and ratings for books.
- **Navigation Bar:** Simple navigation for a seamless user experience.
- **User Library Integration:** Build and manage a personal library within the app.

## Contributors

- C4ntinflas ([GitHub Profile] (https://github.com/C4ntinflas)),  
- serafindani ([GitHub Profile] (https://github.com/serafindani)), 
- BenG2256 ([GitHub Profile] (https://github.com/BenG2256)), 
- ntowe89 ([GitHub Profile] (https://github.com/ntowe89))

## License
MIT License


