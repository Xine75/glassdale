//Create array for witnesses

let witnesses = []

//Make copy of that array for later manipulation

export const useWitnesses = () => witnesses.slice()


//Fetch witness info from external API.  Then turn that info into JavaScript with .json. 
//Put the ordered/formatted criminals into the witnesses array (which is then copied by useWitnesses)

export const getWitnesses = () => {
    return fetch("https://criminals.glassdale.us/witnesses")
    .then(response => response.json())
    .then(
        apiData => {
            witnesses = apiData
        }
    )
   
}