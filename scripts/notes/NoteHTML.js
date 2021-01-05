
//Converts note info object info into HTML

export const NoteHTMLConverter = (noteObject, criminalObj) => {
    return `
        <section class="note">
            <div class="note__title">Suspect: ${ noteObject.criminalName }</div>
            <div class="note__text">${ noteObject.text }</div>
            <div class="note__author">Author: ${ noteObject.author }</div>
            <div class="note__timestamp">Timestamp: ${ new Date(noteObject.timestamp).toLocaleDateString('en-US')  }</div>
        </section>
    `
}


// TODO: Change suspect text input to dropdown select of API criminals
// Make a select element
// Populate that element with criminals 
// Change the above HTML representation *done*
// Event listener to lisent for the dropdown change/select ?
// Change how the note is saved to capture the criminalID
// Change how note objects are represented when we fetch notes data *done*
// modules to refactor:
//NoteForm
//NoteHTML 
//NoteList
//notes.json *done*