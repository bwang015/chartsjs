import {Q, Units} from "../utils/enums";
export const units = Units.MILLIONS;
export const symbol = 'TSLA';

export const peakStockPrice = 917.42;
export const currentStockPrice = 329.15;
export const estimates = {
    low: 6.3,
    high: 6.40,
    lowPercent: 0,
    highPercent: 0,
    units: Units.BILLIONS,
};

export const quarterLabels = [
    Q.Q1_17,
    Q.Q2_17,
    Q.Q3_17,
    Q.Q4_17,
    Q.Q1_18,
    Q.Q2_18,
    Q.Q3_18,
    Q.Q4_18,
    Q.Q1_19,
    Q.Q2_19,
    Q.Q3_19,
    Q.Q4_19,
];

export const autoRevenue = [
    2035.06,
    2013.85,
    2076.73,
    2409.11,
    2561.88,
    3117.87,
    5878.31,
    6073.47,
    3508.74,
    5168.03,
    5132,
    6143.23,
];

export const autoLeaseRevenue = [
    254.54,
    272.76,
    286.16,
    293.09,
    173.44,
    239.82,
    220.46,
    249.75,
    215.12,
    208.36,
    221,
    224.52,
];

export const energyRevenue = [
    213.944,
    286.78,
    317.51,
    298.04,
    410.02,
    374.41,
    399.32,
    371.50,
    324.66,
    368.21,
    402,
    436.13,
];

export const serviceRevenue = [
    192.73,
    216.17,
    304.28,
    288.02,
    263.41,
    270.14,
    326.33,
    531.16,
    492.94,
    605.08,
    548,
    579.98,
];

export const getTotalRevenue = function() {
    let totalRevenue = [];

    for(let i = 0; i < quarterLabels.length; i++) {
        totalRevenue.push(autoRevenue[i] + serviceRevenue[i] + autoLeaseRevenue[i] + energyRevenue[i]);
    }

    return totalRevenue;
};
