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
import {getFreeCashFlow} from "../../utils/common_utils";

class FreeCashFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            essentials: props.essentials,
            freeCashFlow: props.freeCashFlow,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props !== state) {
            return {
                essentials: props.essentials,
                freeCashFlow: props.freeCashFlow,
            };
        }

        return null;
    }

    componentDidMount() {
        this.getFreeCashFlowGraph();
    }

    getFreeCashFlowGraph() {
        let options = _.cloneDeep(Options);
        setAxesLabel(options, `In ${this.state.essentials.units}`);
        setGraphTitle(options, 'Free Cash Flow');

        let dataArray = [];
        const keys = Object.keys(this.state.freeCashFlow);

        keys.forEach(key => {
            const obj = this.state.freeCashFlow[key];
            dataArray.push(setBarDataValues(key, obj.data, obj.color))
        });

        dataArray.push(setBarDataValues('Free Cash Flow',
            getFreeCashFlow(this.state.freeCashFlow['Cash From Operations'].data, this.state.freeCashFlow['Cash From Investing'].data),
            Color.GREEN));

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
                <BarChart chartData={this.state.chartData}
                          options={this.state.options}/>
            </div>
        )
    }
}

export default FreeCashFlow;
