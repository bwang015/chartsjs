import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData,
            options: props.options,
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
    };

    render() {
        return (
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    options={this.state.options}
                />
            </div>
        )
    }
}

export default BarChart;
