import { setMineral } from "./TransientState.js";

const handleMineralChoice = async (event) => {
    if (event.target.name === "mineral") {
        const mineral = parseInt(event.target.value)
        setMineral(mineral)
    }
}

export const facilityMineralOptions = async (facilityId) => {
    const response = await fetch("http://localhost:8088/facilityMinerals?_expand=mineral&_expand=facility");
    const facilityMinerals = await response.json();

    const facility = facilityMinerals.find(fm => fm.facilityId === facilityId)?.facility
    const matchedMinerals = facilityMinerals.filter(fm => fm.facilityId === facilityId);
    
    let mineralsHTML = `<h2>Facility Minerals For ${facility.name}</h2>`;
    matchedMinerals.forEach(fm => {
        mineralsHTML += `<div><input type='radio' value='${fm.mineral.id}' name="mineral">${fm.quantity} tons of ${fm.mineral.type}</input></div>`;
    });
    
    document.addEventListener("change", handleMineralChoice)

    return mineralsHTML;
};
