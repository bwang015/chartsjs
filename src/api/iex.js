import axios from "axios";

const api = axios.create({
    baseURL: "https://cloud.iexapis.com/v1"
});

export const loadQuotesForStock = symbol => {
    return api.get(`stock/${symbol}/quote`, {
        params: {
            token: 'pk_6a8d601889f54a4ab71208b58392789f'
        }
    }).then(res => res.data);
};
