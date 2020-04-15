import React, {Component} from 'react';
import {
    setAxesLabel,
    setBarDataValues,
    setGraphTitle,
} from "../../utils/graph_helper";
import _ from "lodash";
import {Options} from "../../utils/common_objects";
import BarChart from "../../components/BarChart";

class CashGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            essentials: props.essentials,
            cash: props.cash,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props !== state) {
            return {
                essentials: props.essentials,
                cash: props.cash,
            };
        }

        return null;
    }

    componentDidMount() {
        this.getCash();
    }

    getCash() {
        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Cash and Debt');
        setAxesLabel(options, `In ${this.state.essentials.units}`);

        let dataArray = [];
        const keys = Object.keys(this.state.cash);

        keys.forEach(key => {
            const obj = this.state.cash[key];
            dataArray.push(setBarDataValues(key, obj.data, obj.color))
        });

        const data = {
            labels: this.state.essentials.labels,
            datasets: dataArray,
        };

        this.setState({
            chartData: data,
            options: options,
        });
    }

    render() {
        return (
            <div className="chart">
                <BarChart chartData={this.state.chartData} options={this.state.options}/>
            </div>
        )
    }
}

export default CashGraph;
