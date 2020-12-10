// OfficerSelect renders a list of arresting officers to a drop-down menu. It uses
// an eventListener to broadcast when an officer is selected from the menu using
//the "change" keyword.  CriminalList will listen for this message and filter the
//criminal data on the page to show only those criminals arrested by the chosen 
//officer

//import the Officers array from OfficerProvider
import { useOfficers, getOfficers } from "./OfficerProvider.js"

//set up eventHub, name the variable, declare where it will render to the DOM
const eventHub = document.querySelector(".container")

//get a reference to the DOM element where the <select> will be rendered
const officerDrop = document.querySelector(".filters__officer")

//Send out a custom message via eventHub.  This doesn't run until change event is triggered
eventHub.addEventListener("change", changeEvent => {

    //Only do this if the "officerSelect" element was changed
    if (changeEvent.target.id === "officerSelect") {
        //Get the name of the selected officer
        const officerEvent = new CustomEvent("officerChosen", {
            detail: {
                selectedOfficer: changeEvent.target.value
            }
        })
        //Dispatch to eventHub
        eventHub.dispatchEvent(officerEvent)
    }
})

export const officerSelect = () => {
    //Trigger fetching the API data and loading it into the application state
    getOfficers()
    .then( () => {
        //Get all officers from application state
        let officers = useOfficers()
        render(officers) 
    })
}

const render = officersCollection => {
    //Use interpolation her to invoke the map() method on the officersCollection to generate
    //the dropdown elements.
    officerDrop.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Filter by arresting officer...</option>
            ${
                officersCollection.map( (officer) =>
                    `<option value = ${officer.id}>
                    ${officer.name}</option>`

                )
            }
            </select>
        `
}