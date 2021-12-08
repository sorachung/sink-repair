const applicationState = {
  requests: [],
};

const mainContainer = document.querySelector("#container");

const API = "http://localhost:8088";

export const fetchRequests = () => {
  return fetch(`${API}/requests`)
    .then((response) => response.json())
    .then((serviceRequests) => {
      // Store the external state in application state
      applicationState.requests = serviceRequests;
    });
};

export const getRequests = () =>
  applicationState.requests.map((request) => ({ ...request }));

export const sendRequest = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userServiceRequest),
  };

  return fetch(`${API}/requests`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const deleteRequest = (id) => {
  return fetch(`${API}/requests/${id}`, { method: "DELETE" })
      .then(
          () => {
              mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
          }
      )
}

export const fetchPlumbers = () => {
  return fetch(`${API}/plumbers`)
    .then(response => response.json())
    .then(plumbers => {
      applicationState.plumbers = plumbers;
    })
}

export const getPlumbers = () => applicationState.plumbers.map((plumber) => ({ ...plumber }))

export const saveCompletion = (userServiceRequest) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(userServiceRequest)
  }

  return fetch(`${API}/completions`, fetchOptions)
    .then(response => response.json())
    .then( () => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

export const fetchCompletions = () => {
  return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(completions => applicationState.completions = completions)
}

export const getCompletions = () => applicationState.completions.map(completion => ({ ...completion }))