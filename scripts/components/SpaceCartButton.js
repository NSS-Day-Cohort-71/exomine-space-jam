import { purchaseMineral } from "./TransientState.js"

const handleOrderClick = (clickEvent) => {
    if(clickEvent.target.id === "placeOrder") {
        purchaseMineral()
    }
}

export const spaceCartButton = () => {
    document.addEventListener("click", handleOrderClick)
    return "<div class='button-container'><button id='placeOrder'>Purchase<br>Mineral</button></div>"
}