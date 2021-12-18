const applicationState = {
    requests: [],
    plumbers: [],
    completions: []

}


const API = "http://localhost:8088"


export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (Plumbers) => {
                // Store the external state in second application state variable?
                applicationState.plumbers = Plumbers
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    const mainContainer = document.querySelector("#container")


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            //userServiceRequest.POST -> PHP not JS 
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const deleteRequest = (id) => {
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveCompletion = (completion) => {
    const fetchCompletions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }
    const mainContainer = document.querySelector("#container")


    return fetch(`${API}/completions`, fetchCompletions)
        .then(response => response.json())
        .then(() => {
            //userServiceRequest.POST -> PHP not JS 
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const fetchCompletions = () => {
        return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completedRequests) => {
                // Store the external state in application state
                applicationState.completions = completedRequests
            }
        )
}

