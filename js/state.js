export const state = {
  isLoggedIn: false,
  currentUser: null,
  currentPage: "login", // login | dashboard | store | audit
  selectedCity: "bangalore",
  selectedStore: null,
  selectedAudit: null,

  data: {
    cities: [],
    stores: []
  }
};
