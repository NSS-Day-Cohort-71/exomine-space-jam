import { governors } from "../managers/governorManager.js";
import { setColony, setGovernor } from "./TransientState.js";

// Function to fetch and display colony name/info for a selcted governor
export const governorInfo = async (governorId) => {
    const governorsData = await governors() // Fetch governors data
    const governor = governorsData.find(gov => gov.id === governorId) // Find governor with specified ID

    // Create HTML to display colony name/info
    const colonyHTML = `
        <div class="colony__minerals">
            <header class="colony__name">
                <h2>${governor.colony.name} Minerals</h2>
            </header>
        </div>
    `
    return colonyHTML
}

// Function to populate governors dropdown list
export const governorList = async () => {
    const governorsData = await governors() // Fetch governors data
    const dropdown = document.getElementById("governorDropdown") // Get dropdown element

    // Iterate through governors data to create options for dropdown
    governorsData.forEach(governor => {
        const option = document.createElement("option")
        option.value = governor.id
        option.textContent = `${governor.name}`
        dropdown.appendChild(option)
    })
}

// Function to handle change events on the governor dropdown
export const handleGovernorDropdownChange = async () => {
    const dropdown = document.getElementById("governorDropdown") // Get dropdown element

    // Add change event listener to dropdown
    dropdown.addEventListener("change", async (event) => {
        const selectedGovernor = parseInt(event.target.value) // Get selected governor ID from dropdown
        if (selectedGovernor) {
            // Fetch and display governor's colony info
            const governorDetailsHTML = await governorInfo(selectedGovernor)
            const colonyNameContainer = document.getElementById("colonyDetails")
            colonyNameContainer.innerHTML = governorDetailsHTML

            // Update transient state for selected governor and their colony
            setGovernor(selectedGovernor)
            const governorsData = await governors()
            const governor = governorsData.find(gov => gov.id === selectedGovernor)
            setColony(governor.colonyId)
        } else {
            // If no governor selected, display default message
            document.getElementById("colonyDetails").innerHTML = `<h2>Colony Minerals</h2>`
        }
    })
}