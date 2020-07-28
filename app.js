//connect to mongoose
//https://mongoosejs.com/
const mongoose = require("mongoose");
// CONNECT to mongoose
//fruitsDB is the database we want to create or connect to
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "NO NAME SPECIFIED!"],// DATA VALIDATION
    required: function () {
      return this.name != null;
    },
  },
  rating: {
    type: Number,
    min: 1,
    max: 10, // DATA VALIDATION
  },
  review: String,
});
// use the schema to create the model
// create a new collection: fruit
const Fruit = mongoose.model("Fruit", fruitSchema);
//creating document
const fruit = new Fruit({
  name: "apple",
  rating: 7,
  review: "hahahaha",
});
// fruit.save(); // save fruit document into a fruit collection inside fruitDB

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFood: fruitSchema, // we are embedding a fruit document inside this property
});
const Person = mongoose.model("Person", personSchema);
// const pinapple = new Fruit({
//   name: "pin",
//   score: 9,
//   review: "hahaha",
// });
// const person = new Person({
//   name: "amy",
//   age: 7,
//   favoriteFood: pinapple,
// });
// person.save();
const mango = new Fruit({
  name: "mango",
  score: 9,
  review: "hahaha",
});
mango.save(); // save mango to the collection

Person.updateOne({ name: "john" }, { favoriteFood: mango }, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("updated");
  }
});

//Find function
Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    // console.log(fruits);

    // we call the close method on our mongoose collection
    mongoose.connection.close();

    // only log the name of the fruit
    // loop through the array
    // the name of the fruit
    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});

// mongoose api docs
//https://mongoosejs.com/docs/api/model.html
//https://mongoosejs.com/docs/api/model.html#model_Model.updateOne
//id is the item i want to update,
// set it to peach,
// call back function to log back errors

// Fruit.updateOne(
//   { _id: "5f11efa8f403a9a5dc2ac59e" },
//   { name: "Peach" },
//   function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("success");
//     }
//   }
// );
// Fruit.deleteOne({ name: "kiwi" }, function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("deleted");
//   }
// });
