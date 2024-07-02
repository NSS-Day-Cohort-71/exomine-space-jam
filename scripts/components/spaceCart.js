import { facilities } from "../managers/facilityManager.js"
import { minerals } from "../managers/mineralManager.js"
import { spaceCartButton } from "./SpaceCartButton.js"
import { purchaseMineral } from "./TransientState.js"

export const updateSpaceCart = async (mineralId, facilityId) => {
    const mineralsData = await minerals()
    const selectedMineral = mineralsData.find(mineral => mineral.id === mineralId)
    console.log(selectedMineral)

    const facilitiesData = await facilities()
    const selectedFacility = facilitiesData.find(facility => facility.id === facilityId)
    console.log(selectedFacility)
    
    const spaceCartContainer = document.getElementById("spaceCart")
    spaceCartContainer.innerHTML = `
        <p>${selectedMineral.quantity} ton of ${selectedMineral.type} from ${selectedFacility.name}</p>
    `

    const spaceCartButtonContainer = document.getElementById("spaceCartButtonContainer")
    spaceCartButtonContainer.innerHTML = spaceCartButton()

    const purchaseButton = document.getElementById("placeOrder")
    purchaseButton.addEventListener("click", () => {
        purchaseMineral(selectedMineral.id)
    })
}