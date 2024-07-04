import { facilities } from "../managers/facilityManager.js";
import { setFacility, setMineral, transientState } from "./TransientState.js"
import { facilityMineralOptions } from "./facilityMinerals.js"
import { updateSpaceCart } from "./spaceCart.js";

const handleFacilityChoice = async (event) => {
    if (event.target.name === "facility") {
        const facilityId = parseInt(event.target.value)
        setFacility(facilityId) // Update transient state

        // Update minerals list for the selected facility
        const mineralsHTML = await facilityMineralOptions(facilityId)
        document.getElementById("mineralsList").innerHTML = mineralsHTML

        // Add event listener to mineral radio buttons
        document.querySelectorAll('input[name="mineral"]').forEach(radio => {
            radio.addEventListener("change", (event) => {
                const mineralId = parseInt(event.target.value)
                setMineral(mineralId)
                updateSpaceCart(mineralId, facilityId) // Update space cart based on mineral and facility
            })
        })

        // Set the selected facility in the dropdown
        document.querySelector('select[name="facility"]').value = facilityId.toString()
    }
}

// Function to build facility options dropdown
export const facilityOptions = async () => {
    const facilitiesData = await facilities()
    const currentFacilityId = transientState.facilityId // Get current facility ID

    let facilityOptionsHTML ="<div id='title'>Choose a facility <select name='facility'>"
    facilityOptionsHTML += "<option value='' disabled selected>Choose a facility...</option>"

    facilitiesData.forEach(facility => {
        // Determine if the facility should be selected based on current transient state
        const isSelected = facility.id === currentFacilityId ? 'selected' : ''
        facilityOptionsHTML += `<option value='${facility.id}' ${isSelected}>${facility.name}</option>`
    })
    
    facilityOptionsHTML += "</select></div>"

    document.addEventListener("change", handleFacilityChoice)

    return facilityOptionsHTML
}