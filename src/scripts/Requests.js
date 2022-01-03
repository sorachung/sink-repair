import { getRequests, deleteRequest, getPlumbers, saveCompletion, getCompletions} from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    const completions = getCompletions()

    let html = `
        <ul>
            ${
                requests.map(request => {
                    return `
                ${request.complete ? `<li class="complete">` : `<li>`}
                    ${request.description} - ${request.address} - $${request.budget} - needed by ${request.neededBy}
                    ${request.complete ? `<select class="plumbers" hidden="hidden" id="plumbers">` : `<select class="plumbers" id="plumbers">`}
                        <option value="">Choose</option>
                        ${
                            plumbers.map(
                                plumber => {
                                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                                }
                            ).join("")
                        }
                    </select>

                    <button class="request__delete"
                        id="request--${request.id}">
                        Delete
                    </button>
                    
                    </li>
                `}).join("")
            }
        </ul>
    `
              
    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

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
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                dateCreated: Date.now()
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
