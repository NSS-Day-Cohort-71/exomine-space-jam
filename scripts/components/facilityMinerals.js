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
    
    let mineralsHTML = `<h2 id="facilityMineralsTitle">Facility Minerals` 
    if (facility) {
        mineralsHTML += ` for ${facility.name}`;
    }
    mineralsHTML += `</h2>`

    matchedMinerals.forEach(fm => {
        if (fm.quantity > 0) {
            mineralsHTML += `<div><input type='radio' value='${fm.mineral.id}' name="mineral">${fm.quantity} tons of ${fm.mineral.type}</input></div>`
        } else {
            mineralsHTML += `<div>${fm.quantity} tons of ${fm.mineral.type}</div>`
        }
    })
    
    document.addEventListener("change", handleMineralChoice)

    const mineralsContainer = document.getElementById("mineralsList");
    mineralsContainer.innerHTML = mineralsHTML;

    // Remove radio buttons for minerals with quantity 0
    matchedMinerals.forEach(fm => {
        if (fm.quantity === 0) {
            const radio = document.querySelector(`input[type='radio'][value='${fm.mineral.id}']`)
            if (radio) {
                radio.parentNode.removeChild(radio)
            }
        }
    })

    return mineralsHTML;
};
