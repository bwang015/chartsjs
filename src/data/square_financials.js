import {Q, Units} from "../utils/enums";
const units = Units.THOUSANDS;

const peakStockPrice = 85.70;
const currentStockPrice = 46.501;

const estimates = {
    low: 1.3,
    high: 1.34,
    lowPercent: 0,
    highPercent: 0,
    units: Units.BILLIONS,
};

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

const quarterLabels = [
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

const totalOperatingExpenses = [
    187513,
    219653,
    233507,
    252839,
    276162,
    318463,
    362527,
    383162,
    418796,
    466688,
    467943,
    509701,
];

const totalOperatingIncome = [
    -14082,
    -12224,
    -14891,
    -13009,
    -20992,
    -2647,
    -9867,
    -3108,
    -22042,
    -843,
    32094,
    17348,
];

const netIncome = [
    -15090,
    -15962,
    -16098,
    -15663,
    -23986,
    -5906,
    19643,
    -28204,
    -38151,
    -6740,
    29397,
    390940,
];

const cash = [
    704494,
    716989,
    658412,
    696474,
    738586,
    1387977,
    721738,
    583173,
    521676,
    617282,
    612048,
    1047118,
];

const currentDebt = [
    0,
    0,
    0,
    0,
    0,
    0,
    125971,
    0,
    0,
    0,
    0,
    0,
];

const longTermDebt = [
    345739,
    349960,
    354237,
    358572,
    362965,
    1071437,
    897976,
    899695,
    909302,
    919026,
    928869,
    938832,
];

const cashFromOperations = [
    43998,
    46592,
    39727,
    -2606,
    52053,
    18979,
    47628,
    295080,
    32444,
    133392,
    238747,
    61116,
];

const cashFromInvesting = [
    -170394,
    -85350,
    -104765,
    19898,
    -15493,
    -150554,
    -609178,
    -905848,
    -70387,
    -25368,
    -200923,
    391871,
];

const totalAssets = [
    1591113,
    1741714,
    2083852,
    2187270,
    2379612,
    3554827,
    3973368,
    3281023,
    4402591,
    4654006,
    4000504,
    4551258,
];

const totalLiabilities = [
    963180,
    1037970,
    1350943,
    1400937,
    1569632,
    2473198,
    2851224,
    2160522,
    3281002,
    3469534,
    2750710,
    2836208,
];

const getTotalRevenue = function() {
    let totalRevenue = [];

    for(let i = 0; i < quarterLabels.length; i++) {
        totalRevenue.push(transactionRevenue[i] + serviceRevenue[i] + bitcoinRevenue[i] + hardwareRevenue[i]);
    }

    return totalRevenue;
};

const symbol = "SQ";

export const SQ = {
    getTotalRevenue,
    peakStockPrice,
    estimates,
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
    totalOperatingExpenses,
    totalOperatingIncome,
    netIncome,
    cash,
    currentDebt,
    longTermDebt,
    cashFromOperations,
    cashFromInvesting,
    totalAssets,
    totalLiabilities,
    symbol,
    currentStockPrice,
};
