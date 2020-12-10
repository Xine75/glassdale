import { useCriminals } from "./CriminalDataProvider.js"

const alibiTarget = document.querySelector(".alibi")
const eventHub = document.querySelector(".container")

//listens for alibiEvent to be dispatched from CriminalComponent, 
//renders associate name and alibi to the DOM

    eventHub.addEventListener("alibiClicked", e => {

        //useCriminals function gives us access to the criminal object array stored in the API
        const criminalArray = useCriminals()

        //Searches the criminalArray to find the first criminal whose id matches that of the alibiButton clicked
        //.find is most efficient bc it stops searching as soon as it finds the first match.  Since all our
        //id numbers are unique, there is no need to keep searching
        const criminalObj = criminalArray.find( (criminal) => criminal.id === parseInt(e.detail.alibiButton))

        //renders text to the DOM
        //name of criminal for clarity, then an unordered list containing associate name and alibi provided
        alibiTarget.innerHTML = `
        <article class="alibi">
        <h2>${criminalObj.name}</h2>
        <ul>
        ${
          criminalObj.known_associates.map( (associate) => //.map loops over an array.  In this case, it's the known_associate array inside the criminal object
              `<li>Associate Name: ${associate.name}</li>  
              <li>Alibi Given: ${associate.alibi}</li>` //then we can pull out the name and alibi of the associate array
          ).join("---------------------") // i did this so that multiple associate and alibis can be more clearly differentiated
      }
      </ul>
        </article>

        `
    })