import { render } from "./render.js";
import { fetchSheetData } from "./api.js";
import { state } from "./state.js";

async function init() {
  render();

  if (state.isLoggedIn) {
    await fetchSheetData();
    render();
  }
}

init();

setInterval(async () => {
  if (state.isLoggedIn) {
    await fetchSheetData();
    render();
  }
}, 60000);