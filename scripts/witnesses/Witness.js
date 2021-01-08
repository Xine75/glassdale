//creates HTML of witness statements

const Witness = (witnessObject) => {
    const [firstName, lastName] = witnessObject.name.split(" ")
    return `
    <section class="witness" id="witness--${witnessObject.id}">
    <h2>${witnessObject.name}</h2>
    <div class="witness__statement">${witnessObject.statements}</div>
    </section>
    `
}