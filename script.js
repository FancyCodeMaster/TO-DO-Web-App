// DOMs
const inputField = document.getElementById("user-input");
const addInput = document.getElementById("input-button");
const clearItem = document.getElementById("fa");
const clearInput = document.getElementById("clear-button");
const displayContainer = document.getElementById("display-container")

// value inside the input Field
let checkInput = "";

// For counting the ToDos item
let count = 0;

// Making the div inside displayToDos global variable
let div = null;


// Set Attributes function
function setAttributes(item, attributes) {

    for (const el in attributes) {
        item.setAttribute(el, attributes[el]);
    }

}

// Creating to do items and adddiing them inside the display-container
const displayToDos = () => {

    // To differ each ToDos with the class name
    count++;

    // Creating div
    div = document.createElement("div");
    setAttributes(div , {
        "class" : "item-display",
        "id" : "item-display"
    });

    // Creating span
    const span = document.createElement("span");
    span.innerText = checkInput;

    // Creating icon side to the span 
    const icon = document.createElement("i");
    setAttributes(icon , {
        "class" : `fa fa-times-circle ${count}`,
        "id" : `id/${count}`
    });

    // Making icons child of span , span child of div and div child of display-container
    span.appendChild(icon);
    div.appendChild(span);
    displayContainer.appendChild(div);


};

// Creating function to creat To Do Items
const createToDos = () => {
    checkInput = inputField.value;

    if(checkInput !== "" && typeof(checkInput)==="string") {
        displayToDos();
        inputField.value = "";
    }else {
        alert("Enter Approriate Inputs for To Do List");
    }
};

// what happens when we click add it button i.e. Event Listeners
addInput.addEventListener("click" , createToDos);

// To Create To Do Items even when we click enter in the window
document.addEventListener("keypress" , (event) => {
    if(event.keyCode===13 || event.which===13) {
        createToDos();
    }
});


// For that we are about to use Event Delegation
// We yet don't have the icon in our dom so we have to trigger an event and catch it in the display-container
// and from that we have to clear the text from which event got triggered.
const deleteToDos = () => {
    // clicking on any part of the display-container can lead to removing the child
    // so we specifically select the cross icon as the target by differing it with it's id number
    const targetId = event.target.id;
    const splitId = targetId.split("/");
    const targetIdNum = parseInt(splitId[1]);

    // using event.target , we get element from which event got triggered i.e. <i> element
    // using parentNode , we are moving into the common element of all display i.e. displayContainer
    // so that standing on that element we can delete the element's text which icon got the event triggered
    if(targetIdNum){
        const deleteTarget = event.target.parentNode.parentNode.parentNode;

        // using removeChild method to delete the div containg span of the element which icon got the event triggered
        deleteTarget.removeChild(event.target.parentNode.parentNode);
        }

};

// Clearing the specific ToDos item when we click the cross icon
displayContainer.addEventListener("click" , deleteToDos);


// Function to clear all Created ToDos
const clearAll = () => {
    inputField.value = "";
    if(div !== null) {
        const allItems = document.querySelectorAll(".item-display");
        const allItemsArray = Array.from(allItems);

        allItemsArray.forEach(el => {
            el.hidden = true;
        });
    }

};

// Clearing all ToDos and the input after we click Clear Button
clearInput.addEventListener("click" , clearAll);