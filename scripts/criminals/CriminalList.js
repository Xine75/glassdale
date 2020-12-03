import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminals } from "./CriminalComponent.js"

//Invokes getCriminals, which has fetched, converted, ordered and placed into an array the criminal data
//Then...

const eventHub = document.querySelector(".container")

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeChosen", event => {
  // Use the property you added to the event detail.
  if (event.detail.crimeThatWasChosen !== "0"){
      /*
          Filter the criminals application state down to the people that committed the crime
      */
     const appStateCriminals = useCriminals()
      const matchingCriminals = appStateCriminals.filter(currrentCrime =>{
        return appStateCriminals.conviction === currrentCrime

      })

      /*
          Then invoke render() and pass the filtered collection as
          an argument
      */
  }
})

export const CriminalList = ()=> {
getCriminals().then(() => {
    
    // ... takes a copy of that array that was made with useCriminals and places it into a variable.

const criminalsArray = useCriminals()

//Declares a place to inject the HTML into the DOM and puts it into a variable. 
const contentElement = document.querySelector(".criminalsContainer")

  // Generates all of the HTML by looping over each criminalObject on the criminalsArray(defined above)
  
  for (const criminalsObject of criminalsArray) {
    
            //   console.log("one criminal!", criminalsObject) *shows what one criminalObject looks like in console

      const criminalHTML = Criminals(criminalsObject)
    contentElement.innerHTML += criminalHTML
  }

}
)

}