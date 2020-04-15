import axios from "axios";

const api = axios.create({
    baseURL: "https://cloud.iexapis.com/v1"
});

export const loadQuotesForStock = symbol => {
    return api.get(`stock/${symbol}/quote`).then(res => res.data);
};
