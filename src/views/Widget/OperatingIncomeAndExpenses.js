import React, {Component} from 'react';
import {Color, GraphNames} from "../../utils/enums";
import {setAxesLabel, setBarDataValues, setGraphTitle} from "../../utils/graph_helper";
import _ from "lodash";
import {Options} from "../../utils/common_objects";
import BarChart from "../../components/BarChart";

class OperatingIncomeAndExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            essentials: props.essentials,
            totalRevenue: props.totalRevenue,
            operationNumbers: props.operationNumbers,
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (props !== state) {
            return {
                essentials: props.essentials,
                totalRevenue: props.totalRevenue,
                operationNumbers: props.operationNumbers,
            };
        }

        return null;
    }

    componentDidMount() {
        this.getRevenueOperatingIncomeExpensesData();
    }

    getRevenueOperatingIncomeExpensesData() {

        let dataArray = [];
        const keys = Object.keys(this.state.operationNumbers);

        dataArray.push(setBarDataValues('Total Revenue', this.state.totalRevenue, Color.BLUE));
        keys.forEach(key => {
            const obj = this.state.operationNumbers[key];
            return dataArray.push(setBarDataValues(key, obj.data, obj.color));
        });

        const data = {
            labels: this.state.essentials.labels,
            datasets: dataArray,
        };

        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Revenue, Operating Income and Expenses, and Net Income');
        setAxesLabel(options, 'In ' + this.state.essentials.units);
        this.setState({
            [GraphNames.REVENUE_OPERATIONS]: data,
            [GraphNames.REVENUE_OPERATIONS_OPTIONS]: options,
        });
    }

    render() {
        return (
            <div className="chart">
                <BarChart chartData={this.state[GraphNames.REVENUE_OPERATIONS]} options={this.state[GraphNames.REVENUE_OPERATIONS_OPTIONS]}/>
            </div>
        )
    }
}

export default OperatingIncomeAndExpenses;
