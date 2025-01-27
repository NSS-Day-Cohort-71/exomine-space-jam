import { facilityOptions } from "./facilityList.js"
import { spaceCartButton } from "./SpaceCartButton.js"
import { handleGovernorDropdownChange, governorList } from "./governorList.js"

const container = document.querySelector("#mainContainer")

const render = async () => {
    const placeOrder = spaceCartButton()
    const facilityHTML = await facilityOptions()

    const theHTML = `
        <header class="header-logo">
            <img src="images/logos/exomineLogo4_1.png" alt="logo" class="logo">
            <h1>Solar System Mining Marketplace</h1>
        </header>

        <div id="container">
            <div id="mainContent">
                <section id="governors__list">
                    <div id="title">Choose a governor
                        <select id="governorDropdown">
                            <option disabled selected value="">Choose a governor...</option>
                        </select>
                    </div>
                </section>

                <section id="facility">
                    <div id="facilityDropdown">
                        ${facilityHTML}
                    </div>
                </section>
            </div>

            <section id="colonyDetails">
                <h2>Colony Minerals</h2>
            </section>
        </div>

        <div id="lowerContent">
            <section id="facilityDetails">
                <div id="mineralsList">
                    <h2 id="facilityMineralsTitle">Facility Minerals</h2>
                </div>
            </section>

            <section id="theSpaceCartSection">
                <h2>Space Cart</h2>
                <div id="spaceCart">

                </div>
                <div id="spaceCartButtonContainer">
                    ${placeOrder}
                </div>
            </section>
        </div>
    `

    container.innerHTML = theHTML

    await governorList()
    handleGovernorDropdownChange()
}

document.addEventListener("stateChanged", async event => {
    console.log("Updating")
    await render()
})

render()