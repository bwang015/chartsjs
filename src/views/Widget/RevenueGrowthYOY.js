import React, {Component} from 'react';
import {Color, GraphNames} from "../../utils/enums";
import LineChart from "../../components/LineChart";
import {
    setAxesLabel,
    setGraphTitle,
    setLineDataValues,
} from "../../utils/graph_helper";
import _ from "lodash";
import {Options} from "../../utils/common_objects";
import {
    getRevenueYOY,
} from "../../utils/common_utils";

class RevenueGrowthYOY extends Component {
    constructor(props) {
        super(props);
        this.state = {
            essentials: props.essentials,
            totalRevenue: props.totalRevenue,
            estimates: props.estimates,
            stockInfo: props.stockInfo,
            revenueYOY: props.revenueYOY,
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (props !== state) {
            return {
                essentials: props.essentials,
                totalRevenue: props.totalRevenue,
                estimates: props.estimates,
                stockInfo: props.stockInfo,
                revenueYOY: props.revenueYOY,
            };
        }

        return null;
    }

    componentDidMount() {
        this.getRevenueYOYData();
    }

    getRevenueYOYData() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Revenue Y/Y By Segments');
        setAxesLabel(options, 'Percentage (%)');

        let dataArray = [];
        const keys = Object.keys(this.state.revenueYOY);

        keys.forEach(key => {
            const obj = this.state.revenueYOY[key];
            return dataArray.push(setLineDataValues(key, getRevenueYOY(obj.data), obj.color));
        });
        dataArray.push(setLineDataValues('Total Revenue Y/Y Growth', getRevenueYOY(this.state.totalRevenue), Color.BLACK));

        const data = {
            labels: this.state.essentials.labels,
            datasets: dataArray,
        };

        this.setState({
            [GraphNames.REVENUE_YOY]: data,
            [GraphNames.REVENUE_YOY_OPTIONS]: options,
        });
    }

    render() {
        return (
            <div className="chart">
                <LineChart chartData={this.state[GraphNames.REVENUE_YOY]} options={this.state[GraphNames.REVENUE_YOY_OPTIONS]}/>
            </div>
        )
    }
}

export default RevenueGrowthYOY;
