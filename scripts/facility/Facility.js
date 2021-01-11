//exports a function which returns a string of HTML to form facility
//cards when looped through an array of facility objects

export const Facility = (facilityObject) => {
    return `
    <section class="facilities" id="facility--${facilityObject.id}">
    <h4> ${facilityObject.facilityName}</h4>
    <p>Security: ${facilityObject.securityLevel}</p>
    <p>Capacity: ${facilityObject.capacity}</p>
        
    ${facilityObject.currentCriminals.length > 0 ? currentCriminalsRender(facilityObject.currentCriminals) : ""}
    ${facilityObject.previousCriminals.length > 0 ? previousCriminalsRender(facilityObject.previousCriminals) : ""}
    </section>
    `
}

const currentCriminalsRender = (criminals) => {
    return `
    <div>
        <h4>Presently Incarcerated</h4>
        <ul>
            ${criminals.map(c => {
                const [firstName, lastName] = c.name.split(" ")
                return `<li>${lastName}, ${firstName}</li>`
            }).join("")}
        </ul>
    </div>
    `
}

const previousCriminalsRender = (criminals) => {
    return `
    <div>
        <h4>Previously Incarcerated</h4>
        <ul>
            ${criminals.map(c => {
                const [firstName, lastName] = c.name.split(" ")
                return `<li>${lastName}, ${firstName}</li>`
            }).join("")}
        </ul>
    </div>
    `
}