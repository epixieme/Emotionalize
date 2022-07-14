const addEmotionsBtn = document.querySelector("#addEmotionsBtn");
const emotionList = document.querySelector(".emotionList"); //  emotion list containing all the emotions to the list when filling out the form
const emotionSection = document.querySelectorAll(".emotionSection")[0]; // grab first section out of multiple sections, this is the one we will append to

if (addEmotionsBtn) {
  addEmotionsBtn.addEventListener("click", function () {
    const newEmotions = emotionSection.cloneNode(true); // clone the first section above with the input field inside // takes off the event handlers
    const input = newEmotions.getElementsByTagName("input")[0]; // take the first input out of the section 'newEmotions' and clear it out
    input.value = ""; //clear out the value just in case there is already a value
    emotionList.appendChild(newEmotions); //  append new feeling section and input box on click
  });
}

/////// change all of this code below/////
// const edit = document.querySelectorAll(".editGame");
// const update = document.querySelectorAll(".updateGame");

const deleteEmotion = document.querySelectorAll(".deleteEmotionsBtn");
const editEmotion = document.querySelectorAll(".editEmotionsBtn");
const updateEmotion = document.querySelectorAll(".updateEmotionsBtn");

if (deleteEmotion) {
  const deleteEmot = Array.from(deleteEmotion).forEach((element) => {
    element.addEventListener("click", deleteEmotionsInfo); /// hears the click editGameInfo
  });
}

if (editEmotion) {
  const editEmot = Array.from(editEmotion).forEach((element) => {
    element.addEventListener("click", editEmotionsInfo);
  });
}

if (updateEmotion) {
  const updateEmot = Array.from(updateEmotion).forEach((element) => {
    element.addEventListener("click", updateEmotionsInfo);
  });
}

function emotionsVariables() {
  const fields = document.querySelectorAll(".userInputs");
  return fields;

}

function editEmotionsInfo() {
 
  const fields = emotionsVariables();
  const target = this;
  if (target.classList.contains("editEmotionsBtn")) {
    fields.forEach((item) => {
      item.setAttribute("contenteditable", true);
      item.style.border = "1px solid grey";
      item.style.borderRadius = "10px";
    });
  }
}

async function updateEmotionsInfo() {
  const fields = emotionsVariables();
  const target = this;
  let name = fields[0].innerText;
  let description = fields[1].innerText;
  let feelings = Array.from(fields)
    .map((item, index) => (index > 1 ? item.innerText : ""))
    .filter(String);


  if (target.classList.contains("updateEmotionsBtn")) {
    fields.forEach((item) => {
      item.setAttribute("contenteditable", false);
      item.style.border = "none";
      item.style.borderRadius = "10px";
    });
    // get the element text from the fields and put into post below on update
    // updateGameInfo(id, title, release, developer, platform);
  }

  try {
    await fetch("/emotion/:id", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Send these as a string to the server
        name: name, // have to find a way to update the field on input
        description: description,
        feelings: feelings,
      }),
    });
  } catch (err) {}
}

async function deleteEmotionsInfo(event) {
  const target = event.target;

  // console.log(document.querySelectorAll(".elements")); /// how can I make this section dryer - maybe an object? could I use this query selector and a conidtion? https://bobbyhadz.com/blog/javascript-get-data-attribute-from-event-object
  // grabs all of the dom element (span) innertext for the target

  const name =
    target.parentNode.parentNode.childNodes[1].childNodes[1].innerText;
  console.log(name);
  try {
    const response = await fetch("/delete-emotion", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Send these as a string to the server
        name: name,
      }),
    });
    const data = await response.json();
    location.reload();
  } catch (err) {}
}
