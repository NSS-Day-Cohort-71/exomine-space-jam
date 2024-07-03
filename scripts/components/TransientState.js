import { facilityMineralOptions } from "./facilityMinerals.js"

const transientState = {
    "governorId": 0,
    "facilityId": 0,
    "colonyId": 0,
    "mineralId": 0,
    "amount": 0,
}

export const setGovernor = (chosenGovernor) => {
    transientState.governorId = chosenGovernor
    console.log(transientState)
}

export const setFacility = (chosenFacility) => {
    transientState.facilityId = chosenFacility
    console.log(transientState)
    // document.dispatchEvent(new CustomEvent("stateChanged")) // Pre-loaded with repo
}

export const setColony = (chosenColony) => {
    transientState.colonyId = chosenColony
    console.log(transientState)
}

export const setMineral = (chosenMineral) => {
    transientState.mineralId = chosenMineral
    transientState.amount = 1
    console.log(transientState)
}



export const purchaseMineral = async () => {
    // Fetch colony minerals
    const colonyMineralResponse = await fetch("http://localhost:8088/colonyMinerals?_expand=mineral&_expand=colony");
    const colonyMinerals = await colonyMineralResponse.json();

    // Fetch facility minerals
    const facilityMineralResponse = await fetch("http://localhost:8088/facilityMinerals?_expand=mineral&_expand=facility");
    const facilityMinerals = await facilityMineralResponse.json();

    // Find the specific facility mineral to subtract from
    const facilityMineralToUpdate = facilityMinerals.find(fm => fm.mineralId === transientState.mineralId && fm.facilityId === transientState.facilityId);

    // Find the specific colony mineral to add to
    const colonyMineralToUpdate = colonyMinerals.find(cm => cm.mineralId === transientState.mineralId && cm.colonyId === transientState.colonyId);

    // Create PUT request options for updating facility mineral
    const facilityOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...facilityMineralToUpdate,
            quantity: facilityMineralToUpdate.quantity - 1 // Subtract 1 from facility mineral
        })
    };

    // Execute PUT request to update facility mineral
    await fetch(`http://localhost:8088/facilityMinerals/${facilityMineralToUpdate.id}`, facilityOptions);

    // Create PUT request options for updating colony mineral
    const colonyOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...colonyMineralToUpdate,
            quantity: colonyMineralToUpdate.quantity + 1 // Add 1 to colony mineral
        })
    };

    // Execute PUT request to update colony mineral
    await fetch(`http://localhost:8088/colonyMinerals/${colonyMineralToUpdate.id}`, colonyOptions);

    // Dispatch event to indicate state change
    document.dispatchEvent(new CustomEvent("stateChanged"));

    console.log('Mineral transfer successful.');
};