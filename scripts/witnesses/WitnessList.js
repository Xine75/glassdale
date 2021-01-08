//WitnessList is in charge of rendering witness statements to the DOM
//other half of eventListener to react to button click
//render witnesses in Criminal container to overwrite criminal cards

import { getWitnesses, useWitnesses } from "./WitnessProvider.js"
import { Witness } from "./Witness.js"

//Defines where eventHub broadcasts from
const eventHub = document.querySelector(".container")
//Defines where an array of witness objects will render to the DOM (see line 24 below)
const contentTarget = document.querySelector(".criminalsContainer")

eventHub.addEventListener("showWitnessClicked", e => {
    console.log("I'm listening")
    if (clickEvent.target.id === "showWitnesses"){
        const render = (witnesses) => {
            let witnessCards = []
            for (const witness of witnesses){
                contentTarget.innerHTML = witnessCards.push(Witness(witness)).join("")
            }
        }


    }



})





