import { getCriminals, useCriminals } from "./CriminalDataProvider.js"
import { Criminals } from "./CriminalComponent.js"

//Invokes getCriminals, which has fetched, converted, ordered and placed into an array the criminal data
//Then...

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