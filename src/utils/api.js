import Api from "../components/Api.js";

const groupID = "group-12";
const token = "4b3d68f6-93f6-47fe-aa02-88e9440cdc46";

const api = new Api({
  baseUrl: `https://around.nomoreparties.co/v1/${groupID}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

export default api;
