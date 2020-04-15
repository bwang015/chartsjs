import React, {Component} from 'react';
import {Color} from "../../utils/enums";
import {
    setAxesLabel,
    setBarDataValues,
    setGraphTitle,
} from "../../utils/graph_helper";
import _ from "lodash";
import {Options} from "../../utils/common_objects";
import BarChart from "../../components/BarChart";
import {getShareholderEquity} from "../../utils/common_utils";

class ShareholderEquityGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            essentials: props.essentials,
            equity: props.equity,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props !== state) {
            return {
                essentials: props.essentials,
                equity: props.equity,
            };
        }

        return null;
    }

    componentDidMount() {
        this.getShareholderEquityData();
    }

    getShareholderEquityData() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Shareholder Equity');
        setAxesLabel(options, `In ${this.state.essentials.units}`);

        let dataArray = [];

        dataArray.push(setBarDataValues('Total Assets', this.state.equity['Total Assets'], Color.BLUE));
        dataArray.push(setBarDataValues('Total Liabilities', this.state.equity['Total Liabilities'], Color.RED));
        dataArray.push(setBarDataValues('Shareholder Equity', getShareholderEquity(this.state.equity['Total Assets'], this.state.equity['Total Liabilities']), Color.GREEN));

        const data = {
            labels: this.state.essentials.labels,
            datasets: dataArray,
        };

        this.setState({
            chartData: data,
            options: options
        });
    }

    render() {
        return (
            <div className="chart">
                <BarChart chartData={this.state.chartData}
                          options={this.state.options}/>
            </div>
        )
    }
}

export default ShareholderEquityGraph;
