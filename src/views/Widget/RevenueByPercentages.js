import React, {Component} from 'react';
import {GraphNames} from "../../utils/enums";
import {setAxesLabel, setBarDataValues, setGraphTitle} from "../../utils/graph_helper";
import _ from "lodash";
import {Options} from "../../utils/common_objects";
import {getRevenuePercentage} from "../../utils/common_utils";
import BarChart from "../../components/BarChart";

class RevenueByPercentages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            essentials: props.essentials,
            totalRevenue: props.totalRevenue,
            revenue: props.revenue,
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (props !== state) {
            return {
                essentials: props.essentials,
                totalRevenue: props.totalRevenue,
                revenue: props.revenue,
            };
        }

        return null;
    }

    componentDidMount() {
        this.getRevenueBySegmentPercentageData();
    }

    getRevenueBySegmentPercentageData() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Revenue Breakdown By Percent');
        setAxesLabel(options, 'Percentage (%)');

        let dataArray = [];
        const keys = Object.keys(this.state.revenue);

        keys.forEach(key => {
            const obj = this.state.revenue[key];
            return dataArray.push(setBarDataValues(key, getRevenuePercentage(obj.data, this.state.totalRevenue), obj.color));
        });

        const data = {
            labels: this.state.essentials.labels,
            datasets: dataArray,
        };

        this.setState({
            [GraphNames.REVENUE_PERCENTAGE]: data,
            [GraphNames.REVENUE_PERCENTAGE_OPTIONS]: options,
        });
    }

    render() {
        return (
            <div className="chart">
                <BarChart chartData={this.state[GraphNames.REVENUE_PERCENTAGE]}
                          options={this.state[GraphNames.REVENUE_PERCENTAGE_OPTIONS]}/>
            </div>
        )
    }
}

export default RevenueByPercentages;
