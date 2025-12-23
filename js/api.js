import { SHEET_API_URL } from "./config.js";
import { state } from "./state.js";

export async function fetchSheetData() {
  const res = await fetch(SHEET_API_URL);
  const json = await res.json();

  if (!json.success) throw new Error("Sheet API failed");

  state.data.cities = [];
  state.data.stores = [];

  json.data.forEach((row, index) => {
    const name = row["Store Name"];
    if (!name) return;

    const city = (row["City"] || "bangalore").toLowerCase();

    if (!state.data.cities.includes(city)) {
      state.data.cities.push(city);
    }

    let store = state.data.stores.find(
      s => s.name === name && s.city === city
    );

    if (!store) {
      store = { id: index + 1, name, city, audits: [] };
      state.data.stores.push(store);
    }

    store.audits.push({
      id: Date.now() + index,
      shopperName: row["Mystery Shopper Name"],
      date: row["Date of Visit"] || row["Timestamp"],
      salesperson: row["Sales Person Name"],
      score: Number(row["Final Scores (Overall Experience)"]) || 0
    });
  });
}
