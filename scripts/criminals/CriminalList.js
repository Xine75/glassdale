//CriminalList is in charge of rendering the criminal cards to the DOM
//It changes their state based on what the user selects from either the
//ConvictionSelect or OfficerSelect drop down menus

import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminal } from "./CriminalComponent.js"
import { useConvictions } from "../convictions/ConvictionProvider.js"
import { useOfficers } from "../OfficerProvider.js"

//Defines where eventHub broadcasts from
const eventHub = document.querySelector(".container")

//Defines where an array of criminal objects will render to the DOMn (see line 19 below)
const criminalElement = document.querySelector(".criminalsContainer")

//creates a render function that will itterate over all the criminals and render a specified array
const render = (criminals) => {
  let criminalCards = []
  for (const perp of criminals) {
    criminalCards.push(Criminal(perp))
  }

  //Takes criminalCards and pushes into criminalElement (defined on line 9), .join turns the array into a string with no commas between
  criminalElement.innerHTML = criminalCards.join("")

}
//If a crime is selected from the CrimeSelect dropdown
// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeChosen", event => {

  // Use the property you added to the event detail.
  if (event.detail.crimeThatWasChosen !== "0"){
      /*
          Filter the criminals application state down to the people that committed the crime
      */
     console.log("crime", event.detail)

     //Invoke useConvictions() to access array of convictions
      const convictions = useConvictions()

      //Finds the id number associated with the conviction (and store it in a new variable)
      const conviction = convictions.find( (conviction) => conviction.id === parseInt(event.detail.crimeThatWasChosen) )
      
      //Invoke useCriminals() to access the array of criminals (and store it in a new variable)
      const criminals = useCriminals()

      //Filters criminalsby checking if their conviction matches the conviction name (conviction.name is
      //called that because of line 38 above)
      const matchingCriminals = criminals.filter( (criminal) => criminal.conviction === conviction.name)

      //Calls render on matchingCriminals, defined above as the array of criminals that match the chosen crime
        render(matchingCriminals)
  } 
}) 
//If an officer is selected from the OfficerSelect dropdown
//Listen for the customEvent you dispatched in OfficerSelect
eventHub.addEventListener("officerChosen", event => {

  //Use the property you added to the event detail.
  if (event.detail.selectedOfficer !== "0"){

    //Filter the officers application state down to the people who were arrested by that officer

    console.log("officer", event.detail)

    //Invoke useOfficers() to access array of officers
    const officers = useOfficers()

    //Finds the id number associated with the officer (and stores it in a new var)
    const arrestingOfficer = officers.find( (officer) => officer.id === parseInt(event.detail.selectedOfficer) )

    //Invoke useCriminals() to access the array of criminals (and store it in a new var)
    const criminals = useCriminals()

    //Filters criminals by checking if their arresting officer matches the officer name (arrestingOffice.name is called
    //that because of line 65 above)
    const arrestedCriminals = criminals.filter( (criminal) => criminal.arrestingOfficer === arrestingOfficer.name)

    //Calls render on arrestedCriminals, defined abour as the array of criminals with the chosen arresting officer
    render(arrestedCriminals)
  }
})

//listens for alibiEvent to be dispatched from AlibiComponent, 
//renders associate name and alibi to the DOM
const alibiTarget = document.querySelector(".alibi")

    eventHub.addEventListener("alibiClicked", e => {

        const criminalArray = useCriminals()

        const criminalObj = criminalArray.find( (criminal) => criminal.id === parseInt(e.detail.alibiButton))

        alibiTarget.innerHTML = `

        <article class="alibi">
        <h2>${criminalObj.name}</h2>
        <ul>
        ${
          criminalObj.known_associates.map( (associate) =>
              `<li>Associate Name: ${associate.name}</li>
              <li>Alibi Given: ${associate.alibi}</li>`
          ).join("---------------------")
      }
      </ul>
        </article>

        `

    })



//Renders all the criminals to the DOM after getting them from the API
export const CriminalList = ()=> {
getCriminals().then(() => {
  let perps = useCriminals()
  render(perps)
    // ... takes a copy of that array that was made with useCriminals and places it into a variable.
})

}

