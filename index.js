const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // return Recipe.create({
    //   //if we don't return then it's locally scoped/stuck inside here
    //   title: 'Arepas',
    //   level: 'Easy Peasy',
    //   ingredients: [
    //     'water',
    //     'salt',
    //     'corn flour',
    //   ],
    //   cuisine: 'Venezuelan',
    //   dishType: 'breakfast',
    //   image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
    //   duration: 40,
    //   creator: 'Daniela Gallardo'
    // })

    return Recipe.insertMany(data);
  })

  .then(() => {
    console.log("Rigatoni alla Genovese's duration was updated!")
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, { duration: 100 });
  })

  .then(()=> {
    console.log("Carrot cake was removed")
    return Recipe.deleteOne({title: "Carrot Cake"})
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });