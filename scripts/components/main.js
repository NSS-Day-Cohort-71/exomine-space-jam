


const container = document.querySelector("#container")

const render = async () => {


    const theHTML = `
        <h1>Solar System Mining Marketplace</h1>
        <article class="choice">
            <section class="governors">
            
            </section>

            <section class="colony">
            
            </section>

            <section class="facility">
            
            </section>

        </article>

        <article class="theSpaceCartSection">
            <h1>Space Cart</h1>
            
        </article>

    `

    container.innerHTML = theHTML

}

render()