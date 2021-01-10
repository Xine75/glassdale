
//creates the WitnessStatements button

const contentTarget = document.querySelector(".witnessButton")
const eventHub = document.querySelector(".container")


//inserts a button on the DOM
export const WitnessStatementButton = () => {
    contentTarget.innerHTML =`
     <button id='showWitnesses'>Show/Hide Witness Statements</button>
     `
}

//Broadcast the fact that the button was clicked, no payload
contentTarget.addEventListener("click", clickEvent => {
    // console.log("Witness button listening")
    if(clickEvent.target.id === ("showWitnesses")) {
        const witnessEvent = new CustomEvent("showWitnessClicked") 
        eventHub.dispatchEvent(witnessEvent)
        
        const diableAffordanceEvent = new CustomEvent("disableAffordanceEvent")
        eventHub.dispatchEvent(diableAffordanceEvent)
        
        
    }
})

