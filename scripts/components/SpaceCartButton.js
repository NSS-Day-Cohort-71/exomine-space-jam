import { purchaseMineral } from "./TransientState.js"

const handleOrderClick = (clickEvent) => {
    if(clickEvent.target.id === "placeOrder") {
        purchaseMineral()

        // const updating = new CustomEvent("stateChanged")
        // document.dispatchEvent(updating)
    }
}

export const spaceCartButton = () => {
    document.addEventListener("click", handleOrderClick)
    return "<button id='placeOrder'>Purchase<br>Mineral</button>"
}