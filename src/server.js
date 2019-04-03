// loads environment variables from a .env file into process.env
import dotenv from "dotenv";
dotenv.config();

// Import necessary NPM packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan"; 
import errorHandler from "./lib/error_handler"; //  error handling middleware
import auth from "./lib/passport_startegy"; // passport authentication middleware

// Import routes files
import exampleRoutes from "./routes/example_routes";
import userRoutes from "./routes/user_routes";
import recipesRoutes from "./routes/recipe_routes";

// instantiate express application object
const app = express();

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// define port for API to run on
const port = process.env.PORT || 3001;

/* The method `.use` sets up middleware for the Express application */

// register passport authentication middleware
app.use(auth);
app.use(logger("dev"))
// add `bodyParser` middleware which will parse JSON requests into
// JS objects before they reach the route files.
app.use(bodyParser.json());

// Parse Cookie header and populate req.cookies
app.use(cookieParser());

// register route files
app.use(exampleRoutes);
app.use(userRoutes);
app.use(recipesRoutes);


// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler);


app.get('/api/recipes', (req, res) => {
  models.Recipe.findAll().then(recipes => {
    res.status(200).json({ recipes: recipes });
  }).catch(e => console.log(e));
})

// http://localhost:3000/api/recipe/1
app.get('/api/recipe/:id', (req, res) => {
  models.Recipe.findByPk(req.params.id).then(recipe => {
    res.status(200).json({ recipe: recipe });
  }).catch(e => console.log(e));
})

// run API on designated port (4741 in this case)
app.listen(port, () => {
  console.log("listening on port " + port);
});

// needed for testing
export default app;
