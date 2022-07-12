let addEmotionsBtn = document.querySelector("#addEmotionsBtn");
let emotionList = document.querySelector(".emotionList"); //  emotion list containing all the emotions to the list when filling out the form
let emotionSection = document.querySelectorAll(".emotionSection")[0]; // grab first section out of multiple sections, this is the one we will append to

addEmotionsBtn.addEventListener("click", function () {
  let newEmotions = emotionSection.cloneNode(true); // clone the first section above with the input field inside // takes off the event handlers
  let input = newEmotions.getElementsByTagName("input")[0]; // take the first input out of the section 'newEmotions' and clear it out
  console.log(input)
    input.value = ""; //clear out the value just in case there is already a value
  emotionList.appendChild(newEmotions); //  append new feeling section and input box on click
});

/////// change all of this code below/////
// const edit = document.querySelectorAll(".editGame");
// const update = document.querySelectorAll(".updateGame");
const deleteEmotion = document.querySelector(".deleteEmotionsBtn");

// const searchBtn = document.querySelectorAll('.button')

// const editArray = Array.from(edit).forEach((element) => {
//   element.addEventListener("click", editGameInfo); /// hears the click and calls editGameInfo
// });

// const updateArray = Array.from(update).forEach((element) => {
//   element.addEventListener("click", editGameInfo); /// hears the click editGameInfo
// });

// const deleteArray = Array.from(deleteEmotion).forEach((element) => {
//   element.addEventListener("click", deleteGameInfo); /// hears the click editGameInfo
// });

// function editGameInfo(event) {
//   const target = event.target;
//   let fields = target.parentNode.parentNode.children;
//   console.log(target.parentNode.parentNode.childNodes);
//   let fieldsArray = Array.from(fields).splice(0,5);// only edit input fields and not the buttons
//   console.log("this is fieldsarray" + fieldsArray);
//   //update childnodes to reflect additon of cards section etc

//   console.log(document.getElementsByName("title")[0].value); /// how can I make this section dryer - maybe an object? could I use this query selector and a conidtion? https://bobbyhadz.com/blog/javascript-get-data-attribute-from-event-object
//   // grabs all of the dom element (span) innertext for the target
//   const id = target.parentNode.parentNode.childNodes[1].innerText; /// take it from the live value?
//   console.log( target.parentNode.parentNode.childNodes);
//   const title = target.parentNode.parentNode.childNodes[5].innerText;

//   const release = target.parentNode.parentNode.childNodes[9].innerText;
//   const developer = target.parentNode.parentNode.childNodes[13].innerText;
//   const platform = target.parentNode.parentNode.childNodes[17].innerText;

//   // const [id,title,release,developer,platform]=fieldsArray work  out how to deconstruct

//   if (target.classList.contains("editGame")) {
//     fieldsArray.forEach((item) => {
//       item.setAttribute("contenteditable", true);
//       item.style.border = "1px solid grey";
//       item.style.borderRadius = "10px";
//     });

//   } else if (target.classList.contains("updateGame")) {
//     fieldsArray.forEach((item) => {
//       item.setAttribute("contenteditable", false);
//       item.style.border = "none";
//       item.style.borderRadius = "10px";
//     });
//     // get the element text from the fields and put into post below on update
//     updateGameInfo(id, title, release, developer, platform);
//   }
// }

// async function updateGameInfo(id, title, release, developer, platform) {
//   try {
//   await fetch("/games", {
//     method: "put",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       // Send these as a string to the server
//       title: title, // have to find a way to update the field on input
//       release: release,
//       developer: developer,
//       platform: platform,
//       id: id,
//     }),
//   });
// } catch (err) {}
// }

async function deleteGameInfo(event) {
  
  const target = event.target;

console.log(target)

  // console.log(document.querySelectorAll(".elements")); /// how can I make this section dryer - maybe an object? could I use this query selector and a conidtion? https://bobbyhadz.com/blog/javascript-get-data-attribute-from-event-object
  // grabs all of the dom element (span) innertext for the target

//   const name = target.parentNode.parentNode.childNodes[5].innerText;

//   try {
//     const res = await fetch("/deleteGames", {
//       method: "delete",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         // Send these as a string to the server
//         title: title, // have to find a way to update the field on input
//       }),
//     });
//     const data = await res.json();
//     location.reload();
//   } catch (err) {
//     console.log(err)
//   }
}
