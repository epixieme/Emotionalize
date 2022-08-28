let addEmotionsBtn = document.querySelector("#addEmotionsBtn");
let emotionList = document.querySelector(".emotionList"); //  emotion list containing all the emotions to the list when filling out the form
let emotionSection = document.querySelectorAll(".emotionSection")[0]; // grab first section out of multiple sections, this is the one we will append to
const addActionsBtn = document.querySelector("#addActionsBtn");
const actionList = document.querySelector(".actionList"); //  emotion list containing all the emotions to the list when filling out the form
const actionSection = document.querySelectorAll(".actionSection")[0]; // grab first section out of multiple sections, this is the one we will append to

if (addEmotionsBtn) {
  addEmotionsBtn.addEventListener("click", function () {
    let newEmotions = emotionSection.cloneNode(true); // clone the first section above with the input field inside // takes off the event handlers
    let input = newEmotions.getElementsByTagName("input")[0]; // take the first input out of the section 'newEmotions' and clear it out
    input.value = ""; //clear out the value just in case there is already a value
    emotionList.appendChild(newEmotions); //  append new feeling section and input box on click
  });
}

if (addActionsBtn) {
  addActionsBtn.addEventListener("click", function () {
    const newActions = actionSection.cloneNode(true); // clone the first section above with the input field inside // takes off the event handlers
    const input = newActions.getElementsByTagName("input")[0]; // take the first input out of the section 'newEmotions' and clear it out
    input.value = ""; //clear out the value just in case there is already a value
    actionList.appendChild(newActions); //  append new feeling section and input box on click
  });
}

/////// change all of this code below/////
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
  const fields = document.querySelectorAll(".userInputs"); // find a way to seperate the emotions from the actions

  return fields;
}

function actionVariables() {
  const actionFields = document.querySelectorAll(".actionInputs");
  return actionFields;
}

function editEmotionsInfo() {
  const fields = emotionsVariables();
  const actionFields = actionVariables();
  console.log(fields);
  const target = this;
  if (target.classList.contains("editEmotionsBtn")) {
    fields.forEach((item) => {
      // grab all of the text fields and set them to editbale etc for the name, desc and feelings
      item.setAttribute("contenteditable", true);
      item.style.background = "#C8CFD2";
      // item.style.border = "1px solid grey";
      item.style.borderRadius = "10px";
    });
    actionFields.forEach((item) => {
      // grab all of the text fields and set them to editbale etc for the actions
      item.setAttribute("contenteditable", true);
      // item.style.border = "1px solid grey";
       item.style.background = "#C8CFD2";
      item.style.borderRadius = "10px";
    });
  }
}

async function updateEmotionsInfo() {
  const fields = emotionsVariables();
  const actionFields = actionVariables();
  const target = this;
  const id = fields[0].innerText;
  console.log(id)
  const name = fields[1].innerText;
  const description = fields[2].innerText;
  const feelings = Array.from(fields)
    .map((item, index) => (index > 2 ? item.innerText : ""))
    .filter(String);

  const actions = Array.from(actionFields).map((item) => item.innerText);
  console.log(actions);

  if (target.classList.contains("updateEmotionsBtn")) {
    fields.forEach((item) => {
      item.setAttribute("contenteditable", false);
      item.style.background= "none";
      item.style.borderRadius = "10px";
    });

    actionFields.forEach((item) => {
      item.setAttribute("contenteditable", false);
      item.style.background= "none";
      item.style.borderRadius = "10px";
    });
  }

  try {
    await fetch("/emotion/:id", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        // Send these as a string to the server
        name: name, // have to find a way to update the field on input
        description: description,
        feelings: feelings,
        actions: actions,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}
async function deleteEmotionsInfo() {
  const fields = emotionsVariables();

  // console.log(document.querySelectorAll(".elements")); /// how can I make this section dryer - maybe an object? could I use this query selector and a conidtion? https://bobbyhadz.com/blog/javascript-get-data-attribute-from-event-object
  // grabs all of the dom element (span) innertext for the target

  //   const name = target.parentNode.parentNode.childNodes[5].innerText
  const id = fields[0].innerText;
  console.log(name);
  try {
    const response = await fetch("/delete-emotion", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Send these as a string to the server
        id: id,
      }),
    });
    const data = await response.json();
    location.reload();
  } catch (err) {}
}


