import { saveNote } from "./NoteDataProvider.js"
import { useCriminals, getCriminals } from "../criminals/CriminalDataProvider.js"

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
        //parseInt to capture the criminalID as an integer
        const criminalId = parseInt(document.querySelector("#suspect").value)

        // Make a new object representation of a note
        const newNote = {
            // Key/value pairs here - must be the same as the keys we established in notes.json
            
            author: author,
            text: text, 
            criminalId: criminalId,
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
    
    const criminalsCollection = useCriminals()
    //we added a dropdown so that only notes pertaining to listed criminals can be created
    contentTarget.innerHTML = `
    <h3>Enter a Note</h3>
    <input type="text" id="author" placeholder = "author name">
    <textarea id="text" placeholder="note text"></textarea>
    <select class = "dropdown" id="suspect">
    
    <option value="0">Please select a suspect...</option>
    ${
        criminalsCollection.map( (criminal) => 
             `<option value=${criminal.id}>
             ${criminal.name}</option>`
        )
    }
    </select >

    <button id="saveNote">Save Note</button>
    `
}
//exports the render function (renamed NoteForm) to be imported on main.js
export const NoteForm = () => {
    getCriminals()
    .then( () => render())
}

