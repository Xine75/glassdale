let facilities = []

export const useFacilities = () => {
    facilities.sort((currentObject, nextObject) => {
        let currentObjectName = currentObject.facilityName.toUpperCase()
        let nextObjectName = nextObject.facilityName.toUpperCase()
        if (currentObjectName < nextObjectName) {
            return -1
        }
        if (currentObjectName > nextObjectName) {
            return 1
        }
        return 0
    }
)
return facilities.slice()
}

export const getFacilities = () => {
   return fetch("https://criminals.glassdale.us/facilities")
    .then(response => response.json())
    .then(apiData => {
        facilities = apiData
    })
}