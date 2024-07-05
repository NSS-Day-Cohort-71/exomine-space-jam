import { purchaseMineral, transientState } from "./TransientState.js"

// Function to check and update the state of the purchase button
const updateSpaceCartButtonState = () => {
    const purchaseMineralButton = document.getElementById("placeOrder")

    if (transientState.governorId && transientState.colonyId && transientState.facilityId) {
        purchaseMineralButton.disabled = false // Enable button if all conditions are met
    } else if (purchaseMineralButton) {
        purchaseMineralButton.disabled = true // Otherwise, disable it
    }
}

const handleOrderClick = async (clickEvent) => {
    if (clickEvent.target.id === "placeOrder") {
        // Check if all required selections are made
        if (transientState.governorId && transientState.colonyId && transientState.facilityId) {
            // Preserve governor and facility selections
            const currentGovernorId = transientState.governorId
            const currentFacilityId = transientState.facilityId

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
        } else {
            // Display an alert if not all selections are made
            alert("Please select both a governor and a facility before purchasing.")
        }
    }
}

// Initialize the button behavior after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", handleOrderClick)
    updateSpaceCartButtonState() // Update button state initially
})

// Export the button creation function
export const spaceCartButton = () => "<button id='placeOrder'>Purchase<br>Mineral</button>"