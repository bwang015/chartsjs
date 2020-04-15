import _ from "lodash";
import {NUMERICAL_UNITS, Units} from "./enums";

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

export const getShareholderEquity = function(totalAssets, totalLiabilities) {
    let res = [];
    for (let i = 0; i < totalAssets.length; i++) {
        res.push(totalAssets[i] - totalLiabilities[i]);
    }

    return res;
};

export const getTTMRevenue = function(totalRevenue, pastNumberOfQuarters) {
    return _.takeRight(totalRevenue, pastNumberOfQuarters).reduce((sum, currentValue) => sum + currentValue);
};

export const getUnitConverter = function(units) {
    if(units === Units.THOUSANDS) {
        return NUMERICAL_UNITS[Units.THOUSANDS];
    } else if (units === Units.BILLIONS) {
        return NUMERICAL_UNITS[Units.BILLIONS];
    }

    return 0;
};

export const getPriceToSales = function(totalRevenue, units, marketCap) {
    const ttmRevenue = getTTMRevenue(totalRevenue, 4) * getUnitConverter(units);
    return (marketCap / ttmRevenue).toFixed(2);
};

export const getPeakPriceToSales = function(peakStockPrice, currentStockPrice, currentMarketCap, totalRevenue, units) {
    const outstandingShares = currentMarketCap / currentStockPrice;
    const peakMarketCap = peakStockPrice * outstandingShares;

    let pastTTMRevenue = getTTMRevenue(totalRevenue, 4) * getUnitConverter(units);
    // pastTTMRevenue += getNextQuarterRevenueEstimate(estimates);
    return (peakMarketCap / pastTTMRevenue).toFixed(2);
};

export const getFutureTTMRevenue = function(totalRevenue, units, estimates) {
    let futureTTMRevenue = getTTMRevenue(totalRevenue, 3) * getUnitConverter(units);
    futureTTMRevenue += getNextQuarterRevenueEstimate(estimates);

    return futureTTMRevenue;
};

export const getNextQuarterRevenueEstimate = function(estimates) {
    if(_.has(estimates, 'low') && _.has(estimates, 'high')) {
        const low = _.get(estimates, 'low') * getUnitConverter(_.get(estimates, 'units'));
        const high = _.get(estimates, 'high') * getUnitConverter(_.get(estimates, 'units'));

        return (low + high) / 2;
    }
};

export const getFutureSharePrice = function(currMarketCap, currStockPrice, peakPriceToSales, futureTTMRevenue) {
    const discountArray = [0.5, 0.6, 0.7, 0.8, 0.9, 1];

    let sharePrice = [];
    discountArray.forEach(entry => {
        sharePrice.push(((entry * peakPriceToSales * futureTTMRevenue * currStockPrice) / currMarketCap).toFixed(2));
    });
    return sharePrice
};
