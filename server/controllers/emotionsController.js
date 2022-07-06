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
    const LatestEmotion = await Emotion.find().sort({_id:-1}).limit(limitNumber);// sorted to show latest ids and limited to what ever is specified in limitNumber
    const happy = await Emotion.find({'category':'Happy'}).limit(limitNumber);
    const angry = await Emotion.find({'category':'Angry'}).limit(limitNumber);
    const sad = await Emotion.find({'category':'Sad'}).limit(limitNumber);
    const feelings = { LatestEmotion,happy,angry,sad }; //put latestEmotion and individual emotions into an object to use in EJS
    res.render("index", { title: "Emotions App - Homepage", categories, feelings }); // render homepage title and categories
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
    res.render("categories", { title: "Emotions App - Categories", categories}); // render homepage title, categories,feelings to category ejs
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
//          {"name":"Got Promoted",
//          "description":"Feeling so happy to be recognised",
//             "email":"unreal@unreal.co.uk",
//             "feelings":["content", "fullfilled", "complete"],
//             "category":"Happy",
//             "image":"happy.jpg"
//             },
//             {"name":"I lost my job", 
//             "description":"Lost my job and now feel sad",
//             "email":"unreal@unreal.co.uk",
//             "feelings":["depressed", "tearful", "alone"],
//             "category":"Sad",
//             "image":"sad.jpg"
//             }
//             ]) // wait until Category is aquired

//     }catch (error){
// console.log('err' + error)
//     }

// }

// insertDummyEmotionData();

    