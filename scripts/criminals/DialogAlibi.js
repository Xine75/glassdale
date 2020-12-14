import { useCriminals } from "./CriminalDataProvider.js"

const eventHub = document.querySelector(".container")
// const dialogClose = document.querySelector("#closeDialog")

eventHub.addEventListener("click", (event) => {
  if (event.target.id === "closeDialog") {
    associatesDialog.close();
  }
})

eventHub.addEventListener("alibiClicked", (event) => {
  const associatesDialog = document.querySelector("#associatesDialog")
  const dialogText = document.querySelector("#associatesDialog__text")

  //console.log('event alibi id', event.detail.alibiButton);

  const clickedCriminal = useCriminals().find(
      (criminal) => criminal.id === parseInt(event.detail.alibiButton)
    )

  dialogText.innerHTML =`
    <h3>Associates of ${clickedCriminal.name}</h3>
    ${clickedCriminal.known_associates.map( (associate) => `
      <h4>${associate.name}</h4>
      <div>${associate.alibi}</div>`
      ).join("-------------------------")}`

    //.showModal() allows the dialog box to display as the top layer and blocks
    //interaction outside of the dialog box
      associatesDialog.showModal()

})

export const AssociatesDialog = () => {
  return `
    <dialog id="associatesDialog">
      <div id="associatesDialog__text"></div>
      <button id="closeDialog">close</button>
    </dialog>
  `
}

//this is imported into CriminalList (line 26), though I'm confused about how exactly
//it is functioning there