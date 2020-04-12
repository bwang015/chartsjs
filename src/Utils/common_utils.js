import { Q } from "./Utils/enums";

const quarters = [
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

var getQuarters =  function (quarterStart, quarterEnd) {
    let start = 0;
    let end = quarters.length - 1;


    return [start, end];
};

export { getQuarters };
