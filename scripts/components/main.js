import { facilityOptions } from "./facilityList.js"
import { spaceCartButton } from "./SpaceCartButton.js"
import { handleGovernorDropdownChange, governorList } from "./governorList.js"
import { facilityMineralOptions } from "./facilityMinerals.js"

const container = document.querySelector("#container")

const render = async () => {
    const placeOrder = await spaceCartButton()
    const facilityHTML = await facilityOptions()

    

    const theHTML = `
        <h1>Solar System Mining Marketplace</h1>
        <article class="choice">
            <section class="governors__list">
                <div>Choose a governor
                    <select id="governorDropdown">
                        <option value="">Choose a governor...</option>
                    </select>
                </div>
                <div id="colonyDetails">
                    <h2>Colony Minerals</h2>
                </div>
            </section>

            <section class="colony">
            
            </section>

            <section class="facility">
            ${facilityHTML}
            <div id="mineralsList"></div>
            
            </section>

        </article>

        <article class="theSpaceCartSection">
            <h1>Space Cart</h1>
              ${placeOrder}
        </article>

    `

    container.innerHTML = theHTML

    await governorList()
    handleGovernorDropdownChange()
}

render()