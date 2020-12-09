import { CriminalList } from "./criminals/CriminalList.js"
import { ConvictionSelect } from "./convictions/ConvictionSelect.js"
import { officerSelect } from "./OfficerSelect.js"
import { NoteForm } from "./notes/NoteForm.js"
import { ShowNoteButton } from "./notes/ShowNotesButton.js"
import  "./notes/NoteList.js"
//import "./criminals/AlibiComponent.js"

CriminalList()
ConvictionSelect()
officerSelect()
NoteForm()
ShowNoteButton()






//What feature are we implementing
//Filter our criminals by the crime committed!

// What tasks do we need to complete to implement the feature?
//filter through the criminals data by matching the crime that has been selected 
//1. listen for the selection of a crime (selection from dropdown) and capture the chosen value (ConvictionSelect)
//2. Use the selected value to filter the criminal data
//3. Update the DOM with the filtered criminal data (CriminalList)

//Which modules are involved?
//1. CriminalList
//2. ConvictionSelect