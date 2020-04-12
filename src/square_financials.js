import { Q } from "./Utils/enums";
export const units = "Thousands";
export const transactionRevenue = [
    403478,
    482065,
    510019,
    524612,
    523037,
    625228,
    655384,
    667802,
    656762,
    775510,
    816622,
    832180,
];

export const serviceRevenue = [
    49060,
    59151,
    65051,
    79402,
    97054,
    134332,
    166203,
    194117,
    218857,
    251383,
    279801,
    281415,
];

export const hardwareRevenue = [
    9016,
    10289,
    10089,
    12021,
    14417,
    18362,
    17558,
    18166,
    18212,
    22260,
    21766,
    22267,
];

export const bitcoinRevenue = [
    0,
    0,
    0,
    0,
    34095,
    37016,
    42963,
    52443,
    65528,
    125085,
    148285,
    177567
];

export const quarterLabels = [Q.Q1_17,
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

export const transactionCostOfGoods = [
    257778,
    311092,
    328043,
    333377,
    327911,
    395349,
    414456,
    420846,
    409069,
    490349,
    519312,
    519241,
];

export const getTotalRevenue = function() {
    let totalRevenue = [];

    for(let i = 0; i < quarterLabels.length; i++) {
        totalRevenue.push(transactionRevenue[i] + serviceRevenue[i] + bitcoinRevenue[i] + hardwareRevenue[i]);
    }

    return totalRevenue;
};
