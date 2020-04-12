import { Q } from "./utils/enums";
const units = "Thousands";
const transactionRevenue = [
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

const serviceRevenue = [
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

const hardwareRevenue = [
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

const bitcoinRevenue = [
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

const quarterLabels = [Q.Q1_17,
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

const transactionCostOfGoods = [
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

const serviceCostOfGoods = [
    15876,
    17116,
    18169,
    24559,
    30368,
    39784,
    47078,
    52654,
    60523,
    60119,
    63352,
    50276
];

const hardwareCostOfGoods = [
    12662,
    14173,
    18775,
    16783,
    19702,
    25536,
    23229,
    25647,
    26941,
    33268,
    35672,
    40504,
];

const bitcoinCostOfGoods = [
    0, 0, 0, 0, 33872,
    36596,
    42408,
    51951,
    64696,
    122938,
    146167,
    174438,
];

const totalCostOfGoods = [
    288123,
    344076,
    366543,
    376205,
    413433,
    499122,
    529448,
    552474,
    562605,
    708393,
    766437,
    786380,
];

const getTotalRevenue = function() {
    let totalRevenue = [];

    for(let i = 0; i < quarterLabels.length; i++) {
        totalRevenue.push(transactionRevenue[i] + serviceRevenue[i] + bitcoinRevenue[i] + hardwareRevenue[i]);
    }

    return totalRevenue;
};

export const SQ = {
    getTotalRevenue,
    totalCostOfGoods,
    bitcoinCostOfGoods,
    hardwareCostOfGoods,
    transactionCostOfGoods,
    serviceCostOfGoods,
    serviceRevenue,
    transactionRevenue,
    quarterLabels,
    bitcoinRevenue,
    hardwareRevenue,
    units,
};
