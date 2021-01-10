//exports a function which returns a string of HTML to form facility
//cards when looped through an array of facility objects

export const Facility = (facilityObject, criminals) => {
    return `
    <section class="facilities" id="facility--${facilityObject.id}>
    <h4> ${facilityObject.facilityName}</h4>
    <p>Security: ${facilityObject.securityLevel}</p>
    <p>Capacity: ${facilityObject.capacity}</p>
        <h5>Criminals</h5>
        <ul>
        ${criminals.map(c => `<li>${c.name}</li>`).join("")}
        </ul>
    </section>
    `
}