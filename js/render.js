import { state } from "./state.js";

export function render() {
  const app = document.getElementById("app");

  if (!state.isLoggedIn) {
    app.innerHTML = `
      <div class="h-screen flex items-center justify-center text-xl">
        🔐 Loading dashboard…
      </div>
    `;
    return;
  }

  const stores = state.data.stores;

  app.innerHTML = `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">
        Just In Time – Audit Dashboard
      </h1>

      <p class="mb-4">
        Total Stores: <b>${stores.length}</b>
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${stores
          .map(
            s => `
          <div class="p-4 rounded border">
            <h3 class="font-semibold">${s.name}</h3>
            <p class="text-sm text-gray-500">${s.city}</p>
            <p class="mt-2">Audits: ${s.audits.length}</p>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}