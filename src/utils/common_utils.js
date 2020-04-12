export const getGrossProfit = function (revenue, costOfRevenue) {
    let res = [];
    for (let i = 0; i < revenue.length; i++) {
        const percentage = ((revenue[i] - costOfRevenue[i]) * 100 / revenue[i]).toFixed(2);
        res.push(percentage);
    }

    return res;
};

export const getRevenuePercentage = function (revenue, totalRevenue) {
    let res = [];
    for (let i = 0; i < revenue.length; i++) {
        const percentage = (revenue[i] * 100 / totalRevenue[i]).toFixed(2);
        res.push(percentage);
    }

    return res;
};

export const getRevenueYOY = function (revenue) {
    let res = [];
    for (let i = 0; i < revenue.length; i++) {
        if(i < 4 || revenue[i-4] === 0) { // So we don't divide by 0
            res.push(0);
        } else {
            console.log(revenue[i] + " : " + revenue[i-4]);
            res.push(((revenue[i] - revenue[i-4]) * 100 / revenue[i-4]).toFixed(2));
        }
    }

    return res;
};

export const getFreeCashFlow = function(cashFromOperations, cashFromInvesting) {
    let res = [];
    for (let i = 0; i < cashFromOperations.length; i++) {
        res.push(cashFromOperations[i] + cashFromInvesting[i]);
    }

    return res;
};
