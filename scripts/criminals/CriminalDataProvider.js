//Create array for criminals

let criminals = []

//Make copy of that array for later manipulation

export const useCriminals = () => criminals.slice()


//Fetch criminal info from external API.  Then turn that info into JavaScript with .json. 
//Create a table in the console of the criminals.
//Put the ordered/formatted criminals into the criminals array (which is then copied by useCriminals)

export const getCriminals = () => {
    return fetch("https://criminals.glassdale.us/criminals")
    .then(response => response.json())
    .then(
        orderedCriminals => {
            //console.table(orderedCriminals)
            criminals = orderedCriminals
        }
    )
   
}



