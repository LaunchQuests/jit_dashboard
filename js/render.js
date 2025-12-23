import { state } from "./state.js";
import { renderDashboard } from "./dashboard.js";
import { renderLogin } from "./auth.js";

export function render() {
  const app = document.getElementById("app");

  if (!state.isLoggedIn) {
    app.innerHTML = renderLogin();
    return;
  }

  if (state.currentPage === "dashboard") {
    app.innerHTML = renderDashboard();
  }
}
