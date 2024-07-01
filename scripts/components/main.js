import { facilityOptions } from "./facilityList.js"
import { spaceCartButton } from "./SpaceCartButton.js"


import { handleGovernorDropdownChange, governorList } from "./governorList.js"

const container = document.querySelector("#container")

const render = async () => {
    const placeOrder = await spaceCartButton()

    const facilityHTML = await facilityOptions()

    const theHTML = `
        <h1>Solar System Mining Marketplace</h1>
        <article class="choice">
            <section class="governors__list">
                <select id="governorDropdown">
                    <option value="">Choose a governor...</option>
                </select>
                <div id="colonyDetails"></div>
            </section>

            <section class="colony">
            
            </section>

            <section class="facility">
            ${facilityHTML}
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