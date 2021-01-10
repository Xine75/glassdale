//WitnessList is in charge of rendering witness statements to the DOM
//other half of eventListener to react to button click
//render witnesses in Criminal container to overwrite criminal cards

import { getWitnesses, useWitnesses } from "./WitnessProvider.js"
import { Witness } from "./Witness.js"

//Defines where eventHub broadcasts from
const eventHub = document.querySelector(".container")
//Defines where an array of witness objects will render to the DOM (see line 24 below)
const contentTarget = document.querySelector(".contentContainer")

let appStateWinessess =[]

//Renders a list of witnessObjects to the DOM

const render = () => {
    contentTarget.innerHTML = appStateWinessess.map(w => Witness(w)).join("")
}
/*
Runs the function render to rener all the witness elements to the .contentContainer when
the button element is clicked
*/

const WitnessList = () => {
    contentTarget.innerHTML = ""
    getWitnesses()
    .then(() => {
        appStateWinessess = useWitnesses()
        render()
    })
}


eventHub.addEventListener("showWitnessClicked", e => {
    console.log("I'm listening")
   WitnessList()
})





