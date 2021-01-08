//handles click event on button and dispatches
//creates the WitnessStatements button

const contentTarget = document.querySelector(".witnessButton")
const eventHub = document.querySelector(".container")

//Broadcast the fact that the button was clicked, no payload
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "showWitnesses") {
        const witnessEvent = new CustomEvent("showWitnessClicked")
        eventHub.dispatchEvent(witnessEvent)
    }
})

export const WitnessStatementButton = () => {
    contentTarget.innerHTML = "<button id='showWitnesses'>Show/Hide Witness Statements</button>"
}