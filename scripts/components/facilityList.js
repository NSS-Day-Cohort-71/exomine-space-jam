import { setFacility } from "./TransientState.js"
import { facilityMineralOptions } from "./facilityMinerals.js"



const handleFacilityChoice = async (event) => {
    if (event.target.name === "facility") {
        const facilityId = parseInt(event.target.value);
        setFacility(facilityId);

        const mineralsHTML = await facilityMineralOptions(facilityId);
        document.getElementById("mineralsList").innerHTML = mineralsHTML;
    }
}

export const facilityOptions = async () => {
    document.addEventListener("change", handleFacilityChoice)
    const response = await fetch("http://localhost:8088/facilities")

    const facilities = await response.json()

    let facilityOptionsHTML ="<div>Choose a facility <select name='facility'>"

    facilityOptionsHTML += "<option value='' disabled selected>Choose a facility...</option>"

    const facilityStringArray = facilities.map(
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