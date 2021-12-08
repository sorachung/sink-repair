import { fetchRequests, fetchPlumbers, fetchCompletions } from "./dataAccess.js";
import { SinkRepair } from "./SinkRepair.js";

const mainContainer = document.querySelector("#container");

const render = () => {
  Promise.all([
    fetchRequests(),
    fetchPlumbers(),
    fetchCompletions()
  ]).then(() => {
      mainContainer.innerHTML = SinkRepair();
    });
};

render();

mainContainer.addEventListener("stateChanged", (customEvent) => {
  render();
});
