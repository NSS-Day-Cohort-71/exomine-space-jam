import { colonies } from "../managers/colonyManager.js"
import { colonyMinerals } from "../managers/colonyMineralsManager.js"
import { facilities } from "../managers/facilityManager.js"
import { facilityMinerals } from "../managers/facilityMineralsManager.js"
import { transientState } from "./TransientState.js"

// Function to update the DOM for colony minerals
export const updateColonyMineralsDOM = async () => {
    const colonyMineralsData = await colonyMinerals(transientState.colonyId)
    const mineralsContainer = document.getElementById("colonyDetails")

    const filteredMinerals = colonyMineralsData.filter(cm => cm.colonyId === transientState.colonyId)

    // Get colonies data and find colony currently in transient state to get colony name
    const coloniesData = await colonies()
    const colony = coloniesData.find(colony => colony.id === transientState.colonyId)

    mineralsContainer.innerHTML = `
        <h2>${colony.name} Minerals</h2>
        <ul>
            ${filteredMinerals.map(cm => `<ul>${cm.quantity} tons of ${cm.mineral.type}</ul>`).join("")}
        </ul>
    `
}

// Function to update the DOM for facility minerals
export const updateFacilityMineralsDOM = async () => {
    // Fetch facility minerals data based on the current facility ID
    const facilityMineralsData = await facilityMinerals(transientState.facilityId);
    const mineralsListElement = document.getElementById("mineralsList");

    // Filter facility minerals data to include only minerals for the current facility
    const filteredMinerals = facilityMineralsData.filter(fm => fm.facilityId === transientState.facilityId)

    // Store current selection before updating the DOM
    const currentSelection = document.querySelector('input[name="mineral"]:checked')?.value

    // Get facilities data and find facility currently in transient state to get facility name
    const facilitiesData = await facilities()
    const facility = facilitiesData.find(facility => facility.id === transientState.facilityId)

    // Construct the updated HTML content for facility minerals
    mineralsListElement.innerHTML = `
        <h2 id="facilityMineralsTitle">Facility Minerals${facility ? ` for ${facility.name}` : ''}</h2>
        <ul>
            ${filteredMinerals.map(fm => `
                <ul>
                    ${fm.quantity > 0 ? `<input type="radio" 
                            name="mineral" 
                            value="${fm.mineral.id}" 
                            id="mineral${fm.mineral.id}" ${fm.mineral.id == currentSelection ? 'checked' : ''}
                    >
                    <label for="mineral${fm.mineral.id}">${fm.quantity} tons of ${fm.mineral.type}</label>`
                    : `<label>${fm.quantity} tons of ${fm.mineral.type}</label>`}
                </ul>
            `).join("")}
        </ul>
    `
};
