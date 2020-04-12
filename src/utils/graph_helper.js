import _ from "lodash"
import { GraphNames, GraphType} from "./enums";

export const setGraphTitle = function (options, title) {
    _.set(options, GraphNames.TITLE, title);
    return options;
};

export const setYAxesLabel = function (options, yAxesLabel) {
    let arr = _.get(options, GraphNames.Y_AXES);
    _.set(arr[0], GraphNames.LABEL, yAxesLabel);
    _.set(options, GraphNames.Y_AXES, [arr[0]]);
    return options;
};

export const stackGraphs = function (options) {
    let arr = _.get(options, GraphNames.Y_AXES);
    _.set(arr[0], GraphNames.STACK_GRAPH, true);
    _.set(options, GraphNames.Y_AXES, [arr[0]]);

    arr = _.get(options, GraphNames.X_AXES);
    _.set(arr[0], GraphNames.STACK_GRAPH, true);
    _.set(options, GraphNames.X_AXES, [arr[0]]);

    return options;
};

export const setBarDataValues = function (label, dataArray, color) {
    return {
        label: label,
        data: dataArray,
        backgroundColor: color,
        type: GraphType.BAR
    };
};

export const setLineDataValues = function (label, dataArray, color) {
    return {
        label: label,
        data: dataArray,
        fill: false,
        borderColor: color,
        type: GraphType.LINE,
    };
};
