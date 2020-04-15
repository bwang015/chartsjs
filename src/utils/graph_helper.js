import _ from "lodash"
import { GraphNames, GraphType, Color} from "./enums";
import {Annotation} from "./common_objects";

export const setGraphTitle = function (options, title) {
    _.set(options, GraphNames.TITLE, title);
    _.set(options, 'title.fontSize', 24);
    return options;
};

export const setAxesLabel = function (options, yAxesLabel, xAxesLabel='Quarter') {
    let arr = _.get(options, GraphNames.Y_AXES);
    _.set(arr[0], GraphNames.LABEL, yAxesLabel);
    _.set(options, GraphNames.Y_AXES, [arr[0]]);

    arr = _.get(options, GraphNames.X_AXES);
    _.set(arr[0], GraphNames.LABEL, xAxesLabel);
    _.set(options, GraphNames.X_AXES, [arr[0]]);

    return options;
};

export const setHighLowAnnotation = function (high, low, options) {
    let lowAnnotation = _.cloneDeep(Annotation);
    let highAnnotation = _.cloneDeep(Annotation);
    _.set(lowAnnotation, 'label.content', `52 Week Low: ${low}`);
    _.set(lowAnnotation, 'value', low);
    _.set(highAnnotation, 'value', high);
    _.set(highAnnotation, 'label.content', `52 Week High: ${high}`);
    let annotationArray = [lowAnnotation, highAnnotation];
    _.set(options, GraphNames.ANNOTATIONS, annotationArray);
};

export const setPeakAnnotation = function (futureSharePrice, options) {
    let annotationArray = _.cloneDeep(_.get(options, GraphNames.ANNOTATIONS));

    // eslint-disable-next-line array-callback-return
    futureSharePrice.map(entry => {
        let annotationCopy = _.cloneDeep(Annotation);
        _.set(annotationCopy, 'value', entry);
        _.set(annotationCopy, 'borderColor', Color.RED);
        _.set(annotationCopy, 'label.content', entry);
        _.set(annotationCopy, 'label.position', 'right');
        annotationArray.push(annotationCopy);
    });
    _.set(options, GraphNames.ANNOTATIONS, annotationArray);
};

export const setOwnedStockPriceAnnotation = function(ownedStockPrice, options) {
    let annotationArray = _.cloneDeep(_.get(options, GraphNames.ANNOTATIONS));
    let annotationCopy = _.cloneDeep(Annotation);
    _.set(annotationCopy, 'value', ownedStockPrice);
    _.set(annotationCopy, 'borderColor', Color.YELLOW);
    _.set(annotationCopy, 'label.content', ownedStockPrice);
    _.set(annotationCopy, 'label.position', 'left');
    annotationArray.push(annotationCopy);
    _.set(options, GraphNames.ANNOTATIONS, annotationArray);
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
