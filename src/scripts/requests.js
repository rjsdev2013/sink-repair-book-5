import { getRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                 requestId: requestId,
                 plumberId: plumberId,
                 date_created:Date.now()

                 }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
             saveCompletion(completion)
            

        }
    }
)


mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})



const createOrderListItem = (item) => {
    const plumbers = getPlumbers()

    return `<div class ="div1"> <li class="request">${item.description}</Li>
        <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${item.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>
<button class="request__delete"
                id="request--${item.id}">
            Delete
        </button></div>
        `
}

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(createOrderListItem).join("")
            }
        </ul>
         `

    return html
}


