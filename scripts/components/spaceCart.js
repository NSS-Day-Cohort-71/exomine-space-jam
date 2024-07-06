import { facilities } from "../managers/facilityManager.js"
import { minerals } from "../managers/mineralManager.js"

export const updateSpaceCart = async (mineralId, facilityId) => {
    const mineralsData = await minerals()
    const selectedMineral = mineralsData.find(mineral => mineral.id === mineralId)

    const facilitiesData = await facilities()
    const selectedFacility = facilitiesData.find(facility => facility.id === facilityId)
    
    const spaceCartContainer = document.getElementById("spaceCart")
    spaceCartContainer.innerHTML = `
        <p>1 ton of ${selectedMineral.type} from ${selectedFacility.name}</p>
    `
}