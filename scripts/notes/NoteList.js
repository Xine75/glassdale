import { getNotes, useNotes, deleteNote } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./NoteHTML.js";
import { useCriminals } from "../criminals/CriminalDataProvider.js"

// Query the DOM for the element that your notes will be added to 
const contentTarget = document.querySelector(".noteList")
// Define ye olde Evente Hubbe
const eventHub = document.querySelector(".container")

let visible = false

eventHub.addEventListener("showNotesClicked", () => {
    //toggles back and forth from showing or hiding notes depending on the state, and changes the state
    if (visible === false) {
        NoteList()
        visible = true
    } else {
        contentTarget.innerHTML = ""
        visible = false
    }
})

//only show new note if the notes are currently visible
eventHub.addEventListener("noteStateChanged", () => {
    if (visible === true)
        NoteList()

})
//event listener for deleting note
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        //array destructuring to allow us to get at the specific note user deletes
        const [prefix, noteId] = clickEvent.target.id.split("--")

        //passes deleteNote the id of the SINGLE note user wants to delete.  Otherwise
        //ALL notes would be deleted
        deleteNote(noteId)
    }
})
// convert the notes objects to HTML with NoteHTMLConverter
//declare the render function
const render = (noteArray, criminals) => {

    //.map will always return something, tho it can be written in abbreviated form without a return statment
    const allNotesConvertedToStrings = noteArray.map((note) => {

        //find the associated criminal for the note
        const associatedCriminal = criminals.find(
            (criminal) => {
                return criminal.id === note.criminalId
            }
        )
        //set/rename the associated criminal name to note.criminalName.  Adds this value to the note object,
        //which is then used in NoteHTML.js
        note.criminalName = associatedCriminal.name

        return NoteHTMLConverter(note)
    }
        //returns as a string with no commas
    ).join("")
    //renders notes to DOM
    contentTarget.innerHTML = allNotesConvertedToStrings
}

// Standard list function you're used to writing by now. BUT, don't call this in main.js bc we don't want it to run right away
export const NoteList = () => {
    let criminals = useCriminals()
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            //we want to render the notes, but also keep the criminals on the DOM
            render(allNotes, criminals)
        })
}