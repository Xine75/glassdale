//create Facilities Button

const contentTarget = document.querySelector(".facility__button")
const eventHub = document.querySelector(".container")

//insert display facilities button in the DOM
export const DisplayFacilitiesButton = () => {
    contentTarget.innerHTML = `
    <button id='showFacilities'>Show/Hide Facilities</button>
    `
}

//Broadcast the fact that the button was clicked, no payload
contentTarget.addEventListener("click", clickEvent => {
    console.log("Facility Button Listening")
    if(clickEvent.target.id === ("facilitiesButtonClicked")) {
        const facilityEvent = new CustomEvent("showFacilities")
        eventHub.dispatchEvent(facilityEvent)
    }
})