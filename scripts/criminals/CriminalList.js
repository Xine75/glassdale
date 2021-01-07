//CriminalList is in charge of rendering the criminal cards to the DOM
//It changes their state based on what the user selects from either the
//ConvictionSelect or OfficerSelect drop down menus

import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminal } from "./CriminalComponent.js"
import { useConvictions } from "../convictions/ConvictionProvider.js"
import { useOfficers } from "../OfficerProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "../facility/CriminalFacilityProvider.js"
import { useFacilities, getFacilities } from "../facility/FacilityProvider.js"

//Defines where eventHub broadcasts from
const eventHub = document.querySelector(".container")
//Defines where an array of criminal objects will render to the DOM (see line 24 below)
const contentTarget = document.querySelector(".criminalsContainer")

let criminals = []
let facilities = []
let criminalFacilities = []

//Renders all the criminals to the DOM after getting them from the API
export const CriminalList = ()=> {
  getCriminals()
  .then(getFacilities)
  .then(getCriminalFacilities)
  .then(() => {
    criminals = useCriminals()
    facilities = useFacilities()
    criminalFacilities = useCriminalFacilities()
    
    render(criminals)
      // ... takes a copy of that array that was made with useCriminals and places it into a variable.
  })
  
  }
//   original code - before many-to-many facilities relationships
// const render = (criminals) => {
  
//   let criminalCards = []
//   for (const perp of criminals) {
//     criminalCards.push(Criminal(perp))
//   }
//   //Takes criminalCards and pushes into criminalElement (defined on line 14), 
//   //.join("") turns the array into a string with no commas between
  // contentTarget.innerHTML = `${criminalCards.join("")} ${AssociatesDialog()}`
// }

//FIRST, render ALL the criminals to the DOM. The opening state
//creates a render function that will iterate over all the criminals and render a specified array, in this case ALL the criminals

const render = (criminalList) => {
  // Step 1 - Iterate all criminals
  contentTarget.innerHTML = criminalList.map(
      (criminalObject) => {
          // Step 2 - Filter all relationships to get only ones for this criminal
          const facilityRelationshipsForThisCriminal = criminalFacilities.filter(cf => cf.criminalId === criminalObject.id)

          // Step 3 - Convert the relationships to facilities with map()
          const matchingFacilities = facilityRelationshipsForThisCriminal.map(cf => {
              const matchingFacilityObject = facilities.find(facility => facility.id === cf.facilityId)
              return matchingFacilityObject
          })

          // Must pass the matching facilities to the Criminal component
          return Criminal(criminalObject, matchingFacilities)
      }
  ).join("")
}


//THEN, If a crime is selected from the CrimeSelect dropdown
// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeChosen", event => {

  // Use the property you added to the event detail.
  if (event.detail.crimeThatWasChosen !== "0"){
      
    //Filter the criminals application state down to the people that committed the crime

      //Check to see what an event.detail contains (an object with one key-value pair- "crimeThatWasChosen": id # of crime)
      console.log("crime", event.detail)

     //Invoke useConvictions() to access array of convictions
      const convictions = useConvictions()

      //Finds the id number associated with the conviction that matches the selection from the dropdown (and store it in a new variable)
      const conviction = convictions.find( (conviction) => conviction.id === parseInt(event.detail.crimeThatWasChosen) )
      
      //Invoke useCriminals() to access the array of criminals (and store it in a new variable)
      const criminalsToFilter = criminals.slice()

      //Filters criminals by checking if their conviction matches the conviction name (conviction.name is
      //called that because of line 44 above) .filter is used because more than one criminal will have a matching conviction
      const matchingCriminals = criminalsToFilter.filter( (criminal) => criminal.conviction === conviction.name)

      //Calls render on matchingCriminals, defined above as the array of criminals that match the chosen crime
      //Criminals rendered to the DOM are now only those that were convicted of the crime chosen from dropdown
        render(matchingCriminals)
  } 
}) 
//If an officer is selected from the OfficerSelect dropdown
//Listen for the customEvent you dispatched in OfficerSelect
eventHub.addEventListener("officerChosen", event => {

  //Use the property you added to the event detail.
  if (event.detail.selectedOfficer !== "0"){
    //Check to see what event.detail contains (an object with one key-value pair - "selectedOfficer": id# of officer)
    console.log("officer", event.detail)

    //Invoke useOfficers() to access array of officers
    const officers = useOfficers()

    //Finds the id number associated with the officer that matches the id of the dropdown selected (and stores it in a new var)
    const arrestingOfficer = officers.find( (officer) => officer.id === parseInt(event.detail.selectedOfficer) )

    //Invoke useCriminals() to access the array of criminals (and store it in a new var)
    const criminalsToFilter = criminals.slice()

    //Filters criminals by checking if their arresting officer matches the officer name (arrestingOffice.name is called
    //that because of line 71 above) .filter is used bc more than one criminal will have a matching arrestingOfficer
    const arrestedCriminals = criminalsToFilter.filter( (criminal) => criminal.arrestingOfficer === arrestingOfficer.name)

    //Calls render on arrestedCriminals, defined above as the array of criminals with the chosen arresting officer
    //criminals rendered to the DOM are now only those with the selected arrestingOfficer
    render(arrestedCriminals)
  }
})



