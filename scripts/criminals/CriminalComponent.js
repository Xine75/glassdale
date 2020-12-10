
// const alibiTarget = document.querySelector(".alibi")
const eventHub = document.querySelector(".container")

//Creates HTML formatting for JavaScript info

export const Criminal = (criminal) => {
    return `
        <article class="criminals">
            <h1>${criminal.name}</h1>
            <div class="criminals__age">Age: ${criminal.age}</div>
            <div class="criminals__crime">Crime: ${criminal.conviction}</div>
            <div class="criminals__term__start">Term Start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}
            </div>
            <div class="criminals__term__end">Term End: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}
            </div>
            <button id="associates--${criminal.id}">Associate Alibis</button>
          
        </article>
    `
}

//Create custom event and broadcast that Associate Alibi button was clicked
//Placed in same module as button itself so that if any changes are made to labelling it can be
//addressed in both places easily
eventHub.addEventListener("click", e => {
    //looks for the Associate Alibi button by looking for string tag that starts with "associates--"
    if (e.target.id.startsWith("associates--")) {

        //array destructuring to assign variables to the two strings returned by the 
        //.split method.  Allows us to access the second string on line 36
        let [tag, id] =  e.target.id.split("--")
        
        const alibiEvent = new CustomEvent ("alibiClicked", {
            detail: {
            alibiButton: id // this is the value of the id we accessed line 32 and the data we are dispatching
            //to our event listener in CriminalList
            }
            
        }) 
        //dispatchEvent notifies the eventListener and passes the criminal's id
        eventHub.dispatchEvent(alibiEvent)
    }
  })



