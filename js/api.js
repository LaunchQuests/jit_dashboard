import { state } from "./state.js";

const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbyIqF1aD9SI_jlCoJ3GN-6noBgJosq1Mh4z1t720eyDhuczwKdLVwc9x1OdfefBoFHy0w/exec";

export async function fetchSheetData() {
  try {
    const res = await fetch(SHEET_API_URL);
    const json = await res.json();

    // Normalize array safely
    const rows = Array.isArray(json)
      ? json
      : json.data || json.records || [];

    // Reset
    state.data.cities = [];
    state.data.stores = [];

    rows.forEach((row, index) => {
      if (!row.StoreName && !row.storename) return;

      const name = (row.StoreName || row.storename || "").trim();
      const city = (row.City || row.city || "Bangalore").toLowerCase();

      if (!state.data.cities.includes(city)) {
        state.data.cities.push(city);
      }

      let store = state.data.stores.find(
        s => s.name === name && s.city === city
      );

      if (!store) {
        store = {
          id: state.data.stores.length + 1,
          name,
          city,
          audits: []
        };
        state.data.stores.push(store);
      }

      store.audits.push({
        id: index + 1,
        shopper: row["Mystery Shopper Name"] || row.mystery_shopper_name || "-",
        date: row["Date of Visit"] || row.date_of_visit || row.Timestamp,
        score: Number(row["Final Scores (Overall Experience)"] || row.final_scores_overall_experience_) || 0,
        hygiene: Number(row["Overall Hygiene"] || row.overall_hygiene) || 0,
        knowledge: Number(row["Product Knowledge"] || row.product_knowledge) || 0
      });
    });

    state.isLoggedIn = true; // auto-login after data load
  } catch (err) {
    console.error("Failed to fetch sheet data", err);
  }
}