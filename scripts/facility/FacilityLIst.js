//Render FacilityList cards to the DOM, taking place of criminals or witnesses
//other half of event listner to react to button click

import { getFacilities, useFacilities } from "./FacilityProvider.js"
import { Facility } from "./Facility.js"
import { CriminalList } from "../criminals/CriminalList.js"

//Defines where eventHub broadcasts from
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".contentContainer")

let appStateFacilities = []

//Renders a list of facilityObjects to the DOM
const render = () => {
    contentTarget.innerHTML = appStateFacilities.map(f => Facility(f)).join("")
}

//Runs the render function to render all the facility elements to the .contentContainer
//when the facility button is clicked

const FacilityList = () => {
    contentTarget.innerHTML = ""
    getFacilities()
    .then(() => {
        appStateFacilities = useFacilities()
        render()
    })
}

let visible = false

eventHub.addEventListener("showFacilities", () => {
    if (visible === false) {
        FacilityList()
        visible = true
    }else{
        CriminalList()
        visible = false
    }
})

eventHub.addEventListener("showFacilities", e => {
    console.log("Show Facilities pt 2 listening")
    FacilityList()
})