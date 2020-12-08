import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./NoteHTML.js";

// Query the DOM for the element that your notes will be added to 
const contentTarget = document.querySelector(".noteList")
// Define ye olde Evente Hubbe
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", () => {
    //call NoteList and let that take over - it goes to get the notes from json API
    NoteList()
})

eventHub.addEventListener("noteStateChanged", () => {
    NoteList()
})
// convert the notes objects to HTML with NoteHTMLConverter
const render = (noteArray) => {
    const allNotesConvertedToStrings = noteArray.map( (note) => {

            return NoteHTMLConverter(note)
        }
                    //.map will always return something, tho it can be written in abbreviated form withot a return statment

    ).join("")

    contentTarget.innerHTML = allNotesConvertedToStrings
}

// Standard list function you're used to writing by now. BUT, don't call this in main.js! Why not?
export const NoteList = () => {
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes)
        })
}