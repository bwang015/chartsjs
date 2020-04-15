import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData,
            options: props.options,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.chartData !== state.chartData) {
            return {
                chartData: props.chartData,
                options: props.options,
            };
        }

        return null;
    }

    render() {
        return (
            <div className="chart">
                <Line
                    data={this.state.chartData}
                    options={this.state.options}
                />
            </div>
        )
    }
}

export default LineChart;
