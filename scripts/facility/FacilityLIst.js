//Render FacilityList cards to the DOM, taking place of criminals or witnesses
//Work with many-to-many relationships: facilities <-> criminals
//other half of event listner to react to button click

import { getFacilities, useFacilities } from "./FacilityProvider.js"
import { Facility } from "./Facility.js"
import { getCriminals, useCriminals } from "../criminals/CriminalDataProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "../facility/CriminalFacilityProvider.js"
import { CriminalList } from "../criminals/CriminalList.js"

//Defines where eventHub broadcasts from
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".contentContainer")

//sets empty arrays to be filled with fetch later
let appStateCriminals = []
let appStateFacilities = []
let appStateCriminalFacilities = []

//Renders a list of facilityObjects to the DOM
const render = () => {
    
    // maps over facilityCriminalRelationships and filters out the facility that matches the id criminalFacility
     contentTarget.innerHTML = appStateFacilities.map(f => {
        const facilityCriminalRelationships = appStateCriminalFacilities.filter(cf => cf.facilityId === f.id)
        // maps over the previous array (facility id's) and finds the facility that matches the facility id on each criminal
        const relatedCriminalsArray = facilityCriminalRelationships.map(cfr => appStateCriminals.find(c => c.id === cfr.criminalId))
        const now = Date.now()

        f.currentCriminals = relatedCriminalsArray.filter(rc => {
            const incarcerationEnd = new Date(rc.incarceration.end)
            const timeInMilliseconds = incarcerationEnd.getTime()
            return timeInMilliseconds > now
        })
        f.previousCriminals = relatedCriminalsArray.filter(rc => {
            const incarcerationEnd = new Date(rc.incarceration.end)
            const timeInMilliseconds = incarcerationEnd.getTime()
            return timeInMilliseconds < now
        })
        return Facility(f)
    }).join("")
}

//Runs the render function to render all the facility elements to the .contentContainer
//when the facility button is clicked

export const FacilityList = () => {
    contentTarget.innerHTML = ""
    getFacilities()
    .then(getCriminalFacilities)
    .then(getCriminals)
    .then(() => {
        
        appStateCriminals = useCriminals()
        appStateFacilities = useFacilities()
        appStateCriminalFacilities = useCriminalFacilities()
        render()
    })
}

let visible = false

eventHub.addEventListener("showFacilities", () => {
    // console.log("Show Facilities pt 2 listening")
    if (visible === false) {
        FacilityList()
        visible = true
    }else{
        CriminalList()
        visible = false
    }
})

// eventHub.addEventListener("showFacilities", () => {
//     // console.log("Show Facilities pt 2 listening")
//     FacilityList()
// })