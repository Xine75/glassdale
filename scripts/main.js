import { CriminalList } from "./criminals/CriminalList.js"
import { ConvictionSelect } from "./convictions/ConvictionSelect.js"
import { officerSelect } from "./OfficerSelect.js"
import { NoteForm } from "./notes/NoteForm.js"
import { ShowNoteButton } from "./notes/ShowNotesButton.js"
import { WitnessStatementButton } from "./witnesses/witnessButton.js"
import { AssociatesDialog } from "./criminals/DialogAlibi.js"
import { DisplayFacilitiesButton } from "./facility/facilitiesButton.js"

import  "./facility/FacilityList.js"
import  "./notes/NoteList.js"
import "./witnesses/WitnessList.js"

CriminalList()
ConvictionSelect()
officerSelect()
NoteForm()
ShowNoteButton()
AssociatesDialog()
WitnessStatementButton()
DisplayFacilitiesButton()



//import "./criminals/Alibi.js"
//import { Criminal } from "./criminals/CriminalComponent.js"
//Criminal()


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