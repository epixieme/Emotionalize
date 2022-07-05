// *******************************************
// HOMEPAGE CONTROLLER
// *******************************************

require("../models/database");
const Category = require("../models/Category"); // get the Category js file from models dir
const Emotion = require("../models/Emotion"); // get the Emotion js file from models dir

function errorHandling(res,error){
    res.status(500).send({ message: error.message || "Error Occured" });
}

/**
 * Get/
 * Homepage
 */
exports.homepage = async (req, res) => { // renders the page from the emotionsRoutes of homepage
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);// search model schema in models/Category.js
    res.render("index", { title: "Emotions App - Homepage", categories }); // render homepage title and categories
  } catch (error) {
    errorHandling(res,error)
  }
};

/**
 * Get/ categories
 * Categories
 */
 exports.exploreCategories = async (req, res) => { // renders the page from the emotionsRoutes of homepage
    try {
      const limitNumber = 20;
      const categories = await Category.find({}).limit(limitNumber);// search model schema in models/Category.js
      res.render("categories", { title: "Emotions App - Categories", categories }); // render homepage title and categories
    } catch (error) {
        errorHandling(res,error)
    }
  };
  



// *******************************************
// INSERT DUMMY DATA
// *******************************************

// async function insertDummyEmotionData(){
//     try{
//         await Emotion.insertMany([
//             {"name":"feeling angry at everyone", 
//             "description":"feeling like I might explode, raging inferno, wanting to snap at people",
//             "email":"unreal@unreal.co.uk",
//             "feelings":["blame", "explosive", "rage"],
//             "category":"Angry",
//             "image":"anger.jpg"
//             },
//             {"name":"feeling Happy with life", 
//             "description":"feeling happy with my job and family",
//             "email":"unreal@unreal.co.uk",
//             "feelings":["joy", "fullfilled", "complete"],
//             "category":"Happy",
//             "image":"happy.jpg"
//             }
//             ]) // wait until Category is aquired

//     }catch (error){
// console.log('err' + error)
//     }

// }

// insertDummyEmotionData();

    