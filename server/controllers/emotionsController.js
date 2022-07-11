// *******************************************
// HOMEPAGE CONTROLLER
// *******************************************

require("../models/database");
const Category = require("../models/Category"); // get the Category js file from models dir
const Emotion = require("../models/Emotion"); // get the Emotion js file from models dir

function errorHandling(res, error) {
  res.status(500).send({ message: error.message || "Error Occured" });
}

/**
 * Get/
 * Homepage
 */
exports.homepage = async (req, res) => {
  // renders the page from the emotionsRoutes of homepage
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber); // search model schema in models/Category.js
    const LatestEmotion = await Emotion.find()
      .sort({ _id: -1 })
      .limit(limitNumber); // sorted to show latest ids and limited to what ever is specified in limitNumber
    const happy = await Emotion.find({ category: "Happy" }).limit(limitNumber);
    const angry = await Emotion.find({ category: "Angry" }).limit(limitNumber);
    const sad = await Emotion.find({ category: "Sad" }).limit(limitNumber);
    const feelings = { LatestEmotion, happy, angry, sad }; //put latestEmotion and individual emotions into an object to use in EJS
    res.render("index", {
      title: "Emotions App - Homepage",
      categories,
      feelings,
    }); // render homepage title and categories
  } catch (error) {
    errorHandling(res, error);
  }
};

/**
 * Get/ categories
 * Categories
 */
exports.exploreCategories = async (req, res) => {
  // renders the page from the emotionsRoutes of homepage
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber); // search model schema in models/Category.js
    res.render("categories", {
      title: "Emotions App - Categories",
      categories,
    }); // render homepage title, categories,feelings to category ejs
  } catch (error) {
    errorHandling(res, error);
  }
};
/**
 * Get/ categories/:id
 * Categories by id // click on category eg all emotions and get every under a certain catergory when you click on it
 */
exports.exploreCategoriesById = async (req, res) => {
  // renders the page from the emotionsRoutes of homepage
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Emotion.find({ category: categoryId }).limit(
      limitNumber
    ); // search model schema in models/Category.js
    res.render("categories", {
      title: "Emotions App - Categories",
      categoryById,
    }); // render homepage title, categories,feelings to category ejs
  } catch (error) {
    errorHandling(res, error);
  }
};

/**
 * Use routes/emotionsRoutes
 * Get/emotions/:id
 * Emotions
 */

exports.exploreEmotion = async (req, res) => {
  // renders the page from the emotionsRoutes of homepage
  try {
    let emotionId = req.params.id; // on click of link from home page, gets id from the uri request parameters set in the route. params. An object containing parameter values parsed from the URL path. For example if you have the route /user/:name , then the "name" from the URL path wil be available as req.params.name. Should return one result
    const emotion = await Emotion.findById(emotionId); //use emotion model interface to search emotions collection in mongodb for the id in emotionId

    res.render("emotion", { title: "Emotions App - Emotion", emotion }); // render homepage title, categories,feelings to category ejs
  } catch (error) {
    errorHandling(res, error);
  }
};

/**
 * Use routes/emotionsRoutes
 * POST/search
 * search
 */
exports.searchEmotion = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm
    let emotion = await Emotion.find({$text:{$search:searchTerm, $diacriticSensitive:true}})
    res.render("search", { title: "Emotions App - Search", emotion });
  } catch (error) {
    errorHandling(res, error);
  }


 
};

/**

 * GET/submit
 * submit
 */
 exports.submitEmotion = async (req, res) => {

const infoErrorsObj = req.flash('infoErrors')
const infoSubmitObj = req.flash('infoSubmit')
  res.render("submit-emotion", { title: "Emotions App - Submit Emotion",infoErrorsObj,infoSubmitObj });
 
};

/**

 * POST/submit
 * submit
 */
 exports.submitEmotionOnPost = async (req, res) => {

try{

const newEmotion = new Emotion({
  name: "Feeling Angry, grrrr",
  description:"I woke up feeling angry and ......",
  email:'kirstie@unreal.co.uk',
  feelings:'Rage',
  category:'Angry',
  image:'anger.jpg'

})

await newEmotion.save()

  req.flash('infoSubmit', 'Emotion has been added')
  res.redirect('/submit-emotion')
}catch (error) {
  // res.json(error) can get the error messages used to populate validation on the submit form using submit-emotion.ejs
  req.flash('infoErrors', error)
  res.redirect('/submit-emotion')
}



 
 }


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
