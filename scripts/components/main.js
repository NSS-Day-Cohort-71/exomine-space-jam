import { facilityOptions } from "./facilityList.js"
import { spaceCartButton } from "./SpaceCartButton.js"
import { handleGovernorDropdownChange, governorList } from "./governorList.js"

const container = document.querySelector("#container")

const render = async () => {
    const placeOrder = spaceCartButton()
    const facilityHTML = await facilityOptions()

    const theHTML = `
        <h1>Solar System Mining Marketplace</h1>
        <article class="choice">
            <section class="governors__list">
                <div>Choose a governor
                    <select id="governorDropdown">
                        <option disabled selected value="">Choose a governor...</option>
                    </select>
                </div>
                <div id="colonyDetails">
                    <h2>Colony Minerals</h2>
                </div>
            </section>

            <section class="colony">
            
            </section>

            <section class="facility">
                <div id="facilityDropdown">
                    ${facilityHTML}
                </div>
                <div id="mineralsList"></div>
            </section>

        </article>

        <article class="theSpaceCartSection">
            <h1>Space Cart</h1>
            <div id="spaceCartButtonContainer">
            <div id="spaceCartButtonContainer">
            <div id="spaceCart">
              
            </div>
            <div id="spaceCartButtonContainer">
                ${placeOrder}
            </div>
            </div>
            
            </div>
            
        </article>
    `

    container.innerHTML = theHTML

    await governorList()
    handleGovernorDropdownChange()
}

render()

document.addEventListener("stateChanged", async event => {
    console.log("Updating")
})

document.addEventListener("stateChanged", async event => {
    console.log("Updating")
})