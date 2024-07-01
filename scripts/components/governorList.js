import { governors } from "../managers/governorManager.js";

export const governorInfo = async (governorId) => {
    const governorsData = await governors()
    const governor = governorsData.find(gov => gov.id === governorId)
    console.log(governor.colony.name)

    const governorHTML = `
        <div class="colony__minerals">
            <header class="colony__name">
                <h2>${governor.colony.name} Minerals</h2>
            </header>
        </div>
    `
    return governorHTML
}

export const governorList = async () => {
    const governorsData = await governors()
    const dropdown = document.getElementById("governorDropdown")

    governorsData.forEach(governor => {
        const option = document.createElement("option")
        option.value = governor.id
        option.textContent = `${governor.name}`
        dropdown.appendChild(option)
    })
}

export const handleGovernorDropdownChange = async () => {
    const dropdown = document.getElementById("governorDropdown")

    dropdown.addEventListener("change", async (event) => {
        const selectedGovernor = parseInt(event.target.value)
        if (selectedGovernor) {
            const governorDetailsHTML = await governorInfo(selectedGovernor)
            const colonyNameContainer = document.getElementById("colonyDetails")
            colonyNameContainer.innerHTML = governorDetailsHTML
        } else {
            document.getElementById("colonyDetails").innerHTML = ""
        }
    })
}