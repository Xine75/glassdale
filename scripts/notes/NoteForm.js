import { saveNote } from "./NoteDataProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")


//NoteForm manages the user interface (creates the fields on the DOM)
// Handle browser-generated click event in component - eventListener
eventHub.addEventListener("click", clickEvent => {

    //checks to see if it is save note button that was clicked
    if (clickEvent.target.id === "saveNote") {

        //gather the data from the form by reaching into the DOM using "id" -see below--
        // and .value to access what has been typed into the field
        const author = document.querySelector("#author").value
        const text = document.querySelector("#text").value
        const suspect = document.querySelector("#suspect").value

        // Make a new object representation of a note
        const newNote = {
            // Key/value pairs here - must be the same as the keys we established in notes.json
            
            author: author,
            text: text, 
            suspect: suspect,
            timestamp: Date.now()
        }

        // Change API state and application state
        //send the data to be stored in the database via the API
        saveNote(newNote)
    }
})


//Renders text fields to the DOM.  placeholder renders temp text inside the field to
//prompt user what goes in each field
const render = () => {
    contentTarget.innerHTML = `
    <h3>Enter a Note</h3>
    <input type="text" id="author" placeholder = "author name">
    <textarea id="text" placeholder="note text"></textarea>
    <input type="text" placeholder="suspect" id="suspect">
    <button id="saveNote">Save Note</button>
    `
}
//exports the render function (renamed NoteForm) to be imported on main.js
export const NoteForm = () => {
    render()
}

