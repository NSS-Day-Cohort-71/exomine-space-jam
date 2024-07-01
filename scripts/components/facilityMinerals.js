import { setMineral } from "./TransientState.js";

const handelMineralChoice = async (event) => {
    if (event.target.name === "mineralOptions") {
        const mineral = parseInt(event.target.value)
        setMineral(mineral)
    }
}

export const facilityMineralOptions = async (facilityId) => {
    document.addEventListener("change", handelMineralChoice)
    const response = await fetch("http://localhost:8088/facilityMinerals?_expand=mineral&_expand=facility");
    const facilityMinerals = await response.json();

    const facility = facilityMinerals.find(fm => fm.facilityId === facilityId)?.facility

    const matchedMinerals = facilityMinerals.filter(fm => fm.facilityId === facilityId);
    
    let mineralsHTML = `<h2>Facility Minerals For ${facility.name}</h2><div>Choose a mineral`;
    
    matchedMinerals.forEach(fm => {
        mineralsHTML += `<div><input type='radio' value='${fm.mineral.id}' name='mineralOptions'>${fm.mineral.type} - Quantity: ${fm.quantity}</input></div>`;
    });

    mineralsHTML += "</div>";
    
    return mineralsHTML;
};
