const contentTarget = document.querySelector(".noteListButton")
const eventHub = document.querySelector(".container")

//Broadcasts the fact that the button was clicked, but no data payload
//along with it.
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "showNotes") {
        const customEvent = new CustomEvent("showNotesClicked")
        eventHub.dispatchEvent(customEvent)
    }
})
//Creates the button in the DOM
export const ShowNoteButton = () => {
    contentTarget.innerHTML = "<button id='showNotes'>Show Notes</button>"
}