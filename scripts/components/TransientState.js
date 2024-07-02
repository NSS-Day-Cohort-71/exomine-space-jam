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
    console.log(transientState)
}

// Also pre-loaded wtih repo. This *should* be our PUT function for this module.
export const purchaseMineral = async (facilityId) => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */
    const colonyMineralResponse = await fetch("http://localhost:8088/colonyMinerals?_expand=mineral&_expand=colony")
    const colonyMineral = await colonyMineralResponse.json()
    const facilityMineralResponse = await fetch("http://localhost:8088/facilityMinerals?_expand=mineral&_expand=facility")
    const facilityMineral = await facilityMineralResponse.json()
    const facility = facilityMineral.find(fm => fm.facilityId === transientState.facilityId)?.facility


    const test = facility.id
    const BOB = await facilityMineralOptions(test)

    

    const facilityOptions = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            ...facilityMineral,
            quantity: facility.quantity - 1 // Subtract 1 from facility mineral
        })
    };

    const colonyOptions = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(colonyMineral)
    };
    
    


    document.dispatchEvent(new CustomEvent("stateChanged"))
}
