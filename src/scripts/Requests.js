import { getRequests } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(request => `
                  <li id="request--${request.id}">${request.description}</li>
                `)
            }
        </ul>
    `

    return html
}
