import { facilities } from "../managers/facilityManager.js";
import { setFacility, setMineral } from "./TransientState.js"
import { facilityMineralOptions } from "./facilityMinerals.js"
import { updateSpaceCart } from "./spaceCart.js";

const handleFacilityChoice = async (event) => {
    if (event.target.name === "facility") {
        const facilityId = parseInt(event.target.value)
        setFacility(facilityId)

        // Update minerals list for the selected facility
        const mineralsHTML = await facilityMineralOptions(facilityId)
        document.getElementById("mineralsList").innerHTML = mineralsHTML

        // Add event listener to mineral radio buttons
        document.querySelectorAll('input[name="mineral"]').forEach(radio => {
            radio.addEventListener("change", (event) => {
                const mineralId = parseInt(event.target.value)
                setMineral(mineralId)
                updateSpaceCart(mineralId, facilityId)
            })
        })
    }
}

export const facilityOptions = async () => {
    document.addEventListener("change", handleFacilityChoice)
    const facilitiesData = await facilities()

    let facilityOptionsHTML ="<div>Choose a facility <select name='facility'>"
    facilityOptionsHTML += "<option value='' disabled selected>Choose a facility...</option>"

    const facilityStringArray = facilitiesData.map(
        (facility) => {
            if (facility.status === true) {
                return `<option value='${facility.id}'>${facility.name}</option>`
            } else {
                return `<option disabled value='${facility.id}'>${facility.name}</option>`
            }
        }
    )

    facilityOptionsHTML += facilityStringArray.join("")
    facilityOptionsHTML += "</select></div>"

    return facilityOptionsHTML
}