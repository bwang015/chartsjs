import React, {Component} from 'react';
import {Color, GraphNames} from "../../utils/enums";
import {setAxesLabel, setGraphTitle, setLineDataValues} from "../../utils/graph_helper";
import _ from "lodash";
import {Options} from "../../utils/common_objects";
import {getGrossProfit} from "../../utils/common_utils";
import LineChart from "../../components/LineChart";

class GrossProfitMargins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            essentials: props.essentials,
            totalRevenue: props.totalRevenue,
            grossProfit: props.grossProfit,
            totalCostOfGoods: props.totalCostOfGoods,
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (props !== state) {
            return {
                essentials: props.essentials,
                totalRevenue: props.totalRevenue,
                grossProfit: props.grossProfit,
                totalCostOfGoods: props.totalCostOfGoods,
            };
        }

        return null;
    }

    componentDidMount() {
        this.getGrossProfitData();
    }

    getGrossProfitData() {
        let dataArray = [];
        const keys = Object.keys(this.state.grossProfit);

        keys.forEach(key => {
            const obj = this.state.grossProfit[key];
            console.log(obj);
            return dataArray.push(setLineDataValues(key, getGrossProfit(obj.revenue, obj.costOfGoods), obj.color))
        });

        dataArray.push(setLineDataValues('Total Revenue', getGrossProfit(this.state.totalRevenue, this.state.totalCostOfGoods), Color.BLACK));
        const data = {
            labels: this.state.essentials.labels,
            datasets: dataArray,
        };

        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Gross Revenue Margins by Segments');
        setAxesLabel(options, `Percentage (%)`);
        this.setState({
            [GraphNames.GROSS_PROFIT_SEGMENTS]: data,
            [GraphNames.GROSS_PROFIT_SEGMENTS_OPTIONS]: options
        });
    }

    render() {
        return (
            <div className="chart">
                <LineChart chartData={this.state[GraphNames.GROSS_PROFIT_SEGMENTS]} options={this.state[GraphNames.GROSS_PROFIT_SEGMENTS_OPTIONS]}/>
            </div>
        )
    }
}

export default GrossProfitMargins;
