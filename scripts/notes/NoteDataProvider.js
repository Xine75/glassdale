//NoteDataProvider fetches notes and posts notes to our API
//it creates a function called saveNote taht allows user input
//to be saved via json to the API

const eventHub = document.querySelector(".container")
let notes = []

//Broadcasts that something was changed in the note field
const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged")

    eventHub.dispatchEvent(noteStateChangedEvent)
}

export const useNotes = () => notes.slice()

export const getNotes = () => {
    return fetch('http://localhost:8088/notes')
        .then(response => response.json())
        .then(parsedNotes => {
            notes = parsedNotes
        })

}

export const saveNote = note => {
    return fetch('http://localhost:8088/notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //strigifies the note object
        body: JSON.stringify(note)
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
}
