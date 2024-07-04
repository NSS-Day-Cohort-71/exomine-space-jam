import { purchaseMineral, transientState } from "./TransientState.js"

const handleOrderClick = async (clickEvent) => {
    if (clickEvent.target.id === "placeOrder") {

        // Preserve governor and facility selections
        const currentGovernorId = transientState.governorId
        const currentFacilityId = transientState.facilityId
        console.log(currentGovernorId, currentFacilityId)

        // Invoke purchaseMineral function
        await purchaseMineral()

        // Clear the selected radio button
        document.querySelectorAll('input[name="mineral"]').forEach(radio => radio.checked = false)
        // Clear the space cart text
        document.getElementById("spaceCart").innerHTML = ""

        // Restore governor and facility selections
        transientState.governorId = currentGovernorId
        transientState.facilityId = currentFacilityId
        console.log(transientState)
    }
}

export const spaceCartButton = () => {
    document.addEventListener("click", handleOrderClick)
    return "<button id='placeOrder'>Purchase<br>Mineral</button>"
}