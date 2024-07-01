import { setFacility } from "./TransientState.js"


const handleFacilityChoice = (event) => {
    if (event.target.name === "facility") {
        setFacility(parseInt(event.target.value))
    }
}

export const facilityOptions = async () => {
    document.addEventListener("change", handleFacilityChoice)
    const response = await fetch("http://localhost:8088/facilities")

    const facilities = await response.json()

    let facilityOptionsHTML ="<div>Choose a facility <select name='facility'>"

    const facilityStringArray = facilities.map(
        (facility) => {
            return `<option value='${facility.id}'>${facility.name}</option>`
        }

    )

    facilityOptionsHTML += facilityStringArray.join("")
    facilityOptionsHTML += "</select></div>"

    return facilityOptionsHTML
}