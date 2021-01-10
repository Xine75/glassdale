/*exports a function which returns a string of HTML to form witness card elements
* when looped thorugh an array of witness objects
*/

export const Witness = (witnessObject) => {
    const [firstName, lastName] = witnessObject.name.split(" ")
    return `
    <section class="witness" id="witness--${witnessObject.id}">
    <h4 id="witness__${witnessObject.name}"><span class="bold">Name</span>: ${lastName}, ${firstName}</h4>
    <p span class="bold">Statements</span>: ${witnessObject.statements}</p>
    </section>
    `
}