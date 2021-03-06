import React, {Component} from 'react';
import BarChart from "../../components/BarChart";
import {Color} from "../../utils/enums";
import {setAxesLabel, setBarDataValues, setGraphTitle, setLineDataValues, stackGraphs} from "../../utils/graph_helper";
import _ from "lodash";
import {Options} from "../../utils/common_objects";

class RevenueSegments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revenue: props.revenue,
            essentials: props.essentials,
            totalRevenue: props.totalRevenue,
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (props !== state) {
            return {
                revenue: props.revenue,
                essentials: props.essentials,
                totalRevenue: props.totalRevenue,
            };
        }

        return null;
    }

    componentDidMount() {
        this.getRevenueSegmentsData();
    }

    getRevenueSegmentsData() {
        let dataArray = [];
        const keys = Object.keys(this.state.revenue);

        keys.forEach(key => {
            const obj = this.state.revenue[key];
            dataArray.push(setBarDataValues(key, obj.data, obj.color))
        });
        dataArray.push(setLineDataValues('Total Revenue', this.state.totalRevenue, Color.BLACK));
        const data = {
            labels: this.state.essentials.labels,
            datasets: dataArray,
        };

        let options = _.cloneDeep(Options);
        setGraphTitle(options, 'Revenue By Segments');
        setAxesLabel(options, `In ${this.state.essentials.units}`);
        stackGraphs(options);
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

export default RevenueSegments;
