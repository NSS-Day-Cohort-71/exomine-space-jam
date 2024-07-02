import { governors } from "../managers/governorManager.js";
import { setColony, setGovernor } from "./TransientState.js";
import { getColonyMinerals } from "./colonyMinerals.js";

// Function to populate governors dropdown list
export const governorList = async () => {
    const governorsData = await governors() // Fetch governors data
    const dropdown = document.getElementById("governorDropdown") // Get dropdown element

    // Iterate through governors data to create options for dropdown
    governorsData
        .filter(governor => governor.status) // Filter out inactive governors
        .forEach(governor => {
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
        // Get selected governor ID from dropdown
        const selectedGovernor = parseInt(event.target.value)

        // Fetch and display governor's colony
        const governorsData = await governors()
        const governor = governorsData.find(gov => gov.id === selectedGovernor)
        const colonyId = governor.colonyId
        
        // Fetch and display colony minerals
        const colonyMinerals = await getColonyMinerals(colonyId)
        const mineralsContainer = document.getElementById("colonyDetails")
        mineralsContainer.innerHTML = `
            <h2>${governor.colony.name} Minerals</h2>
            <ul>
                ${colonyMinerals.map(cm => `<li>${cm.quantity} tons of ${cm.mineral}</li>`).join("")}
            </ul>
        `

        // Update transient state for selected governor and their colony
        setGovernor(selectedGovernor)
        setColony(governor.colonyId)
    })
}